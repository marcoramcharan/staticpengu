import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../api/api";
import { useStore } from "../store/store";

export const useEmployeeLogin = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams(); // Get the search params

  // Check if the query param 'open' is true
  const openParam = searchParams.get("redirect");

  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { loginemployee } = useStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(false);
    const response = await fetch(`${api}/api/auth/employee/login`, {
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
      loginemployee(json);
      setLoading(false);
      console.log("param", openParam);
      if (!openParam) {
        navigate(`/employee/console/${json.user._id}`);
      } else {
        navigate(`/jobs/${openParam}`);
      }
    }
  };

  return { login, loading, error };
};
