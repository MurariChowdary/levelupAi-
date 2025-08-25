import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.98
    }
  };
  
  // Page transition settings
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };
  
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;