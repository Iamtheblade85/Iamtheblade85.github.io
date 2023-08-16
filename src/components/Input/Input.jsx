import React from "react";
import styles from "./styles.module.scss";

const Input = ({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange = () => {},
  error = "",
}) => {
  const labelClassName = error && styles.container_label_error;
  const inputClassName = error && styles.container_input_error;

  return (
    <div className={styles.container}>
      <label className={labelClassName} id={label}>
        {label}
      </label>
      <input
        className={inputClassName}
        id={label}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;
