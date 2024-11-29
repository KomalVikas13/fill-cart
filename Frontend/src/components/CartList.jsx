import { BiMinus, BiPlus, BiRupee } from "react-icons/bi"
import item1 from "../assets/401.png"
const CartList = () => {
    return (
        <div className="">
            <div className="flex-col justify-end lg:flex-row flex lg:justify-between items-end lg:items-center px-10 py-5">
                <div className="flex flex-col lg:flex-row gap-5 items-center">
                    <div className="w-40 h-40">
                        <img src={item1} alt="" />
                    </div>
                    <div>
                        <p className="text-xl text-black mb-3">Women Trendy-Kurti for all occasions</p>
                        <p className="text-sm text-green-600 mb-3">In stock</p>
                        <div className="border inline-flex">
                            <button className="text-lg py-2 px-5 bg-gray-50 text-red-500"><BiMinus /></button>
                            <button className="text-lg py-2 px-5 bg-white">1</button>
                            <button className="text-lg py-2 px-5 bg-gray-50 text-green-500"><BiPlus /></button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center text-lg font-bold text-black">
                    <BiRupee />
                    <p className="mb-0 font-bold">326</p>
                </div>
            </div>
        </div>
    )
}

export default CartList