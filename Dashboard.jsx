import { Link, Navigate } from 'react-router-dom'
import { BookOpen, LogOut, UserRound, ShieldCheck, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/common/Button.jsx'

export default function Dashboard() {
  const { user, profile, signOut } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  const isGuardian = profile?.account_type === 'guardian'

  async function handleSignOut() {
    try { await signOut(); window.location.assign('/') }
    catch (error) { window.alert(error.message || 'Unable to sign out.') }
  }

  return <main className="min-h-screen bg-slate-50">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-slate-900"><BookOpen className="text-blue-600"/> Remedial Teaching</Link>
        <button onClick={handleSignOut} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"><LogOut size={17}/> Sign out</button>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-800 p-6 text-white sm:p-9">
        <p className="text-sm text-blue-100">{isGuardian ? 'Parent / Guardian space' : 'Student learning space'}</p>
        <h1 className="mt-2 text-3xl font-extrabold">Welcome, {profile?.full_name || user.email}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">{isGuardian ? 'Your account is ready. A verified and approved link to a student is required before their learning information can be shown here.' : 'Your account is ready. Your learning dashboard and course enrolments will appear here as those features are added.'}</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700">{isGuardian ? <UserRound/> : <GraduationCap/>}</div>
          <h2 className="mt-4 font-bold text-slate-900">{isGuardian ? 'Linked students' : 'My learning'}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{isGuardian ? 'Student links will be managed through a verified approval process.' : 'Courses, lessons, practice activities and progress tracking will be added in upcoming stages.'}</p>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><ShieldCheck/></div>
          <h2 className="mt-4 font-bold text-slate-900">Account information</h2>
          <p className="mt-2 break-all text-sm text-slate-500">{user.email}</p>
          <p className="mt-1 text-sm capitalize text-slate-500">Account type: {profile?.account_type || 'Pending profile'}</p>
        </section>
      </div>
      <p className="mt-6 text-xs text-slate-400">This is the Stage 2 account dashboard. Course and student-record functionality will be added in later stages.</p>
    </div>
  </main>
}
