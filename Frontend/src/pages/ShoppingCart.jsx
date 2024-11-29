import React from 'react'
import CartList from '../components/CartList'
import { BiRupee } from 'react-icons/bi'
import Navbar from '../components/Navbar'

const ShoppingCart = () => {
    return (
        <>
            <Navbar />
            <div className='p-5 bg-slate-100 min-h-screen w-full'>
                <div className='bg-white shadow-md rounded-lg'>
                    <CartList />
                    <div className='border-t-[1.8px] mx-5 p-5 flex justify-end items-center text-lg'>
                        <p className='font-medium text-black mb-0 pr-2'>Subtotal: </p>
                        <BiRupee />
                        <p className='mb-0 font-bold text-black'>326</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart