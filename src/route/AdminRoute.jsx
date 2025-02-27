import { Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

const AdminRoute = ({ children }) => {
  const {user} = useAuth()

  if (!user) return <div className="text-center">
  <span className="loading loading-spinner loading-lg text-error mt-24"></span>
  </div>
  if (user.accountType === 'admin') return children
  return <Navigate to='/dashboard' />
}

export default AdminRoute