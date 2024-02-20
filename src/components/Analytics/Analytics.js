import React from "react";
import styles from "./Analytics.module.css";

const Analytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>Analytics</div>
      <div className={styles.analyticsLists}>
        <ul className={styles.taskList}>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>Backlog Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>To-Do Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>In-Progress Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>Completed Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
        </ul>

        <ul className={styles.taskList}>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>Backlog Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>To-Do Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>In-Progress Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
          <li className={styles.task}>
            <div className={styles.taskItem}>
              <span className={styles.taskName}>Completed Tasks</span>
              <span className={styles.taskCount}>12</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
