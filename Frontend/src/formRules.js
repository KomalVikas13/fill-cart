const formRules = {
    email: (email) => {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    mobileNo: (phoneNo) => {
      // Ensure the phone number contains exactly 10 digits
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phoneNo);
    },
    password: (password) => {
      // Ensure password is at least 8 characters, has one uppercase, one lowercase, one number, and one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      return passwordRegex.test(password);
    },
    registrationFormOnBlurRules: (e) => {
      const { name, value } = e.target;
      
      if (!value) {
        return 'This field is required';
      }
      
      if (name === 'email' && !formRules.email(value)) {
        return 'Invalid email address.';
      }
      if (name === 'phoneNo' && !formRules.mobileNo(value)) {
        return 'Mobile number must be 10 digits.';
      }
      if (name === 'newPassword' && !formRules.password(value)) {
        return 'Password must be at least 8 characters long, and include uppercase, lowercase, number, and special character.';
      }
      if (name === 'confirmPassword' && value !== formData.newPassword) {
        return 'Passwords do not match.';
      }
      
      return null; // No error if validation passes
    }
  };
  
  export default formRules;