import React from "react";
import styles from "./styles.module.scss";

const TextArea = ({
  placeholder,
  label,
  onChange,
  type,
  value,
  error,
  rows
}) => {
  const labelClassName = error && styles.container_labelError;
  const textAreaClassName = error && styles.container_textareaError;
  return (
    <div className={styles.container}>
      <label className={labelClassName} id={label}>
        {label}
      </label>
      <textarea
        className={textAreaClassName}
        rows={rows ? rows : "5"}
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

export default TextArea;
