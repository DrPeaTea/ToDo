import React, { useState, useEffect } from "react";
import TodoForm from "../Components/toDoForm";
import TodoList from "../Components/toDoList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = () => {
    fetch("/api/toDo")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setEditingTaskId(null);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleAddTask = (taskDescription) => {
    fetch("/api/toDo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: taskDescription }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleTaskStatusChange = (taskId, currentStatus) => {
    const newStatus = !currentStatus;

    fetch("/api/toDo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const handleDeleteCompletedTasks = () => {
    // Send a DELETE request to remove completed tasks
    fetch("/api/toDo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 0 }),
    })
      .then((response) => response.json())
      .then(() => {
        // After successful DELETE, fetch the updated tasks
        fetchTasks();
      })
      .catch((error) =>
        console.error("Error deleting completed tasks:", error)
      );
  };

  const handleDeleteTask = (taskId) => {
    // Send a DELETE request to remove a single task
    fetch(`/api/toDo/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => response.json())
      .then(() => {
        // After successful DELETE, fetch the updated tasks
        fetchTasks();
      })
      .catch((error) =>
        console.error(`Error deleting task with ID ${taskId}:`, error)
      );
  };

  const handleStartEditingTask = (taskId, description) => {
    setEditingTaskId(taskId);
  };

  const handleUpdateTaskDescription = (taskId, newDescription) => {
    fetch("/api/toDo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId, description: newDescription }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) =>
        console.error("Error updating task description:", error)
      );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="background-container">
      <div className="main">
        <div className="title">TODO</div>
        <div className="new-task">
          <TodoForm onAddTask={handleAddTask} />
        </div>
        <div className="task-list">
          <TodoList
            tasks={tasks}
            editingTaskId={editingTaskId}
            onTaskStatusChange={handleTaskStatusChange}
            onStartEditingTask={handleStartEditingTask}
            onUpdateTaskDescription={handleUpdateTaskDescription}
            onDeleteTask={handleDeleteTask}
          />
        </div>
        <div className="bottom-nav">
          <div className="remaining-tasks">xxx items left</div>
          <div className="filtered-tasks">
            <div className="all-button">
              <button>All</button>
            </div>
            <div className="active-button">
              <button>Active</button>
            </div>
            <div className="completed-button">
              <button>Complete</button>
            </div>
          </div>

          <div className="clear-button">
            <button onClick={handleDeleteCompletedTasks}>
              Delete Completed Tasks
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
