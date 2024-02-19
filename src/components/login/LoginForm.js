import React, { useState } from "react";
import styles from "./Login.module.css";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = ({ setLoginFormActive }) => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
    setErrors({});
  };

  const isFormValid = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email);
    const isPasswordValid = loginFormData.password.length >= 5;

    if (!isEmailValid) {
      newErrors.email = "Invalid Email";
    }

    if (!isPasswordValid) {
      newErrors.password = "Weak password";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log(loginFormData);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.fieldContainer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          <MdOutlineEmail
            fontSize={20}
            fill="#828282"
            className={styles.inputIcon}
          />
        </div>
        <div className={styles.errorContainer}>
          <span className={styles.error}>{errors.email}</span>
        </div>

        <div className={styles.fieldContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={styles.inputField}
            value={loginFormData.password}
            onChange={handleInputChange}
          />
          <MdLockOutline
            fontSize={20}
            fill="#828282"
            className={styles.inputIcon}
          />
          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <AiOutlineEyeInvisible
                fontSize={22}
                fill="#828282"
                className={styles.eyeIcon}
              />
            ) : (
              <AiOutlineEye
                fontSize={22}
                fill="#828282"
                className={styles.eyeIcon}
              />
            )}
          </span>
        </div>
        <div className={styles.errorContainer}>
          <span className={styles.error}>{errors.password}</span>
        </div>

        <button className={styles.loginButton}>Log In</button>
        <p className={styles.reminder}>Have no account yet?</p>
      </form>
      <button
        className={styles.register}
        onClick={() => setLoginFormActive((prev) => !prev)}
      >
        Register
      </button>
    </div>
  );
};

export default LoginForm;
