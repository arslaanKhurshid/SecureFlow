import {useEffect, useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { useStateContext } from '../context';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import { getEthPrice} from '../utils';
import { FaCheckCircle } from "react-icons/fa";

const Requests = () => {

    const {state} = useLocation()

    const [requests,setRequests] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [donators, setDonators] = useState([]);

    const navigate = useNavigate();

    const [ethPrice,setEthPrice] = useState(0);

    useEffect(() => {
        async function fetchEthPrice(){
        const ethPrice = await getEthPrice();
        setEthPrice(ethPrice);
        }
        fetchEthPrice();
    },[]);

    const balanceInInr = (Math.round(balance*ethPrice)).toLocaleString("en-IN");
    
    const {getRequests,approveRequest,finalizeRequest,getBalance,getDonators,contract,address} = useStateContext()
    
    const fetchRequests = async () => {
        const requests = await getRequests(state.pId,address) 
        setRequests(requests)
    }

    const getCurrentBalance = async () => {
        const balance = await getBalance(state.pId)
        setBalance(balance)
    }

    const fetchDonators = async () => {
        const donators = await getDonators(state.pId)
        setDonators(donators)
    }
    useEffect(() => {
        if(contract){
            fetchRequests();
            fetchDonators();
            getCurrentBalance()
        }
    },[contract,address])

    const approve = async (requestIndex) => {
        setIsLoading(true);

        await approveRequest(state.pId, requestIndex); 

        navigate(`/fundraiser-details/${state.title}`, {state: state})
        setIsLoading(false);
    }

    const finalize = async (requestIndex) => {
        setIsLoading(true);

        await finalizeRequest(state.pId, requestIndex); 

        navigate(`/fundraiser-details/${state.title}`, {state: state})
        setIsLoading(false);
    }

    const newFundRequest = () => {
        navigate(`/fundraiser-details/${state.title}/new-request`, {state: state})
    }

  return (
    <div>
        {isLoading && <Loader />}

        <div className='p-4 max-w-[1280px] mx-auto my-7'>
            <div className='flex justify-between'>
                <button onClick={() => navigate(`/fundraiser-details/${state.title}/`,{state: state})} className='text-sm text-primary text-left'>← Back to FundRaiser</button>
                <p className='text-gray-500 text-sm'>FundRaiser Balance: <span className='font-semibold text-black text-base'>{balance} ETH</span> (<span className='font-logo'>&#8377; </span><span className='text-xs'>{balanceInInr})</span></p>
            </div>
            <div className='mt-7'>
                <div className='flex justify-between items-center gap-2'>
                    <h2 className='text-xl sm:text-3xl font-semibold truncate'>Fund Requests for <span>{state.title}</span></h2>
                    <CustomButton disabled={(address !== state.owner) || (balance == 0)} text="New Fund Request" handleClick={newFundRequest} styles="text-nowrap" />
                </div>
            </div>
            <div className='mt-6'>
                <table className='table-fixed border-collapse  w-full'>
                    <thead>
                        <tr>
                            <th className='w-[5%]  hidden sm:table-cell p-4 font-medium text-xs text-gray-600 uppercase'>id</th>
                            <th className='w-[25%] hidden sm:table-cell p-4 font-medium text-xs text-gray-600 uppercase text-left'>description</th>
                            <th className='w-[25%] sm:w-[10%] p-4 font-medium text-xs text-gray-600 uppercase text-right'>amount</th>
                            <th className='w-[20%] hidden md:table-cell p-4 font-medium text-xs text-gray-600 uppercase text-left'>recipient wallet address</th>
                            <th className='w-[25%] sm:w-[10%] p-4 font-medium text-xs text-gray-600 uppercase'>approval count</th>
                            <th className='w-[25%] sm:w-[15%] p-4 font-medium text-xs text-gray-600 uppercase'>approve</th>
                            <th className='w-[25%] sm:w-[15%] p-4 font-medium text-xs text-gray-600 uppercase'>finalize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests && requests.map(request => (
                            <tr className={`${request.complete ? "bg-gray-200 text-gray-600" : "bg-green-100"} text-sm sm:text-base`} key={request.requestIndex}>
                                <td className='p-4 hidden sm:table-cell text-center'>{request.requestIndex}</td>
                                <td className='p-4 hidden sm:table-cell break-words text-left'>{request.description}</td>
                                <td className='p-4 text-right'>{request.value}ETH<p className='text-sm'>(₹{(Math.round(request.value*ethPrice)).toLocaleString("en-IN")})</p></td>
                                <td className='p-4 hidden md:table-cell truncate text-left'>{request.recipient}</td>
                                <td className='p-4 text-center'>{request.approvalCount} / {donators.length}</td>
                                <td className='p-4 text-center'>
                                    <button disabled={!donators.includes(address)} onClick={() => approve(request.requestIndex)} className={`${request.userApprovalStatus ? "hidden" : "inline"} py-1 px-3 text-sm border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500/5 disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-transparent disabled:cursor-not-allowed`}>Approve</button>
                                    <FaCheckCircle className={`${request.userApprovalStatus ? "block" : "hidden"} mx-auto text-green-700`} />
                                </td>
                                <td className='p-2 text-center'>
                                    <button disabled={!(request.approvalCount > (donators.length / 2)) || (address !== state.owner)} onClick={() => finalize(request.requestIndex)} className={`${request.complete ? "hidden" : "inline"} py-1 px-3 text-sm border border-green-500 text-green-500 disabled:border-gray-600 disabled:text-gray-600 rounded-md hover:bg-green-500/5 disabled:hover:bg-transparent disabled:cursor-not-allowed`}>Finalize</button>
                                    <FaCheckCircle className={`${request.complete ? "block" : "hidden"} mx-auto text-green-700`} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className='mt-6 ml-6 text-sm text-gray-600'>Found {requests.length} requests</p>
            </div>
        </div>
    </div>
  )
}

export default Requests