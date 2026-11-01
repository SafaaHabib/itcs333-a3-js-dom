// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const errorMsg = document.getElementById("error-msg");
const todoList = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterDone = document.getElementById("filter-done");
let currentFilter = "all";
// Update the remaining items counter
function updateCounter() {
    const items = todoList.querySelectorAll("li");
    const remaining = Array.from(items).filter(
        item => !item.classList.contains("completed")
    ).length;
    counter.textContent = `${remaining} items left`;
}
// Apply the selected filter
function applyFilter() {
    const items = todoList.querySelectorAll("li");
    items.forEach(item => {
        const isCompleted = item.classList.contains("completed");
        if (currentFilter === "active" && isCompleted) {
            item.hidden = true;
        } else if (currentFilter === "done" && !isCompleted) {
            item.hidden = true;
        } else {
            item.hidden = false;
        }
    });
}
// Add a new task
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText === "") {
        errorMsg.classList.remove("hidden");
        return;
    }
    errorMsg.classList.add("hidden");
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "item-text";
    span.textContent = taskText;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${taskText}`);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
    input.value = "";
    updateCounter();
    applyFilter();
});
// Use event delegation for completing and deleting tasks
todoList.addEventListener("click", function (event) {
    const item = event.target.closest("li");
    if (!item || !todoList.contains(item)) {
        return;
    }
    if (event.target.classList.contains("delete-btn")) {
        item.remove();
    } else if (event.target.classList.contains("item-text")) {
        item.classList.toggle("completed");
    }
    updateCounter();
    applyFilter();
});
// Filter buttons
filterAll.addEventListener("click", function () {
    currentFilter = "all";
    applyFilter();
});
filterActive.addEventListener("click", function () {
    currentFilter = "active";
    applyFilter();
});
filterDone.addEventListener("click", function () {
    currentFilter = "done";
    applyFilter();
});
// Initial setup
updateCounter();
applyFilter();
