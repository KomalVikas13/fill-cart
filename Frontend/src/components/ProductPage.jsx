import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filterProductById } from "../redux/slice/productsSlice";
import { addToCart, fetchCart, updateCartQuantity } from "../redux/slice/cartSlice";

const ProductDetailsPage = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(state => state.products.filteredProducts);
    const { profile } = useSelector(state => state.users);
    const { items } = useSelector(state => state.cart);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');

    const [images, setImages] = useState([]);
    const [activeImg, setActiveImage] = useState(null);
    const [amount, setAmount] = useState(1);  // Changed to number
    const [reviews, setReviews] = useState(null);
    const [msg, setMsg] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0); // Default to 0
    const [alreadyExists, setAlreadyExists] = useState(null); // State to store the 'alreadyExists' product

    useEffect(() => {
        if (productId) {
            dispatch(fetchProducts()).then(() => {
                dispatch(filterProductById(productId)); // Only filter after products are fetched
            });

        }
    }, [dispatch, productId]);





    // Ensure product exists before rendering component content
    const product = filteredProducts.length > 0 ? filteredProducts[0] : null;



    useEffect(() => {
        if (product) {
            const alreadyExists = items.length > 0 ? items.find(item => item.product.productId == productId) : null;
            setAlreadyExists(alreadyExists);  // Set the state here to be used later in JSX
            if (alreadyExists) {
                setAmount(alreadyExists.quantity);  // Set the amount to the existing quantity in the cart
            }
        }
    }, [productId, items, product]);

    useEffect(() => {
        if (product) {
            setImages(product.images);
            setReviews(product.reviews);
            setActiveImage(product.images[0]?.imageUrl);
            setTotalPrice(product.price * amount);  // Calculate total price when product data is available
        }
    }, [product, amount]);  // Recalculate when product or amount changes

    if (!product) {
        return <div>Loading...</div>;  // Show loading if product is not yet available
    }

    const handleQty = (updater) => {
        const currentStock = Number(product.stock);
        const currentAmount = Number(amount);
        if (updater === 'decrement') {
            setMsg(null);
            if (currentAmount > 1) {
                setAmount(currentAmount - 1);
            }
        } else if (updater === 'increment') {
            setMsg(null);
            if (currentAmount < currentStock) {
                setAmount(currentAmount + 1);
            } else {
                setMsg("Out of Stock");
            }
        }
        if (currentAmount !== amount) {
            dispatch(addProductToCart({ id: productId, currentAmount }));
        }
    };

    const addProductToCart = () => {
        console.log("hi");

        // Build the cart payload dynamically
        const cartPayload = {
            cart: {
                userId: profile.user.userId, // Get from Redux state
                cartItemRequestList: [
                    {
                        productId: productId, // Current product ID
                        quantity: amount, // Current quantity
                    },
                    // Example for multiple items (optional, based on user requirements)
                    // {
                    //     productId: 13,
                    //     quantity: 4,
                    // },
                ],
            },
            token: profile.token
        };
        console.log(cartPayload);

        // Dispatch addToCart action with the constructed payload
        dispatch(addToCart(cartPayload));
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                    {/* Product Images */}
                    <div className="flex flex-col gap-6 lg:w-2/4">
                        <img
                            src={activeImg || ""}
                            alt="Product"
                            className="w-full h-full aspect-square object-cover rounded-xl shadow-lg"
                        />
                        <div className="flex flex-row justify-between h-16">
                            {images.length && images.map((img, index) => (
                                <img
                                    src={img.imageUrl}
                                    key={index}
                                    className={`w-24 h-24 rounded-md cursor-pointer ${activeImg === img.imageUrl ? "border-2 border-violet-600" : ""}`}
                                    onClick={() => setActiveImage(img.imageUrl)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-4 lg:w-2/4">
                        <div>
                            <span className="text-violet-600 font-semibold">
                                {product.category?.name || "Special Product"}
                            </span>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                        </div>
                        <p className="text-gray-700 text-lg mb-0 font-semibold">
                            Description - <span className="font-medium">{product.description}</span>
                        </p>
                        <h6 className="text-2xl font-semibold text-green-600">Rs. {totalPrice}</h6>
                        <div className="flex flex-row items-center gap-12">
                            {/* Quantity Selector */}
                            <div className="flex flex-row items-center">
                                <button
                                    className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                                    onClick={() => handleQty("decrement")}
                                >
                                    -
                                </button>
                                <span className="py-4 px-6 rounded-lg text-lg font-semibold">
                                    {amount}
                                </span>
                                <button
                                    className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                                    onClick={() => handleQty("increment")}
                                >
                                    +
                                </button>
                            </div>
                            {msg ? <span className="text-theme">Out Of Stock</span> : (
                                <div className="flex gap-2">
                                    {alreadyExists ? (
                                        <Link to='/cart' className="bg-[#fd6b68] text-white font-semibold py-3 px-16 rounded-xl hover:bg-[#e85b5a]">
                                            Go to Cart
                                        </Link>
                                    ) : (
                                        <button className="bg-[#fd6b68] text-white font-semibold py-3 px-16 rounded-xl hover:bg-[#e85b5a]" onClick={addProductToCart}>
                                            Add to Cart
                                        </button>
                                    )}
                                    <button className="bg-black text-white font-semibold py-3 px-16 rounded-xl hover:bg-[#e85b5a]">
                                        Buy Now
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                    <div className="flex flex-col gap-6">
                        {reviews?.length > 0 ? reviews.map((review) => (
                            <div key={review.reviewId} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <h3 className="font-semibold text-lg">{review.user.fullName}</h3>
                                <p className="text-gray-700">{review.comment}</p>
                                <p className="text-gray-700">Rating: {review.rating}</p>
                            </div>
                        )) : <p>No Reviews On This Product</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailsPage;
