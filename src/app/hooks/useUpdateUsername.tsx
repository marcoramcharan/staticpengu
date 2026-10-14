import { useState } from "react";
import { useStore } from "../store/store";
import { api } from "../api/api";

export const useUpdateUsername = () => {
  const { user, loginuser } = useStore();

  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const postdata = async (username: string) => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      `${api}/api/users/username/${user.user._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      const newuser = user;
      newuser.user.username = username;
      newuser.username = username;
      loginuser(newuser);
      setLoading(false);
    }
  };

  return { postdata, loading, error };
};
