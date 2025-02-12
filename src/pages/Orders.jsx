import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton'

const Orders = () => {

  const [status, setStatus] = useState("all");

  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden'>
        <div className='flex items-center justify-between px-8 py-4 mt-2' >
            <div>
            <BackButton/>
            </div>
            <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wider'>Orders</h1>
            <div className='flex items-center justify-around gap-4'>
                <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg  ${status == "all" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>All</button>
                <button onClick={() => setStatus("Progress")} className={`text-[#ababab] text-lg  ${status == "Progress" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>In Progress</button>
                <button onClick={() => setStatus("ready")} className={`text-[#ababab] text-lg  ${status == "ready" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>Ready</button>
                <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg  ${status == "completed" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>Completed</button>
            </div>
        </div>

        <div className='flex flex-wrap gap-4 px-10 py-2 h-[510px] overflow-y-scroll no-scrollbar'>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
        <BottomNav/>
    </section>
  )
}

export default Orders