import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className='bg-[#025ccb] p-2 text-xl font-bold rounded-lg text-white'>
        <IoMdArrowRoundBack />
    </button>
  )
}

export default BackButton


