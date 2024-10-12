import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/Login.css';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/users/login', data);
      console.log(response.data);
      // Handle successful login, e.g., store the token and redirect
      localStorage.setItem('token', response.data.token); // Save the token for later use
      // Redirect user or update UI accordingly
    } catch (error) {
      console.error('Error during the login request:', error.response.data);
      // Optionally show an error message to the user
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
