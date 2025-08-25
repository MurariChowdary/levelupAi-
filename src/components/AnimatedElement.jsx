import React from 'react';
import { motion } from 'framer-motion';

// Animation presets
const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 }
  },
  bounce: {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    exit: { opacity: 0, y: 20 }
  },
  stagger: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  }
};

// Transition presets
const transitions = {
  default: {
    duration: 0.3,
    ease: 'easeInOut'
  },
  slow: {
    duration: 0.6,
    ease: 'easeInOut'
  },
  fast: {
    duration: 0.15,
    ease: 'easeInOut'
  },
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20
  },
  bounce: {
    type: 'spring',
    stiffness: 300,
    damping: 10
  }
};

const AnimatedElement = ({
  children,
  animation = 'fadeIn',
  transition = 'default',
  delay = 0,
  duration,
  as = 'div',
  className,
  style,
  ...props
}) => {
  // Get animation preset or use custom animation
  const animationPreset = typeof animation === 'string' ? animations[animation] : animation;
  
  // Get transition preset or use custom transition
  let transitionPreset = typeof transition === 'string' ? transitions[transition] : transition;
  
  // Override duration if provided
  if (duration) {
    transitionPreset = { ...transitionPreset, duration };
  }
  
  // Add delay if provided
  if (delay) {
    transitionPreset = { ...transitionPreset, delay };
  }
  
  return (
    <motion.div
      initial={animationPreset.initial}
      animate={animationPreset.animate}
      exit={animationPreset.exit}
      transition={transitionPreset}
      as={as}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for animating children in sequence
export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1, 
  delayStart = 0,
  ...props 
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayStart
          }
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Stagger item to be used inside StaggerContainer
export const StaggerItem = ({ 
  children, 
  animation = 'slideUp',
  transition = 'default',
  ...props 
}) => {
  // Get animation preset
  const animationPreset = typeof animation === 'string' ? animations[animation] : animation;
  
  // Get transition preset
  const transitionPreset = typeof transition === 'string' ? transitions[transition] : transition;
  
  return (
    <motion.div
      variants={{
        initial: animationPreset.initial,
        animate: {
          ...animationPreset.animate,
          transition: transitionPreset
        },
        exit: animationPreset.exit
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;