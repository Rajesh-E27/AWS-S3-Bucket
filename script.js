// script.js
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const prioritySelect = document.getElementById("priority-select");
  const searchInput = document.getElementById("search-input");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to render tasks
  function renderTasks() {
    taskList.innerHTML = '';

    // Filter tasks based on search query
    const query = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));

    // Render tasks
    filteredTasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task');
      if (task.completed) taskItem.classList.add('completed');

      taskItem.innerHTML = `
        <span class="task-text">${task.text}</span>
        <span class="priority ${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
        <button class="delete-btn">×</button>
      `;

      // Mark task as completed
      taskItem.querySelector('.task-text').addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      // Delete task
      taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(taskItem);
    });
  }

  // Function to save tasks in localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add a new task
  addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() === '') return;

    const newTask = {
      text: taskInput.value.trim(),
      completed: false,
      priority: prioritySelect.value,
    };

    tasks.push(newTask);
    taskInput.value = '';  // Clear input field
    saveTasks();
    renderTasks();
  });

  // Listen for Enter key to add task
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });

  // Listen for search input
  searchInput.addEventListener('input', renderTasks);

  // Initial render
  renderTasks();
});