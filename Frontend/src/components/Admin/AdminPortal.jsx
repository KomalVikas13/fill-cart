import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/FillCartLogo.png'
import { BiCategory, BiShoppingBag, BiUserCheck } from 'react-icons/bi';
import { FaGoodreadsG } from 'react-icons/fa';
import { MdShoppingCartCheckout } from 'react-icons/md';

const AdminPortal = () => {
  const navigator = useNavigate()
  return (
    <div className="flex flex-col items-center h-screen bg-white justify-center">
      <img src={logo} width={100} />
      <h1 className="text-3xl font-md mb-8">Admin Management System</h1>
      <div className="flex space-x-6 mb-10">
        <Link to="/">
          <button className="bg-[#fd6b68] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600">
            Home
          </button>
        </Link>
        <Link to="/addCategory">
          <button className="bg-[#fd6b68] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600">
            Manage Category
          </button>
        </Link>
        <Link to="/addProduct">
          <button className="bg-[#fd6b68] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600">
            Manage Products
          </button>
        </Link>
      </div>
      <div className="flex gap-10 py-10">
        <div className='rounded-lg shadow-2xl bg-white' onClick={()=>navigator("/category_list")}>
          <div className="flex gap-2 items-center px-5 pt-10">
            <BiCategory className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Categories</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>10</p>
        </div>
        <div className='rounded-lg shadow-2xl bg-white' onClick={()=>navigator("/product_list")}>
          <div className="flex gap-2 items-center px-5 pt-10">
            <BiShoppingBag className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Products</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>10</p>
        </div>
        <div className='rounded-lg shadow-2xl bg-white'>
          <div className="flex gap-2 items-center px-5 pt-10">
            <MdShoppingCartCheckout className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Orders</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>10</p>
        </div>
        <div className='rounded-lg shadow-2xl bg-white'>
          <div className="flex gap-2 items-center px-5 pt-10">
            <BiUserCheck className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Users</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>10</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
