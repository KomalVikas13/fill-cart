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
        console.log("hi");
        dispatch(fetchCart({ userId: profile.user.userId, token: profile.token }));
    }, [dispatch])



    if (!cart.items) {
        console.log(cart);
        return <div>Loading..!</div>
    }

    const cartSubtotal = (cart.items).reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <>
            <Navbar />
            {cart.items?.length == 0 ? <div className='flex justify-center lg:text-3xl lg:pt-20 pt-10 flex-col items-center'><BiCartAlt className='text-theme' size={80} /><p>Cart is empty!</p></div> : <div className='p-5 bg-slate-100 min-h-screen w-full'>
                <div className='bg-white shadow-md rounded-lg'>
                    <CartList items={cart.items} />
                    <div className='border-t-[1.8px] mx-5 p-5 flex justify-end items-center text-lg'>
                        <p className='font-medium text-black mb-0 pr-2'>Subtotal: </p>
                        <BiRupee />
                        <p className='mb-0 font-bold text-black'>{(cart.totalAmount).toFixed(2)}</p>
                        <button onClick={() => navigator("/placeOrder")}>Buy all</button>
                    </div>
                </div>
            </div>}

        </>
    )
}

export default ShoppingCart