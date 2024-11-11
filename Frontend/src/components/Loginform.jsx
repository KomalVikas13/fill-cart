import React, { useState } from 'react';
import '../styling/Loginform.css';
import logo from '../assets/FillCartLogo.png'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const Loginform = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  // Handle input change and validate onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Inline validation as the user types
    if (name === 'email') {
      setErrors({ ...errors, email: value ? (validateEmail(value) ? '' : 'Invalid email format') : 'This field is required' });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: value ? (validatePassword(value) ? '' : 'Password must be at least 8 characters') : 'This field is required'
      });
    }
  };

  // Handle input blur for additional validation
  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setErrors({ ...errors, email: value ? (validateEmail(value) ? '' : 'Invalid email format') : 'This field is required' });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: value ? (validatePassword(value) ? '' : 'Password must be at least 8 characters') : 'This field is required'
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation check before submission
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
      alert('Please correct the errors before submitting');
      return;
    }

    alert('Form submitted successfully!');
    // Perform login logic here
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Fillcart" className="mx-auto w-24 mb-1" />
      <h2>Welcome back!</h2>
      <p>Please enter your details</p>

      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="input-field password-container relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {/* <span onClick={toggleShowPassword} className="show-password absolute right-0 top-1/2">
            {showPassword ? <FaEye/>:<FaEyeSlash />}


          </span> */}
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="checkbox-container">
          
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="btn">Log In</button>

        <button type="button" className="btn btn-google">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" width="16" />
          Log in with Google
        </button>

        <div className="footer">
          Don’t have an account? <a href="#">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Loginform;
