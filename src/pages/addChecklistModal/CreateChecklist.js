import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdDelete } from "react-icons/md";
import styles from "./CreateChecklist.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../store/auth";

const CreateChecklist = ({ setEditModalOpen }) => {
  const { authorizationToken, BASE_URL, LogoutUser } = useAuth();
  const [dueDate, setDueDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [priority, setPriority] = useState(null);
  const [title, setTitle] = useState("");

  const handleDateChange = (date) => {
    setDueDate(date);
    setShowCalendar(false);
  };

  const handleAddChecklistItem = () => {
    setCheckList([...checkList, { text: "", isChecked: false }]);
    setShowCalendar(false)
  };

  const handleDeleteChecklistItem = (index) => {
    setShowCalendar(false)
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleChecklistItemChange = (value, index) => {
    setShowCalendar(false)
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].text = value;
      return updatedItems;
    });
  };

  const handleCheckboxChange = (index) => {
    setShowCalendar(false)
    setCheckList((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].checked = !updatedItems[index].checked;
      return updatedItems;
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setShowCalendar(false)
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
        const response = await axios.post(
          `${BASE_URL}/card/create`,
          { title, priority, checkList, dueDate },
          {
            headers: {
              Authorization: authorizationToken,
            },
          }
        );

        if (response.status === 201) {
          // Successful getstats
          setEditModalOpen(false);
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
    }
    // console.log("checkList: ", checkList);
  };

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
              Checklist ({checkList.filter((item) => item.checked).length}/
              {checkList.length})<sup>*</sup>
            </p>

            <div className={styles.addCheckListContainer}>
              {checkList.map((item, index) => (
                <div key={index} className={styles.checklist}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheckboxChange(index)}
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
          {showCalendar ? (
            <Calendar
              onChange={handleDateChange}
              value={dueDate}
              className={styles.calendar}
            />
          ) : (
            <p
              onClick={() => setShowCalendar(true)}
              className={styles.selectDate}
            >
              {dueDate ? dueDate.toDateString() : "Select Due Date"}
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
        </div>
      </div>
    </div>
  );
};

export default CreateChecklist;
