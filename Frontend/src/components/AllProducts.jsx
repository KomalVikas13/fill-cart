import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styling/ProductList.css";
// import "./style.css"// Add your custom styles

import image1 from "../assets/category-1.png";
import image2 from "../assets/category-2.png";
import image3 from "../assets/category-2.png";
import image4 from "../assets/category-2.png";
import image5 from "../assets/category-2.png";
import image6 from "../assets/category-2.png";
import image7 from "../assets/category-2.png";
import image8 from "../assets/category-2.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

// Product data
const productsData = [
  { id: 1, name: "Formal Shirt", price: 20.55, category: "Clothing", rating: 4, imgSrc: image1 },
  { id: 2, name: "Wide Fit Hat", price: 18.99, category: "Accessories", rating: 5, imgSrc: image2 },
  { id: 3, name: "Slim Fit T-shirt", price: 15.55, category: "Clothing", rating: 3, imgSrc: image3 },
  { id: 4, name: "Leather Bag", price: 45.0, category: "Accessories", rating: 4, imgSrc: image4 },
  { id: 5, name: "Leather Boots", price: 80.0, category: "Footwear", rating: 5, imgSrc: image5 },
  { id: 6, name: "Casual Innerwears", price: 35.0, category: "Clothing", rating: 4, imgSrc: image6 },
  { id: 7, name: "Classic Goggle", price: 120.0, category: "Accessories", rating: 5, imgSrc: image7 },
  { id: 8, name: "Cool Oversize Sweater", price: 25.99, category: "Clothing", rating: 3, imgSrc: image8 },
];

// FilterSidebar component
const FilterSidebar = ({ categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange, rating, setRating }) => {
  return (
    <div className="filter-sidebar">
      <h2>Filters</h2>

      {/* Category Filter */}
      <div className="filter-section">
        <h3>Category</h3>
        <ul>
          {categories.map((category, index) => (
            <li
              key={index}
              className={selectedCategory === category ? "selected" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3>Price</h3>
        <input
          type="range"
          min="0"
          max="150"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
        <p>Up to ${priceRange}</p>
      </div>

      {/* Rating Filter */}
      <div className="filter-section">
        <h3>Rating</h3>
        {[5, 4, 3, 2, 1].map((star) => (
          <span
            key={star}
            className={`rating-star ${rating === star ? "selected" : ""}`}
            onClick={() => setRating(star)}
          >
            {"⭐".repeat(star)}
          </span>
        ))}
      </div>
    </div>
  );
};

// ProductCard component
const ProductCard = ({ product }) => (
  <Link to='/product_detail' className="product-card">
    <img src={product.imgSrc} alt={product.name} className="product-image" />
    <h3>{product.name}</h3>
    <p>${product.price.toFixed(2)}</p>
    <p className="product-rating">{"⭐".repeat(product.rating)}</p>
  </Link>
);

// ProductList component
const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(150);
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const productsPerPage = 4;

  // Get categories for filter
  const categories = [...new Set(productsData.map((product) => product.category))];

  // Filter products based on selected criteria
  const filteredProducts = productsData.filter((product) => {
    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      product.price <= priceRange &&
      (rating ? product.rating === rating : true)
    );
  });

  // Pagination logic
  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Navbar />
      <div className="product-list-container">
        <div className="flex">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            rating={rating}
            setRating={setRating}
          />

          <div className="flex-1 grid">
            <div className="product-grid">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
