import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  normal: {
    backgroundColor: 'black',
    color: 'white',
    scale: 1,
  },
  hover: {
    backgroundColor: '#6DC893', // Different shade of green on hover
    color: 'black',
    scale: 1.1,
  },
};

const buttonStyle = {
  color: 'white',
  border: 'none',
  padding: '15px',
  borderRadius: '50px',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  outline: 'none',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export function CustomButton({href,text}:{href:string,text:String}) {
  return (
    <motion.a
      href={href}
      style={buttonStyle}
      variants={buttonVariants}
      initial="normal"
      whileHover="hover"
    >
      {text}
    </motion.a>
  );
}
