"use client";
import axiosInstance from "@/lib/axios";
import styles from "@/styles/register.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = ({}) => {
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
      .post(`users/register/`, {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const router = useRouter();

  return (
    <main>
      <div className="container d-flex flex-column gap-5 align-items-center justify-content-center h-100 v-100">
        <h1
          className={`text-align-left fs-1 flex-shrink-1 fw-bold ${styles.formTitle}`}
        >
          Register
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="form d-flex flex-column justify-content-center"
        >
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${styles.userInput}`}
              id="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
        <span className={styles.infoText}>
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Login
          </Link>
        </span>
      </div>
    </main>
  );
};

export default RegisterPage;
