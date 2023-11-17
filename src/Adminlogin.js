import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useState } from 'react';

// const HandleLogin = async () => {
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [token, setToken] = useState('');
//     try {
//       const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username: 'DJ@4', password: 'Dhunjam@2023' })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setToken(data.data.token);
//         setLoggedIn(true);
//       } else {
//         // Handle login failure
//         console.error('Login failed:', data);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };
const Login = () => {
    // const history=useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    showPassword ? <FaEyeSlash /> : <FaEye />
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', formData.username, formData.password);
    // Implement login authentication logic here
  };
  const handleSignIn = async () => {
    const username = formData.username;
    const password = formData.password;

    try {
      const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
   
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful. Token:', data.data.token);
        // Perform actions after successful login, such as storing token in state, etc.
        // history('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Handle login failure (display error message, reset fields, etc.)
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle other errors (network issues, etc.)
    }
  };
  return (
    <div>
      <h1 className='header'>Venue Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          
          <input
          className='inp'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="password-input">
          
          <input
          className='inp'
          type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            // onClick={handleTogglePassword}
            
          />
          <span className='toggle-password' onClick={handleTogglePassword}>
              {showPassword ? <FaEye /> : <FaEyeSlash /> }
            </span>
        </div>
        <Link to='/dashboard'>
        <button onClick={handleSignIn} className='btn' type="button" class="btn btn-primary">Sign in</button>
        </Link>
        <h5>New Registration ?</h5>
      </form>
    </div>
  );
};

export default Login;