import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/common/Button.jsx'
import { Alert, Field, fieldClass } from './Login.jsx'

export default function Register() {
  const { user, configured } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [accountType, setAccountType] = useState('student')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (user) return <Navigate to="/dashboard" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!configured) return setError('Supabase is not connected yet. Follow the setup instructions in the project README.')
    if (password.length < 8) return setError('Use a password with at least 8 characters.')
    if (password !== confirmPassword) return setError('The passwords do not match.')
    setBusy(true)
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            account_type: accountType,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })
      if (signUpError) throw signUpError
      if (data.session) {
        setSuccess('Your account has been created. You are signed in and can continue to your dashboard.')
        window.location.assign('/dashboard')
      } else {
        setSuccess('Registration received. Check your email for the verification link before signing in.')
      }
    } catch (err) {
      setError(err.message || 'Unable to create your account. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-8">
    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft size={16}/> Home</Link>
      <div className="mt-7 flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><BookOpen size={21}/></span><span className="font-extrabold text-slate-900">Remedial Teaching</span></div>
      <h1 className="mt-7 text-2xl font-extrabold tracking-tight text-slate-950">Create your account</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">Choose the account type that describes how you'll use the platform.</p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <Field label="Full name"><input required maxLength={100} autoComplete="name" value={name} onChange={e => setName(e.target.value)} className={fieldClass} placeholder="Your full name"/></Field>
        <Field label="Email address"><input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className={fieldClass} placeholder="you@example.com"/></Field>
        <Field label="Account type">
          <select value={accountType} onChange={e => setAccountType(e.target.value)} className={fieldClass}>
            <option value="student">Student</option>
            <option value="guardian">Parent / Guardian</option>
          </select>
        </Field>
        <Field label="Password"><input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className={fieldClass} placeholder="At least 8 characters"/></Field>
        <Field label="Confirm password"><input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={fieldClass} placeholder="Enter password again"/></Field>
        <div className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-800">Parent/guardian accounts do not automatically access a student's records. A verified relationship must be established and approved before progress can be viewed.</div>
        {error && <Alert>{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        <Button className="w-full" disabled={busy}>{busy ? 'Creating account…' : 'Create account'}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-blue-600">Sign in</Link></p>
    </div>
  </main>
}
