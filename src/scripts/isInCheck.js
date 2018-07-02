var data = require("./data")

var isInCheck = function (turn) {
    let opponent = "W"
    if (turn === "W") {
        opponent = "B"
    }

    check = false;

    let ki = "";  //kings position
    let kj = "";
    for (let k = 0; k < 8; k++) {//find the king
        for (let l = 0; l < 8; l++) {
            if (data.board[k][l] === `${turn}k`) {
                ki = k
                kj = l
            }
        }
    }


    if (turn === "W") {  //checking for pawns
        if (data.board[ki - 1] !== undefined) {
            if (data.board[ki - 1][kj + 1] !== undefined) {
                if (data.board[ki - 1][kj + 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
        if (data.board[ki - 1] !== undefined) {
            if (data.board[ki - 1][kj - 1] !== undefined) {
                if (data.board[ki - 1][kj - 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
    } else {
        if (data.board[ki + 1] !== undefined) {
            if (data.board[ki + 1][kj + 1] !== undefined) {
                if (data.board[ki + 1][kj + 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
        if (data.board[ki + 1] !== undefined) {
            if (data.board[ki + 1][kj - 1] !== undefined) {
                if (data.board[ki + 1][kj - 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
    }

    array = [];
    function lineCheck(inc1, inc2) {   //looks in every direction from the king
        for (let m = 1; m < 8; m++) {
            if (data.board[ki + inc1 * m] !== undefined) {
                if (data.board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                    if (data.board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                        if (data.board[ki + inc1 * m][kj + inc2 * m] === `${opponent}k` && m === 1) {
                            array.push("!")
                            m = 8;
                        } else {
                            array.push(data.board[ki + inc1 * m][kj + inc2 * m]);
                            m = 8;
                        }
                    }
                } else {
                    array.push("e")
                    m = 8;
                }
            } else {
                array.push("e")
                m = 8;
            }
        }
        return array;
    }
    for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
            lineCheck(a, b)
        }
    }
    console.log("king line array:", array)


    if (array.includes("!") || array.includes(`${opponent}q`)) { //check for kings and queens
        check = true;
    }
    for (let c = 0; c < 9; c += 2) { //check diagonals
        if (array[c] === `${opponent}b`) {
            check = true;
        }
    }
    for (let c = 1; c < 9; c += 2) { //check straights
        if (array[c] === `${opponent}r`) {
            check = true;
        }
    }
    var knightKingCheck = function (lMove) {
        for (item in lMove) {
            if (data.board[ki + lMove[0]] !== undefined) {
                if (data.board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                    if (data.board[ki + lMove[0]][kj + lMove[1]] === `${opponent}n`) {
                        check = true;
                    }
                }
            }
        }
    }

    var x = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    for (let q = 0; q < x.length; q++) {
        knightKingCheck(x[q])
    }


    return check;
}

module.exports = isInCheck;