import React, { useEffect, useState } from 'react'
import FundRaiser from './FundRaiser'
import {useStateContext} from "../context";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from "react-icons/ai";


const FundRaisers = () => {

  const [fundRaisers,setFundRaisers] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const {address,contract,getFundRaisers} = useStateContext();

  const navigate = useNavigate();

  const fetchFundRaisers = async () => {
    setIsLoading(true);
    const data = await getFundRaisers();
    setFundRaisers(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchFundRaisers();
  },[address,contract])

  function handleNavigate(fundRaiser){
    navigate(`/fundraiser-details/${fundRaiser.title}`,{state: fundRaiser})
  }

  return (
    <section id='fund' className='mt-10'>
        <h2 className='text-2xl font-semibold text-slate-700 mb-8'>- Fund</h2>

        {isLoading && (
          <AiOutlineLoading className="w-8 h-8 animate-spin" />
        )}

        {!isLoading && fundRaisers.length === 0 && (
          <p>You have not created any Fund Raisers yet</p>
        )}

        {!isLoading && fundRaisers.length > 0 && (
          <div className='flex flex-row flex-wrap justify-center sm:justify-normal gap-6'>
            {fundRaisers.map(fundRaiser => (
              <FundRaiser key={fundRaiser.pId} {...fundRaiser} handleClick={() => handleNavigate(fundRaiser)} />
            ))}
          </div>
        )}
    </section>
  )
}

export default FundRaisers