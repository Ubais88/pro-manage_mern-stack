import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdDelete } from "react-icons/md";
import styles from "./CreateChecklist.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../store/auth";
import moment from "moment";

const CreateChecklist = ({setEditModalOpen, fetchStats}) => {

  const { authorizationToken, BASE_URL, LogoutUser, cardData,setCardData } = useAuth();
  const [dueDate, setDueDate] = useState(cardData?.dueDate || null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkList, setCheckList] = useState(cardData?.checkList || []);
  const [priority, setPriority] = useState(cardData?.priority || null);
  const [title, setTitle] = useState(cardData?.title || "");

  const handleDateChange = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  const handleAddChecklistItem = () => {
    setCheckList([...checkList, { text: "", isChecked: false }]);
    setShowCalendar(false);
  };

  const handleDeleteChecklistItem = (index) => {
    setShowCalendar(false);
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleChecklistItemChange = (value, index) => {
    setShowCalendar(false);
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].text = value;
      return updatedItems;
    });
  };

  const handleCheckboxChange = (index) => {
    setShowCalendar(false);
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].isChecked = !updatedItems[index].isChecked;
      return updatedItems;
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setShowCalendar(false);
  };

  const handleSave = async () => {
    if (
      !priority ||
      !title.trim() ||
      !checkList.length ||
      checkList.some((item) => item.text.trim() === "")
    ) {
      toast.error("Please fill all compulsory fields.");
    } else {
      try {
        let response;
        if (cardData) {
          // update prev checklist item
          const cardId = cardData._id;
          response = await axios.put(
            `${BASE_URL}/card/update/${cardId}`,
            { title, priority, checkList, dueDate },
            {
              headers: {
                Authorization: authorizationToken,
              },
            }
          );
        } else {
          // create new checklist item
          response = await axios.post(
            `${BASE_URL}/card/create`,
            { title, priority, checkList, dueDate },
            {
              headers: {
                Authorization: authorizationToken,
              },
            }
          );
        }

        if (response.status === 200 || response.status === 201) {
          setEditModalOpen(false);
          fetchStats()
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
    }
  };

  const handleClose = () => {
    setEditModalOpen(false)
    setCardData(null)
  }

  const priorityLevels = [
    { color: "#FF2473", label: "HIGH PRIORITY" },
    { color: "#18B0FF", label: "MODERATE PRIORITY" },
    { color: "#63C05B", label: "LOW PRIORITY" },
  ];

  return (
    <div className={styles.modalContainer}>
      <div className={styles.addModal}>
        <div className={styles.topContainer}>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>
              Title<sup>*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Task Title"
              className={styles.inputField}
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className={styles.priorityContainer}>
            <p className={styles.priorityLabel}>
              Select Priority<sup>*</sup>
            </p>
            {priorityLevels.map((level) => (
              <button
                key={level.label}
                className={`${styles.priorityButton} ${
                  priority === level.label && styles.selectedPriority
                }`}
                onClick={() => setPriority(level.label)}
              >
                <IoEllipseSharp size={10} color={level.color} />
                {level.label}
              </button>
            ))}
          </div>

          <div className={styles.checklistContainer}>
            <p className={styles.checklistLabel}>
              Checklist ({checkList.filter((item) => item.isChecked).length}/
              {checkList.length})<sup>*</sup>
            </p>

            <div className={styles.addCheckListContainer}>
              {checkList.map((item, index) => (
                <div key={index} className={styles.checklist}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheckboxChange(index)}
                    defaultChecked={item.isChecked}
                    className={styles.checkbox}
                  />
                  <input
                    type="text"
                    placeholder="Add a task"
                    className={styles.checklistInput}
                    value={item.text}
                    onChange={(e) =>
                      handleChecklistItemChange(e.target.value, index)
                    }
                  />
                  <MdDelete
                    color="#CF3636"
                    size={20}
                    onClick={() => handleDeleteChecklistItem(index)}
                  />
                </div>
              ))}
              <p className={styles.addnewChecklist}>
                <button
                  onClick={handleAddChecklistItem}
                  className={styles.addnewChecklistBtn}
                >
                  + Add New
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.dateContainer}>
          {showCalendar && (
            <div className={styles.calendarContainer}>
              <Calendar
                onChange={handleDateChange}
                value={dueDate}
                className={styles.calendar}
              />
            </div>
          )}
          <p
            onClick={() => setShowCalendar(true)}
            className={styles.selectDate}
          >
            {dueDate ? moment(dueDate).format("MM/DD/YYYY") : "Select Due Date"}
          </p>

          <div className={styles.buttonContainer}>
            <button
              className={styles.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              {cardData ? "Update" : "Save" }
            </button>
          </div>
        </div>

        {/* <div className={styles.dateContainer}>
          {showCalendar ? (
            <>
              <div className={styles.calendarContainer}>
                <Calendar
                  onChange={handleDateChange}
                  value={dueDate}
                  className={styles.calendar}
                />
              </div>
              <span></span>
            </>
          ) : (
            <p
              onClick={() => setShowCalendar(true)}
              className={styles.selectDate}
            >
              {dueDate
                ? moment(dueDate).format("MM/DD/YYYY")
                : "Select Due Date"}
            </p>
          )}
          <div className={styles.buttonContainer}>
            <button
              className={styles.cancelButton}
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreateChecklist;
