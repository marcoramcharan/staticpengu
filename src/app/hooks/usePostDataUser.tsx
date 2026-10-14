import { useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

export const usePostDataUser = () => {
  const { user } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const postdatauser = async (template: string, active: boolean) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/user/${user.portfolio._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ template, active }),
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

  return { postdatauser, loading, error };
};
