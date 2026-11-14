import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react'
import Button from '../common/Button.jsx'

export default function Hero() {
  return (
    <section className="hero-grid relative overflow-hidden">
      <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-3.5 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <Sparkles size={14} /> A smarter way to learn
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Make every study session <span className="text-blue-600">count.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Bring your courses, study materials and learning progress together in one calm, organised space.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#courses">Explore courses <ArrowRight size={17} /></Button>
            <Button to="/register" variant="secondary"><Play size={16} /> Create a free account</Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
            {['Learn at your pace', 'Track your progress', 'Study from anywhere'].map(item => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" />{item}</span>)}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-5 top-12 h-24 w-24 rounded-3xl bg-amber-200/70 blur-2xl" />
          <div className="soft-shadow relative rounded-[2rem] border border-white bg-white p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div><p className="text-xs font-medium text-slate-400">YOUR LEARNING SPACE</p><p className="mt-1 font-bold text-slate-900">Good morning, learner</p></div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">S</div>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
              <div className="flex items-center justify-between"><span className="rounded-full bg-white/15 px-3 py-1 text-xs">Continue learning</span><Sparkles size={18} /></div>
              <p className="mt-5 text-xl font-bold">Introduction to Data Science</p>
              <p className="mt-1 text-sm text-blue-100">Module 03 · Understanding data</p>
              <div className="mt-6 flex items-center justify-between text-xs text-blue-100"><span>Course progress</span><span>68%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[68%] rounded-full bg-white" /></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Study time</p><p className="mt-1 text-2xl font-extrabold text-slate-900">12.5h</p><p className="mt-1 text-xs text-emerald-600">This week</p></div>
              <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Lessons done</p><p className="mt-1 text-2xl font-extrabold text-slate-900">18</p><p className="mt-1 text-xs text-blue-600">Keep it going</p></div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-100 text-amber-700"><Play size={17} /></div>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-800">Next up: Working with datasets</p><p className="text-xs text-slate-500">Video lesson · 14 min</p></div>
              <ArrowRight size={17} className="text-slate-400" />
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:block"><p className="text-xs text-slate-500">Learning streak</p><p className="mt-1 text-sm font-bold text-slate-900">✦ 5 days in a row</p></div>
        </div>
      </div>
    </section>
  )
}
