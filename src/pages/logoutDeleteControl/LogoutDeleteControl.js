import React from "react";
import styles from "./LogoutDeleteControl.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const LogoutDeleteControl = ({ setModalOpen, title, cardId }) => {
  const navigate = useNavigate();
  const { LogoutUser, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate("/");
  }

  const logoutClickHandler = () => {
    LogoutUser();
    navigate("/");
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/quiz/delete/${cardId}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      //console.log("delete response: ", response);

      if (response.status === 200) {
        // Successful deleted data
        toast.success("Quiz deleted successfully");
      } else {
        // Failed analysis
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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

export default LogoutDeleteControl;
