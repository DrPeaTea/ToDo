import React, { useState } from "react";
import style from "./toDoList.module.css";

const TodoList = ({
  tasks,
  editingTaskId,
  onTaskStatusChange,
  onStartEditingTask,
  onUpdateTaskDescription,
  onDeleteTask,
}) => {
  const [editDescriptions, setEditDescriptions] = useState({});

  const handleEditDescriptionChange = (taskId: number, value: string) => {
    setEditDescriptions((prevEditDescriptions) => ({
      ...prevEditDescriptions,
      [taskId]: value,
    }));
  };

  const handleKeyUp = (taskId: number, value: string, e) => {
    if (e.key === "Enter") {
      onUpdateTaskDescription(taskId, value);
    }
  };

  return (
    <div>
      <div className={style.task_list}>
        {tasks.map((task) => (
          <div
            className={`${style.task_item} ${
              task.is_completed ? style.checked : ""
            }`}
            key={task.id}
          >
            <label className={style.checkboxContainer}>
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onTaskStatusChange(task.id, task.is_completed)}
              />
              <span className={style.checkmark}></span>
            </label>
            {editingTaskId === task.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdateTaskDescription(task.id, editDescriptions[task.id]);
                }}
              >
                <input
                  type="text"
                  value={editDescriptions[task.id] || task.description}
                  className={style.task_edit}
                  onChange={(e) =>
                    handleEditDescriptionChange(task.id, e.target.value)
                  }
                />
              </form>
            ) : (
              <div
                onClick={() => {
                  setEditDescriptions({ [task.id]: task.task_description });
                  onStartEditingTask(task.id, task.task_description);
                }}
              >
                {task.task_description}
              </div>
            )}
            <div className={style.delete_task}>
              <button onClick={() => onDeleteTask(task.id)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
