import React, { useState } from 'react';
import style from '../styles/toDoForm.module.css'

const TodoForm = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskDescription === '') {
      alert('Please enter a task description.');
      return;
    }

    onAddTask(taskDescription);
    setTaskDescription('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div>
      <input 
        type="text"
        className={style.new_task}
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default TodoForm;