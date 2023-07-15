"use client";
import axiosInstance from "@/lib/axios";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/utils";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  const router = useRouter();
  const initialFormData = Object.freeze({
    email: "",
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);
  // @ts-expect-error
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // @ts-expect-error
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post(`token/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        setLocalStorageItem("access_token", res.data.access);
        setLocalStorageItem("refresh_token", res.data.refresh);
        setLocalStorageItem("is_staff", res.data.is_staff);
        setLocalStorageItem("username", res.data.username);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT" + getLocalStorageItem("refresh_token", null);
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div className="container d-flex flex-column gap-5 align-items-center justify-content-center h-100 v-100">
        <h1
          className={`text-align-left fs-1 flex-shrink-1 fw-bold ${styles.formTitle}`}
        >
          Login
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="form d-flex flex-column justify-content-center"
        >
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="username"
              placeholder="Username"
              name="username"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className={`form-control ${styles.userInput}`}
              id="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
        <span className={styles.infoText}>
          Don't have an account yet?{" "}
          <Link className="text-primary" href="/register">
            Register
          </Link>
        </span>
      </div>
    </main>
  );
};

export default LoginPage;
