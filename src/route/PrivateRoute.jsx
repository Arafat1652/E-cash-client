
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";




const PrivateRoute = ({children}) => {
    const {user}= useAuth()
    const location = useLocation()


    if(!user){
        return <div className="text-center">
        <span className="loading loading-spinner loading-lg text-error mt-24"></span>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/'></Navigate>
};

export default PrivateRoute;