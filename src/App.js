import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Top priority');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    if (task && date) {
      if (editingTask !== null) {
        const updatedTasks = tasks.map((t, index) =>
          index === editingTask ? { task, priority, date, done: false } : t
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        setTasks([...tasks, { task, priority, date, done: false }]);
      }
      setTask('');
      setPriority('Top priority');
      setDate('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setPriority(taskToEdit.priority);
    setDate(taskToEdit.date);
    setEditingTask(index);
  };

  const handleMarkDone = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LEGOO</h1>
      </header>
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Top priority</option>
          <option>Middle priority</option>
          <option>Low priority</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editingTask !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <div className="task-list">
        {tasks.map((t, index) => (
          <div key={index} className={`task-item ${t.done ? 'done' : ''}`}>
            <p>{t.task}</p>
            <p>Priority: {t.priority}</p>
            <p>Deadline: {t.date}</p>
            <div className="task-buttons">
              <button className="mark-done" onClick={() => handleMarkDone(index)}>
                {t.done ? 'Undo' : 'Mark Done'}
              </button>
              <button className="edit-task" onClick={() => handleEditTask(index)}>Edit task</button>
              <button className="delete-task" onClick={() => handleDeleteTask(index)}>Delete Task</button>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <p>&copy; 2024 Made by Pheebs</p>
      </footer>
    </div>
  );
}

export default App;
