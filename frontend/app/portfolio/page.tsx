import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Portfolio from '@/components/Portfolio/Portfolio'
import WantToKnowMore from '@/components/WantToKnowMore/WantToKnowMore'
import React from 'react'

const page = () => {
  return (
    <main className="home-page position-relative">
      <Header />
      <Portfolio />
      <WantToKnowMore />
      <Footer />
    </main>
  )
}

export default page