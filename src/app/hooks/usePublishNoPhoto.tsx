import { useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

export const usePublishNoPhoto = () => {
  const { user } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const postdata = async (obj: any) => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `${api}/api/projects/${user.portfolio._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

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
