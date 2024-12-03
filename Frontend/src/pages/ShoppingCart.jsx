import React from 'react'
import CartList from '../components/CartList'
import { BiCart, BiCartAlt, BiRupee } from 'react-icons/bi'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'

const ShoppingCart = () => {

    const { items } = useSelector(state => state.cart);  // Access cart state, then extract items
    console.log(items);

    const cartSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    return (
        <>
            <Navbar />
            {items?.length == 0 ? <div className='flex justify-center lg:text-3xl lg:pt-20 pt-10 flex-col items-center'><BiCartAlt className='text-theme' size={80} /><p>Cart is empty!</p></div> : <div className='p-5 bg-slate-100 min-h-screen w-full'>
                <div className='bg-white shadow-md rounded-lg'>
                    <CartList items={items} />
                    <div className='border-t-[1.8px] mx-5 p-5 flex justify-end items-center text-lg'>
                        <p className='font-medium text-black mb-0 pr-2'>Subtotal: </p>
                        <BiRupee />
                        <p className='mb-0 font-bold text-black'>{cartSubtotal}</p>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default ShoppingCart