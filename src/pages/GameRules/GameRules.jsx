import React from 'react'
import styles from "./style.module.scss"
import { motion } from "framer-motion"

const GameRules = () => {
  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      <h1>Game Rules</h1>
    </motion.div>
  )
}

export default GameRules