
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AgentRoute = ({children}) => {
    const {user} = useAuth()

    if (!user) return <div className="text-center">
    <span className="loading loading-spinner loading-lg text-error mt-24"></span>
    </div>
    if (user.accountType === 'agent') return children
    return <Navigate to='/dashboard' />
};

export default AgentRoute;