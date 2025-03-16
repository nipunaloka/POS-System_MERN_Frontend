import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/web-hosting.png"
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { logout } from '../../http';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../redux/slices/userSlice';
import { MdDashboard } from 'react-icons/md';

const Header = () => {

    const userData = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const logoutMutaion = useMutation({
        mutationFn: () => logout(),
        onSuccess: (data) => {
            console.log(data);
            dispatch(removeUser());
            navigate('/auth');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const handleLogout = () => {
        logoutMutaion.mutate();
    };

  return (
    <header className='flex justify-between items-center py-4 px-8 bg-[#1a1a1a]'>
        {/*LOGO*/}
        <div onClick={()=> navigate('/')} className='flex items-center gap-2 cursor-pointer'>
            <img src={logo} alt="restro logo" className='h-8 w-8'/>
            <h1 className='text-lg font-semibold text-[#f5f5f5]'>Restor</h1>
        </div>

        {/*search*/}
        <div className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 '>
            <FaSearch className='flex  right-3 top-3 items-center gap-2 ' />
            <input 
                type="text"
                placeholder='Search'
                className='bg-[#1f1f1f] outline-none text-[#f5f5f5] '
            />
        </div>

        {/*Logged USER Details*/}
        <div className='flex items-center gap-4'>
            {
                userData.role === 'Admin' && (
                    <div onClick={() => navigate('/dashboard')} className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
                     <MdDashboard className='text-[#f5f5f5] text-2xl'/>
                    </div>
                )
            }
            <div className='bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer'>
                <FaBell className='text-[#f5f5f5] text-2xl'/>
            </div>
            <div className='flex items-center gap-3 cursor-pointer'>
                <FaUserCircle className='text-[#f5f5f5] text-4xl'/>
                <div className='flex flex-col items-start'>
                    <h1 className='text-md  text-[#f5f5f5]'>{userData.name || 'N/A'}</h1>
                    <p className='text-xs text-[#fbfbfb]'>{userData.role || 'Role'}</p>
                </div>
                <IoLogOut onClick={handleLogout} className='text-[#f5f5f5] ml-2'size={40}/>
            </div>
        </div>
    </header>
  )
}

export default Header