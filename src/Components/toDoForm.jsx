import React, { useState } from "react";
import style from "./toDoForm.module.css";

const TodoForm = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!taskDescription.trim()) {
      alert("Please enter a task description.");
      return;
    }

    onAddTask(taskDescription.trim());
    setTaskDescription("");
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          className={style.new_task}
          value={taskDescription}
          onChange={(event) => setTaskDescription(event.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoForm;
