import React, { useEffect, useState } from "react";
import Logo from "../../assets/codesandbox.png";
import styles from "./ViewChecklist.module.css";
import { IoEllipseSharp } from "react-icons/io5";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewChecklist = () => {
  const { cardId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState();
  const [totalChecked, setTotalChecked] = useState(0);
  const { BASE_URL } = useAuth();

  const fetchAnalysisData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/card/getcard/${cardId}`);

      if (response.status === 200) {
        setCardData(response.data.card);
        setTotalChecked(response.data.totalChecked);
        setLoading(false);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
    } catch (error) {
      console.error("stats  error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAnalysisData();
  }, []);
  console.log("cardData:", cardData);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.viewContainer}>
          <div className={styles.logoContainer}>
            <img src={Logo} alt="Logo" />
            <p className={styles.logoTitle}>Pro Manage</p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.itemIcon}>
              <IoEllipseSharp color="#FF2473" size={8} />
              <p className={styles.itemLabel}>{cardData.priority}</p>
            </div>

            <div className={styles.itemName}>{cardData.title}</div>

            <div className={styles.checklistContainer}>
              {/* Show the count of checked items */}
              <p className={styles.checklistCount}>
                Checklist ({totalChecked}/{cardData.checkList.length})
              </p>
              <div className={styles.checklistScroll}>
                {cardData.checkList.map((checkList) => (
                  <div className={styles.checklistContent} key={checkList._id}>
                    <input
                      type="checkbox"
                      className={styles.checkBox}
                      checked={checkList.isChecked}
                      readOnly // Make the checkbox read-only
                    />
                    <p className={styles.checklistText}>{checkList.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {cardData.formattedCreatedAt && (
              <div className={styles.dateAndBtn}>
                <p className={styles.dueDate}>Due Date</p>
                <div
                  className={styles.dateButton}
                  style={{
                    backgroundColor: cardData.formattedCreatedAt.color,
                  }}
                >
                  {cardData.formattedCreatedAt.formattedDate}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewChecklist;
