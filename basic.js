document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const startGameBtn = document.getElementById("startGameBtn");
    const gameContainer = document.querySelector(".container");
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartBtn = document.getElementById("restartBtn");

    let currentPlayer = "X";
    let gameActive = false;
    let boardState = Array(9).fill("");

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Start Game Button Click
    startGameBtn.addEventListener("click", () => {
        welcomeScreen.style.display = "none";
        gameContainer.style.display = "block";
        startGame();
    });

    // Check for Winner
    function checkWinner() {
        for (let condition of winningCombinations) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                statusText.textContent = `${currentPlayer} Wins!`;
                restartBtn.style.display = "block";
                gameActive = false;
                return;
            }
        }
        if (!boardState.includes("")) {
            statusText.textContent = "It's a Draw!";
            restartBtn.style.display = "block";
            gameActive = false;
        }
    }

    // Handle Cell Click
    function handleCellClick(event) {
        if (!gameActive) return;
        const index = event.target.dataset.index;

        if (boardState[index] === "") {
            boardState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add(currentPlayer.toLowerCase());
            checkWinner();
            if (gameActive) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                statusText.textContent = `${currentPlayer}'s Turn`;
            }
        }
    }

    // Start Game Function
    function startGame() {
        boardState.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
        statusText.textContent = "Game Started! X's Turn";
        restartBtn.style.display = "none";
        currentPlayer = "X";
        gameActive = true;
    }

    // Restart Game Function
    function restartGame() {
        startGame(3000);
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
});
