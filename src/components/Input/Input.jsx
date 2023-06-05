import React from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

export const Input = ({
  value,
  onChange,
  type,
  name,
  placeholder,
  className,
  error,
  children,
}) => {
  return (
    <div className={classNames(styles.inputWrapper, className)}>
      <input
        className={classNames(styles.input, {
          [styles.error]: error,
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {children}
      {error ? <p className={styles.errorLabel}>{error}</p> : null}
    </div>
  );
};
