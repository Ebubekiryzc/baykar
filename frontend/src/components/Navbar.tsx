"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { FC, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const username = getLocalStorageItem("username", undefined);
const is_staff = getLocalStorageItem("is_staff", undefined);

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
    show: true,
  },
  {
    id: 2,
    title: "UAVs",
    url: "/uavs",
    show: true,
  },
  {
    id: 3,
    title: "Login",
    url: "/login",
    show: !username,
  },
  {
    id: 4,
    title: "Register",
    url: "/register",
    show: !username,
  },
  {
    id: 5,
    title: "Admin",
    url: "/admin",
    show: username && is_staff,
  },
];

const Navbar: FC = () => {
  const [opened, setOpened] = useState(false);
  const [clickedNavbarBars, setClickedNavbarBars] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    const refresh_token = getLocalStorageItem("refresh_token", null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("username");
    axiosInstance.post(`users/logout/blacklist/`, {
      refresh_token: refresh_token,
    });
    router.push("/");
    router.refresh();
  };

  const toggleDropdown = () => {
    setOpened((prev) => !prev);
  };

  const getDropdownMenuStyle = () => {
    if (opened) return [styles.dropdownMenu, styles.open].join(" ");
    else return styles.dropdownMenu;
  };

  const navbarDropdown = useRef<HTMLDivElement>(null);

  useOnClickOutside(navbarDropdown, () => {
    if (clickedNavbarBars) {
      setClickedNavbarBars(false);
      return;
    }
    if (opened) toggleDropdown();
  });

  return (
    <header id={styles.header}>
      <div className="container">
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link href="/" className={styles.navbarLogo}>
              BAYKAR
            </Link>
          </div>
          <div className={styles.nav}>
            <DarkModeToggle />
            <LanguageSwitcher />
            <div className={styles.links}>
              {links.map((link) =>
                link.show ? (
                  <Link key={link.id} href={link.url} className={styles.links}>
                    {link.title}
                  </Link>
                ) : null
              )}
              {username ? (
                <>
                  <Link href={`/update-profile/${username}`}>Edit Profile</Link>
                  <a
                    className={styles.logoutButton}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </a>
                </>
              ) : null}
            </div>
          </div>
          <div
            className={styles.navbarToggle}
            onClick={() => {
              setClickedNavbarBars(true);
              toggleDropdown();
            }}
          >
            {opened ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <div ref={navbarDropdown} className={getDropdownMenuStyle()}>
          <div className={styles.links}>
            {links.map((link) =>
              link.show ? (
                <Link
                  key={link.id}
                  href={link.url}
                  onClick={() => toggleDropdown()}
                >
                  {link.title}
                </Link>
              ) : null
            )}
            {username ? (
              <>
                <Link href={`/update-profile/${username}`}>Edit Profile</Link>
                <a
                  className={styles.logoutButton}
                  onClick={() => handleLogout()}
                >
                  Logout
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
