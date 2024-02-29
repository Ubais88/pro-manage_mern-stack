import React from "react";
import styles from "./Card.module.css";
import { IoEllipseSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import MenuModal from "../menuModal/MenuModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../store/auth";

const Card = (props) => {
  const {
    card,
    sectionName,
    fetchStats,
    setLoading,
    cardId,
    toggleMenuModal,
    checklistCollapse,
    setChecklistCollapse,
  } = props;
  const {
    authorizationToken,
    BASE_URL,
    menuModalState,
    sortingTime,
    LogoutUser,
  } = useAuth();

  const toggleChecklistCollapse = (cardId) => {
    setChecklistCollapse((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  const updateChecklist = async (cardId, itemId, isChecked) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/card/toggle/${cardId}/checklist/${itemId}`,
        { isChecked },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        fetchStats(sortingTime);
      } else {
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
    } catch (error) {
      console.error("stats  error:", error);
      if (error.response && error.response.status === 401) {
        LogoutUser();
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleMoveCard = async (targetSection, cardId) => {
    console.log("targetSection", targetSection, "cardId", cardId);
    try {
      const response = await axios.put(
        `${BASE_URL}/card/movecard/${cardId}`,
        { targetSection },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        fetchStats(sortingTime);
      } else {
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("stats  error:", error);
      if (error.response && error.response.status === 401) {
        LogoutUser();
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const otherSections = ["Backlog","ToDo", "InProgress", "Done"].filter(
    (s) => s !== sectionName
  );

  return (
    <div className={styles.cardBody} key={card._id}>
      <div className={styles.item}>
        <div className={styles.itemIcon}>
          <IoEllipseSharp
            color={
              {
                low: "#63C05B",
                moderate: "#18B0FF",
                high: "#FF2473",
              }[card.priority.split(" ")[0].toLowerCase()] || "#000"
            }
            size={8}
          />
          <p className={styles.itemLabel}>{card.priority}</p>
        </div>
        <BsThreeDots
          className={styles.moreIcon}
          size={15}
          onClick={() => toggleMenuModal(card._id)}
        />
        {menuModalState[card._id] && (
          <div className={styles.menuModal}>
            <MenuModal cardId={cardId} />
          </div>
        )}
      </div>

      <div className={styles.itemName} title={card.title}>
        {truncateTitle(card.title, 20)}
      </div>

      <div className={styles.checklistContainer}>
        <div className={styles.checklistHeader}>
          <p className={styles.checklistCount}>
            Checklist ({card.checkList.filter((item) => item.isChecked).length}/
            {card.checkList.length})
          </p>
          {checklistCollapse[card._id] ? (
            <MdOutlineKeyboardArrowDown
              className={styles.arrowIcon}
              onClick={() => toggleChecklistCollapse(card._id)}
            />
          ) : (
            <MdOutlineKeyboardArrowUp
              className={styles.arrowIcon}
              onClick={() => toggleChecklistCollapse(card._id)}
            />
          )}
        </div>

        {!checklistCollapse[card._id] &&
          card.checkList.length > 0 &&
          card.checkList.map((checkList) => (
            <div className={styles.checklistContent} key={checkList._id}>
              <input
                type="checkbox"
                className={styles.checkBox}
                defaultChecked={checkList.isChecked}
                onClick={(e) =>
                  updateChecklist(card._id, checkList._id, e.target.checked)
                }
              />
              <p className={styles.checklistText}>{checkList.text}</p>
            </div>
          ))}
      </div>

      <div className={styles.dateAndBtn}>
        {card.formattedCreatedAt ? (
          <div
            className={styles.dateButton}
            style={{
              backgroundColor:
                sectionName === "Done"
                  ? "#63C05B"
                  : card.formattedCreatedAt.color,
              color:
                sectionName !== "Done" &&
                card.formattedCreatedAt.color === "#DBDBDB"
                  ? "#5A5A5A"
                  : "#fff",
            }}
          >
            {card.formattedCreatedAt.formattedDate}
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.buttonContainer}>
          {otherSections.map((btn) => (
            <button
              key={btn}
              className={styles.statusButton}
              value={btn}
              onClick={(e) => handleMoveCard(e.target.value, card._id)}
            >
              {(btn === "ToDo" ? "To-Do" : btn).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
