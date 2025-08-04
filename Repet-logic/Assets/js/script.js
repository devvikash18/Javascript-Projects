$(document).ready(function () {
    const size = 10;

    let inputElement = document.getElementById("inputs");
    for (let i = 1; i <= size; i++) {
        inputElement.innerHTML += `<input type="number" id="num${i}" class="m-1" />`;
    }

    $("#random").on("click", function () {
        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`num${i}`);
            box.value = parseInt(Math.random() * 100);
            $(box).removeClass("highlight-max highlight-min");
        }
    });

    $("#clear").on("click", function () {
        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`num${i}`);
            box.value = "";
            $(box).removeClass("highlight-max highlight-min");
        }
    });

    $("#max").on("click", function () {
        let max = -Infinity;
        let hasEmpty = false;

        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`num${i}`);
            $(`#num${i}`).removeClass("highlight-max highlight-min");
            let value = Number(box.value);
            if (box.value === "") {
                hasEmpty = true;
            } else if (value > max) {
                max = value;
            }
        }

        if (hasEmpty) {
            Swal.fire({
                icon: "warning",
                title: "Empty Input",
                text: "Please fill in all input fields!",
            });
            return;
        }

        for (let i = 1; i <= size; i++) {
            let value = Number(document.getElementById(`num${i}`).value);
            if (value === max) {
                $(`#num${i}`).addClass("highlight-max");
            }
        }

        console.log("Max:", max);
    });

    $("#min").on("click", function () {
        let min = Infinity;
        let hasEmpty = false;

        for (let i = 1; i <= size; i++) {
            let box = document.getElementById(`num${i}`);
            $(`#num${i}`).removeClass("highlight-max highlight-min");
            let value = Number(box.value);
            if (box.value === "") {
                hasEmpty = true;
            } else if (value < min) {
                min = value;
            }
        }

        if (hasEmpty) {
            Swal.fire({
                icon: "warning",
                title: "Empty Input",
                text: "Please fill in all input fields!",
            });
            return;
        }

        for (let i = 1; i <= size; i++) {
            let value = Number(document.getElementById(`num${i}`).value);
            if (value === min) {
                $(`#num${i}`).addClass("highlight-min");
            }
        }

        console.log("Min:", min);
    });
});
