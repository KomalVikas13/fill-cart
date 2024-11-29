import React from "react";

function ProductCard({ product }) {
    return (
        <div>
            <div className="relative overflow-hidden group">
                {/* Image with hover translate effect */}
                <img
                    src={product.image[0].imageUrl}
                    alt={product.name}
                />
                {/* Button container */}
                <div className="absolute bottom-5 w-full text-center px-5 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button className="bg-black text-white hover:bg-theme py-3 w-[90%] mx-auto">
                        Add To Cart
                    </button>
                </div>
            </div>
            {/* Product details */}
            <h3 className="pt-2 text-md font-bold text-gray-700">{product.name}</h3>
            <p className="font-medium pt-1">${product.price}</p>
        </div>
    );
}

export default ProductCard;
