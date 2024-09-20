import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const FarmerRoute = ({children}) => {
    const [role , isLoading] = useRole()


        if(isLoading) return <LoadingSpinner />
        if(role === "Farmer") return children
        return <Navigate to="/dashboard" />
};

export default FarmerRoute;