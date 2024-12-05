import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const navigator = useNavigate();
  const { jwtToken } = useAuth()

  const handleAddCategory = async () => {
    if (formData.name.trim() && formData.description.trim()) {
      try {
        const response = await axios.post("http://localhost:8080/admin/categories",formData,{
          headers : {
            Authorization : `Bearer ${jwtToken}`
          }
        })
        toast.success("Category added Successfully..!")
        setFormData({ name: "", description: "" }); // Reset the form
        navigator("/category_list")
      } catch (error) {
        let message = error.response.data;
        toast.error(message)
      }
      
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded shadow-md flex flex-col h-screen justify-center items-center mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      <div className="mb-4">
        <input
          type="text"
          name="name"
          className="border rounded p-2 w-full"
          placeholder="Enter category name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <textarea
          name="description"
          className="border rounded p-2 w-full"
          placeholder="Enter category description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <button
        className="bg-[#fd6b68] text-white px-6 py-2 rounded hover:bg-red-600"
        onClick={handleAddCategory}
      >
        Add Category
      </button>

      <br />
      <button
        className="bg-black text-white px-6 py-2 rounded-lg shadow-lg"
        onClick={() => navigator("/adminPortal")}
      >
        Back
      </button>
    </div>
  );
};

export default AddCategory;
