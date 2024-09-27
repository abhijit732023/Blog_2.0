import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Name() {
  const [name, setName] = useState('');
  const [colors, setColors] = useState('');
  const color = ['red', 'blue', 'green', 'yellow'];
  const select = useSelector((state) => state.auth.status);
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const choosen = Math.floor(Math.random() * color.length);
    setColors(color[choosen]);

    if (select) {
      authService.getCurrentUser().then((data) => {
        const date = new Date(data.$createdAt);
        console.log(date.toLocaleString());

        if (data) {
          const initial = data.name;
          console.log(initial);
          setName((initial[0]).toLocaleUpperCase());
        } else {
          setName('!');
        }
      });
    } else {
      setName('');
      setDisplay('none');
    }
  }, [select, name]);

  return (
    <Link to={'/'}>
      {select ? (
        <motion.div
          className='rounded-full size-10 flex justify-center items-center text-white'
          style={{ backgroundColor: colors, display: display }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {name}
        </motion.div>
      ) : (
        <div>hello</div>
      )}
    </Link>
  );
}

export default Name;