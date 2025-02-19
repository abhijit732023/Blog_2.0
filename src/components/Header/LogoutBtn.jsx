import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import Login from '../../pages/Login'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'





function LogoutBtn() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate("/login")
        })
    }
    useEffect(()=>{},[logoutHandler])
  return (
    <motion.button
    whileHover={{ scale: 1.05}}
    whileTap={{ scale: 0.8 }}
    whileFocus={{scale: 1.2}}
    className={`inline-bock px-6 py-2 bg-green-400  text-black duration-200 hover:bg-green-700 rounded-full`}
    onClick={logoutHandler}
    >Logout</motion.button>
  )
}

export default LogoutBtn