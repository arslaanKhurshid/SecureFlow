import React from 'react'

const FormField = ({labelName,inputType,placeholder,step,value,handleChange,isTextArea}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label>{labelName}</label>
        {isTextArea ? (
            <textarea className='outline-none border rounded-md p-2 border-gray-200' required placeholder={placeholder} value={value} onChange={handleChange} />
        ) : (
            <input className='outline-none border rounded-md p-2 border-gray-200 placeholder:text-gray-400' required step={step} placeholder={placeholder} type={inputType} value={value} onChange={handleChange} />
        )}
    </div>
  )
}

export default FormField