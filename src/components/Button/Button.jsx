import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export const Button = ({
  children,
  type = "button",
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
