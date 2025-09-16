const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("selectPriority");
const taskList = document.getElementById("taskList");
const taskForm = document.getElementById("taskForm");
const emptyTask = document.getElementById("emptyTask")

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
  };

  emptyTask.style.display = "none";

  const li = document.createElement("li");
  li.classList.add("todo-item","list-group-item", `${priorityValue}-priority`);

  li.innerHTML = `
    <span>${taskText}</span>
    <button class="btn btn-sm btn-danger delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();

    if(taskList.children.length == 0){
    emptyTask.style.display = "block";
  }
  });

  taskList.appendChild(li);

  taskInput.value = "";
  priority.value = "";
});
