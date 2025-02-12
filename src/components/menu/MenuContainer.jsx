import React, { useState } from 'react';
import { menus } from '../../constrants';
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addItems } from '../../redux/slices/cartSlice';

const MenuContainer = () => {
    const [selected, setSelected] = useState(menus[0]);
    const [itemCount, setItemCount] = useState(0);
    const [itemId, setItemId] = useState();
    const dispatch = useDispatch();

    const increment = (id) => {
        setItemId(id);
        if(itemCount >= 4) return;
        setItemCount((prev) => prev + 1);
            
    };

    const decrement = (id) => {
        setItemId(id);
        if(itemCount <= 0) return;
        setItemCount((prev) => prev - 1);
    };

    const handleAddToCart = (item) => {
        if(itemCount === 0) return;
        const {name, price} = item;
        const newObj = {id: new Date(), name, pricePerQuantity: price, quantity: itemCount, price: price * itemCount};

        dispatch(addItems(newObj));
        setItemCount(0);
    }

    return (
        <>
            {/* Category Selection Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 overflow-y-scroll max-h-[300px] no-scrollbar lg:grid-cols-4 gap-4 px-6 py-4 w-full'>
                {menus.map((menu) => (
                    <div key={menu.id} 
                        className={`flex flex-col items-center justify-between p-4 rounded-lg h-[100px] cursor-pointer transition-all 
                            ${selected.id === menu.id ? 'bg-[#8d2b2b] shadow-lg scale-105' : 'bg-[#6a1b1b] hover:bg-[#8d2b2b]'}`} 
                        onClick={() => {
                            setSelected(menu);
                            setItemCount({});
                        }}>
                        <div className='flex items-center justify-between w-full'>
                            <h1 className='text-[#f5f5f5] text-lg font-semibold'>{menu.icon} {menu.name}</h1>
                            {selected.id === menu.id && <GrRadialSelected className='text-white' size={20}/>}
                        </div>
                        <p className='text-[#f1ecec] text-sm font-semibold'>{menu.items.length} Items</p>
                    </div>
                ))}
            </div>

            <hr className='border-[#2a2a2a] border-t-2 mt-4'/>

            {/* Food Items Grid */}
            <div className='grid grid-cols-2 overflow-y-scroll max-h-[250px] no-scrollbar md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 py-5 w-full'>
                {selected?.items?.map((item) => (
                    <div key={item.id} className='flex flex-col items-center justify-between p-4 rounded-lg cursor-pointer 
                        bg-[#161616] hover:bg-[#333] text-white shadow-lg transition-all'>
                        
                        {/* Item Name & Cart Icon */}
                        <div className='flex justify-between w-full items-center'>
                            <h1 className='text-lg font-semibold'>{item.name}</h1>
                            <button onClick={() => handleAddToCart(item)} className='bg-[#02ca3a] text-white p-2 rounded-lg cursor-pointer hover:bg-[#067715d6]' ><FaShoppingCart size={20} /></button>
                        </div>

                        {/* Price */}
                        <p className='text-xl font-bold mt-2 text-[#ababab]'>LKR:{item.price}</p>

                        {/* Counter with Better Styling */}
                        <div className='flex items-center justify-between bg-[#111] px-5 py-2 rounded-lg mt-3 w-full'>
                            <button onClick={() => decrement(item.id)} className='text-yellow-500 text-2xl font-bold px-3'>
                                &minus;
                            </button>
                            <span className='text-lg font-semibold'>{itemId == item.id ? itemCount : '0'}</span>
                            <button onClick={() => increment(item.id)} className='text-yellow-500 text-2xl font-bold px-3'>
                                &#43;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MenuContainer;
