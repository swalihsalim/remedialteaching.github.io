import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, Clock3, BookOpen } from 'lucide-react'

const courses = [
  { title: 'Foundations of Programming', category: 'Technology', level: 'Beginner', lessons: 24, color: 'from-blue-500 to-indigo-600', mark: '01' },
  { title: 'Data Science Essentials', category: 'Technology', level: 'Intermediate', lessons: 18, color: 'from-violet-500 to-fuchsia-600', mark: '02' },
  { title: 'Academic Writing Skills', category: 'Skills', level: 'Beginner', lessons: 12, color: 'from-emerald-500 to-teal-600', mark: '03' },
]

export default function Courses() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => courses.filter(course => {
    const matchesText = `${course.title} ${course.category} ${course.level}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (category === 'All' || course.category === category)
  }), [query, category])

  return (
    <section id="courses" className="bg-slate-100/70 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Explore and grow</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">A place to start learning</h2><p className="mt-3 text-slate-500">A preview of how courses will appear on the platform.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100 sm:w-56" /></label>
            <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter courses by category" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"><option>All</option><option>Technology</option><option>Skills</option></select>
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(course => <article key={course.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
            <div className={`relative flex h-40 items-end justify-between overflow-hidden bg-gradient-to-br ${course.color} p-6 text-white`}>
              <div className="absolute -right-5 -top-12 h-40 w-40 rounded-full border-[24px] border-white/10" />
              <div className="absolute right-12 top-9 h-20 w-20 rounded-2xl border border-white/20 rotate-12" />
              <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{course.category}</span>
              <span className="relative text-5xl font-black text-white/30">{course.mark}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-slate-500"><span>{course.level}</span><span className="inline-flex items-center gap-1"><BookOpen size={14} /> {course.lessons} lessons</span></div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{course.title}</h3>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-xs font-medium text-slate-400">Course preview</span><span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">View details <ArrowUpRight size={15} /></span></div>
            </div>
          </article>)}
          {filtered.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-semibold text-slate-800">No matching courses</p><p className="mt-1 text-sm text-slate-500">Try another keyword or choose a different category.</p></div>}
        </div>
        <p className="mt-5 text-xs text-slate-400">These are illustrative course cards for the homepage. Real course data and enrolment will be connected in Stage 4.</p>
      </div>
    </section>
  )
}
