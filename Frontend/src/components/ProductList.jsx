import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { fetchProducts } from "../redux/slice/productsSlice";

const ProductList = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    // const [products, setProducts] = useState([]);

    const getProductList = async () => {
        dispatch(fetchProducts());

        // const response = await axios.post(`http://localhost:8080/public/products`, { page: 0, size: 8 })
        // setProducts(response.data.content)
    }

    useEffect(() => {
        getProductList();
    }, [])

    return (

        <div className="flex flex-col items-center bg-white p-10">
            <h1 className="text-4xl font-bold py-5">Our Top Collection</h1>
            <p>These are some of our most popular items that customers love!</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10">
                {products.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            <Link to='/all_products' className="border border-black px-5 py-3 hover:bg-black hover:text-white transition-all duration-500 font-semibold">View All Products</Link>
        </div>
    );
}

export default ProductList;
