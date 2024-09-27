import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='h-screen flex flex-wrap content-between bg-transparent' style={{backgroundColor:""}}>
          <div className='w-full absolute h-screen  ' style={{backgroundColor:'#5F5044'}}>
          <img src="/src/books4.jpg?v=1" className='h-full w-full object-cover opacity-35' key="books4-img" />
            {/* <img src="src\books4.jpg?v=1" className='h-full w-full object-cover opacy-40' /> */}
          </div>
          <div className='w-full h-full block '>
        <Header />
        <motion.main  
         layoutScroll
        className=' overflow-scroll border-red-600 border-2' style={{height:'91%'}}>
        <Outlet  />
        </motion.main>
      </div>
    </div>
  ) : null
}

export default App

// //     <div className='h-screen flex flex-wrap content-between bg-transparent '>
// <div className='w-full bg-red-200 absolute h-screen'>
       
        
// </div>
// <div className='w-full h-full block '>
//   <Header />
//   <main className='bg-transparent z-30 relative ' style={{height:'70%'}}>
//     <Outlet />
//   </main>
//   <Footer />
// </div>
// </div>