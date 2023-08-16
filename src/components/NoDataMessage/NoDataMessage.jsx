import React from "react";
import styles from "./styles.module.scss";

const NoDataMessage = ({ message = "Data not found" }) => {
  return <div className={styles.container}>{message}</div>;
};

export default NoDataMessage;
