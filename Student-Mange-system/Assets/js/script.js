
let students = [];
let editIndex = -1;

const studentName = document.getElementById("name");
const studentGRID = document.getElementById("grid");
const studentNum = document.getElementById("mob");
const studentCourse = document.getElementById("course");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const studentTable = document.getElementById("studentTable");
const searchBox = document.getElementById("searchBox");
const studentTotal = document.getElementById("studentTotal");

function addStudent() {
    const name = studentName.value.trim();
    const grid = studentGRID.value.trim();
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const phoneNo = studentNum.value.trim();
    const course = studentCourse.value.trim();

    if (!name || !grid || !genderInput || !phoneNo || !course || course === "default") {
        Swal.fire("Empty Field", "Please fill all the fields correctly.", "warning");
        return;
    }

    if (editIndex === -1) {
        if (students.some(stu => stu.grid === grid)) {
            Swal.fire("Duplicate GRID", "This GRID is already assigned.", "error");
            return;
        }

        students.push({ grid, name, gender: genderInput.value, phoneNo, course });
        Swal.fire("Success!", "Student Added Successfully.", "success");
    } else {
        students[editIndex] = { grid, name, gender: genderInput.value, phoneNo, course };
        editIndex = -1;
        addBtn.textContent = "Add Student";
        studentGRID.removeAttribute("readonly");
        Swal.fire("Updated!", "Student Details Updated.", "success");
    }

    renderTable();
    clearForm();
}

function clearForm() {
    studentName.value = "";
    studentGRID.value = "";
    studentNum.value = "";
    studentCourse.value = "default";
    document.querySelectorAll('input[name="gender"]').forEach(el => (el.checked = false));

    editIndex = -1;
    addBtn.textContent = "Add Student";
    studentGRID.removeAttribute("readonly");
}

function deleteStudent(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this student?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
    }).then(result => {
        if (result.isConfirmed) {
            students.splice(index, 1);
            renderTable();
            Swal.fire("Deleted!", "Student has been deleted.", "success");
        }
    });
}

function editStudent(index) {
    const stu = students[index];
    studentName.value = stu.name;
    studentGRID.value = stu.grid;
    studentNum.value = stu.phoneNo;
    studentCourse.value = stu.course;

    document.querySelectorAll('input[name="gender"]').forEach(el => {
        el.checked = el.value === stu.gender;
    });

    editIndex = index;
    addBtn.textContent = "Update Student";
    studentGRID.setAttribute("readonly", true);
}

function renderTable(filteredStudents = students) {
    studentTable.innerHTML = "";

    if (filteredStudents.length === 0) {
        studentTable.innerHTML =
            `<tr><td colspan="6" class="text-center text-danger">No students found!</td></tr>`;
    } else {
        filteredStudents.forEach((stu, index) => {
            studentTable.innerHTML += `
        <tr>
         <td class= "student-name">${stu.name}</td>
          <td class= "student-grid">${stu.grid}</td>
          <td class= "student-phone">${stu.phoneNo}</td>
          <td class= "student-gender">${stu.gender}</td>
          <td class="student-course">
              <span class="badge bg-success">${stu.course}</span>
          </td>

          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editStudent(${index})">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
          </td>
        </tr>
      `;
        });
    }

    studentTotal.textContent = `Total Students: ${students.length}`;
}

function searchStudents() {
    const keyword = searchBox.value.toLowerCase();
    const filtered = students.filter(
        stu =>
            stu.name.toLowerCase().includes(keyword) ||
            stu.grid.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

addBtn.addEventListener("click", addStudent);
clearBtn.addEventListener("click", clearForm);
searchBox.addEventListener("keyup", searchStudents);
