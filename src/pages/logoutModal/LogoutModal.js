import React from "react";
import styles from "./LogoutModal.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const LogoutModal = ({ setModalOpen, title }) => {
  const navigate = useNavigate();
  const { LogoutUser, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate("/");
  }

  const logoutClickHandler = () => {
    LogoutUser();
    navigate("/");
  };

  return (
    <div className={styles.logoutModalContainer}>
      <div className={styles.logoutModalContent}>
        <p className={styles.message}>Are you sure you want to {title}</p>
        <button className={styles.logoutButton} onClick={logoutClickHandler}>
          Yes, {title}
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
