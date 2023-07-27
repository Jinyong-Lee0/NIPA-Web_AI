(() => {
    const omok = document.querySelector("#omok");
    const omokBoard = document.querySelector("#omok-background");
    const start = document.querySelector("#start");
    const renameButton = document.querySelectorAll(".rename");
    const modal = document.querySelector("#modal");
    const renameInputBox = document.querySelector("#modal input");
    const renameSubmit = document.querySelector("#modal .flex");
    const createElementNode = (element, x, y) => {
        let el = document.createElement(element);
        el.setAttribute("data-x", `${x}`);
        el.setAttribute("data-y", `${y}`);
        return el;
    };

    const timeout = () => {
        let MM = 5;
        let SS = 0;
        let timeout = setInterval(() => {
            if (SS === 0) {
                MM--;
                SS = 59;
            } else {
                SS--;
            }
            omokBoard.querySelector(
                ".game-time"
            ).innerText = `남은 시간 : ${MM}:${SS}`;
            if (MM === 0 && SS === 0) {
                clearInterval(timeout);
                alert("Timeout!");
                gameWon = true;
                setTimeout(() => {
                    omokBoard.style.bottom = "100%";
                    gameWon = false;
                }, 1000);
            }
        }, 1000);
    };

    const modalToggle = () => {
        modal.classList.toggle("hide");
    };

    const setPlayerName = (players) => {
        const player = document.querySelector(`#player${players} .player-name`);
        player.innerText = renameInputBox.value;
        renameInputBox.value = "";
    };

    const startGame = () => {
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                omok.append(createElementNode("div", j, i));
            }
        }
        omokBoard.style.bottom = "0";
        nowPlayer = 1;
        timeout();
    };

    const playGame = (e) => {
        if (gameWon !== true) {
            if (
                e.target.classList.contains("X") ||
                e.target.classList.contains("O")
            ) {
                return;
            }
            if (nowPlayer === 0) {
                e.target.classList.add("X");
                nowPlayer = 1;
                omokBoard.querySelector(".now-player").innerText =
                    "현재 : 흰색";
                findWinner(
                    e.target.getAttribute("data-x"),
                    e.target.getAttribute("data-y"),
                    "X"
                );
            } else {
                e.target.classList.add("O");
                nowPlayer = 0;
                omokBoard.querySelector(".now-player").innerText =
                    "현재 : 검정색";
                findWinner(
                    e.target.getAttribute("data-x"),
                    e.target.getAttribute("data-y"),
                    "O"
                );
            }
        }
    };

    const verticalFind = (x, y, find) => {
        const findXY = (x, dy) => {
            let arr = [
                document
                    .querySelector(`div[data-x="${x}"][data-y="${dy}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${x}"][data-y="${dy + 1}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${x}"][data-y="${dy + 2}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${x}"][data-y="${dy + 3}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${x}"][data-y="${dy + 4}"]`)
                    .classList.contains(find),
            ];

            if (arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
                const winner =
                    find === "O"
                        ? document.querySelector("#player2 .player-name")
                              .innerText
                        : document.querySelector("#player1 .player-name")
                              .innerText;
                alert(`${winner} wins!`);
                gameWon = true;
                setTimeout(() => {
                    omokBoard.style.bottom = "100%";
                    gameWon = false;
                }, 1000);
            }
        };

        let max;
        y + 4 < 30 ? (max = y + 4) : (max = 29);
        if (y < 4) {
            for (let dy = 0; dy < max; dy++) {
                if (!gameWon) findXY(x, dy);
            }
        } else {
            for (let dy = y - 4; dy <= max; dy++) {
                if (!gameWon) findXY(x, dy);
            }
        }
    };

    const horizonFind = (x, y, find) => {
        const findXY = (dx, y) => {
            let arr = [
                document
                    .querySelector(`div[data-x="${dx}"][data-y="${y}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${dx + 1}"][data-y="${y}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${dx + 2}"][data-y="${y}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${dx + 3}"][data-y="${y}"]`)
                    .classList.contains(find),
                document
                    .querySelector(`div[data-x="${dx + 4}"][data-y="${y}"]`)
                    .classList.contains(find),
            ];

            if (arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
                const winner =
                    find === "O"
                        ? document.querySelector("#player2 .player-name")
                              .innerText
                        : document.querySelector("#player1 .player-name")
                              .innerText;
                alert(`${winner} wins!`);
                gameWon = true;
                setTimeout(() => {
                    omokBoard.style.bottom = "100%";
                    gameWon = false;
                }, 1000);
            }
        };

        let max;
        x + 4 < 30 ? (max = x + 4) : (max = 29);
        if (x < 4) {
            for (let dx = 0; dx < max; dx++) {
                if (!gameWon) findXY(dx, y);
            }
        } else {
            for (let dx = x - 4; dx <= max; dx++) {
                if (!gameWon) findXY(dx, y);
            }
        }
    };

    const findWinner = (x, y, find) => {
        verticalFind(Number(x), Number(y), find);
        horizonFind(Number(x), Number(y), find);
        diagonalFind(Number(x), Number(y), find);
    };

    let nowPlayer = 0;
    let gameWon = false; // New flag to track if a game is already won

    omok.addEventListener("click", (e) => {
        playGame(e);
    });

    start.addEventListener("click", () => startGame());

    for (let i = 0; i < 2; i++) {
        renameButton[i].addEventListener("click", () => {
            nowPlayer = i + 1;
            modalToggle();
        });
    }

    renameSubmit.addEventListener("click", (e) => {
        if (e.target.innerText === "submit") {
            if (renameInputBox.value.trim() !== "") {
                setPlayerName(nowPlayer);
                modalToggle();
            }
        } else if (e.target.innerText === "cancel") {
            modalToggle();
        }
    });
})();
