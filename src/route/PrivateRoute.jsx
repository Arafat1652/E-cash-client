
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";




const PrivateRoute = ({children}) => {
    const {user}= useAuth()
    const location = useLocation()


    if(!user){
        return <LoadingSpinner/>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/'></Navigate>
};

export default PrivateRoute;