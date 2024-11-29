import React, { useState } from 'react';
import axios from 'axios';
import formRules from '../formRules';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiLoaderCircle } from 'react-icons/bi';
import logo from '../assets/FillCartLogo.png'

const RegistrationForm = () => {
  //   const navigator = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    address: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigator = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newError = '';

    // Perform individual field validation based on name
    if (!value) {
      newError = 'This field is required';
    } else if (name === 'email' && !formRules.email(value)) {
      newError = 'Invalid email address.';
    } else if (name === 'phoneNo' && !formRules.mobileNo(value)) {
      newError = 'Mobile number must be 10 digit number.';
    } else if (name === 'newPassword' && !formRules.password(value)) {
      newError = 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.';
    } else if (name === 'confirmPassword' && value !== formData.newPassword) {
      newError = 'Passwords do not match.';
    } else if (!value) {
      newError = 'This field is required';
    }

    // Update the errors state
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newError,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Basic required field validations
    if (!formData.fullName) newErrors.fullName = 'This field is required';
    if (!formData.email) {
      newErrors.email = 'This field is required';
    } else if (!formRules.email(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.phoneNo) {
      newErrors.phoneNo = 'This field is required';
    } else if (!formRules.mobileNo(formData.phoneNo)) {
      newErrors.phoneNo = 'Mobile number must be a 10-digit number.';
    }
    if (!formData.address) newErrors.address = 'This field is required';

    if (!formData.newPassword) {
      newErrors.newPassword = 'This field is required';
    } else if (!formRules.password(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'This field is required';
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }



    // If there are errors, update the error state and return early
    if (Object.keys(newErrors).length > 0) {
      console.log('newErrors', newErrors);
      setErrors(newErrors);
      return;
    }

    const formattedData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNo,
      email: formData.email,
      address: formData.address,
      password: formData.newPassword
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/auth/signup', formattedData);
      setLoading(false);
      console.log(response)
      if (response.data === "Registration Successful" && response.status === 201) {
        toast.success('Registration successful!');
        toast.info(`Welcome, ${formData.fullName}!`);
        navigator("/")
      }
    } catch (error) {
      setLoading(false);
      if(error.response.data === "User Already Exists"){
        toast.error('Already having account with this email..!')
        return
      }
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="p-10 bg-[#f7f8fc] w-screen h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md w-full md:w-1/2 lg:w-1/3 h-[90vh] overflow-y-auto px-10 py-5">
        <div className="">
          <div className="text-center mb-2">
            <img src={logo} alt="Fillcart" className="mx-auto w-28 h-28" />
          </div>
          <h2 className="text-2xl  text-center font-bold text-gray-800">Registration Form</h2>
          <p className="text-sm text-gray-500 text-center">
            Please enter your details to register.
          </p>
          <form className="w-full mx-auto">
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>


            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter your password"
                value={formData.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full focus:ring-red-300 focus:outline-red-300 focus:border-red-500 px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading && 'cursor-not-allowed'} group relative w-full flex justify-center items-center gap-3 py-2 px-4 border transition hover:scale-[1.01] duration-300 border-transparent font-medium rounded-md text-white bg-[#fd6b68] hover:bg-[#e65a58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              onClick={handleSubmit}
            >
              Sign Up {isLoading && <BiLoaderCircle size={20} className="text-white animate-fade-in animate-fade-spin" />}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
