import styles from "@/styles/languageswitcher.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import { LanguageContext } from "@/contexts/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { toggleMode, mode } = useContext(LanguageContext);

  const handleLanguageChange = () => {
    toggleMode();
    axios.defaults.headers.common["Accept-Language"] = mode;
  };

  return (
    <div
      className={`rounded-100 ${styles.languageSwitcher}`}
      onClick={handleLanguageChange}
    >
      {mode}
    </div>
  );
};

export default LanguageSwitcher;
