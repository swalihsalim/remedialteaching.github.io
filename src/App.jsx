import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import PlaceholderPage from './pages/PlaceholderPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/reset-password" element={<PlaceholderPage title="Reset your password" description="Use the password reset link sent to your email. The full password update form will be completed in the next authentication refinement." />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" description="The page you're looking for doesn't exist yet." />} />
      </Routes>
    </AuthProvider>
  )
}
