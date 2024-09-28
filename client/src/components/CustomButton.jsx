import React from 'react'

const CustomButton = ({text,styles,handleClick,btnType,disabled}) => {
  return (
    <button className={`${styles} bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/85 transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-500`} type={btnType} disabled={disabled} onClick={handleClick}>{text}</button>
  )
}

export default CustomButton