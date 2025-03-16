import React, { useEffect, useRef } from 'react'
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { FaNotesMedical } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/slices/cartSlice';
const CartInfo = () => {
    const cartData = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const scrollRef = useRef();

    const handleRemove = (itemId) => {
        dispatch(removeItem(itemId));
    }
    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [cartData])

  return (
    <div className='px-4 py-2'>
                <h1 className='text-[#e4e4e4] text-lg font-semibold tracking-wide'>Order Details</h1>
                <div className='mt-4 overflow-y-scroll no-scrollbar h-[165px] ' ref={scrollRef}>
                    {cartData.length === 0 ? (
                        <p className='text-[#ababab] text-sm flex justify-center px-3 items-center h-[160px]'>Your cart is empty. start Adding items!</p>
                    ): cartData.map((item) => {
                        return (
                            <div className='bg-[#1f1f1f] rounded-lg px-4 py-2 mb-2'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='text-[#ababab] font-semibold tracking-wider text-md'>{item.name}</h1>
                                    <p className='text-[#ababab] font-semibold'>x{item.quantity}</p>
                                </div>
                                <div className='flex items-center justify-between mt-3'>
                                    <div className='flex items-center gap-3'>
                                        <RiDeleteBack2Fill 
                                        onClick={() => handleRemove(item.id)}
                                        className='text-[#ababab] cursor-pointer' size={20}/>
                                        <FaNotesMedical className='text-[#ababab] cursor-pointer' size={20}/>
                                    </div>
                                    <p className='text-[#f5f5f5] text-md font-bold'>LKR:{item.price}</p>
                                </div>
                            </div>
   
                        )
                    })}
                    
                </div>
            </div>
  )
}

export default CartInfo