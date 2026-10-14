import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

export const useDeleteEmployerAccount = () => {
  const { employer } = useStore();
  const navigate = useNavigate();

  const { logoutuser } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteAccount = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/employer/account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${employer.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.removeItem("contactme");
      localStorage.removeItem("portfoliohub");
      localStorage.removeItem("indeed");
      logoutuser();
      setLoading(false);
      navigate("/");
    }
  };

  return { deleteAccount, loading, error };
};
