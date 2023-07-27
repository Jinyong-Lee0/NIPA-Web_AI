"use strict";

(function () {
  var omok = document.querySelector("#omok");
  var omokBoard = document.querySelector("#omok-background");
  var start = document.querySelector("#start");
  var renameButton = document.querySelectorAll(".rename");
  var modal = document.querySelector("#modal");
  var renameInputBox = document.querySelector("#modal input");
  var renameSubmit = document.querySelector("#modal .flex");

  var createElementNode = function createElementNode(element, x, y) {
    var el = document.createElement(element);
    el.setAttribute("data-x", "".concat(x));
    el.setAttribute("data-y", "".concat(y));
    return el;
  };

  var timeout = function timeout() {
    var MM = 5;
    var SS = 0;
    var timeout = setInterval(function () {
      if (SS === 0) {
        MM--;
        SS = 59;
      } else {
        SS--;
      }

      omokBoard.querySelector(".game-time").innerText = "\uB0A8\uC740 \uC2DC\uAC04 : ".concat(MM, ":").concat(SS);

      if (MM === 0 && SS === 0) {
        clearInterval(timeout);
        alert("Timeout!");
        gameWon = true;
        setTimeout(function () {
          omokBoard.style.bottom = "100%";
          gameWon = false;
        }, 1000);
      }
    }, 1000);
  };

  var modalToggle = function modalToggle() {
    modal.classList.toggle("hide");
  };

  var setPlayerName = function setPlayerName(players) {
    var player = document.querySelector("#player".concat(players, " .player-name"));
    player.innerText = renameInputBox.value;
    renameInputBox.value = "";
  };

  var startGame = function startGame() {
    for (var i = 0; i < 30; i++) {
      for (var j = 0; j < 30; j++) {
        omok.append(createElementNode("div", j, i));
      }
    }

    omokBoard.style.bottom = "0";
    nowPlayer = 1;
    timeout();
  };

  var playGame = function playGame(e) {
    if (gameWon !== true) {
      if (e.target.classList.contains("X") || e.target.classList.contains("O")) {
        return;
      }

      if (nowPlayer === 0) {
        e.target.classList.add("X");
        nowPlayer = 1;
        omokBoard.querySelector(".now-player").innerText = "현재 : 흰색";
        findWinner(e.target.getAttribute("data-x"), e.target.getAttribute("data-y"), "X");
      } else {
        e.target.classList.add("O");
        nowPlayer = 0;
        omokBoard.querySelector(".now-player").innerText = "현재 : 검정색";
        findWinner(e.target.getAttribute("data-x"), e.target.getAttribute("data-y"), "O");
      }
    }
  };

  var verticalFind = function verticalFind(x, y, find) {
    var findXY = function findXY(x, dy) {
      var arr = [document.querySelector("div[data-x=\"".concat(x, "\"][data-y=\"").concat(dy, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(x, "\"][data-y=\"").concat(dy + 1, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(x, "\"][data-y=\"").concat(dy + 2, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(x, "\"][data-y=\"").concat(dy + 3, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(x, "\"][data-y=\"").concat(dy + 4, "\"]")).classList.contains(find)];

      if (arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
        var winner = find === "O" ? document.querySelector("#player2 .player-name").innerText : document.querySelector("#player1 .player-name").innerText;
        alert("".concat(winner, " wins!"));
        gameWon = true;
        setTimeout(function () {
          omokBoard.style.bottom = "100%";
          gameWon = false;
        }, 1000);
      }
    };

    var max;
    y + 4 < 30 ? max = y + 4 : max = 29;

    if (y < 4) {
      for (var dy = 0; dy < max; dy++) {
        if (!gameWon) findXY(x, dy);
      }
    } else {
      for (var _dy = y - 4; _dy <= max; _dy++) {
        if (!gameWon) findXY(x, _dy);
      }
    }
  };

  var horizonFind = function horizonFind(x, y, find) {
    var findXY = function findXY(dx, y) {
      var arr = [document.querySelector("div[data-x=\"".concat(dx, "\"][data-y=\"").concat(y, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(dx + 1, "\"][data-y=\"").concat(y, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(dx + 2, "\"][data-y=\"").concat(y, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(dx + 3, "\"][data-y=\"").concat(y, "\"]")).classList.contains(find), document.querySelector("div[data-x=\"".concat(dx + 4, "\"][data-y=\"").concat(y, "\"]")).classList.contains(find)];

      if (arr[0] && arr[1] && arr[2] && arr[3] && arr[4]) {
        var winner = find === "O" ? document.querySelector("#player2 .player-name").innerText : document.querySelector("#player1 .player-name").innerText;
        alert("".concat(winner, " wins!"));
        gameWon = true;
        setTimeout(function () {
          omokBoard.style.bottom = "100%";
          gameWon = false;
        }, 1000);
      }
    };

    var max;
    x + 4 < 30 ? max = x + 4 : max = 29;

    if (x < 4) {
      for (var dx = 0; dx < max; dx++) {
        if (!gameWon) findXY(dx, y);
      }
    } else {
      for (var _dx = x - 4; _dx <= max; _dx++) {
        if (!gameWon) findXY(_dx, y);
      }
    }
  };

  var findWinner = function findWinner(x, y, find) {
    verticalFind(Number(x), Number(y), find);
    horizonFind(Number(x), Number(y), find);
    diagonalFind(Number(x), Number(y), find);
  };

  var nowPlayer = 0;
  var gameWon = false; // New flag to track if a game is already won

  omok.addEventListener("click", function (e) {
    playGame(e);
  });
  start.addEventListener("click", function () {
    return startGame();
  });

  var _loop = function _loop(i) {
    renameButton[i].addEventListener("click", function () {
      nowPlayer = i + 1;
      modalToggle();
    });
  };

  for (var i = 0; i < 2; i++) {
    _loop(i);
  }

  renameSubmit.addEventListener("click", function (e) {
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
//# sourceMappingURL=script.dev.js.map
