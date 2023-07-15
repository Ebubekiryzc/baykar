"use client";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import { FC, createContext, useEffect, useState } from "react";

interface IThemeContext {
  mode: string;
  toggleMode: () => void;
}

const defaultValue: IThemeContext = {
  mode: getLocalStorageItem("theme", "dark"),
  toggleMode: () => undefined,
};

export const ThemeContext = createContext<IThemeContext>(defaultValue);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const themeSelection: string | null = getLocalStorageItem("theme", null);
    if (themeSelection) {
      setMode(themeSelection);
    } else {
      console.log("err");
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      setLocalStorageItem("theme", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleMode, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
