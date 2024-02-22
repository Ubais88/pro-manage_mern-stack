import React, { useState } from "react";
import { IoEllipseSharp } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdDelete } from "react-icons/md";
import styles from "./CreateChecklist.module.css";
import toast from "react-hot-toast";

const CreateChecklist = ({ setEditModalOpen }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [title, setTitle] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { text: "", checked: false }]);
  };

  const handleDeleteChecklistItem = (index) => {
    setChecklistItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const handleChecklistItemChange = (value, index) => {
    setChecklistItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].text = value;
      return updatedItems;
    });
  };

  const handleCheckboxChange = (index) => {
    setChecklistItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].checked = !updatedItems[index].checked;
      return updatedItems;
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    if (
      !selectedPriority ||
      !title.trim() ||
      checklistItems.some((item) => item.text.trim() === "")
    ) {
      toast.error("Please fill all compulsory fields.");
    } else {
      toast.success("fine");
    }
    console.log("checklistItems: ", checklistItems);
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
                  selectedPriority === level.label && styles.selectedPriority
                }`}
                onClick={() => setSelectedPriority(level.label)}
              >
                <IoEllipseSharp size={10} color={level.color} />
                {level.label}
              </button>
            ))}
          </div>

          <div className={styles.checklistContainer}>
            <p className={styles.checklistLabel}>
              Checklist ({checklistItems.filter((item) => item.checked).length}/
              {checklistItems.length})<sup>*</sup>
            </p>

            <div className={styles.addCheckListContainer}>
              {checklistItems.map((item, index) => (
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
              value={selectedDate}
              className={styles.calendar}
            />
          ) : (
            <p
              onClick={() => setShowCalendar(true)}
              className={styles.selectDate}
            >
              {selectedDate ? selectedDate.toDateString() : "Select Due Date"}
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
