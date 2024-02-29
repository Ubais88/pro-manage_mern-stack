import React, { useEffect, useState } from "react";
import LoginForm from "../../components/login/LoginForm.js";
import RegisterForm from "../../components/register/RegisterForm.js";
import styles from "./Auth.module.css";
import Logo from "../../assets/Art.png";
import { useAuth } from "../../store/auth.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { isLoggedIn } = useAuth();
  const [isLoginFormActive, setLoginFormActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.assetsContainer}>
          <div className={styles.asset}>
            <div className={styles.circle}></div>
            <img src={Logo} alt="Logo" className={styles.logo} />
          </div>
          <p className={styles.welcomeText}>Welcome aboard my friend</p>
          <p className={styles.subText}>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.formTitle}>
          {isLoginFormActive ? "Login" : "Register"}
        </p>
        <div className={styles.formContent}>
          {isLoginFormActive ? (
            <LoginForm setLoginFormActive={setLoginFormActive} />
          ) : (
            <RegisterForm setLoginFormActive={setLoginFormActive} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
