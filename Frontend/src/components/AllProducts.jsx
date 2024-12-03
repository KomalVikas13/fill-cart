import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategory } from "../redux/slice/productsSlice";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, status } = useSelector((state) => state.products);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || 'All';

  // Fetch products only once when the component mounts or category changes
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    } else if (status === 'succeeded') {
      // Apply filter after products are fetched
      dispatch(setCategory(category));
    }
  }, [category, dispatch, status]);

  // Determine which products to display (based on category)
  const displayProducts = category === 'All' ? products : filteredProducts;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center bg-white p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-10">
          {displayProducts.length === 0 ? (
            <div className="flex justify-center items-center text-center text-2xl">No Data Found</div>
          ) : (
            displayProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
