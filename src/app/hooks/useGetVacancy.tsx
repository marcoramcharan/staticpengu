// useAuthenticatedGetRequest.js

import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";

const useGetVacancy = () => {

  const { employer } = useStore();

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const {jobID} = useParams()

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/employer/job/${jobID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${employer.token}`,
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

export default useGetVacancy;
