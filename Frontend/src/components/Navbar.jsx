import React from 'react'
import Logo from '../assets/FillCartLogo.png'
import { BiCart, BiUser } from 'react-icons/bi'
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const { items } = useSelector(state => state.cart);

    return (
        <div className="bg-white shadow-xl overflow-hidden sticky z-50">
            <div className='h-20 p-2 flex justify-between w-[80%] mx-auto items-center'>
                <div>
                    <img src={Logo} alt="" width={100} />
                </div>
                <div className='flex gap-5'>
                    <Link to='/' className='font-medium font-verdana text-gray-800 hover:text-theme'>Home</Link>
                    <Link className='font-medium font-verdana text-gray-800 hover:text-theme '>Categories</Link>
                    <Link className='font-medium font-verdana text-gray-800 hover:text-theme '>All Clothes</Link>
                </div>
                <div className='flex gap-5'>
                    <Link to='/login'>
                        <BiUser className='text-3xl hover:text-theme' />
                    </Link>
                    <Link to='/cart' className='relative'>
                        <BiCart className='text-3xl hover:text-theme' />
                        <div className="absolute bg-black w-5 h-5 flex justify-center items-center text-white rounded-full -top-[12px] -right-2 text-sm">{items?.length || 0}</div>
                    </Link>
                    {isAuthenticated &&
                        <FaSignOutAlt className='text-3xl hover:text-theme' onClick={() => logout()} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar