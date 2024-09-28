import React from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import FundRaisers from '../components/FundRaisers'

const Home = () => {
  return (
    <main className='p-4 max-w-[1280px] mx-auto'>
        <Hero />
        <FundRaisers />
        <HowItWorks />
    </main>
  )
}

export default Home