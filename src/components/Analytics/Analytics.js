import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const { authorizationToken, LogoutUser, BASE_URL } = useAuth();
  const [cardAnalysisData, setCardAnalysisData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/card/analysis`, {
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (response.status === 200) {
          setCardAnalysisData(response.data.counts);
        } else {
          toast.error(response.data.message || "Failed to fetch analysis data");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          LogoutUser(); // Log out the user
          navigate("/");
        }
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchAnalysisData();
  }, [authorizationToken, BASE_URL]);

  const renderTaskItem = (name, count) => (
    <li className={styles.task}>
      <div className={styles.taskItem}>
        <span className={styles.taskName}>{name}</span>
        <span className={styles.taskCount}>{count}</span>
      </div>
    </li>
  );

  return (
    <>
      {loading ? (
        <div className={styles.loader}><div className="custom-loader"></div></div>
        
      ) : (
        <div className={styles.analyticsContainer}>
          <div className={styles.analyticsHeader}>Analytics</div>
          <div className={styles.analyticsLists}>
            <ul className={styles.taskList}>
              {renderTaskItem("Backlog Tasks", cardAnalysisData.backlog)}
              {renderTaskItem("To-Do Tasks", cardAnalysisData.todo)}
              {renderTaskItem("In-Progress Tasks", cardAnalysisData.inprogress)}
              {renderTaskItem("Completed Tasks", cardAnalysisData.done)}
            </ul>
            <ul className={styles.taskList}>
              {renderTaskItem("Low Priority", cardAnalysisData.lowpriority)}
              {renderTaskItem(
                "Moderate Priority",
                cardAnalysisData.moderatepriority
              )}
              {renderTaskItem("High Priority", cardAnalysisData.highpriority)}
              {renderTaskItem("Due Date Tasks", cardAnalysisData.dueDatePassed)}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
