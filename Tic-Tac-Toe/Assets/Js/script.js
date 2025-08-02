let counter = 0;
let pointX = 0;
let pointO = 0;

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).innerHTML = "";
    }
    counter = 0;

    document.getElementById("turn").innerHTML = "X";
    document.getElementById("scorex").innerHTML = 0;
    document.getElementById("scoreo").innerHTML = 0;

    pointX = 0;
    pointO = 0;
}

function reset() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).innerHTML = "";
    }
    counter = 0;
    document.getElementById("turn").innerHTML = "X";
}

function fireAlert(symbol) {
    Swal.fire({
        title: `Player ${symbol} Won!`,
        icon: "success",
    }).then(() => {
        reset();
    });

    if (symbol === "X") {
        pointX++;
        document.getElementById("scorex").innerHTML = pointX;
    } else {
        pointO++;
        document.getElementById("scoreo").innerHTML = pointO;
    }

    document.getElementById("turn").innerHTML = "X";
}

function checkWin(symbol) {
    let flag = true;

    const patterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]            // Diagonals
    ];

    for (let pattern of patterns) {
        flag = true;
        for (let i of pattern) {
            let val = document.getElementById(`b${i}`).innerHTML;
            if (val !== symbol) {
                flag = false;
                break;
            }
        }
        if (flag) {
            fireAlert(symbol);
            return true;
        }
    }

    return false;
}

$(document).ready(function () {
    $(".cell").on("click", function () {
        let cell = this;

        if (cell.innerHTML === "") {
            let symbol = counter % 2 === 0 ? "X" : "O";
            cell.innerHTML = symbol;

            document.getElementById("turn").innerHTML = symbol === "X" ? "O" : "X";
            counter++;

            if (counter >= 5) {
                let win = checkWin(symbol);
                if (counter === 9 && !win) {
                    Swal.fire({
                        title: `Game is Draw...`,
                    });
                }
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "You cannot override the move!",
            });
        }
    });

    $("#newGameBtn").on("click", function () {
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`b${i}`).innerHTML = "";
        }
        counter = 0;
        pointX = 0;
        pointO = 0;

        document.getElementById("turn").innerHTML = "X";
        document.getElementById("scorex").innerHTML = 0;
        document.getElementById("scoreo").innerHTML = 0;
    });
});
