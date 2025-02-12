import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalPrice } from '../../redux/slices/cartSlice'

export const BillInfo = () => {

    const cartData = useSelector(state => state.cart);
    const total = useSelector(getTotalPrice);
    const taxRate = 4.25;
    const tax = (total * taxRate) / 100;
    const totalPriceWithTax = total + tax;
  return (
    <>
        <div className='flex item-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Total</p>
            <h1 className='text-[#f5f5f5] text-md font-blod'>LKR {total.toFixed(2)}</h1>
        </div>
        <div className='flex item-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Tax(4.25%)</p>
            <h1 className='text-[#f5f5f5] text-md font-blod'>LKR {tax.toFixed(2)}</h1>
        </div>
        <div className='flex item-center justify-between px-5 mt-2'>
            <p className='text-xs text-[#ababab] font-medium mt-2'>Net Price</p>
            <h1 className='text-[#f5f5f5] text-md font-blod'>LKR {totalPriceWithTax.toFixed(2)}</h1>
        </div>
        <div className='flex items-center gap-2 px-5 mt-4'>
            <button className='bg-[#1f1f1f] px-4 py-1 w-full rounded-lg text-[#ababab]
            font-semibold'>Cash</button>
            <button className='bg-[#1f1f1f] px-4 py-1 w-full rounded-lg text-[#ababab]
            font-semibold'>Online</button>
        </div>
        <div className='flex items-center gap-2 px-5 mt-4'>
            <button className='bg-[#1018b1] px-4 py-2 w-full rounded-lg text-[#ababab]
            font-semibold text-m'>Print Recipt</button>
            <button className='bg-[#f6b100] px-4 py-2 w-full rounded-lg text-[#1f1f1f]
            font-semibold text-m'>Place Order</button>
        </div>
    </>
  )
}
