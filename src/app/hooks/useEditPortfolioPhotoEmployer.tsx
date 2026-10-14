import { useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { api } from "../api/api";

export const useEditPortfolioPhotoEmployer = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { employer } = useStore();

  const postdata2 = async (photo: string) => {
    const body = { photo };
    console.log('body', body)
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${api}/api/employer/portfolio/photo`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${employer.token}`,
          },
        }
      );
      const json = await response.data;
      console.log(json);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { postdata2, loading, error };
};
