import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams.get('id'), "hhh");


    const [images, setImages] = useState({
        img1: "https://m.media-amazon.com/images/I/61Pc70HxWpL.SY695.jpg",
        img2: "https://m.media-amazon.com/images/I/81AUPWGLSWL.SY675.jpg",
        img3: "https://m.media-amazon.com/images/I/81zTyMLNTRL.SY675.jpg",
        img4: "https://m.media-amazon.com/images/I/81t4TNk3YNL.SY675.jpg",
    });

    const [activeImg, setActiveImage] = useState(images.img1);
    const [amount, setAmount] = useState(1);

    const [reviews, setReviews] = useState([
        { id: 1, name: "John Doe", review: "Great quality sneakers, love them!" },
        { id: 2, name: "Jane Smith", review: "Very comfortable and stylish." },
        { id: 3, name: "Sam Wilson", review: "Good for daily use. Worth the price!" },
    ]);

    return (
        <div className="container mx-auto p-6">
            {/* Main Section */}
            <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                {/* Product Images */}
                <div className="flex flex-col gap-6 lg:w-2/4">
                    <img
                        src={activeImg}
                        alt="Product"
                        className="w-full h-full aspect-square object-cover rounded-xl shadow-lg"
                    />
                    <div className="flex flex-row justify-between h-16">
                        {Object.values(images).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                // alt={Thumbnail ${index + 1}}
                                className={`w-24 h-24 rounded-md cursor-pointer ${activeImg === img ? "border-2 border-violet-600" : ""
                                    }`}
                                onClick={() => setActiveImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-4 lg:w-2/4">
                    <div>
                        <span className="text-violet-600 font-semibold">
                            Special Sneaker
                        </span>
                        <h1 className="text-3xl font-bold">
                            New Balance Unisex-Adult 574 Model Sneaker
                        </h1>
                    </div>
                    <p className="text-gray-700 text-lg">
                        The New Balance 574 is an iconic sneaker that combines style,
                        comfort, and durability. Ideal for casual outings and sports.
                    </p>
                    <h6 className="text-2xl font-semibold text-green-600">$199.00</h6>
                    <div className="flex flex-row items-center gap-12">
                        {/* Quantity Selector */}
                        <div className="flex flex-row items-center">
                            <button
                                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                                onClick={() =>
                                    setAmount((prev) => (prev > 1 ? prev - 1 : prev))
                                }
                            >
                                -
                            </button>
                            <span className="py-4 px-6 rounded-lg text-lg font-semibold">
                                {amount}
                            </span>
                            <button
                                className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                                onClick={() => setAmount((prev) => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-[#fd6b68] text-white font-semibold py-3 px-16 rounded-xl hover:bg-[#e85b5a]">
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="flex flex-col gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                            <h3 className="font-semibold text-lg">{review.name}</h3>
                            <p className="text-gray-700">{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;