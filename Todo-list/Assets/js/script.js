const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const prioritySelect = document.getElementById("prioritySelect");
const todoList = document.getElementById("todoList");

function addTask() {
    const taskText = todoInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === "") {
        Swal.fire("Please enter a task.");
        return;
    }

    if (priority === "-1") {
        Swal.fire("Please select a priority.");
        return;
    }

    const taskItem = document.createElement("div");
    taskItem.className = `todo-item alert d-flex justify-content-between align-items-center mt-3 
                          ${getPriorityClass(priority)}`;
    
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // Append to list
    todoList.appendChild(taskItem);

    // Clear input
    todoInput.value = "";
    prioritySelect.value = "-1";

    // Hide empty state if any task is added
    const emptyState = document.querySelector(".empty-state");
    if (emptyState) {
        emptyState.remove();
    }
}

function deleteTask(button) {
    button.parentElement.remove();

    // If no tasks left, show empty message
    if (todoList.children.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <p>No tasks yet. Add one above!</p>
            </div>
        `;
    }
}

function getPriorityClass(priority) {
    switch (priority) {
        case "1": return "alert-danger";   // High
        case "2": return "alert-warning";  // Medium
        case "3": return "alert-success";  // Low
        default: return "";
    }
}
