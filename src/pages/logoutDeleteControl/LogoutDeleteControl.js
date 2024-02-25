import React from "react";
import styles from "./LogoutDeleteControl.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";

const LogoutDeleteControl = ({ setModalOpen, actionType, cardId }) => {
  const { authorizationToken, LogoutUser, isLoggedIn, BASE_URL } = useAuth();
  const navigate = useNavigate();
  if (!isLoggedIn) {
    navigate("/");
  }

  const handleAction = async () => {
    if (actionType === "Logout") {
      logoutHandler();
    } else if (actionType === "Delete") {
      deleteHandler();
    }
  };

  const logoutHandler = () => {
    LogoutUser();
    navigate("/");
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/card/delete/${cardId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        toast.success("Card deleted successfully");
        setModalOpen(false);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response && error.response.status === 401) {
        LogoutUser();
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.logoutModalContainer}>
      <div className={styles.logoutModalContent}>
        <p className={styles.message}>Are you sure you want to {actionType}?</p>
        <button className={styles.logoutButton} onClick={handleAction}>
          Yes, {actionType}
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

export default LogoutDeleteControl;
