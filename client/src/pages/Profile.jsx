import React, { useEffect, useState } from 'react'
import {useStateContext} from "../context";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from "react-icons/ai";
import FundRaiser from '../components/FundRaiser';

const Profile = () => {

  const [createdFundRaisers,setCreatedFundRaisers] = useState([]);
  const [donatedFundRaisers,setDonatedFundRaisers] = useState([]);
  const [createdLoading,setCreatedLoading] = useState(false);
  const [donatedLoading,setDonatedLoading] = useState(false);

  const {address,contract,getUserFundRaisers,getDonatedFundRaisers} = useStateContext();

  const navigate = useNavigate();

  const fetchCreatedFundRaisers = async () => {
    setCreatedLoading(true);
    const data = await getUserFundRaisers();
    setCreatedFundRaisers(data);
    setCreatedLoading(false);
  }

  const fetchDonatedFundRaisers = async () => {
    setDonatedLoading(true);
    const data = await getDonatedFundRaisers();
    setDonatedFundRaisers(data);
    setDonatedLoading(false);
  }

  useEffect(() => {
    if(contract){
        fetchCreatedFundRaisers();
        fetchDonatedFundRaisers();
    }
  },[address,contract])

  function handleNavigate(fundRaiser){
    navigate(`/fundraiser-details/${fundRaiser.title}`,{state: fundRaiser})
  }

  return (
    <section className='p-4 mb-7 max-w-[1280px] mx-auto w-full'>
        <h2 className='text-2xl font-semibold text-slate-700 mb-8'>- Created</h2>

        {createdLoading && (
          <AiOutlineLoading className="w-8 h-8 animate-spin" />
        )}

        {!createdLoading && createdFundRaisers.length === 0 && (
          <p>You have not created any Fund Raisers yet</p>
        )}

        {!createdLoading && createdFundRaisers.length > 0 && (
          <div className='flex flex-row flex-wrap justify-center sm:justify-normal gap-6'>
            {createdFundRaisers.map(fundRaiser => (
              <FundRaiser key={fundRaiser.pId} {...fundRaiser} handleClick={() => handleNavigate(fundRaiser)} />
            ))}
          </div>
        )}

        <h2 className='text-2xl font-semibold text-slate-700 my-8'>- Contributed</h2>

        {donatedLoading && (
          <AiOutlineLoading className="w-8 h-8 animate-spin" />
        )}

        {!donatedLoading && donatedFundRaisers.length === 0 && (
          <p>You have not contributed any Fund Raisers yet</p>
        )}

        {!donatedLoading && donatedFundRaisers.length > 0 && (
          <div className='flex flex-row flex-wrap justify-center sm:justify-normal gap-6'>
            {donatedFundRaisers.map(fundRaiser => (
              <FundRaiser key={fundRaiser.pId} {...fundRaiser} handleClick={() => handleNavigate(fundRaiser)} />
            ))}
          </div>
        )}
    </section>
  )
}

export default Profile