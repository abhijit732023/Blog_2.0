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
  //problem is how we are using use s

  const navigate = useNavigate();
  const [nameee, setname] = useState(null);

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      const name = user.name[0]
      setname(name.toUpperCase())


    }
    )
    // if (authStatus && userdataName) {
    //   // setname(userdataName[0].toUpperCase());
    // }
  }, [authStatus,]);




  const navItems = [
    {
      name: '🅷🅾🅼🅴',
      slug: "/",
      active: true
    },
    {
      name: "ℓσgιη",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "ѕιgηυρ",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "🅼🆈🅿🅾🆂🆃",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "🅰🅳🅳🅿🅾🆂🆃",
      slug: "/add-post",
      active: authStatus,
    },
  ]


  return (
    <header className='py-2 w-full shadow-xl backdrop-blur  relative flex justify-center items-center' style={{ height: '8%', fontFamily: "Bungee Tint"}}>
      <Container>
        <motion.nav
          className='flex justify-between m'>
          <div className='ml-2 flex items-center justify-center'>
           <Link to={"/profile"}> <motion.div //nameeee initial
              className='rounded-full size-10  text-black flex justify-center items-center bg-blue-400' >
              {nameee}
            </motion.div></Link>
          </div>
          <Link to='/'>
            <Logo width='70px' />
          </Link>
          <ul className='flex mx-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <motion.button
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full h-auto'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.5 }}
                    whileFocus={{ scale: 1.2 }}
                  >{item.name}</motion.button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </motion.nav>
      </Container>
    </header>
  )
}

export default Header