import { useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

export const useDeleteApplication = () => {
  const { employee } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteApp = async (id: string) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/employee/application/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${employee.token}`,
      },
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

  return { deleteApp, loading, error };
};
