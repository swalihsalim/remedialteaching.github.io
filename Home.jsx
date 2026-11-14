import Navbar from '../components/common/Navbar.jsx'
import Footer from '../components/common/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import Features from '../components/home/Features.jsx'
import Courses from '../components/home/Courses.jsx'
import HowItWorks from '../components/home/HowItWorks.jsx'
import Button from '../components/common/Button.jsx'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return <>
    <Navbar />
    <main>
      <Hero />
      <Features />
      <Courses />
      <HowItWorks />
      <section className="px-5 pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-slate-950 px-7 py-10 text-white sm:px-12 sm:py-14 md:flex-row md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-blue-300">Your next chapter starts here</p><h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">Build a learning habit that lasts.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">Create your account and get ready to organise your learning journey.</p></div>
          <Button to="/register" className="shrink-0 bg-white text-slate-900 shadow-none hover:bg-blue-50">Get started <ArrowRight size={17} /></Button>
        </div>
      </section>
    </main>
    <Footer />
  </>
}
