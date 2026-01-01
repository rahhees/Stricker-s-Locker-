import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../Api/AxiosInstance";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
      } catch(error) {
        toast.error("Session expired");
        console.log("Error",error);
        navigate("/login");
        console.log()
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return { user, setUser, isLoading };
};

export default useProfile;
