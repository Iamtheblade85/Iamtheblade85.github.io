import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Error = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container_errorSection}>
        <h1>404</h1>
        <p>
          Whoops! Looks like you've wandered off course into the depths of
          space. Apologies for the cosmic hiccup, but the page you're seeking
          seems to have disappeared into the galactic abyss.
        </p>
        <h2>
          Go back to <Link to={"/home"}>Home</Link>
        </h2>
      </div>
    </motion.div>
  );
};

export default Error;
