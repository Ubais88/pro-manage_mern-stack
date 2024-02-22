import React from "react";
import Logo from "../../assets/codesandbox.png";
import styles from "./ViewChecklist.module.css";
import { IoEllipseSharp } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const ViewChecklist = () => {
  return (
    <div className={styles.viewContainer}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" />
        <p className={styles.logoTitle}>Pro Manage</p>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.itemIcon}>
          <IoEllipseSharp color="#FF2473" size={8} />
          <p className={styles.itemLabel}>HIGH PRIORITY</p>
        </div>

        <div className={styles.itemName}>Hero section</div>

        <div className={styles.checklistContainer}>
          <p className={styles.checklistCount}>Checklist (0/3)</p>
          <div className={styles.checklistScroll}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,23].map((index) => (
              <div className={styles.checklistContent} key={index}>
                <input type="checkbox" className={styles.checkBox} />
                <p className={styles.checklistText}>Task to be done</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dateAndBtn}>
          <p className={styles.dueDate}>Due Date</p>
          <div className={styles.dateButton}>Feb 10th</div>
        </div>
      </div>
    </div>
  );
};

export default ViewChecklist;
