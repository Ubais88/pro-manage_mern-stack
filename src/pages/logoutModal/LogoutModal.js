import React from "react";
import styles from "./LogoutModal.module.css";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setModalOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.logoutModalContainer}>
      <div className={styles.logoutModalContent}>
        <p className={styles.message}>Are you sure you want to Logout?</p>
        <button className={styles.logoutButton} onClick={() => navigate("/")}>
          Yes, Logout
        </button>
        <button
          className={styles.cancelButton}
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
