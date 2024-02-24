import React, { useState, useEffect } from "react";
import TodoForm from "../Components/toDoForm";
import TodoList from "../Components/toDoList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = (completed: boolean | undefined) => {
    const url = `/api/db${
      completed !== undefined ? `?completed=${completed}` : ""
    }`;

    fetch(url)
      .then((response) => response.json())
      .then(setTasks)
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleAddTask = (taskDescription: string) => {
    fetch("/api/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: taskDescription }),
    })
      .then(() => fetchTasks(""))
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleTaskStatusChange = (taskId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    fetch("/api/db", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId, status: newStatus }),
    })
      .then(() => fetchTasks(""))
      .catch((error) => console.error("Error updating task status:", error));
  };

  const handleDeleteCompletedTasks = () => {
    fetch("/api/db", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 0 }),
    })
      .then(() => fetchTasks(""))
      .catch((error) =>
        console.error("Error deleting completed tasks:", error)
      );
  };

  const handleDeleteTask = (taskId: number) => {
    fetch(`/api/db`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then(() => fetchTasks(""))
      .catch((error) =>
        console.error(`Error deleting task with ID ${taskId}:`, error)
      );
  };

  const handleStartEditingTask = (taskId: number) => {
    setEditingTaskId(taskId);
  };

  const handleUpdateTaskDescription = (
    taskId: number,
    newDescription: string
  ) => {
    fetch("/api/db", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId, description: newDescription }),
    })
      .then(() => fetchTasks(""))
      .catch((error) =>
        console.error("Error updating task description:", error)
      );
  };

  useEffect(() => {
    fetchTasks("");
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
          <div className="remaining-tasks">{tasks.length} items left</div>
          <div className="filtered-tasks">
            <div className="all-button">
              <button onClick={() => fetchTasks("")}>All</button>
            </div>
            <div className="active-button">
              <button onClick={() => fetchTasks(false)}>Active</button>
            </div>
            <div className="completed-button">
              <button onClick={() => fetchTasks(true)}>Complete</button>
            </div>
          </div>

          <div className="clear-button">
            <button onClick={handleDeleteCompletedTasks}>
              Clear Completed
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
