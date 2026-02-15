import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration({ setUser }) {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const redirect = useNavigate();

  const runValidation = () => {
    const currentErrors = {};
    const patterns = {
      onlyLetters: /^[A-Za-z]+$/,
      emailStyle: /\S+@\S+\.\S+/
    };

    if (!patterns.onlyLetters.test(fields.firstName)) {
      currentErrors.firstName = "Your first name should just be letters";
    }
    if (!patterns.onlyLetters.test(fields.lastName)) {
      currentErrors.lastName = "Your last name should just be letters";
    }
    if (!patterns.emailStyle.test(fields.email)) {
      currentErrors.email = "Incorrect email format";
    }
    if (fields.password.length < 8) {
      currentErrors.password = "Your password should be 8 characters or more";
    }
    if (fields.password !== fields.confirmPassword) {
      currentErrors.confirmPassword = "The passwords did not match";
    }

    setFormErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (runValidation()) {
      setUser(fields);
      redirect('/profile');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleFormSubmit} noValidate>
        <div>
          <label>First Name:</label>
          <input name="firstName" type="text" onChange={handleInputChange} />
          {formErrors.firstName && <p style={{ color: 'red' }}>{formErrors.firstName}</p>}
        </div>

        <div>
          <label>Last Name:</label>
          <input name="lastName" type="text" onChange={handleInputChange} />
          {formErrors.lastName && <p style={{ color: 'red' }}>{formErrors.lastName}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input name="email" type="email" onChange={handleInputChange} />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input name="password" type="password" onChange={handleInputChange} />
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input name="confirmPassword" type="password" onChange={handleInputChange} />
          {formErrors.confirmPassword && <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Registration;