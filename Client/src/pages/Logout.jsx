import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser(); //fun call where JWT token delete
  }, [LogoutUser]);

  return <Navigate to="/login"></Navigate>; // after logout login page show
};

export default Logout;
