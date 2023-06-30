import React from 'react';
import styles from './styles.module.scss';
import { motion } from "framer-motion"

export const Home = () => {
  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <h1>Home Page</h1>
    </motion.div>
  )
}