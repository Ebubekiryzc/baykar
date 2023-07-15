"use client";
import { FC, useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import styles from "@/styles/darkmodetoggle.module.css";

const DarkModeToggle: FC = () => {
  const { toggleMode, mode } = useContext(ThemeContext);
  return (
    <div className={styles.container} onClick={toggleMode}>
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball}
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      />
    </div>
  );
};

export default DarkModeToggle;
