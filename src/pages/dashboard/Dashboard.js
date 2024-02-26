import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { VscCollapseAll } from "react-icons/vsc";
import { IoEllipseSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import MenuModal from "../../components/menuModal/MenuModal";
import CreateChecklist from "../addChecklistModal/CreateChecklist";
import { useAuth } from "../../store/auth";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { authorizationToken, BASE_URL, LogoutUser } = useAuth();
  const [menuModalState, setMenuModalState] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [sortingTime, setSortingTime] = useState("This Week");
  const [cardData, setCardData] = useState();
  const [cardId, setCardId] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [checklistCollapse, setChecklistCollapse] = useState({});
  const navigate = useNavigate()

  const collapseAllChecklistsInSection = (sectionName) => {
    const updatedCollapseState = { ...checklistCollapse };
    cardData[sectionName].forEach((card) => {
      updatedCollapseState[card._id] = true;
    });
    setChecklistCollapse(updatedCollapseState);
  };

  const toggleChecklistCollapse = (cardId) => {
    setChecklistCollapse((prevState) => ({
      ...prevState,
      [cardId]: !prevState[cardId],
    }));
  };

  const handleChange = (e) => {
    setSortingTime(e.target.value);
    fetchStats(e.target.value);
  };

  const toggleMenuModal = (index) => {
    setCardId(index);
    setMenuModalState({});

    setMenuModalState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const fetchStats = async (sortingTime) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/card/getallcards`,
        { sortingTime },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      console.log("getstats response: ", response);

      if (response.status === 200) {
        // Successful getstats
        setCardData(response.data.cards);
        console.log("response: ", response.data.cards);
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
      setLoading(false);
    } catch (error) {
      // Log any errors
      setLoading(false);
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
        navigate('/')
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const moveCard = async (targetSection, cardId) => {
    try {
      // setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/card/movecard/${cardId}`,
        { targetSection },
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      // console.log("getstats response: ", response);

      if (response.status === 200) {
        // Successful getstats
        fetchStats();
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
      setLoading(false);
    } catch (error) {
      // Log any errors
      setLoading(false);
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const moveCardHandler = (targetSection, cardId) => {
    console.log("moveCardHandler : ", targetSection, cardId);
    moveCard(targetSection, cardId);
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

      // console.log("getstats response: ", response);

      if (response.status === 200) {
        // Successful getstats
        fetchStats();
        // console.log("response. ", response.data.cards);
      } else {
        // Failed getstats
        const message = response.data.message;
        toast.error(message);
        console.log("Invalid credential");
      }
    } catch (error) {
      // Log any errors
      console.error("stats  error:", error);
      // if the error is due to unauthorized access (status code 401)
      if (error.response && error.response.status === 401) {
        LogoutUser(); // Log out the user
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const formattedDate = moment().format("Do MMM, YYYY");
    setCurrentDate(formattedDate);
  }, []);

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
                    onClick={() => collapseAllChecklistsInSection("Backlog")}
                  />
                </div>

                <div className={styles.allCards}>
                  {cardData.Backlog.length > 0 &&
                    cardData.Backlog.map((card) => (
                      <div className={styles.cardBody} key={card._id}>
                        <div className={styles.item}>
                          <div className={styles.itemIcon}>
                            <IoEllipseSharp
                              color={
                                {
                                  low: "#63C05B",
                                  moderate: "#18B0FF",
                                  high: "#FF2473",
                                }[card.priority.split(" ")[0].toLowerCase()] ||
                                "#000"
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

                        <div className={styles.itemName}>{card.title}</div>

                        <div className={styles.checklistContainer}>
                          <div className={styles.checklistHeader}>
                            <p className={styles.checklistCount}>
                              Checklist (
                              {
                                card.checkList.filter((item) => item.isChecked)
                                  .length
                              }
                              /{card.checkList.length})
                            </p>
                            {checklistCollapse[card._id] ? (
                              <MdOutlineKeyboardArrowDown
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            ) : (
                              <MdOutlineKeyboardArrowUp
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            )}
                          </div>

                          {!checklistCollapse[card._id] &&
                            card.checkList.length > 0 &&
                            card.checkList.map((checkList) => (
                              <div
                                className={styles.checklistContent}
                                key={checkList._id}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkBox}
                                  defaultChecked={checkList.isChecked}
                                  onClick={(e) =>
                                    updateChecklist(
                                      card._id,
                                      checkList._id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <p className={styles.checklistText}>
                                  {checkList.text}
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className={styles.dateAndBtn}>
                          {card.formattedCreatedAt ? (
                            <div
                              className={styles.dateButton}
                              style={{
                                backgroundColor: card.formattedCreatedAt.color,
                              }}
                            >
                              {card.formattedCreatedAt.formattedDate}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.statusButton}
                              value={"Inprogress"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              PROGRESS
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"ToDo"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              TO-DO
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"Done"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              DONE
                            </button>
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
                    <FaPlus
                      color="#767575"
                      size="18"
                      onClick={() => setEditModalOpen(true)}
                    />
                    <VscCollapseAll
                      color="#767575"
                      size="20"
                      className={styles.collapseIcon}
                      onClick={() => collapseAllChecklistsInSection("ToDo")}
                    />
                  </div>
                </div>

                <div className={styles.allCards}>
                  {cardData.ToDo.length > 0 &&
                    cardData.ToDo.map((card) => (
                      <div className={styles.cardBody} key={card._id}>
                        <div className={styles.item}>
                          <div className={styles.itemIcon}>
                            <IoEllipseSharp
                              color={
                                {
                                  low: "#63C05B",
                                  moderate: "#18B0FF",
                                  high: "#FF2473",
                                }[card.priority.split(" ")[0].toLowerCase()] ||
                                "#000"
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

                        <div className={styles.itemName}>{card.title}</div>

                        <div className={styles.checklistContainer}>
                          <div className={styles.checklistHeader}>
                            <p className={styles.checklistCount}>
                              Checklist (
                              {
                                card.checkList.filter((item) => item.isChecked)
                                  .length
                              }
                              /{card.checkList.length})
                            </p>
                            {checklistCollapse[card._id] ? (
                              <MdOutlineKeyboardArrowDown
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            ) : (
                              <MdOutlineKeyboardArrowUp
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            )}
                          </div>

                          {!checklistCollapse[card._id] &&
                            card.checkList.length > 0 &&
                            card.checkList.map((checkList) => (
                              <div
                                className={styles.checklistContent}
                                key={checkList._id}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkBox}
                                  defaultChecked={checkList.isChecked}
                                  onClick={(e) =>
                                    updateChecklist(
                                      card._id,
                                      checkList._id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <p className={styles.checklistText}>
                                  {checkList.text}
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className={styles.dateAndBtn}>
                          {card.formattedCreatedAt ? (
                            <div
                              className={styles.dateButton}
                              style={{
                                backgroundColor: card.formattedCreatedAt.color,
                              }}
                            >
                              {card.formattedCreatedAt.formattedDate}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.statusButton}
                              value={"Backlog"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"Inprogress"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              PROGRESS
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"Done"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              DONE
                            </button>
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
                    onClick={() => collapseAllChecklistsInSection("Inprogress")}
                  />
                </div>

                <div className={styles.allCards}>
                  {cardData.Inprogress.length > 0 &&
                    cardData.Inprogress.map((card) => (
                      <div className={styles.cardBody} key={card._id}>
                        <div className={styles.item}>
                          <div className={styles.itemIcon}>
                            <IoEllipseSharp
                              color={
                                {
                                  low: "#63C05B",
                                  moderate: "#18B0FF",
                                  high: "#FF2473",
                                }[card.priority.split(" ")[0].toLowerCase()] ||
                                "#000"
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

                        <div className={styles.itemName}>{card.title}</div>

                        <div className={styles.checklistContainer}>
                          <div className={styles.checklistHeader}>
                            <p className={styles.checklistCount}>
                              Checklist (
                              {
                                card.checkList.filter((item) => item.isChecked)
                                  .length
                              }
                              /{card.checkList.length})
                            </p>
                            {checklistCollapse[card._id] ? (
                              <MdOutlineKeyboardArrowDown
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            ) : (
                              <MdOutlineKeyboardArrowUp
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            )}
                          </div>

                          {!checklistCollapse[card._id] &&
                            card.checkList.length > 0 &&
                            card.checkList.map((checkList) => (
                              <div
                                className={styles.checklistContent}
                                key={checkList._id}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkBox}
                                  defaultChecked={checkList.isChecked}
                                  onClick={(e) =>
                                    updateChecklist(
                                      card._id,
                                      checkList._id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <p className={styles.checklistText}>
                                  {checkList.text}
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className={styles.dateAndBtn}>
                          {card.formattedCreatedAt ? (
                            <div
                              className={styles.dateButton}
                              style={{
                                backgroundColor: card.formattedCreatedAt.color,
                              }}
                            >
                              {card.formattedCreatedAt.formattedDate}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.statusButton}
                              value={"Backlog"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"ToDo"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              TO-DO
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"Done"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              DONE
                            </button>
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
                    onClick={() => collapseAllChecklistsInSection("Done")}
                  />
                </div>

                <div className={styles.allCards}>
                  {cardData.Done.length > 0 &&
                    cardData.Done.map((card) => (
                      <div className={styles.cardBody} key={card._id}>
                        <div className={styles.item}>
                          <div className={styles.itemIcon}>
                            <IoEllipseSharp
                              color={
                                {
                                  low: "#63C05B",
                                  moderate: "#18B0FF",
                                  high: "#FF2473",
                                }[card.priority.split(" ")[0].toLowerCase()] ||
                                "#000"
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

                        <div className={styles.itemName}>{card.title}</div>

                        <div className={styles.checklistContainer}>
                          <div className={styles.checklistHeader}>
                            <p className={styles.checklistCount}>
                              Checklist (
                              {
                                card.checkList.filter((item) => item.isChecked)
                                  .length
                              }
                              /{card.checkList.length})
                            </p>
                            {checklistCollapse[card._id] ? (
                              <MdOutlineKeyboardArrowDown
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            ) : (
                              <MdOutlineKeyboardArrowUp
                                className={styles.arrowIcon}
                                onClick={() =>
                                  toggleChecklistCollapse(card._id)
                                }
                              />
                            )}
                          </div>
                          {!checklistCollapse[card._id] &&
                            card.checkList.length > 0 &&
                            card.checkList.map((checkList) => (
                              <div
                                className={styles.checklistContent}
                                key={checkList._id}
                              >
                                <input
                                  type="checkbox"
                                  className={styles.checkBox}
                                  defaultChecked={checkList.isChecked}
                                  onClick={(e) =>
                                    updateChecklist(
                                      card._id,
                                      checkList._id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <p className={styles.checklistText}>
                                  {checkList.text}
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className={styles.dateAndBtn}>
                          {card.formattedCreatedAt ? (
                            <div
                              className={styles.dateButton}
                              style={{
                                backgroundColor: "#63C05B",
                              }}
                            >
                              {card.formattedCreatedAt.formattedDate}
                            </div>
                          ) : (
                            <div></div>
                          )}
                          <div className={styles.buttonContainer}>
                            <button
                              className={styles.statusButton}
                              value={"Backlog"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              BACKLOG
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"Inprogress"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              PROGRESS
                            </button>
                            <button
                              className={styles.statusButton}
                              value={"ToDo"}
                              onClick={(e) =>
                                moveCardHandler(e.target.value, card._id)
                              }
                            >
                              TO-DO
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {editModalOpen && (
            <CreateChecklist setEditModalOpen={setEditModalOpen} />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
