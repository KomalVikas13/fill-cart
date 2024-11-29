import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    stock: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required.";
    if (!product.stock.trim() || parseInt(product.stock) <= 0)
      newErrors.stock = "Stock must be a positive number.";
    if (!product.category.trim()) newErrors.category = "Category is required.";
    if (!product.description.trim())
      newErrors.description = "Description is required.";
    if (!product.price.trim() || parseFloat(product.price) <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!product.image) newErrors.image = "Product image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Valid if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Product Submitted: ", product);
      // Clear the form
      setProduct({
        name: "",
        stock: "",
        category: "",
        price: "",
        description: "",
        image: null,
      });
      setErrors({});
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col h-screen justify-center items-center mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            className="border rounded p-2 w-full"
            placeholder="Product Name"
            value={product.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <input
            type="number"
            name="stock"
            className="border rounded p-2 w-full"
            placeholder="Total Stock"
            value={product.stock}
            onChange={handleInputChange}
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock}</p>
          )}
        </div>

        {/* Product Category */}
        <div className="mb-4">
          <input
            type="text"
            name="category"
            className="border rounded p-2 w-full"
            placeholder="Product Category"
            value={product.category}
            onChange={handleInputChange}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <input
            type="number"
            name="price"
            className="border rounded p-2 w-full"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            name="description"
            className="border rounded p-2 w-full"
            placeholder="Product Description"
            value={product.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {/* Image */}
        <div className="mb-4">
          <input
            type="text"
            name="image"
            className="border rounded p-2 w-full"
            onChange={handleFileChange}
            placeholder="Enter URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-[#fd6b68] text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Add Product
          </button>
          <button
            type="button"
            className="bg-black text-white px-6 py-2 rounded-lg shadow-lg"
            onClick={() => navigator("/adminPortal")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
