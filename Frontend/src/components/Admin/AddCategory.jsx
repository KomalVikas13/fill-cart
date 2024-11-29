import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const navigator = useNavigate();

  const handleAddCategory = () => {
    if (category.trim()) {
      setCategoriesList([...categoriesList, category]);
      setCategory(""); // Reset input
    }
  };


  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col h-screen justify-center items-center mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      <div className="mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Enter category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button
        className="bg-[#fd6b68] text-white px-6 py-2 rounded hover:bg-red-600"
        onClick={handleAddCategory}
      >
        Add Category
      </button>

      <h3 className="mt-6 mb-2 font-semibold">Categories List:</h3>
      <ul>
        {categoriesList.map((cat, index) => (
          <li key={index} className="border-b py-1">
            {cat}
          </li>
        ))}
      </ul>
      <br />
      <button
        className="bg-black text-white px-6 py-2 rounded-lg shadow-lg"
        onClick={()=>navigator('/adminPortal')}>
        Back
      </button>
    </div>
  );
};

export default AddCategory;
