import React from 'react'
import { MdAlternateEmail } from "react-icons/md";
import { FaGithub,FaTwitter,FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id='aboutus' className='bg-slate-800 mt-auto'>
        <div className='text-center md:text-left space-y-2  text-gray-300 p-4 md:px-6 max-w-[1280px] mx-auto'>
            <h1 className='text-primary text-2xl font-semibold font-logo leading-none'>SecureFlow</h1>
            <div className='flex flex-col gap-2 md:flex-row md:justify-between md:items-center'>
                <p>Made with <span className='text-xl'>♥️</span> by Vinay, Arsalan, Prutvi & Vennela</p>
                <div className='flex justify-center gap-4'>
                    <a className='w-8 h-8 bg-black grid place-content-center rounded-full' href=""><MdAlternateEmail className='w-5 h-5' /></a>
                    <a className='w-8 h-8 bg-black grid place-content-center rounded-full' href=""><FaGithub className='w-5 h-5' /></a>
                    <a className='w-8 h-8 bg-black grid place-content-center rounded-full' href=""><FaTwitter className='w-5 h-5' /></a>
                    <a className='w-8 h-8 bg-black grid place-content-center rounded-full' href=""><FaInstagram className='w-5 h-5' /></a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer