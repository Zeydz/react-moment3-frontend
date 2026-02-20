import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  /* Avoid redirecting */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading auth...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
