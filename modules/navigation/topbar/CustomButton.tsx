import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  normal: {
    backgroundColor: 'black',
    color: 'white',
    scale: 1,
  },
  hover: {
    backgroundColor: 'green', // Different shade of green on hover
    color: 'black',
    scale: 1.1,
    transition: {
      duration: 0.3, // Adjust the duration as needed
    },
  },
};

const buttonStyle = {
  color: 'white',
  border: 'none',
  padding: '15px',
  borderRadius: '30px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  outline: 'none',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const CustomButton = ({ children, href }:{children:any,href:string}) => {
  return (
    <motion.a
      href={href}
      style={buttonStyle}
      variants={buttonVariants}
      initial="normal"
      whileHover="hover"
    >
      {children}
    </motion.a>
  );
};

export default CustomButton;
