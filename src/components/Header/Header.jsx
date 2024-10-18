import React, { useEffect, useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/roboto';
import authService from '../../appwrite/auth';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);


  const navigate = useNavigate();
  const [nameee, setname] = useState('');

  useEffect(() => {
    if (authStatus) {

      authService.getCurrentUser().then(
        user => {
          if (user.name) {
            setname(user.name[0].toUpperCase())
          }

        }
      )
    }



  }, [setname])



  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "sigup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: 'Mypost',
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Addpost",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className='py-2 w-full shadow-xl backdrop-blur  relative flex justify-center items-center ' style={{ height: '9%', fontFamily: "Bungee Tint" }}>
      <Container>
        <motion.nav
          className='flex justify-between items-center '>
          <Link to={"/profile"}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              whileFocus={{ scale: 1.2 }}
              className='ml-2 flex items-center justify-center'>

              {<motion.div //nameeee initial
                className='rounded-full size-10  text-black flex justify-center items-center ' style={{ backgroundColor: '#f8b195' }} >
                <i class="fa-solid fa-user"></i>
              </motion.div>}
            </motion.div>
          </Link>
          <Link to='/'>
            <div className=' w-80 content-center flex justify-end '>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.5 }}
                whileFocus={{ scale: 1.2 }}
                className='right-0 flex justify-center items-center size-32 h-14'>
                <Logo width='' />
              </motion.div>
            </div>
          </Link>
          <ul className='flex'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} onClick={() => navigate(item.slug)}>
                  <motion.button

                    
                    className='inline-bock rel px-6 py-2 mx-1 duration-200 hover:bg-orange-200 rounded-full h-auto'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.5 }}
                    whileFocus={{ scale: 1.2 }}
                  >{item.name}</motion.button>
                </li>
              ) : null
            )}

          </ul>
        </motion.nav>
      </Container>
    </header>
  )
}

export default Header