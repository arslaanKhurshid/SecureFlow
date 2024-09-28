import {useState,useEffect} from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom"
import { useStateContext } from '../context';
import { daysLeft,getEthPrice,calculateBarPercentage } from '../utils';
import Loader from '../components/Loader';
import CustomButton from '../components/CustomButton';

const FundRaiserDetails = () => {

  const { state } = useLocation();

  const navigate = useNavigate()
  const {id} = useParams()

  const {donate,contract,address,getBalance} = useStateContext()

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [ethPrice,setEthPrice] = useState(0);

  const remainingDays = daysLeft(state.deadline);
  const percentage = calculateBarPercentage(state.target,state.amountCollected);
  const balanceToInr = (Math.round(balance*ethPrice)).toLocaleString("en-IN");
  const targetInInr = (Math.round(state.target*ethPrice)).toLocaleString("en-IN");

  useEffect(() => {
    async function fetchEthPrice(){
      const ethPrice = await getEthPrice();
      setEthPrice(ethPrice);
    }
    fetchEthPrice();
  },[]);

  const getCurrentBalance = async () => {
    const balance = await getBalance(state.pId)
    setBalance(balance)
  }

  useEffect(() => {
    if(contract){
      getCurrentBalance();
    }
  }, [contract, address])

  const handleDonate = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  const viewRequests = () => {
    navigate(`/fundraiser-details/${id}/requests`,{state: state})
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className='p-4 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 xs:justify-items-center md:justify-items-start gap-4 md:content-between mb-4'>
        <div className='max-w-[500px]'>
          <img className='h-[250px] w-full rounded-md object-cover mb-4' src={state.image} alt="fund-image" />
          <h1 className='text-3xl font-semibold'>{state.title}</h1>
          <p className='text-gray-500 mt-4'>{state.description}</p>
          <h3 className='mt-4 font-medium text-lg'>Creator</h3>
          <p className='truncate text-gray-400 text-md'>{`by ${state.owner}`}</p>
        </div>

        <div className='space-y-4 w-full md:justify-self-end max-w-[500px]'>
          <div className='p-4 form-shadow rounded-md'>
            <p className='font-semibold text-xl'>FundRaiser Balance</p>
            <p className='text-lg font-semibold mt-2'>{balance} ETH<span className='text-gray-400 text-xs font-normal ml-1'>(<span className='font-logo'>&#8377; </span>{balanceToInr})</span></p>
            <p className='text-gray-400 text-xs font-semibold'>Funded of {state.target} ETH<span className='font-normal ml-1'>(<span className='font-logo'>&#8377; </span>{targetInInr})</span></p>
            <div className='relative bg-[#EDF6ED] h-[6px] rounded-full my-2'>
              <div className={`absolute bg-primary h-full rounded-full`} style={{width :`${percentage}%`,maxWidth: '100%'}}></div>
            </div>
            <p className='text-primary'>{remainingDays} days left</p>
          </div>

          <div className='p-4 form-shadow rounded-md'>
            <h2 className='font-semibold text-xl'>Contribute Now!</h2>
            <form onSubmit={handleDonate} className='mt-2'>
              <p className='text-md text-gray-500'>Amount in Ether you want to contribute</p>
              <input className='mt-1 outline-none border rounded-md p-2 border-gray-200 placeholder:text-gray-400 w-full' step="0.01" required placeholder='0.05 ETH' onChange={(e) => setAmount(e.target.value)} type="number" />
              <CustomButton disabled={address === state.owner || !address} text="Contribute" btnType="submit" styles="mt-2 w-full" />
            </form>
          </div>
          <div className='p-4 form-shadow rounded-md'>
            <CustomButton handleClick={viewRequests} text="View Fund Requests" styles="w-full"/>
            <p className='text-xs text-gray-500 mt-2'>* You can see where these funds are being used & if you have contributed you can also approve the Fund Requests</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default FundRaiserDetails