import axios from "axios";

export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return Math.round(remainingDays);
  };
  
export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const getEthPrice = async () => {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr&x_cg_demo_api_key=CG-qbJHRUVSF1qDh2bk1V7aTGp9';
  try{
    const response = await axios.get(url);
    return response.data.ethereum.inr;
  }
  catch(error){
    console.error(error);
  }
}