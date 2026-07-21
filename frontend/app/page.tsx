'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import TrendingSection from '@/components/TrendingSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        <TrendingSection />
      </main>
      <Footer />
    </>
  )
}
