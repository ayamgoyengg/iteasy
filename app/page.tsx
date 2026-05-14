import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  )
}
