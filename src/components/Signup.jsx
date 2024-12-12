import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-full relative mt-10 overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className='mx-auto w-full max-w-lg rounded-xl pl-10 mt-6 pr-10 pt-5 border backdrop-blur-3xl border-black/10 relative' style={{ height: '70%' }}>

        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-1 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">Sign In</Link>
        </p>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-3 px-6 pt-6'>
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name should only contain letters and spaces"
                }
              })}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Email address must be a valid address"
                },
                validate: {
                  checkEmail: (value) => /^\d+@\d+\.\d+$/.test(value) ? "Email address should include letters" : true
                }
              })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must include at least one capital letter, small letters, at least one special character, and numbers"
                }
              })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            <div className='w-full flex justify-end '>
              <button type="button" className="size-7" onClick={() => setShowPassword(!showPassword)}>
                <img src={showPassword ? "public\image\view.png" : "public\image\hide.png"} alt={showPassword ? "show" : "hide"} />
              </button>
            </div>
            <motion.div
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.97 }}
            whileFocus={{scale: 1.2}} >
              <Button type="submit" className="w-full mt-6 mb-10 bg-yellow-300">Create Account</Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}


export default Signup;