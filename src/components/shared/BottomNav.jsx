import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { SiClickup } from "react-icons/si";
import { LiaTableSolid } from "react-icons/lia";
import { IoIosMore } from "react-icons/io";
import { HiMiniBellAlert } from "react-icons/hi2";
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useDispatch } from 'react-redux'
import { setCustomer } from '../../redux/slices/customerSlice';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [name, setName]= useState();
  const [phone, setPhone] = useState();

  const increament = () => {
    if(guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  }
  const decreament = () => {
    if(guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  }

  const isActive = (path) => location.pathname === path;

  const handleCrateOrder = () => {
    dispatch(setCustomer({name, phone, guests: guestCount}));
    navigate('/tables');
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>
        <button onClick={() => navigate("/")} className={`flex items-center justify-center font-bold ${isActive('/') ? 'text-[#f5f5f5]  bg-[#343434]' : 'text-[#ababab]'}  w-[200px] rounded-2xl`}><FaHome className='inline mr-4' size={15} />Home</button>
        <button onClick={() => navigate("/orders")} className={`flex items-center justify-center font-bold ${isActive('/orders') ? 'text-[#f5f5f5]  bg-[#343434]' : 'text-[#ababab]'}  w-[200px] rounded-2xl`}><SiClickup className='inline mr-4' size={15} />Orders</button>
        <button onClick={() => navigate("/tables")} className={`flex items-center justify-center font-bold ${isActive('/tables') ? 'text-[#f5f5f5]  bg-[#343434]' : 'text-[#ababab]'}  w-[200px] rounded-2xl`}><LiaTableSolid className='inline mr-4' size={15}/>Tables</button>
        <button onClick={() => navigate("/more")} className={`flex items-center justify-center font-bold ${isActive('/more') ? 'text-[#f5f5f5]  bg-[#343434]' : 'text-[#ababab]'}  w-[200px] rounded-2xl`}><IoIosMore className='inline mr-4' size={15}/>More</button>
        <button 
          disabled = {isActive("/tables") || isActive("/menu")}
          onClick={openModal} className='absolute bottom-7 bg-[#f68100] text-[#f5f5f5] rounded-full p-2 items-center'><HiMiniBellAlert size={35}/></button>
        
        <Modal isOpen={isModalOpen} onclose={closeModal} title="Create Order">
          <div>
            <label className='block text-[#ababab] mb-2 text-sm font-medium'>Customer Name</label>
            <div className='flex items-center border border-[#333] rounded-lg p-3 px-4 bg-[#1f1f1f]'>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder='Enter customer name'
              className='bg-transparent flex-1 text-white focus:outline-none'/>
            </div>
          </div>
          <div>
            <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>Customer Phone</label>
            <div className='flex items-center border border-[#333] rounded-lg p-3 px-4 bg-[#1f1f1f]'>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" name="" id="" placeholder='+94-777777777'
              className='bg-transparent flex-1 text-white focus:outline-none'/>
            </div>
          </div>
          <div>
            <label className='block mb-2 mt-3 text-sm font-medium text-[#ababab] px-4 py-3'>Guests</label>
            <div className='flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg'>
              <button onClick={decreament} className='text-yellow-500 text-2xl'>&minus;</button>
              <span className='text-[#f5f5f5] font-semibold'>{guestCount} Person</span>
              <button onClick={increament} className='text-yellow-500 text-2xl'>&#43;</button>
            </div>
          </div>
          <button onClick={handleCrateOrder} className='w-full bg-[#f6b100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-600'>
            Create Order
          </button>
        </Modal>

    </div>
  )
}

export default BottomNav