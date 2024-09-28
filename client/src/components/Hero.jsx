import React from 'react'
import { useNavigate } from 'react-router-dom'
import CustomButton from './CustomButton'

const Hero = () => {

  const navigate = useNavigate()

  return (
    <section className='md:w-[40%] text-center md:text-left py-4'>
        <h2 className='text-2xl font-semibold text-slate-700'>Securing and Streamlining CrowdFunding using Blockchain <span className='text-2xl'>👏</span></h2>
        <CustomButton btnType="button" text="Start Raising" handleClick={() => navigate('create-fundraiser')} styles="mt-4" />
    </section>
  )
}

export default Hero