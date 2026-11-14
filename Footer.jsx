import { BookOpen, Mail, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold text-slate-900"><BookOpen className="text-blue-600" /> remedial teaching<span className="text-blue-600">.</span></div>
          <p className="mt-2 max-w-sm text-sm text-slate-500">A supportive space for focused learning, practice and progress.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-500">
          <a href="#courses" className="hover:text-blue-600">Courses</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="mailto:hello@example.com" className="inline-flex items-center gap-1 hover:text-blue-600"><Mail size={15} /> Contact <ArrowUpRight size={13} /></a>
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Remedial Teaching. All rights reserved.</p>
      </div>
    </footer>
  )
}
