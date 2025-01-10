import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../assets/Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/users/login', data);
      console.log(response.data);

      //console.log()
      // Store the token and userId in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); // Ensure this is correctly returned from your backend
      

      // Check if it's the first login
      const firstLogin = response.data.firstLogin; // Make sure your backend sends this property
      if (firstLogin) {
        navigate('/interest'); // Redirect to Interest page on first login
      } else {
        // navigate('/interest');
        navigate('/dashboard'); // Redirect to dashboard on subsequent logins
      }
    } catch (error) {
      console.error('Error during the login request:', error.response?.data || error.message); // Added optional chaining for safer logging
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sign In Form</title>
      <div className="container">
        <div className="sign-in-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social" aria-label="Login with Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="social" aria-label="Login with Google">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social" aria-label="Login with LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <span>or use your account</span>
            <input
              type="text"
              placeholder="Email Address"
              {...register('email', { required: true })}
            />
            {errors.email && <span>This field is required</span>}
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <Link to="/forgotpwd" className="forgot-password-link">Forgot your password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <h2>Don't have an account?</h2>
            <Link to="/signup">
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
