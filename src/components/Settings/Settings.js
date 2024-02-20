import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import toast from "react-hot-toast";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name && !formData.oldPassword && !formData.newPassword) {
        toast.error("Enter Data to Update");
    } else if (!formData.oldPassword && formData.newPassword) {
      toast.error("Please enter your old password.");
    } else if (formData.oldPassword && !formData.newPassword) {
      toast.error("Please enter your new password.");
    }
    console.log(formData);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.settingsHeader}>Settings</div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.fieldContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.inputField}
            onChange={handleInputChange}
          />
          <CiUser fontSize={20} fill="#828282" className={styles.inputIcon} />
        </div>

        <div className={styles.fieldContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            placeholder="Old Password"
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

        <div className={styles.fieldContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
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

        <button className={styles.updateButton}>Update</button>
      </form>
    </div>
  );
};

export default Settings;
