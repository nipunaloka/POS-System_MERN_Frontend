import React from 'react'
import BottomNav from '../components/shared/BottomNav'
import Greeting from '../components/home/Greeting'
import MiniCard from '../components/home/MiniCard'
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import RecentOrders from '../components/home/RecentOrders';
import { PopularDishesh } from '../components/home/PopularDishesh';


const Home = () => {
  return (
    <section className='bg-[#1f1f1f] h-[calc(100vh-6rem)] overflow-hidden flex gap-3'>
        {/*Left Div*/}
        <div className='flex-[3] bg-[#1a1a1]'>
            <Greeting/>
            <div className='flex items-center w-full gap-3 px-8 mt-8'>
                <MiniCard title="Total Earning" icon={<BsCashCoin />} number={512} footernum={1.6}/>
                <MiniCard title="In Progress" icon={<GrInProgress />} number={512} footernum={3.6}/>
            </div>
            <RecentOrders/>
        </div>
         {/*Right Div*/}
        <div className='flex-[2] bg-[#1a1a1a]'>
            <PopularDishesh/>
        </div>
       <BottomNav/>
    </section>
    
  )
}

export default Home