import React from 'react'
import { useState } from 'react';
import { IoMenuSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { navlinks } from '../constants';
import {Link} from "react-router-dom"
import CustomButton from './CustomButton';
import { useNavigate } from 'react-router-dom';
import {useStateContext} from "../context"

const NavBar = () => {

    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState("");

    const {address,connect,data} = useStateContext();

    const navigate = useNavigate();

    function handleClick(id){
        setActive(id);
        setToggle(t => !t);
    }
  return (
    <header className='w-full p-4 md:p-6 flex justify-between items-center max-w-[1280px] mx-auto'>
        <div className='flex items-end gap-4'>
            <h1 onClick={() => navigate('/')} className='text-primary text-3xl font-bold font-logo cursor-pointer leading-none pr-4 md:border-r-2 border-r-primary'>SecureFlow</h1>

            {/* desktop nav */}            
            <ul className='hidden md:flex gap-4 leading-none'>
                {navlinks.map(navlink => (
                    <li className={`${active === navlink.id ? "text-black" : "text-gray-500"} hover:text-black cursor-pointer transition-colors duration-300`} key={navlink.name}><Link onClick={() => handleClick(navlink.id)} to={`/${navlink.id}`}>{navlink.name}</Link></li>
                ))}
            </ul>
        </div>

        <IoMenuSharp className={`${toggle ? "hidden" : "block"} md:hidden  w-9 h-9 cursor-pointer`} onClick={() => setToggle(t => !t)} />
        <AiOutlineClose className={`${toggle ? "block" : "hidden"} md:hidden w-9 h-9 cursor-pointer z-[10000]`} onClick={() => setToggle(t => !t)}/>

        {/* mobile nav */}

        <ul className={`md:hidden ${toggle ? "translate-x-0" : "translate-x-full"} fixed top-0 right-0 bg-white text-lg pt-24 px-6 w-[70vw] h-[100vh] space-y-4 z-[9999] transition-transform duration-300`}>
            {navlinks.map(navlink => (
                <li className={`${active === navlink.id ? "text-black" : "text-gray-500"} hover:text-black cursor-pointer transition-colors duration-300`} key={navlink.name}><Link onClick={() => handleClick(navlink.id)} to={`/${navlink.id}`}>{navlink.name}</Link></li>
            ))}
            <li>
                <CustomButton btnType="button" text="Connect Wallet" styles="w-full" />
            </li>
        </ul>

        {/* overlay */}
        <div className={`${toggle ? "block" : "hidden"} md:hidden absolute inset-0 bg-gray-500/50`}></div>

        <CustomButton handleClick={() => {
            if(address){
                navigate(`/users/${address}`)
            }
            else{
                connect()
            }
        }} btnType="button" text={address ? address : "Connect Wallet"} styles="hidden md:block truncate max-w-[155px]" />


    </header>
  )
}

export default NavBar