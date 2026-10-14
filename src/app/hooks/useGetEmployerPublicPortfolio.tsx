// useAuthenticatedGetRequest.js

import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const useGetEmployerPublicPortfolio = () => {

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const {id} = useParams()
  const navigate = useNavigate()

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/jobs/employer/portfolio/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
      navigate(`/404/portfolio`)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useGetEmployerPublicPortfolio;
