import React, { useState } from "react";
import styles from "./Register.module.css";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const RegisterForm = ({setLoginFormActive}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
  };

  const isFormValid = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 5;

    if(!formData.name){
      newErrors.name = "Name is required"
    }
    if (!isEmailValid) {
      newErrors.email = "Invalid Email";
    }

    if (!isPasswordValid) {
      newErrors.password = "Weak password";
    }
    if(formData.password !== formData.confirmPassword){
      console.log(formData.password)
      console.log(formData.confirmPassword)
      newErrors.confirmPassword = "Password not match"
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFormValid()){
        console.log(formData);
    }
  };


  return (
    <div className={styles.mainContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit} >

        {/* name */}
        <div className={styles.fieldContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          <CiUser
            fontSize={20}
            fill="#828282"
            className={styles.inputIcon}
          />
        </div>
        <div className={styles.errorContainer}>
          <span className={styles.error}>{errors.name}</span>
        </div>

        {/* email */}
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

        {/* password */}
        <div className={styles.fieldContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={styles.inputField}
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

        {/* confirm password */}
        <div className={styles.fieldContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          <MdLockOutline
            fontSize={20}
            fill="#828282"
            className={styles.inputIcon}
          />
          <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
            {showConfirmPassword ? (
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
          <span className={styles.error}>{errors.confirmPassword}</span>
        </div>

        <button className={styles.loginButton}>Register</button>
        <p className={styles.reminder}>Have an account?</p>
      </form>
      <button className={styles.register} onClick={() => setLoginFormActive((prev) => !prev)}>Log in</button>

    </div>
  );
};

export default RegisterForm;