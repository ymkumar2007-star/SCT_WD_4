let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        text: taskInput.value,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info ${task.completed ? "completed" : ""}">
                <strong>${task.text}</strong>
                <span>Date: ${task.date || "Not Set"}</span>
                <span>Time: ${task.time || "Not Set"}</span>
            </div>

            <div class="actions">
                <button class="complete-btn" onclick="toggleComplete(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;

        const newDate = prompt(
            "Edit Date (YYYY-MM-DD)",
            tasks[index].date
        );

        if (newDate !== null) {
            tasks[index].date = newDate;
        }

        const newTime = prompt(
            "Edit Time (HH:MM)",
            tasks[index].time
        );

        if (newTime !== null) {
            tasks[index].time = newTime;
        }

        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    if (confirm("Delete this task?")) {
        tasks.splice(index, 1);

        saveTasks();
        renderTasks();
    }
}

renderTasks();