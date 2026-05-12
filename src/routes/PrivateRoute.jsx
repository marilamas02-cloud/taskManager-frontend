import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spinner size={48} />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}
