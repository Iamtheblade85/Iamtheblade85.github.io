import React from "react";
import styles from "./styles.module.scss";

const Checkbox = ({ checked, onChange }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};

export default Checkbox;
