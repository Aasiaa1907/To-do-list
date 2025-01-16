// script.js
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const category = document.getElementById("category");
const priority = document.getElementById("priority");
const search = document.getElementById("search");
const toggleTheme = document.getElementById("toggle-theme");

// Toggle Dark Mode
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Add a new to-do
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = input.value.trim();
  const taskCategory = category.value;
  const taskPriority = priority.value;

  if (task !== "") {
    addTodo(task, taskCategory, taskPriority);
    input.value = "";
  }
});

// Add a task
function addTodo(task, category, priority) {
  const li = document.createElement("li");
  li.classList.add(`priority-${priority}`);
  li.innerHTML = `
    ${task} <span class="tag">(${category})</span>
    <button>Delete</button>
  `;

  // Mark as completed
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Delete task
  li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the "completed" event
    li.classList.add("removing");
    setTimeout(() => li.remove(), 300); // Delay removal for animation
  });

  todoList.appendChild(li);
}

// Search tasks
search.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  Array.from(todoList.children).forEach((li) => {
    if (li.textContent.toLowerCase().includes(searchTerm)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
});
