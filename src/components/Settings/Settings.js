import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";

const Settings = () => {
  const { authorizationToken, BASE_URL, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: localStorage.getItem("name"),
    oldPassword: "",
    newPassword: "",
  });

  const [nameModified, setNameModified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Check if the name has been modified
    if (name === "name" && value.trim() !== localStorage.getItem("name")) {
      setNameModified(true);
    } else {
      setNameModified(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameModified && !formData.oldPassword && !formData.newPassword) {
      toast.error("Enter Data to Update");
    } else if (!formData.oldPassword && formData.newPassword) {
      toast.error("Please enter your old password.");
    } else if (formData.oldPassword && !formData.newPassword) {
      toast.error("Please enter your new password.");
    } else {
      setLoading(true);
      console.log("formData: ", formData);
      try {
        const { name, oldPassword, newPassword } = formData;
        const response = await axios.put(
          `${BASE_URL}/auth/update`,
          { name, oldPassword, newPassword },
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );
        if (response.status === 200) {
          // Successful login
          localStorage.setItem("name", response.data.updatedUserDetails.name);
          console.log("response  :", response);
          setFormData({
            name: response.data.updatedUserDetails.name,
            oldPassword: "",
            newPassword: "",
          });
          toast.success("Update successful");
        } else {
          // Failed login
          const res_data = response.data; // Access the response data directly
          toast.error(res_data.message);
        }
        setLoading(false);
      } catch (error) {
        // Log any errors
        console.error("Update error:", error);
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.settingsHeader}>Settings</div>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                className={styles.inputField}
                onChange={handleInputChange}
              />
              <CiUser
                fontSize={20}
                fill="#828282"
                className={styles.inputIcon}
              />
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
      )}
    </>
  );
};

export default Settings;
