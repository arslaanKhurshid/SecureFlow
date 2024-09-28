import React, { useEffect, useState } from 'react'

import {daysLeft,calculateBarPercentage,getEthPrice} from "../utils"

const FundRaiser = ({owner,title,description,target,deadline,amountCollected,image,handleClick}) => {

  const remainingDays = daysLeft(deadline);
  const percentage = calculateBarPercentage(target,amountCollected);

  const [ethPrice,setEthPrice] = useState(0);

  useEffect(() => {
    async function fetchEthPrice(){
      const ethPrice = await getEthPrice();
      setEthPrice(ethPrice);
    }
    fetchEthPrice();
  },[]);

  const amountCollectedInInr = (Math.round(amountCollected*ethPrice)).toLocaleString("en-IN");
  const targetInInr = (Math.round(target*ethPrice)).toLocaleString("en-IN");

  return (
    <div className='p-4 bg-white card-shadow border border-gray-200 max-w-[345px]'>
      <div>
        <img className='h-[200px] w-full object-cover' src={image} alt="fund-image" />
      </div>
      <h4 className='font-semibold text-lg mt-4 sm:truncate'>{title}</h4>
      <p className='text-xs text-gray-400 mt-1 mb-4 break-all sm:break-normal sm:truncate'>by <span className='text-black font-medium'>{owner}</span></p>
      <div className='pt-2 flex justify-between border-t-2 border-t-gray-100 text-sm'>
        <p className='font-medium'>Raised</p>
        <div className='flex gap-2'>
          <p className=''>{percentage}%</p>
          <p className='text-primary'>{remainingDays} days left</p>
        </div>
      </div>
      <div className='relative bg-[#EDF6ED] h-[6px] rounded-full my-2'>
        <div className={`absolute bg-primary h-full rounded-full`} style={{width :`${percentage}%`,maxWidth: '100%'}}></div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='text-lg font-semibold'>{amountCollected} ETH<span className='text-gray-400 text-xs font-normal ml-1'>(<span className='font-logo'>&#8377; </span>{amountCollectedInInr})</span></p>
          <p className='text-gray-400 text-xs font-semibold'>Funded of {target} ETH<span className='font-normal ml-1'>(<span className='font-logo'>&#8377; </span>{targetInInr})</span></p>
        </div>
        <button onClick={handleClick} className='px-6 py-2 border rounded-full text-primary font-medium hover:bg-primary/5 transition-colors duration-300'>Fund</button>
      </div>
    </div>
  )
}

export default FundRaiser