import React from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Loader from "../Loader/Loader";

const Button = ({
  children,
  onClick,
  loader,
  disabled = false,
  color,
  size,
}) => {
  const buttonClass = classNames(
    styles.button,
    color === "white"
      ? styles.btn_white
      : color === "olive"
      ? styles.btn_olive
      : color === "blue"
      ? styles.btn_blue
      : "",
    size === "fit"
      ? styles.btn_fit
      : size === "medium"
      ? styles.btn_medium
      : size === "large"
      ? styles.btn_large
      : ""
  );

  return (
    <button
      className={buttonClass}
      style={{ opacity: disabled ? "0.5" : "1" }}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={loader ? styles.button_title_opacity : ""}>
        {children}
      </span>
      {loader && <Loader size={20} />}
    </button>
  );
};

export default Button;
