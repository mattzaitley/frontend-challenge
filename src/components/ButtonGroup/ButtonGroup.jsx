import React from "react";
import styles from "./ButtonGroup.module.css";

export const ButtonGroup = ({ children }) => {
  return <div className={styles.buttonGroup}>{children}</div>;
};
