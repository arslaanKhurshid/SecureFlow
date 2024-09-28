import React, { useState } from 'react'
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';
import {useStateContext} from "../context"
import { ethers } from 'ethers';
import {checkIfImage} from "../utils";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader"

const CreateFundRaiser = () => {

  const navigate = useNavigate();
  
  const [form,setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const [isLoading,setIsLoading] = useState(false);

  const {createFundRaiser,address} = useStateContext();

  function handleFormChange(fieldName,e){
    setForm({...form,[fieldName] : e.target.value});
  }

  async function handleSubmit(e){
    e.preventDefault();
    

    checkIfImage(form.image, async (exists) => {
      if(exists){
        setIsLoading(true);
        await createFundRaiser({...form,target: ethers.utils.parseUnits(form.target,18)})
        setIsLoading(false);
        navigate('/');
      }
      else{
        alert('provide valid image url');
        setForm({...form,image: ""})
      }
    })


    setForm({
      name: '',
      title: '',
      description: '',
      target: '',
      deadline: '',
      image: '',
    })
  }

  return (
    <section className='max-w-[1280px] mx-auto w-full mt-4 mb-12 px-6'>
      {isLoading && <Loader />}
      <div className='max-w-[555px] mx-auto'>
        <h2 className='text-xl md:text-[28px] text-center md:text-left text-slate-700 font-medium mt-2 mb-4'>Create a new FundRaiser 🚀</h2>
        <form className='flex flex-col gap-4 form-shadow p-4' onSubmit={handleSubmit}>
          <FormField 
            labelName="Your Name *"
            inputType="text"
            placeholder="John Doe"
            value={form.name}
            handleChange={(e) => handleFormChange('name',e)}
          />
          <FormField 
            labelName="Fundraiser title *"
            inputType="text"
            placeholder="Enter a title"
            value={form.title}
            handleChange={(e) => handleFormChange('title',e)}
          />
          <FormField 
            labelName="Description *"
            placeholder="Describe your FundRaiser"
            value={form.description}
            handleChange={(e) => handleFormChange('description',e)}
            isTextArea={true}
          />
          <FormField 
            labelName="Target *"
            inputType="number"
            placeholder="0.5 ETH"
            step="0.1"
            value={form.target}
            handleChange={(e) => handleFormChange('target',e)}
          />
          <FormField 
            labelName="End Date *"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormChange('deadline',e)}
          />
          <FormField 
            labelName="Image URL *"
            placeholder="Place image url"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormChange('image',e)}
          />
          <CustomButton disabled={!address} text="Create New FundRaiser" styles="mt-4" btnType="submit" />
        </form>
      </div>
    </section>
  )
}

export default CreateFundRaiser