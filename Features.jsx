import { BookOpenCheck, FileText, Video, BrainCircuit, ChartNoAxesCombined, ShieldCheck } from 'lucide-react'

const features = [
  { icon: BookOpenCheck, title: 'Structured courses', text: 'Keep lessons and subjects organised in one learning journey.', tone: 'bg-blue-50 text-blue-700' },
  { icon: FileText, title: 'Study resources', text: 'Find notes, handouts and PDFs when you need them.', tone: 'bg-violet-50 text-violet-700' },
  { icon: Video, title: 'Video lessons', text: 'Revisit concepts with focused, easy-to-follow lessons.', tone: 'bg-rose-50 text-rose-700' },
  { icon: BrainCircuit, title: 'AI study support', text: 'Get help understanding topics and reviewing concepts.', tone: 'bg-amber-50 text-amber-700' },
  { icon: ChartNoAxesCombined, title: 'Progress insights', text: 'See completed lessons, quiz results and learning activity.', tone: 'bg-emerald-50 text-emerald-700' },
  { icon: ShieldCheck, title: 'A secure space', text: 'Your learning data is protected with account-based access.', tone: 'bg-sky-50 text-sky-700' },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">Everything in one place</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Tools that make learning feel simpler</h2>
        <p className="mt-4 leading-7 text-slate-500">Spend less time searching for resources and more time understanding what you study.</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text, tone }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50">
          <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon size={22} /></div>
          <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
        </article>)}
      </div>
    </section>
  )
}
