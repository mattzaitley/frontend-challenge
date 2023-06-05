import React from "react";
import styles from "./Checkbox.module.css";

export const Checkbox = ({ label, onChange, value }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={value}
      />
      {label}
    </label>
  );
};
