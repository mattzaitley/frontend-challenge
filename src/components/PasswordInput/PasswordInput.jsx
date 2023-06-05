import React from "react";
import { Input } from "../Input";
import styles from "./PasswordInput.module.css";

export const PasswordInput = ({ ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  return (
    <Input
      className={styles.input}
      {...rest}
      type={isPasswordVisible ? "text" : "password"}
    >
      <button
        type="button"
        className={styles.showButton}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? "Hide" : "View"}
      </button>
    </Input>
  );
};
