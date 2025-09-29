
let students = [];
let editIndex = -1;


let studentName = document.getElementById("name");
let studentGRID = document.getElementById("grid");
let studentGender = document.querySelectorAll('input[name="gender"]');
let studentNum = document.getElementById("mob");
let studentCourse = document.getElementById("course");
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");
let studentTable = document.getElementById("studentTable");
let searchBox = document.getElementById("searchBox");
let studentTotal = document.getElementById("studentTotal");

let storedStudents = localStorage.getItem("studentsData");
if (storedStudents) {
    students = JSON.parse(storedStudents);
    renderTable();
}

function addStudent() {
    let name = studentName.value.trim();
    let grid = studentGRID.value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let phoneNo = studentNum.value.trim();
    let course = studentCourse.value.trim();

    if (name == "" || grid == "" || !gender || phoneNo == "" || course == "" || course === "default") {
        Swal.fire("Empty Field", "Please fill all the fields correctly.", "warning");
        return;
    }

    if (editIndex === -1) {
        if (students.some(stu => stu.grid === grid)) {
            Swal.fire("Duplicate GRID", "This GRID is already assigned.", "error");
            return;
        }

        students.push({ grid, name, gender: gender.value, phoneNo, course });
        Swal.fire("Success!", "Student Added Successfully.", "success");
    } else {
        students[editIndex] = { grid, name, gender: gender.value, phoneNo, course };
        editIndex = -1;
        addBtn.textContent = "Add Student";
        studentGRID.removeAttribute("readonly");
        Swal.fire("Updated!", "Student Details Updated.", "success");
    }
    localStorage.setItem("studentsData", JSON.stringify(students));

    renderTable();
    clearForm();
}

function clearForm() {
    studentName.value = "";
    studentGRID.value = "";
    studentNum.value = "";
    studentCourse.value = "default";
    document.querySelectorAll('input[name="gender"]').forEach(el => el.checked = false);

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
        cancelButtonText: "Cancel"
    }).then((result) => {
        if (result.isConfirmed) {
            students.splice(index, 1);
            localStorage.setItem("studentsData", JSON.stringify(students));
            renderTable();
            Swal.fire("Deleted!", "Student has been deleted.", "success");
        }
    });
}

function editStudent(index) {
    let stu = students[index];
    studentName.value = stu.name;
    studentGRID.value = stu.grid;
    studentNum.value = stu.phoneNo;
    studentCourse.value = stu.course;
    document.querySelectorAll('input[name="gender"]').forEach(el => {
        el.checked = (el.value === stu.gender);
    });

    editIndex = index;
    addBtn.textContent = "Update Student";
    studentGRID.setAttribute("readonly", true); 
}

function renderTable(filteredStudents = students) {
    studentTable.innerHTML = "";

    if (filteredStudents.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="6" class="text-center text-danger">No students found!</td></tr>`;
    } else {
        filteredStudents.forEach((stu, index) => {
            studentTable.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${stu.grid}</td>
                    <td>${stu.name}</td>
                    <td>${stu.gender}</td>
                    <td>${stu.phoneNo}</td>
                    <td>${stu.course}</td>
                </tr>
            `;
        });
    }

    studentTotal.textContent = `Total Students: ${students.length}`;

    let studentCount = document.getElementById("studentCount");
    if (students.length > 0) {
        studentCount.style.display = "none";
    } else {
        studentCount.style.display = "block";
        studentCount.textContent = "0 Student Added Yet.";
    }
}

function searchStudents() {
    let keyword = searchBox.value.toLowerCase();
    let filtered = students.filter(stu =>
        stu.name.toLowerCase().includes(keyword) ||
        stu.grid.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
}

addBtn.addEventListener("click", addStudent);
clearBtn.addEventListener("click", clearForm);
searchBox.addEventListener("keyup", searchStudents);
