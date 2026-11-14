import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import PlaceholderPage from '../../pages/PlaceholderPage.jsx'

export default function ProtectedRoute({ children, allowedTypes }) {
  const { user, profile, loading, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return <PlaceholderPage title="Account setup required" description="Connect your Supabase project and run the supplied database setup before using protected pages." />
  }
  if (loading) {
    return <main className="grid min-h-screen place-items-center text-sm text-slate-500">Checking your account…</main>
  }
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (!profile) {
    return <PlaceholderPage title="Profile unavailable" description="Your account is signed in, but its profile is not available. Please contact the platform administrator." />
  }
  if (allowedTypes && !allowedTypes.includes(profile.account_type)) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
