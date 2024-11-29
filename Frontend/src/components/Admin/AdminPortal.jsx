import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/FillCartLogo.png'

const AdminPortal = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-white justify-center">
      <img src={logo} width={100}/>
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
    </div>
  );
};

export default AdminPortal;
