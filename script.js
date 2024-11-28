const taskInput = document.getElementById("taskInput");
const noteInput = document.getElementById("noteInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filter-btn");
const completionStats = document.getElementById("completionStats");

let tasks = []; // Array to store tasks

addTaskBtn.addEventListener("click", addTask);
filterBtns.forEach(btn => btn.addEventListener("click", filterTasks));

function addTask() {
  const taskText = taskInput.value.trim();
  const noteText = noteInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    note: noteText,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  noteInput.value = "";
  renderTasks();
  updateStats();
}

function renderTasks(filter = "all") {
  todoList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("todo-item");
    taskEl.innerHTML = `
      <div>
        <p>${task.completed ? `<s>${task.text}</s>` : task.text}</p>
        ${task.note ? `<p class="note">Note: ${task.note}</p>` : ""}
      </div>
      <div class="todo-actions">
        <button class="complete-btn" onclick="toggleComplete(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="update-btn" onclick="updateTask(${task.id})">Update</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    todoList.appendChild(taskEl);
  });
}

function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  renderTasks();
  updateStats();
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
  updateStats();
}

function updateTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  const updatedText = prompt("Update the task:", task.text);
  const updatedNote = prompt("Update the note (optional):", task.note);

  if (updatedText) {
    task.text = updatedText;
    task.note = updatedNote || "";
    renderTasks();
  }
}

function filterTasks(e) {
  filterBtns.forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");
  const filter = e.target.dataset.filter;
  renderTasks(filter);
}

function updateStats() {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  completionStats.textContent = `Completion: ${completionRate}%`;
}
