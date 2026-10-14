import { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";

export const useDeleteJob = () => {
  const { employer } = useStore();
  const navigate = useNavigate();
  const { jobID } = useParams();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteJob = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${api}/api/employer/job/${jobID}`, {
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
      setLoading(false);
      navigate(`/employer/console/${employer.user._id}/jobs`);
    }
  };

  return { deleteJob, loading, error };
};
