const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
    boardDiv.innerHTML = "";
    board = [];

    for (let r = 0; r < rows; r++) {
        board[r] = [];

        for (let c = 0; c < cols; c++) {
            board[r][c] = "";

            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener("click", () => dropDisc(c));

            boardDiv.appendChild(cell);
        }
    }
}

function dropDisc(col) {
    if (gameOver) return;

    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === "") {

            board[row][col] = currentPlayer;

            let index = row * cols + col;
            boardDiv.children[index].classList.add(currentPlayer);

            if (checkWinner(row, col)) {
                statusText.textContent =
                    currentPlayer.toUpperCase() + " Wins!";
                gameOver = true;
                return;
            }

            currentPlayer =
                currentPlayer === "red" ? "yellow" : "red";

            statusText.textContent =
                "Player " + currentPlayer.toUpperCase() + "'s Turn";

            return;
        }
    }
}

function checkDirection(row, col, dr, dc) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
        let r = row + dr * i;
        let c = col + dc * i;

        if (
            r >= 0 && r < rows &&
            c >= 0 && c < cols &&
            board[r][c] === currentPlayer
        ) count++;
        else break;
    }

    for (let i = 1; i < 4; i++) {
        let r = row - dr * i;
        let c = col - dc * i;

        if (
            r >= 0 && r < rows &&
            c >= 0 && c < cols &&
            board[r][c] === currentPlayer
        ) count++;
        else break;
    }

    return count >= 4;
}

function checkWinner(row, col) {
    return (
        checkDirection(row,col,0,1) ||
        checkDirection(row,col,1,0) ||
        checkDirection(row,col,1,1) ||
        checkDirection(row,col,1,-1)
    );
}

function resetGame() {
    currentPlayer = "red";
    gameOver = false;
    statusText.textContent = "Player Red's Turn";
    createBoard();
}

createBoard();