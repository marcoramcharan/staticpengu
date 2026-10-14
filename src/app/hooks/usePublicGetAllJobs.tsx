import { useEffect, useState } from "react";
import { api } from "../api/api";

const useGetAllJobs = (search: string, location: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    // convert the location string to oject
    const obj = JSON.parse(location! || `{"":""}`);
    console.log('obj',obj)

    const valuesArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        valuesArray.push(obj[key]);
      }
    }

    // loop through onject values and add it to an array

    setLoading(true);
    try {
      const response = await fetch(
        `${api}/api/jobs?query=${search}&location=${valuesArray}`,
        {
          //       const response = await fetch(`${api}/api/jobs?query=data5&location=lollipop`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

export default useGetAllJobs;
