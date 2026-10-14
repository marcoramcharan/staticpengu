import { useState } from "react";
import { useStore } from "../store/store";
import axios from "axios";
import { api } from "../api/api";

export const usePublishPhoto = () => {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);

  const { user } = useStore();

  const postdata2 = async (photo: string, other: any) => {
    const body = { photo, ...other };
    console.log(body);
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(
        `${api}/api/projects/photo/${user.portfolio._id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
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
