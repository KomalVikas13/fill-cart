import React, { useEffect } from 'react'
import CartList from '../components/CartList'
import { BiCart, BiCartAlt, BiRupee } from 'react-icons/bi'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../redux/slice/cartSlice'
import { useNavigate } from 'react-router-dom'


const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { profile } = useSelector(state => state.users);
    const navigator = useNavigate()

    useEffect(() => {
        if (profile?.user?.userId && profile?.token) {
            // Fetch cart data when the component mounts
            dispatch(fetchCart({ userId: profile.user.userId, token: profile.token }));
        }
    }, [dispatch, profile.user.userId, profile.token]);

    if (!cart.items) {
        console.log(cart);
        return <div>Loading..!</div>
    }


    return (
        <>
            <Navbar />
            {cart.items.length === 0 ? (
                <div className="flex justify-center lg:text-3xl lg:pt-20 pt-10 flex-col items-center">
                    <BiCartAlt className="text-theme" size={80} />
                    <p>Cart is empty!</p>
                </div>
            ) : (
                <div className="p-5 bg-slate-100 min-h-screen w-full">
                    <div className="bg-white shadow-md rounded-lg">
                        <CartList items={cart.items} />
                        <div className="border-t-[1.8px] mx-5 p-5 flex justify-end items-center text-lg">
                            <p className="font-medium text-black mb-0 pr-2">Subtotal: </p>
                            <BiRupee />
                            <p className="mb-0 font-bold text-black">{cart.totalAmount}</p>
                        </div>
                        <div className='text-center pb-5'>
                            <button onClick={()=>navigator('/placeOrder')} className="bg-[#fd6b68] text-white font-semibold py-3 px-16 rounded-xl hover:bg-[#e85b5a]" >
                                            Buy All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShoppingCart;
