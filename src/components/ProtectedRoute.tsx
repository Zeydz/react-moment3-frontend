import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import type { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode}) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return children
}
export default ProtectedRoute