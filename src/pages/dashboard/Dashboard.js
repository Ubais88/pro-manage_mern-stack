import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import CreateChecklist from "../addChecklistModal/CreateChecklist";
import { useAuth } from "../../store/auth";
import LogoutDeleteControl from "../logoutDeleteControl/LogoutDeleteControl";

const Dashboard = () => {
  const {
    authorizationToken,
    BASE_URL,
    LogoutUser,
    setMenuModalState,
    editModalOpen,
    setEditModalOpen,
    logoutModalOpen,
    actionType,
    sortingTime,
    setSortingTime,
  } = useAuth();
  const [cardData, setCardData] = useState();
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [checklistCollapse, setChecklistCollapse] = useState({});
  const [cardId, setCardId] = useState("");
  const navigate = useNavigate();

  const sections = ["Backlog", "ToDo", "InProgress", "Done"];

  useEffect(() => {
    fetchStats();
    setCurrentDate(moment().format("Do MMM, YYYY"));
  }, []);

  const fetchStats = async (sortingTime) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/card/getallcards`,
        { sortingTime },
        { headers: { Authorization: authorizationToken } }
      );

      if (response.status === 200) {
        setCardData(response.data.cards);
      } else {
        const message = response.data.message;
        toast.error(message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("stats  error:", error);
      if (error.response && error.response.status === 401) {
        LogoutUser();
        navigate("/");
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const toggleMenuModal = (index) => {
    setMenuModalState((prevState) => {
      const isOpen = prevState[index];
      const updatedState = {};
      Object.keys(prevState).forEach((key) => {
        updatedState[key] = false;
      });
      if (!isOpen) {
        updatedState[index] = true;
      }
      setCardId(isOpen ? "" : index);
      return updatedState;
    });
  };

  const collapseAllChecklistsInSection = (sectionName) => {
    const updatedCollapseState = { ...checklistCollapse };
    cardData[sectionName].forEach((card) => {
      updatedCollapseState[card._id] = true;
    });
    setChecklistCollapse(updatedCollapseState);
  };

  const handleChange = (e) => {
    setSortingTime(e.target.value);
    fetchStats(e.target.value);
  };

  return (
    <div className={styles.dashboardContainer}>
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <>
          <div className={styles.header}>
            <p className={styles.welcomeMessage}>
              Welcome! {localStorage.getItem("name")}
            </p>
            <p className={styles.date}>{currentDate}</p>
          </div>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Board</p>
            <select
              value={sortingTime}
              onChange={handleChange}
              className={styles.sectionDropDown}
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>

          <div className={styles.cardContainer}>
            <div className={styles.cardScroll}>
              {sections.map((section, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.cardHeader}>
                    <p className={styles.cardTitle}>{section}</p>
                    <div className={styles.addAndcollapse}>
                      {section === "ToDo" && (
                        <FaPlus
                          color="#767575"
                          size="18"
                          onClick={() => setEditModalOpen(true)}
                        />
                      )}
                      <VscCollapseAll
                        color="#767575"
                        size="20"
                        className={styles.collapseIcon}
                        onClick={() => collapseAllChecklistsInSection(section)}
                      />
                    </div>
                  </div>
                  <div className={styles.allCards}>
                    {Array.isArray(cardData[section]) &&
                      cardData[section].map((card) => (
                        <Card
                          key={card._id}
                          card={card}
                          setLoading={setLoading}
                          sectionName={section}
                          fetchStats={fetchStats}
                          cardId={cardId}
                          checklistCollapse={checklistCollapse}
                          toggleMenuModal={toggleMenuModal}
                          setChecklistCollapse={setChecklistCollapse}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {editModalOpen && (
            <CreateChecklist
              setEditModalOpen={setEditModalOpen}
              fetchStats={fetchStats}
            />
          )}
          {logoutModalOpen && (
            <LogoutDeleteControl
              actionType={actionType}
              fetchStats={fetchStats}
              cardId={cardId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
