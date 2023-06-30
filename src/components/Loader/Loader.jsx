import React from 'react';
import styles from './styles.module.scss';

const Loader = ({ size }) => {
  return (
    <div
      className={styles.loader}
      style={{ width: size, height: size }}
    >
    </div>
  );
};

export default Loader;