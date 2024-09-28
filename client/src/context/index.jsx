import {useContext,createContext} from "react";
import {useContract,useContractWrite,useAddress,useMetamask, useBalance} from "@thirdweb-dev/react"
import {ethers} from "ethers";

const StateContext = createContext();


export const StateContextProvider = ({children}) => {
    const {contract} = useContract(import.meta.env.VITE_CONTRACT);
    const {mutateAsync: createFundRaiser} = useContractWrite(contract,'createFundRaiser');
    const {mutateAsync: createRequest} = useContractWrite(contract,'createRequest');
    const {mutateAsync: approveRequest} = useContractWrite(contract,'approveRequest');
    const {mutateAsync: finalizeRequest} = useContractWrite(contract,'finalizeRequest');

    const address = useAddress();
    const connect = useMetamask();
    const {data} = useBalance();

    const publishFundRaiser = async (form) => {
        try{
            const data = await createFundRaiser({
                args:[
                    address,
                    form.title,
                    form.description,
                    form.target,
                    new Date(form.deadline).getTime(),
                    form.image
                ]
            });

            console.log("contract call success",data);
        }
        catch(error){
            console.log("contract call fail",error);
        }

    }

    const getFundRaisers = async () => {
       const fundRaisers = await contract.call('getFundRaisers');
        
       const parsedFundRaisers = fundRaisers.map((fundRaiser,index) => ({
            owner: fundRaiser.owner,
            title: fundRaiser.title,
            description: fundRaiser.description,
            target: ethers.utils.formatEther(fundRaiser.target.toString()),
            deadline: fundRaiser.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(fundRaiser.amountCollected.toString()),
            image: fundRaiser.image,
            pId: index
       }))
    
       return parsedFundRaisers;
    }

    const getUserFundRaisers = async () => {
        const allFundRaisers = await getFundRaisers();
    
        const filteredFundRaisers = allFundRaisers.filter((fundRaiser) => fundRaiser.owner === address);
    
        return filteredFundRaisers;
    }

    const getDonatedFundRaisers = async () => {

        const fundRaisers = await getFundRaisers();

        const donatorFundRaisers = await Promise.all(fundRaisers.map(async (fr, index) => {
            const donators = await getDonators(index);
            return donators.includes(address) ? fr : null;
        }));

        return donatorFundRaisers.filter(fr => fr !== null);
    }

    const donate = async (pId, amount) => {
        try{
            const data = await contract.call('donateToFundRaiser', [pId], { value: ethers.utils.parseEther(amount)});
            return data
        }
        catch(error){
            console.log(error)
        }
    }

    const getDonators = async (pId) => {
        const donators = await contract.call('getDonators', [pId]);
        return donators;
    }

    const newRequest = async (form) => {
        try{
            const data = await createRequest({
                args:[
                    form.pId,
                    form.description,
                    form.value,
                    form.recipient
                ]
            });

            console.log("request call success",data);
        }
        catch(error){
            console.log("request call fail",error);
        }
    }

    const getRequests = async (pId,user) => {
        const requests = await contract.call('getRequests', [pId,user]);
        const parsedRequests = requests.map((request,index) => ({
                description: request.description,
                value: ethers.utils.formatEther(request.value.toString()),
                recipient: request.recipient,
                complete: request.complete,
                approvalCount: request.approvalCount.toNumber(),
                userApprovalStatus: request.userApprovalStatus,
                requestIndex: index
        }))
        
        return parsedRequests;
    }

    const approve = async (pId,requestIndex) => {
        try{
            const data = await approveRequest({
                args:[
                    pId,
                    requestIndex
                ]
            });

            console.log("request call success",data);
        }
        catch(error){
            console.log("request call fail",error);
        }
    }

    const finalize = async (pId,requestIndex) => {
        try{
            const data = await finalizeRequest({
                args:[
                    pId,
                    requestIndex
                ]
            });

            console.log("request call success",data);
        }
        catch(error){
            console.log("request call fail",error);
        }
    }

    const getBalance = async (pId) => {
        const balance = await contract.call('getFundRaiserBalance', [pId]);
        return ethers.utils.formatEther(balance.toString())
    }

    return(
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            data,
            createFundRaiser : publishFundRaiser,
            getFundRaisers,
            getDonators,
            donate,
            createRequest : newRequest,
            getRequests,
            approveRequest: approve,
            finalizeRequest: finalize,
            getBalance,
            getUserFundRaisers,
            getDonatedFundRaisers
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);