import React from 'react'
import { motion } from 'framer-motion'

const animations = {
  initial : { opacity : 0, x  : 100},
  animate : { opacity : 1, x  : 0},
  exit    : { opacity : 0, x  : -100},
  
}

const Animated = ({ children }) => {
  return (
    <motion.div style={ { width : '100%'}} variants={animations} 
      initial     = "initial" 
      animate     = "animate"
      exit        = "exit"
      transition  = { { duration  : 0.7 } }
      >
      { children }
    </motion.div>
  )
}

export default Animated