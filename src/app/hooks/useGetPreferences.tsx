// useAuthenticatedGetRequest.js

import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

const useGetPreferences = () => {

  const {employee} = useStore()

  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/employee/preferences`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${employee.token}`,
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

export default useGetPreferences;
