import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { LuLayout } from "react-icons/lu";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import CodeSandBox from "../../assets/codesandbox.png";
import LogoutModal from "../logoutModal/LogoutModal";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  const handleMenuItemClick = (e) => {
    const menuItem = e.target.id;
    setSelectedMenuItem(menuItem);
  };

  const logoutClickHandler = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    navigate(`/${selectedMenuItem}`);
  }, [selectedMenuItem]);

  return (
    <div>
      <div className={styles.sidebarContainer}>
        <div className={styles.routes}>
          <div className={styles.logoContainer}>
            <img src={CodeSandBox} alt="logo" className={styles.sandboxLogo} />
            <h1 className={styles.logoText}>Pro Manage</h1>
          </div>

          <div className={styles.menuItems}>
            <div
              onClick={handleMenuItemClick}
              className={`${styles.menuItem} ${
                selectedMenuItem === "dashboard" && styles.selectedMenuItem
              }`}
              id="dashboard"
            >
              <LuLayout />
              Board
            </div>
            <div
              className={`${styles.menuItem} ${
                selectedMenuItem === "analytics" && styles.selectedMenuItem
              }`}
              id="analytics"
              onClick={handleMenuItemClick}
            >
              <GoDatabase />
              Analytics
            </div>
            <div
              className={`${styles.menuItem} ${
                selectedMenuItem === "settings" && styles.selectedMenuItem
              }`}
              id="settings"
              onClick={handleMenuItemClick}
            >
              <IoSettingsOutline />
              Settings
            </div>
          </div>
        </div>

        <div className={styles.logoutContainer}>
          <h2 className={styles.logoutText} onClick={logoutClickHandler}>
            <HiOutlineLogout />
            Logout
          </h2>
        </div>
      </div>
      {modalOpen && (
        <LogoutModal title={"Logout"} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default Sidebar;
