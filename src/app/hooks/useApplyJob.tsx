import { useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

export const useApplyJob = () => {
  const { employee } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const postdata = async (obj: any) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/employee/apply/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${employee.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setLoading(false);
    }
  };

  return { postdata, loading, error };
};
