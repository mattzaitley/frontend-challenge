import React from "react";
import classNames from "classnames";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  type = "button",
  disabled,
  onClick,
  className,
  href,
}) => {
  const tag = href ? Link : "button";
  const linkProps = href ? { to: href } : {};
  return React.createElement(tag, {
    ...linkProps,
    className: classNames(styles.button, className, {
      [styles.disabled]: disabled,
    }),
    onClick,
    type,
    disabled,
    children,
  });
};
