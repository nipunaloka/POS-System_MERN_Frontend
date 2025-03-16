import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import { addTable } from '../../http';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

const Modal = ({setIsTableModalOpen}) => {

    const [tableData, setTableData] = useState({
        tableNo: '',
        seats: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTableData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tableData);
        tableMutaion.mutate(tableData);
    }

    const handleCloseModal = () => {
        setIsTableModalOpen(false)
    }

    const tableMutaion = useMutation({
        mutationFn: (reqData) => addTable(reqData),
        onSuccess: (res) => {
            setIsTableModalOpen(fasle);
            const {data } = res;
            enqueueSnackbar(data.message, {variant: 'Sucess'});
        },
        onError: (error) => {
            const { data } = error.response;
            enqueueSnackbar(data.message, {variant: 'error'});
            console.log(error);
        }
    })

  return (
    <div className='fixed inset-0 bg-black bg-opacity-custom flex items-center justify-center z-50'>
        <motion.div 
            initial={{opacity:0, scale: 0.9}}
            animate={{opacity:1, scale: 1}}
            exit={{opacity:0, scale:0.9}}
            transition={{duration:0.3, ease: 'easeInOut'}}
            className='bg-[#262626] p-6 rounded-lg shadow-lg w-96'
        >
            {/*Moal Header*/}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#f5f5f5] text-xl font-semibold'>
                    Add Table
                </h2>
                <button onClick={handleCloseModal} className='text-[#f5f5f5] hover:text-red-500'>
                    <IoMdClose size={24}/>
                </button>

            </div>

            {/* Modal Body */}

            <form onSubmit={handleSubmit} className='space-y-4 mt-10'>
            <div>
                <label className='block text-[#ababab] mt-3 mb-2 text-sm font-medium'> 
                    Table Number 
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input type="number"
                        name='tableNo'
                        value={tableData.tableNo}
                        onChange={handleInputChange}
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required />
                </div>
            </div>
            <div>
                <label className='block text-[#ababab] mt-3 mb-2 text-sm font-medium'> 
                    Number of Seats 
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input type="number"
                        name='seats'
                        value={tableData.seats}
                        onChange={handleInputChange}
                        className='bg-transparent flex-1 text-white focus:outline-none'
                        required />
                </div>
            </div>
            <button  type='sumbit' className='w-full  rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'>
                Add Table
            </button>
            </form>

        </motion.div>
        
    </div>
  )
}

export default Modal