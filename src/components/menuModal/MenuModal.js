import React, { useState } from "react";
import styles from "./MenuModal.module.css";
import LogoutDeleteControl from "../../pages/logoutDeleteControl/LogoutDeleteControl.js";
import handleCopyClick from "../../utils/clipboardUtils.js";
import CreateChecklist from "../../pages/addChecklistModal/CreateChecklist.js";
import { useAuth } from "../../store/auth.js";
import axios from "axios";
import toast from "react-hot-toast";

const MenuModal = ({ cardId }) => {
  const { authorizationToken, BASE_URL, setCardData, LogoutUser } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleShareClick = () => {
    handleCopyClick(cardId);
  };

  const editHandler = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/card/getcard/${cardId}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      console.log("getCard response: ", response);

      if (response.status === 200) {
        setCardData(response.data.card);
        setEditModalOpen(true)
        //console.log("quizData response:", response.data);
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        //console.log("Invalid credential");
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error("Something went wrong");
    }
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
        <div className={styles.delete} onClick={() => setModalOpen(true)}>
          Delete
        </div>
      </div>
      {modalOpen && (
        <LogoutDeleteControl
          actionType={"Delete"}
          setModalOpen={setModalOpen}
          cardId={cardId}
        />
      )}
      {editModalOpen && (
        <CreateChecklist cardId={cardId} setEditModalOpen={setEditModalOpen} />
      )}
    </div>
  );
};

export default MenuModal;
