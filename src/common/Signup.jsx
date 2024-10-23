import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../assets/Login.css';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      data.role_Id = "66d3fb035f0adcf5f220f6fc"
      const response = await axios.post('/users/users', data);
      console.log(response.data);
    } catch (error) {
      console.error('Error during the request:', error.response.data); // Log the error response for more context
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sign Up Form</title>
      <div className="container">
        <div className="sign-in-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>
              Create <br /> Account
            </h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="First Name" {...register('firstName', { required: true })} />
            {errors.firstName && <span>This field is required</span>}
            <input type="text" placeholder="Last Name" {...register('lastName', { required: true })} />
            {errors.lastName && <span>This field is required</span>}
            <input type="email" placeholder="Email Address" {...register('email', { required: true })} />
            {errors.email && <span>This field is required</span>}
            <input type="password" placeholder="Password" {...register('password', { required: true })} />
            {errors.password && <span>This field is required</span>}
            {/* <input type="text" placeholder="Role ID" {...register('role_Id', { required: true })} />
            {errors.role_Id && <span>This field is required</span>} */}
            <Link to="/forgotpwd" className="forgot-password-link">Forgot your password?</Link>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please log in with your details.</p>
            <Link to="/login">
              <button className="ghost" id="signUp">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
