// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(function () {
    function initTodoApp() {
        const form = document.getElementById("todo-form");
        const input = document.getElementById("todo-input");
        const errorMsg = document.getElementById("error-msg");
        const todoList = document.getElementById("todo-list");
        const counter = document.getElementById("counter");
        const filterAll = document.getElementById("filter-all");
        const filterActive = document.getElementById("filter-active");
        const filterDone = document.getElementById("filter-done");

        let currentFilter = "all";

        function updateCounter() {
            const items = todoList.querySelectorAll("li");
            let remaining = 0;

            items.forEach(function (item) {
                if (!item.classList.contains("completed")) {
                    remaining++;
                }
            });

            counter.textContent =
                remaining + (remaining === 1 ? " item left" : " items left");
        }

        function applyFilter() {
            const items = todoList.querySelectorAll("li");

            items.forEach(function (item) {
                const isCompleted = item.classList.contains("completed");

                if (currentFilter === "active") {
                    item.style.display = isCompleted ? "none" : "";
                } else if (currentFilter === "done") {
                    item.style.display = isCompleted ? "" : "none";
                } else {
                    item.style.display = "";
                }
            });
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const taskText = input.value.trim();

            if (taskText === "") {
                errorMsg.classList.remove("hidden");
                errorMsg.style.display = "";
                return;
            }

            errorMsg.classList.add("hidden");
            errorMsg.style.display = "none";

            const item = document.createElement("li");
            const text = document.createElement("span");
            const deleteButton = document.createElement("button");

            text.className = "item-text";
            text.textContent = taskText;

            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("aria-label", "Delete " + taskText);

            item.appendChild(text);
            item.appendChild(deleteButton);
            todoList.appendChild(item);

            input.value = "";

            updateCounter();
            applyFilter();
        });

        todoList.addEventListener("click", function (event) {
            const target = event.target;
            const item = target.closest("li");

            if (!item || !todoList.contains(item)) {
                return;
            }

            if (target.closest(".delete-btn")) {
                item.remove();
            } else if (target.closest(".item-text")) {
                item.classList.toggle("completed");
            } else {
                return;
            }

            updateCounter();
            applyFilter();
        });

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

        updateCounter();
        applyFilter();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTodoApp);
    } else {
        initTodoApp();
    }
})();