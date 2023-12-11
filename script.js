document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.querySelector(".game--restart");
    const gameStatus = document.querySelector(".game--status");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes("") ? null : "T"; // Tie
    };

    const handleClick = (index) => {
        if (board[index] === "" && !checkWinner()) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                if (winner === "T") {
                    gameStatus.textContent = "It's a Tie!";
                } else {
                    gameStatus.textContent = `${winner} Wins!`;
                    highlightWinningCells();
                }
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                gameStatus.textContent = `${currentPlayer}'s turn`;
            }
        }
    };

    const highlightWinningCells = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] === board[b] && board[a] === board[c]) {
                cells[a].classList.add("win");
                cells[b].classList.add("win");
                cells[c].classList.add("win");
            }
        }
    };

    const restartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameStatus.textContent = `${currentPlayer}'s turn`;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("win");
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(index));
    });

    restartButton.addEventListener("click", restartGame);
});
