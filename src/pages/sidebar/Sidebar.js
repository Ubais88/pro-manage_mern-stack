import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { LuLayout } from "react-icons/lu";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CodeSandBox from "../../assets/codesandbox.png";
import LogoutDeleteControl from "../logoutDeleteControl/LogoutDeleteControl";
import { useAuth } from "../../store/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setActionType, actionType, logoutModalOpen, setLogoutModalOpen } =
    useAuth();
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const handleMenuItemClick = (value) => {
    setSelectedMenuItem(value);
  };

  const logoutClickHandler = () => {
    setActionType("Logout");
    setLogoutModalOpen(true);
  };

  useEffect(() => {
    navigate(`/${selectedMenuItem}`);
  }, [selectedMenuItem]);

  return (
    <>
      <div className={styles.sidebarContainer}>
        <div className={styles.routes}>
          <div className={styles.logoContainer}>
            <img src={CodeSandBox} alt="logo" className={styles.sandboxLogo} />
            <h1 className={styles.logoText}>Pro Manage</h1>
          </div>

          <div className={styles.menuItems}>
            {["dashboard", "analytics", "settings"].map((item) => (
              <div
                key={item}
                className={`${styles.menuItem} ${
                  selectedMenuItem === item && styles.selectedMenuItem
                }`}
                onClick={() => handleMenuItemClick(item)}
              >
                <div className={styles.text}>
                  {item === "dashboard" && <LuLayout />}
                  {item === "analytics" && <GoDatabase />}
                  {item === "settings" && <IoSettingsOutline />}
                  {item === "dashboard"
                    ? "Board"
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.logoutContainer}>
          <h2 className={styles.logoutText} onClick={logoutClickHandler}>
            <HiOutlineLogout />
            Logout
          </h2>
        </div>
      </div>
      {logoutModalOpen && actionType == "Logout" && (
        <LogoutDeleteControl setLogoutModalOpen={setLogoutModalOpen} />
      )}
    </>
  );
};

export default Sidebar;
