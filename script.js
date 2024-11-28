// Get references to the DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item (li) for the task
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Create a delete button for the task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function () {
        taskList.removeChild(listItem); // Remove task when delete button is clicked
    };

    // Append the delete button to the list item
    listItem.appendChild(deleteBtn);

    // Add the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";
}

// Attach event listener to the "Add Task" button
addTaskBtn.addEventListener("click", addTask);

// Allow pressing "Enter" key to add a task
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
