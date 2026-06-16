const Player = (name, marker) => {
    return { name, marker };
};

const gameBoard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }

        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, placeMarker, resetBoard };
})();

const gameController = (function () {
    const player1 = Player("Player X", "X");
    const player2 = Player("Player O", "O");

    let activePlayer = player1;
    let isGameOver = false;

    const switchTurn = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (index) => {
        if (isGameOver) {
            console.log("The game is already over! Reset to play again.");
            return;
        }

        console.log(`Putting ${activePlayer.name}'s marker on space ${index}...`);

        const moveSuccessful = gameBoard.placeMarker(index, activePlayer.marker);

        if (!moveSuccessful) {
            console.log("That space is already taken! Try a different one.");
            return;
        }

        if (checkWinner()) {
            console.log(`CONGRATULATIONS! ${activePlayer.name} wins the game!`);
            isGameOver = true;
            return;
        }

        if (checkTie()) {
            console.log("It's a draw! The board is completely full.");
            isGameOver = true;
            return;
        }

        switchTurn();
        console.log(`It's now ${activePlayer.name}'s turn.`);
    };

    const checkWinner = () => {
        const currentBoard = gameBoard.getBoard();

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winConditions.some(combination => {
            return combination.every(index => {
                return currentBoard[index] === activePlayer.marker;
            });
        });
    };

    const checkTie = () => {
        return !gameBoard.getBoard().includes("");
    };

    const resetGame = () => {
        gameBoard.resetBoard();
        activePlayer = player1;
        isGameOver = false;
        console.log("Game has been reset! Player X goes First.");
    };

    return { playRound, getActivePlayer, resetGame };
})();

const displayController = (function () {
    const boardContainer = document.getElementById('gameboard-container');
    const statusDisplay = document.getElementById('status-display');
    const resetButton = document.getElementById('reset-btn');

    const renderBoard = () => {
        boardContainer.innerHTML = "";
        const currentBoard = gameBoard.getBoard();

        currentBoard.forEach((marker, index) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.textContent = marker;

            square.dataset.index = index;

            square.addEventListener('click', handleSquareClick);

            boardContainer.appendChild(square);
        });
    };

    const handleSquareClick = (e) => {
        const clickedIndex = e.target.dataset.index;

        gameController.playRound(clickedIndex);

        renderBoard();
        updateStatus();
    };

    const updateStatus = () => {
        statusDisplay.textContent = `${gameController.getActivePlayer().name}'s Turn`;
    };

    resetButton.addEventListener('click', () => {
        gameController.resetGame();
        renderBoard();
        updateStatus();
    });

    renderBoard();

    return { renderBoard };
})();