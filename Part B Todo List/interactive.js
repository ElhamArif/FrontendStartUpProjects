const input = document.querySelector(".inputer");
const addBtn = document.querySelector(".btn");
const list = document.querySelector(".list");

// Load saved tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }
    if (taskText.length >= 20) {
        alert("Should be less than 20 letters!");
        input.value = "";
        return;
    }

    const taskObj = {
        text: taskText,
        checked: false
    };

    addTaskToDOM(taskObj);
    saveTask(taskObj);

    input.value = "";
});

// Handle clicks on list items (event delegation)
list.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    const taskText = li.querySelector(".task-text").textContent;

    if (e.target.classList.contains("delete")) {
        li.remove();
        deleteTask(taskText);
    }

    if (e.target.classList.contains("circle") || e.target.classList.contains("chek")) {
        li.classList.toggle("checked");

        const img = li.querySelector(".circle img");
        if (li.classList.contains("checked")) {
            if (!img) {
                const newImg = document.createElement("img");
                newImg.src = "images/checkedicon.png";
                newImg.classList.add("chek");
                e.target.appendChild(newImg);
            }
        } else {
            if (img) img.remove();
        }

        toggleCheck(taskText);
    }
});


// Create task DOM element
function addTaskToDOM(task) {
    const li = document.createElement("li");
    if (task.checked) li.classList.add("checked");

    const circle = document.createElement("div");
    circle.classList.add("circle");

    if (task.checked) {
        const img = document.createElement("img");
        img.src = "images/checkedicon.png";
        img.classList.add("chek");
        circle.appendChild(img);
    }

    const textNode = document.createElement("span");
    textNode.classList.add("task-text");
    textNode.textContent = task.text;

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = "\u00d7";

    li.appendChild(circle);
    li.appendChild(textNode);
    li.appendChild(deleteBtn);

    list.appendChild(li);
}


// Save a task to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(text) {
    const tasks = getTasks().filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle checked state
function toggleCheck(text) {
    const tasks = getTasks().map(task => {
        if (task.text === text) {
            task.checked = !task.checked;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load all tasks
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(addTaskToDOM);
}

// Get tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
