import { BiCloset, BiCross, BiMinus, BiPlus, BiRupee } from "react-icons/bi"
import item1 from "../assets/401.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts, filterProductById } from "../redux/slice/productsSlice";
import { clearCart } from "../redux/slice/cartSlice";
const CartList = ({ items }) => {
    const dispatch = useDispatch();
    console.log(items);


    return (
        <div className="">
            {items?.length && items.map((item, index) => {
                return (<div className="flex-col justify-end lg:flex-row flex lg:justify-between items-end lg:items-center px-10 py-5 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                        <div className="w-40 h-40">
                            <img src={item.product.images[0].imageUrl} className="h-full w-full object-contain" alt="" />
                        </div>
                        <div>
                            <p className="text-xl text-black mb-3">{item.product.name}</p>
                            <div className="flex items-center"> <p className="text-xl text-black m-0">{item.quantity}</p>
                                <button className="text-sm py-2 px-5 bg-gray-50 text-green-500 flex gap-2 items-center" onClick={() => dispatch(clearCart())}>X Remove</button></div>


                        </div>
                    </div>
                    <div>
                        <div className="flex items-center text-lg font-bold text-black">
                            <BiRupee /><p className="mb-0 font-bold">{item.product.price} x {item.quantity}</p>
                        </div>
                        <div>
                            <p className="mb-0 font-bold text-black text-end">= {item.product.price * item.quantity}</p>
                        </div>
                    </div>
                </div>)
            })}

        </div>
    )
}

export default CartList