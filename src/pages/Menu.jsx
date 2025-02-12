import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import BackButton from '../components/shared/BackButton'
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import MenuContainer from '../components/menu/MenuContainer';
import CustomerInfo from '../components/menu/CustomerInfo';
import CartInfo from '../components/menu/CartInfo';
import { BillInfo } from '../components/menu/BillInfo';
import { useSelector } from 'react-redux';

const Menu = () => {
    const customerData = useSelector(state => state.customer);

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3'>
        {/*Left Div*/}
        <div className='flex-[4] bg-[#1a1a1]'>
            <div className='flex items-center justify-between px-10 py-4 mt-4' >
            <div>
            <BackButton/>
            </div>
            <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Menu</h1>
            <div className='flex items-center justify-around gap-4'>
                <div className='flex items-center gap-3 cursor-pointer'>
                    <BsFillFileEarmarkPersonFill className='text-[#f5f5f5] text-4xl'/>
                    <div className='flex flex-col items-start'>
                        <h1 className='text-md  text-[#f5f5f5]'>{customerData.customerName || "Customer Name"}</h1>
                        <p className='text-xs text-[#fbfbfb]'>{customerData.tableNo || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div >
        <MenuContainer/>
        </div>
         {/*Right Div*/}
        <div className='flex-[1] bg-[#1a1a1a] mt-4 mr-3 rounded-lg pt-2 h-[575px] '>
            {/*customer Info Div*/}
            <CustomerInfo/>
            <hr className='border-[#2a2a2a] border-t-2'/>
            {/*Cart Item Div*/}
            <CartInfo/>
            <hr className='border-[#2a2a2a] border-t-2'/>
            {/*Bill Item Div*/}
            <BillInfo/>
        </div>
        
        <BottomNav/>
    </section>
  )
}

export default Menu