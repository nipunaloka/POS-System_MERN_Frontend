import React from 'react'
import {FaSearch} from "react-icons/fa"
import OrderList from './OrderList'

const RecentOrders = () => {
  return (
    <div className='px-8 mt-6 mb-2'>
        <div className='bg-[#1a1a1a] w-full h-[310px] rounded-lg '>
            <div className='flex justify-between items-center px-6 py-4'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold'>Recent Orders</h1>
                <a href="" className='text-[#025cca] text-5m font-semibold'>View all</a>
            </div>
            <div>
                {/*search*/}
                <div className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4  mx-6'>
                    <FaSearch className='flex items-center gap-2'/>
                    <input 
                        type="text"
                        placeholder='Search Reacent Orders'
                        className='bg-[#1f1f1f] outline-none text-[#f5f5f5]'
                    />
                </div>
            </div>
            {/*Order List */}
            <div className='mt-4 px-4 gap-6 overflow-y-scroll h-[170px] no-scrollbar'>
                <OrderList/>
                <OrderList/>
                <OrderList/>
                <OrderList/>
                <OrderList/>
                <OrderList/>
            </div>
        </div>
    </div>
  )
}

export default RecentOrders