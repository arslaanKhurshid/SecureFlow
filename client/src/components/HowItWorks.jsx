import React, { useState } from 'react'
import { howItWorks } from '../constants'

const HowItWorks = () => {

  const [active,setActive] = useState(1);

  return (
    <section id='howitworks' className='my-10'>
      <h2 className='text-2xl font-semibold text-slate-700'>- How it works</h2>
      <div className='mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10'>
        {howItWorks.map(card => (
          <div className={`group px-4 space-y-2 py-4 rounded-t-[4px] cursor-pointer border-t-4 hover:border-t-primary ${active === card.id ? "border-t-primary" : ""} transition-colors duration-300 card-shadow`} onClick={() => setActive(card.id)} key={card.id}>
            <h3 className={`text-lg font-semibold group-hover:text-primary ${active === card.id ? "text-primary" : ""} transition-colors duration-300 `}>{`0${card.id}`}</h3>
            <h3 className={`text-lg font-semibold group-hover:text-primary ${active === card.id ? "text-primary" : ""} transition-colors duration-300 `}>{card.title}</h3>
            <p className='text-[13px]'>{card.content}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks