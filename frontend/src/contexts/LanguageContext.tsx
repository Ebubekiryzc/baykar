"use client";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import { FC, createContext, useEffect, useState } from "react";

interface ILanguageContext {
  mode: string;
  toggleMode: () => void;
}

const defaultValue: ILanguageContext = {
  mode: getLocalStorageItem("lang", "en"),
  toggleMode: () => undefined,
};

export const LanguageContext = createContext<ILanguageContext>(defaultValue);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [mode, setMode] = useState("en");

  useEffect(() => {
    const languageSelection: string | null = getLocalStorageItem("lang", null);
    if (languageSelection) {
      setMode(languageSelection);
      console.log(mode);
    } else {
      console.log("err");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "en" ? "tr" : "en";
      setLocalStorageItem("lang", newMode);
      return newMode;
    });
    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ toggleMode, mode }}>
      <>{children}</>
    </LanguageContext.Provider>
  );
};
