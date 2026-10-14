import { useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { api } from "../api/api";

export const useEditPortfolioPhotoEmployee = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { employee } = useStore();

  const postdata2 = async (photo: string) => {
    const body = { photo };
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${api}/api/employee/resume/file`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${employee.token}`,
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
