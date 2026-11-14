import { UserPlus, Compass, GraduationCap } from 'lucide-react'

const steps = [
  { icon: UserPlus, number: '01', title: 'Create your space', text: 'Set up your student account and keep your learning in one place.' },
  { icon: Compass, number: '02', title: 'Choose your course', text: 'Explore subjects, open lessons and access your study resources.' },
  { icon: GraduationCap, number: '03', title: 'Learn and improve', text: 'Complete activities and follow your progress as you go.' },
]

export default function HowItWorks() {
  return <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">A simple journey</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Get started in three steps</h2></div>
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {steps.map(({ icon: Icon, number, title, text }) => <div key={number} className="relative rounded-2xl border border-slate-200 bg-white p-7">
        <div className="flex items-center justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={22} /></div><span className="text-3xl font-black text-slate-100">{number}</span></div>
        <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
      </div>)}
    </div>
  </section>
}
