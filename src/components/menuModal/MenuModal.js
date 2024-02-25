import React, { useState } from "react";
import styles from "./MenuModal.module.css";
import LogoutDeleteControl from "../../pages/logoutDeleteControl/LogoutDeleteControl.js";
import handleCopyClick from "../../utils/clipboardUtils.js";
import CreateChecklist from "../../pages/addChecklistModal/CreateChecklist.js";

const MenuModal = ({ cardId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleShareClick = () => {
    handleCopyClick(cardId);
  };

  return (
    <div className={styles.logoutModalContainer}>
      <div className={styles.btnContainer}>
        <div className={styles.edit} onClick={() => setEditModalOpen(true)}>
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
        <LogoutDeleteControl title={"Delete"} setModalOpen={setModalOpen} />
      )}
      {editModalOpen && <CreateChecklist setEditModalOpen={setEditModalOpen} />}
    </div>
  );
};

export default MenuModal;
