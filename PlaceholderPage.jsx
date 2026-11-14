import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default function PlaceholderPage({ title, description }) {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-5">
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white"><BookOpen size={25} /></div>
      <h1 className="mt-6 text-2xl font-extrabold text-slate-900">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      <Link to="/" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"><ArrowLeft size={16} /> Back to homepage</Link>
    </div>
  </main>
}
