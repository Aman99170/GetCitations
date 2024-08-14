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
  width: '15%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Button() {
  return (
    <motion.a
      href="/getstarted"
      style={buttonStyle}
      variants={buttonVariants}
      initial="normal"
      whileHover="hover"
    >
      Get Started
    </motion.a>
  );
}
