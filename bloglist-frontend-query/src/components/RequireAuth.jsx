import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../contexts/userContext'

const RequireAuth = ({ children }) => {
  const [user] = useUser()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default RequireAuth