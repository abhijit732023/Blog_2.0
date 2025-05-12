import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl p-6 sm:p-9 border backdrop-blur-3xl border-black/10 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm sm:text-base text-black/60">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6 sm:mt-8">
          <div className="space-y-4 sm:space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="pt-6 sm:pt-10"
            >
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
