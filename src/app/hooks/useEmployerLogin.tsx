import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useStore } from "../store/store";

export const useEmployerLogin = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { loginemployer } = useStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(false);
    const response = await fetch(`${api}/api/auth/employer/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      loginemployer(json);
      setLoading(false);
      navigate(`/employer/console/${json.user._id}`);
    }
  };

  return { login, loading, error };
};
