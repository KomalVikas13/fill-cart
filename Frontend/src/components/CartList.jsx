import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slice/cartSlice";

const CartList = ({ items }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.users);

    if (!items) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            {items?.length && items.map((item, index) => {
                const product = item.product || {};  // Default empty object if product is undefined
                const productImages = product?.images || [];  // Safe check for images array
                const productName = product?.name || "Product Name Unavailable";  // Fallback for product name

                return (
                    <div className="flex-col justify-end lg:flex-row flex lg:justify-between items-end lg:items-center px-10 py-5 shadow-sm" key={index}>
                        <div className="flex flex-col lg:flex-row gap-5 items-center">
                            <div className="w-40 h-40">
                                {/* Safe check for images */}
                                {productImages.length > 0 ? (
                                    <img src={productImages[0]?.imageUrl} className="h-full w-full object-contain" alt={productName} />
                                ) : (
                                    <p>No Image</p> // Fallback image
                                )}
                            </div>
                            <div>
                                <p className="text-xl text-black mb-3">{productName}</p>
                                <div className="flex items-center">
                                    <p className="text-xl text-black m-0">{item.quantity}</p>
                                    <button
                                        className="text-sm py-2 px-5 bg-gray-50 text-green-500 flex gap-2 items-center"
                                        onClick={() => dispatch(removeFromCart({ token: profile.token, cartId: item.cartItemId }))}>
                                        X Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center text-lg font-bold text-black">
                                <BiRupee /><p className="mb-0 font-bold">{product.price} x {item.quantity}</p>
                            </div>
                            <div>
                                <p className="mb-0 font-bold text-black text-end">= {product.price * item.quantity}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CartList;
