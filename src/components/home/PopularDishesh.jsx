import React from 'react'
import {popularDishes} from '../../constrants/index'

export const PopularDishesh = () => {
  return (
    <div className='mt-6 pr-6'>
        <div className='bg-[#1a1a1a] w-full rounded-lg'>
            <div className='flex justify-between items-center mr-5 ml-5 px-6 py-4 rounded-lg'>
                <h1 className='text-[#f5f5f5] text-lg font-semibold'>Popular Dishes</h1>
                <a href="" className='text-[#025cca] text-5m font-semibold'>View all</a>
            </div>
        </div>
        <div className='overflow-y-scroll h-[510px] no-scrollbar'>
            {
                popularDishes.map((dish) => {
                    return(
                        <div key={dish.id} className='flex item-center gap-4 
                        bg-[#1f1f1f] rounded-lg px-6 py-4 mt-4 mx-6'>
                            <h1 className='text-[#f5f5f5] font-bold'>{dish.id < 10 ? `0${dish.id}` : dish.id}</h1>
                            <img 
                                src={dish.image} 
                                alt={dish.name} 
                                className='w-[50px] h-[50px] rounded-lg' />
                            <div>
                                <h1 className='text-[#f5f5f5] font-semibold tracking-wide mt-1'>{dish.name}</h1>
                                <p className='text-[#f5f5f5] text-5m font-semibold mt-1'><span className='text-[#ababab]'>orders : </span>{dish.numberOfOrders}  </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
