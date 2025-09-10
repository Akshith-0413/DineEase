
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth } from "../store/auth";

export default function RequireAuth() {
  const location = useLocation();
  if (!auth.isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}