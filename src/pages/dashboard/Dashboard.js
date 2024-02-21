import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import { IoEllipseSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import MenuModal from "../../components/menuModal/MenuModal";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("This Week");
  const [menuModalState, setMenuModalState] = useState({});

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const toggleMenuModal = (index) => {
    setMenuModalState({});

    setMenuModalState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <p className={styles.welcomeMessage}>Welcome! Ubais</p>
        <p className={styles.date}>12th Jan, 2024</p>
      </div>
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Board</p>
        <select
          value={selectedOption}
          onChange={handleChange}
          className={styles.sectionDropDown}
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      {/* Cards */}
      <div className={styles.cardContainer}>
        <div className={styles.cardScroll}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Backlog</p>
              <VscCollapseAll
                color="#767575"
                size="20"
                className={styles.collapseIcon}
              />
            </div>

            <div className={styles.allCards}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.cardBody} key={index}>
                  <div className={styles.item}>
                    <div className={styles.itemIcon}>
                      <IoEllipseSharp color="#FF2473" size={8} />
                      <p className={styles.itemLabel}>HIGH PRIORITY</p>
                    </div>
                    <BsThreeDots
                      className={styles.moreIcon}
                      size={15}
                      onClick={() => toggleMenuModal(`Backlog` + index)}
                    />
                    {menuModalState[`Backlog` + index] && (
                      <div className={styles.menuModal}>
                        <MenuModal />
                      </div>
                    )}
                  </div>

                  <div className={styles.itemName}>Hero section</div>

                  <div className={styles.checklistContainer}>
                    <div className={styles.checklistHeader}>
                      <p className={styles.checklistCount}>Checklist (0/3)</p>
                      <MdOutlineKeyboardArrowUp className={styles.arrowIcon} />
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>
                  </div>

                  <div className={styles.dateAndBtn}>
                    <div className={styles.dateButton}>Feb 10th</div>
                    <div className={styles.buttonContainer}>
                      <button className={styles.statusButton}>PROGRESS</button>
                      <button className={styles.statusButton}>TO-DO</button>
                      <button className={styles.statusButton}>DONE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>To Do</p>
              <div className={styles.addAndcollapse}>
                <FaPlus color="#767575" size="18" />
                <VscCollapseAll
                  color="#767575"
                  size="20"
                  className={styles.collapseIcon}
                />
              </div>
            </div>

            <div className={styles.allCards}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.cardBody} key={index}>
                  <div className={styles.item}>
                    <div className={styles.itemIcon}>
                      <IoEllipseSharp color="#FF2473" size={8} />
                      <p className={styles.itemLabel}>HIGH PRIORITY</p>
                    </div>
                    <BsThreeDots
                      className={styles.moreIcon}
                      size={15}
                      onClick={() => toggleMenuModal(`todo` + index)}
                    />
                    {menuModalState[`todo` + index] && (
                      <div className={styles.menuModal}>
                        <MenuModal />
                      </div>
                    )}
                  </div>

                  <div className={styles.itemName}>Hero section</div>

                  <div className={styles.checklistContainer}>
                    <div className={styles.checklistHeader}>
                      <p className={styles.checklistCount}>Checklist (0/3)</p>
                      <MdOutlineKeyboardArrowUp className={styles.arrowIcon} />
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>
                  </div>

                  <div className={styles.dateAndBtn}>
                    <div className={styles.dateButton}>Feb 10th</div>
                    <div className={styles.buttonContainer}>
                      <button className={styles.statusButton}>PROGRESS</button>
                      <button className={styles.statusButton}>TO-DO</button>
                      <button className={styles.statusButton}>DONE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>In Progress</p>
              <VscCollapseAll
                color="#767575"
                size="20"
                className={styles.collapseIcon}
              />
            </div>

            <div className={styles.allCards}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.cardBody} key={index}>
                  <div className={styles.item}>
                    <div className={styles.itemIcon}>
                      <IoEllipseSharp color="#FF2473" size={8} />
                      <p className={styles.itemLabel}>HIGH PRIORITY</p>
                    </div>
                    <BsThreeDots
                      className={styles.moreIcon}
                      size={15}
                      onClick={() => toggleMenuModal(`progress` + index)}
                    />
                    {menuModalState[`progress` + index] && (
                      <div className={styles.menuModal}>
                        <MenuModal />
                      </div>
                    )}
                  </div>

                  <div className={styles.itemName}>Hero section</div>

                  <div className={styles.checklistContainer}>
                    <div className={styles.checklistHeader}>
                      <p className={styles.checklistCount}>Checklist (0/3)</p>
                      <MdOutlineKeyboardArrowUp className={styles.arrowIcon} />
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>
                  </div>

                  <div className={styles.dateAndBtn}>
                    <div className={styles.dateButton}>Feb 10th</div>
                    <div className={styles.buttonContainer}>
                      <button className={styles.statusButton}>PROGRESS</button>
                      <button className={styles.statusButton}>TO-DO</button>
                      <button className={styles.statusButton}>DONE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <p className={styles.cardTitle}>Done</p>
              <VscCollapseAll
                color="#767575"
                size="20"
                className={styles.collapseIcon}
              />
            </div>

            <div className={styles.allCards}>
              {[...Array(4)].map((_, index) => (
                <div className={styles.cardBody} key={index}>
                  <div className={styles.item}>
                    <div className={styles.itemIcon}>
                      <IoEllipseSharp color="#FF2473" size={8} />
                      <p className={styles.itemLabel}>HIGH PRIORITY</p>
                    </div>
                    <BsThreeDots
                      className={styles.moreIcon}
                      size={15}
                      onClick={() => toggleMenuModal(`done` + index)}
                    />
                    {menuModalState[`done` + index] && (
                      <div className={styles.menuModal}>
                        <MenuModal />
                      </div>
                    )}
                  </div>

                  <div className={styles.itemName}>Hero section</div>

                  <div className={styles.checklistContainer}>
                    <div className={styles.checklistHeader}>
                      <p className={styles.checklistCount}>Checklist (0/3)</p>
                      <MdOutlineKeyboardArrowUp className={styles.arrowIcon} />
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>

                    <div className={styles.checklistContent}>
                      <input type="checkbox" className={styles.checkBox} />
                      <p className={styles.checklistText}>Task to be done</p>
                    </div>
                  </div>

                  <div className={styles.dateAndBtn}>
                    <div className={styles.dateButton}>Feb 10th</div>
                    <div className={styles.buttonContainer}>
                      <button className={styles.statusButton}>PROGRESS</button>
                      <button className={styles.statusButton}>TO-DO</button>
                      <button className={styles.statusButton}>DONE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
