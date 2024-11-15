import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem("accessToken");

    // Redirect to login if token is not present
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Render the children components if authenticated
    return <>{children}</>;
};

export default PrivateRoute;
