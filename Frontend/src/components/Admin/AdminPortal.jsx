import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/FillCartLogo.png'
import { BiCategory, BiShoppingBag, BiUserCheck } from 'react-icons/bi';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slice/productsSlice';
import { fetchAllUsers } from '../../redux/slice/userSlice';
import { fetchAllOrders } from '../../redux/slice/orderSlice';

const AdminPortal = () => {
  const { products } = useSelector(state => state.products);
  const { profile, status, users } = useSelector(state => state.users);
  const { orders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const navigator = useNavigate()

    useEffect(() => {
        dispatch(fetchAllOrders(profile.token));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    
    useEffect(() => {
        dispatch(fetchAllUsers(profile.token));
    }, [dispatch]);

    if (status == 'loading') {
        return <div>Loading....</div>
    }

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
          <p className='text-theme font-bold text-2xl text-center pt-2'>{products.length}</p>
        </div>
        <div className='rounded-lg shadow-2xl bg-white' onClick={()=>navigator("/all_orders")}>
          <div className="flex gap-2 items-center px-5 pt-10">
            <MdShoppingCartCheckout className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Orders</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>{orders.length}</p>
        </div>
        <div className='rounded-lg shadow-2xl bg-white' onClick={()=>navigator("/all_users")}>
          <div className="flex gap-2 items-center px-5 pt-10">
            <BiUserCheck className='text-3xl text-theme' />
            <h3 className='font-semibold'>All Users</h3>
          </div>
          <p className='text-theme font-bold text-2xl text-center pt-2'>{users.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
