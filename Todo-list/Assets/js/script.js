const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("selectPriority");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const priorityValue = priority.value;

  if (taskText === "" || priorityValue === "") {
    Swal.fire({
      title: "Error...",
      text: "Please enter a task and select the Priority...",
    });
    return;
  }

  const li = document.createElement("li");
  li.classList.add("todo-item", `${priorityValue}-priority`);

  li.innerHTML = `
    <span>${taskText}</span>
    <button class="btn btn-sm btn-danger delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();
  });

  taskList.appendChild(li);

  taskInput.value = "";
  priority.value = "";
});
