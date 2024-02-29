import React from "react";
import styles from "./MenuModal.module.css";
import handleCopyClick from "../../utils/clipboardUtils.js";
import { useAuth } from "../../store/auth.js";
import axios from "axios";
import toast from "react-hot-toast";

const MenuModal = ({ cardId }) => {
  const {
    authorizationToken,
    BASE_URL,
    setCardData,
    setMenuModalState,
    LogoutUser,
    setEditModalOpen,
    setActionType,
    setLogoutModalOpen,
  } = useAuth();

  const handleShareClick = () => {
    handleCopyClick(cardId);
    setMenuModalState({});
  };

  const editHandler = async () => {
    setMenuModalState({});
    try {
      const response = await axios.get(`${BASE_URL}/card/getcard/${cardId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("getCard response: ", response);

      if (response.status === 200) {
        setCardData(response.data.card);
        setEditModalOpen(true);
      } else {
      
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("stats  error:", error);
      if (error.response && error.response.status === 401) {
        LogoutUser(); 
      }
      toast.error("Something went wrong");
    }
  };

  const handleDelete = () => {
    setLogoutModalOpen(true);
    setActionType("Delete");
    setMenuModalState({});
  };

  return (
    <div className={styles.logoutModalContainer}>
      <div className={styles.btnContainer}>
        <div className={styles.edit} onClick={editHandler}>
          Edit
        </div>
        <div className={styles.share} onClick={handleShareClick}>
          Share
        </div>
        <div className={styles.delete} onClick={handleDelete}>
          Delete
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
