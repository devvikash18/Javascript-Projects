let students = [];
let studentName = document.getElementById("name");
let studentGRID = document.getElementById("grid");
let studentGender = document.querySelectorAll('input[name="gender"]');
let studentNum = document.getElementById("mob");
let studentCourse = document.getElementById("course")
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");
let studentTable = document.getElementById("studentTable");
let tableSection = document.getElementById("tableSection");
let searchBox = document.getElementById("searchBox");

function addStudent() {
    let name = studentName.value.trim();
    let grid = studentGRID.value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let phoneNo = studentNum.value.trim();
    let course = studentCourse.value.trim();

    if (name == "") {
        Swal.fire("Empty Field", "Please Enter The Name.", "warning");
        return;
    }

    if (grid == "") {
        Swal.fire("Empty Field", "Please Enter The GRID.", "warning");
        return;
    }

    if (!gender) {
        Swal.fire("Empty Field", "Please Select Gender.", "warning");
        return;
    }

    if (phoneNo == "") {
        Swal.fire("Empty Field", "Please Enter The Phone No.", "warning");
        return;
    }

    if (course == "" || course == "default") {
        Swal.fire("Empty Field", "Please Select A Course.", "warning");
        return;
    }

    let gridExists = students.some(stu => stu.grid === grid);
    if (gridExists) {
        Swal.fire("Duplicate GRID", "This GRID is already assigned to another student.", "error");
        return;
    }

    const student = { grid, name, gender: gender.value, phoneNo, course };
    students.push(student);

    Swal.fire("Success!", "Student Added Successfully.", "success");

    renderTable();
    clearForm();

}

function clearForm() {
    studentName.value = "";
    studentGRID.value = "";
    studentNum.value = "";
    studentCourse.value = "default";
    document.querySelectorAll('input[name="gender"]').forEach(el => el.checked = false);
}

function renderTable(filteredStudents = students) {
    studentTable.innerHTML = "";

    if (filteredStudents.length === 0) {
        studentTable.innerHTML = `<tr><td colspan="5" class="text-center text-danger">No students found!</td></tr>`;
    } else {
        filteredStudents.forEach((stu) => {
            studentTable.innerHTML += `
                <tr>
                    <td>${stu.grid}</td>
                    <td>${stu.name}</td>
                    <td>${stu.gender}</td>
                    <td>${stu.phoneNo}</td>
                    <td>${stu.course}</td>
                </tr>
            `;
        });
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

document.getElementById("studentTotal").textContent =
    `Total Students: ${filteredStudents.length}`;


addBtn.addEventListener("click", addStudent);
clearBtn.addEventListener("click", clearForm);
searchBox.addEventListener("keyup", searchStudents);

