import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';


function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();// register ,register a input feild to form ,register take name whixh is used for registertion of the inpt field and secondly it take a object and it can be accessed using the name used for registeration 

  const create = async (data) => {//we are creating account from data that is provided from form ,useform take the input from the user and take it as data and it is done by using register function which register the input value into form of data and it sis used for creating the account
    setError("");// useform make it easy to manage form state 
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-full relative '>

        <div className={`mx-auto w-full max-w-lg rounded-xl pl-10 mt-6 pr-10 pt-5 border backdrop-blur-3xl border-black/10 relative  `} style={{height:'70%'}}>
        <div className="flex justify-center">
          <span className="w-full flex justify-center">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-1 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-3 px-6'>
            <Input
              type="text"
              label="Full Name "
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name should only contain letters and spaces"
                }
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
            <Input
              label="Email "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                  message: "Email address must be a valid address"
                },
                validate: {
                  checkEmail: (value) => {
                    if (/^\d+@\d+\.\d+$/.test(value)) {
                      return "Email address should include letters";
                    }
                    return true;
                  }
                }
              })}
            />
            {errors.email&&(<p className="text-red-600 text-sm">{errors.email.message}</p>)}
            <Input
              label="Password "
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
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
            <div className='w-full  right-0 flex justify-end pt-4'><button
              type="button"
              className="  size-7 "style={{marginRight:'',marginTop:'-6.5%'}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?<img src="src\components\view.png" alt="show" />  :<img src="src\components\hide.png" alt="Hide" />}
            </button></div>
            <div>
              <Button type="submit" className="w-full mt-8 mb-10 bg-yellow-300" >
                Create Account
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;