import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowLeft, BookOpen, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/common/Button.jsx'

export default function Login() {
  const { user, configured } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  if (user) return <Navigate to="/dashboard" replace />
  const destination = location.state?.from || '/dashboard'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    if (!configured) {
      setError('Supabase is not connected yet. Follow the setup instructions in the project README.')
      return
    }
    setBusy(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) throw signInError
      window.location.assign(destination)
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleReset() {
    setError('')
    setMessage('')
    if (!configured) return setError('Supabase is not connected yet.')
    if (!email.trim()) return setError('Enter your email address first.')
    setBusy(true)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) throw resetError
      setMessage('If an account exists for this email, a password reset link will be sent.')
    } catch (err) {
      setError(err.message || 'Could not request a password reset.')
    } finally {
      setBusy(false)
    }
  }

  return <AuthShell title="Welcome back" subtitle="Sign in to continue your learning journey.">
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <Field label="Email address"><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className={fieldClass} placeholder="you@example.com" /></Field>
      <Field label="Password">
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className={`${fieldClass} pr-12`} placeholder="Enter your password" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-slate-400" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
        </div>
      </Field>
      {error && <Alert type="error">{error}</Alert>}
      {message && <Alert type="success">{message}</Alert>}
      <Button className="w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
      <button type="button" onClick={handleReset} disabled={busy} className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</button>
    </form>
    <p className="mt-6 text-center text-sm text-slate-500">New to Remedial Teaching? <Link to="/register" className="font-semibold text-blue-600">Create an account</Link></p>
  </AuthShell>
}

export const fieldClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
export function Field({ label, children }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>
}
export function Alert({ type = 'error', children }) {
  return <div role="alert" className={`rounded-xl px-4 py-3 text-sm ${type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{children}</div>
}
function AuthShell({ title, subtitle, children }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8">
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16}/> Home</Link>
      <div className="mt-7 flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><BookOpen size={21}/></span><span className="font-extrabold text-slate-900">Remedial Teaching</span></div>
      <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-950">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      {children}
    </div>
  </main>
}
