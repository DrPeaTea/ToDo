import React, { useState } from 'react';
import style from '../styles/toDoList.module.css';

import styles from "./toDoList.module.css";

const TodoList = ({ tasks, editingTaskId, onTaskStatusChange, onStartEditingTask, onUpdateTaskDescription, onDeleteTask }) => {
  const [editDescriptions, setEditDescriptions] = useState({});

  const handleEditDescriptionChange = (taskId, value) => {
    setEditDescriptions((prevEditDescriptions) => ({
      ...prevEditDescriptions,
      [taskId]: value,
    }));
  };

  return (
    <div>
      <button className={"button " + styles.button}>Hello</button>

      <div className={style.task_list}>
        {tasks.map((task) => (
          <div className={style.task_item} key={task.id}>
            <input
              type="checkbox"
              onChange={() => onTaskStatusChange(task.id, task.status)}
            />
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={editDescriptions[task.id] || task.description}
                  className={style.task_edit}
                  onChange={(e) => handleEditDescriptionChange(task.id, e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      onUpdateTaskDescription(task.id, editDescriptions[task.id]);
                    }
                  }}
                />
              </div>
            ) : (
              <div onClick={() => onStartEditingTask(task.id, task.description)}>
                {task.description}
              </div>
            )}
            <div className={style.delete_task}><button onClick={() => onDeleteTask(task.id)}>X</button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;