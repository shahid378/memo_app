import React, { useState } from "react";
import "../Css.scss";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import isToday from "date-fns/esm/isToday";


const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
};
const AddTask = ({ onCancel, onAddTask }) => {
    const [task, settask] = useState("");
    const [date, setdate] = useState(null);
    return (
        <div className="add-task-dialog">
            <input value={task} onChange={(e) => settask(e.target.value)} />
            <div className="add-task-actions-container">
                <div className="btn-container">
                    <button className="add-btn"
                        disabled={!task}
                        onClick={() => {
                            onAddTask(task, date);
                            settask("")
                        }}
                    >
                        Add Task</button>
                    <button className="cancel-btn"
                        onClick={() => {
                            onCancel();
                            settask("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
                <div className="icon-container">
                    <DayPickerInput
                        onDayChange={(day) => setdate(day)}
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

const TASK_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 Days",
};

const TaskItems = ({ selectedTab, tasks }) => {
    let taskToRender = [...tasks];
    if (selectedTab === "NEXT_7") {
        taskToRender = taskToRender
            .filter(
                (task) =>
                    isAfter(task.date, new Date()) &&
                    isBefore(task.date, addDays(new Date(), 7))
            )
    }
    if (selectedTab === "TODAY") {
        taskToRender = taskToRender
            .filter(task => isToday(task.date))

    }
    return (
        <div className="task-items-container">
            {taskToRender
                .map((task) => (
                    <div className="task-item">
                        <p>{task.text}</p>
                        <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                    </div>
                )
                )}
        </div>
    )
};

const Tasks = ({ selectedTab }) => {
    const [showAddtask, setShowAddTask] = useState(false);
    const [taskArray, settaskArray] = useState([]);

    const addNewtask = (text, date) => {
        const newTaskitem = { text, date: date || new Date() };
        settaskArray((prevState) => [...prevState, newTaskitem]);
    };
    return (
        <div className="tasks">
            <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab === "INBOX"
                ?
                <div className="add-task-btn"
                    onClick={() => setShowAddTask((prevState) => !prevState)}
                >
                    <span className="plus">+</span>
                    <span className="add-task-text">Add task</span>
                </div>
                :
                null
            }
            {showAddtask && (< AddTask
                onCancel={() => setShowAddTask(false)}
                onAddTask={addNewtask}
            />)}
            {taskArray.length > 0
                ?
                (
                    <TaskItems tasks={taskArray} selectedTab={selectedTab} />
                )
                :
                (
                    <p>No tasks yet</p>)
            }

        </div>
    );
};

export default Tasks;
