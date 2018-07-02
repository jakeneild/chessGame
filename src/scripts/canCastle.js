var data = require("./data")
var inCheck = require("./isInCheck")

var canCastle = function (turn) {
    console.log(data.board, "!")
    let arr = [1, 1]
    let holder = []

    if (turn === "W") {
        if (data.board[7][4] !== "Wk") {
            arr = [0, 0];
        }
        for (let i = 0; i < data.history.length; i += 2) {
            if (data.history[i].includes("k")) { //looking for king moves
                arr = [0, 0];
            }
            if (data.history[i].slice(2, 4) === "70") { //looking for rook moves
                arr[0] = 0;
            }
            if (data.history[i].slice(2, 4) === "77") {
                arr[1] = 0;
            }
        }
        for (let i = 1; i < data.history.length; i += 2) {  //looking for checks
            if (data.history[i].includes("!")) {
                arr = [0, 0]
            }
        }
        for (let i = 1; i < 4; i++) { //making sure the space is empty
            for (let j = 0; j < 8; j++) {
                holder[j] = [];

                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }
            data.board[7][i] = "Wk"

            if (inCheck("W")) {
                arr[0] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];

                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[7][i] !== "e") {
                arr[0] = 0
            }
        }
        for (let i = 5; i < 7; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[7][i] = "Wk"

            if (inCheck("W")) {
                arr[1] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[7][i] !== "e") {
                arr[1] = 0;
            }
        }
    } else {
        if (data.board[0][4] !== "Bk") {
            arr = [0, 0];
        }
        for (let i = 1; i < data.history.length; i += 2) {
            if (data.history[i].includes("k")) {
                arr = [0, 0];
            }
            if (data.history[i].slice(2, 4) === "00") {
                arr[0] = 0;
            }
            if (data.history[i].slice(2, 4) === "07") {
                arr[1] = 0;
            }
        }
        for (let i = 0; i < data.history.length; i += 2) {
            if (data.history[i].includes("!")) {
                arr = [0, 0]
            }
        }
        for (let i = 1; i < 4; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[0][i] = "Bk"

            if (inCheck("B")) {
                arr[0] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[0][i] !== "e") {
                arr[0] = 0
            }
        }
        for (let i = 5; i < 7; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[0][i] = "Bk"

            if (inCheck("B")) {
                arr[1] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[0][i] !== "e") {
                arr[1] = 0;
            }
        }
    }
    return arr;
}

module.exports = canCastle;