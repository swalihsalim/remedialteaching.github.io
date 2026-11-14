import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Menu, X, ArrowUpRight } from 'lucide-react'
import Button from './Button.jsx'

const links = [
  ['Explore courses', '#courses'],
  ['Why Remedial Teaching', '#features'],
  ['How it works', '#how-it-works'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Remedial Teaching home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white"><BookOpen size={21} /></span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">remedial teaching<span className="text-blue-600">.</span></span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-blue-600">{label}</a>)}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/login" variant="secondary" className="px-4 py-2.5">Log in</Button>
          <Button to="/register" className="px-4 py-2.5">Get started <ArrowUpRight size={16} /></Button>
        </div>

        <button className="rounded-lg p-2 text-slate-700 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
        <nav className="flex flex-col gap-4">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-700">{label}</a>)}
          <div className="flex gap-3 pt-2">
            <Button to="/login" variant="secondary" className="flex-1" onClick={() => setOpen(false)}>Log in</Button>
            <Button to="/register" className="flex-1" onClick={() => setOpen(false)}>Get started</Button>
          </div>
        </nav>
      </div>}
    </header>
  )
}
