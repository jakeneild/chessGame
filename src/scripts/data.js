var data = {
    board: [
        ["Br", "Bn", "Bb", "Bq", "Bk", "Bb", "Bn", "Br"],
        ["Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp"],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp"],
        ["Wr", "Wn", "Wb", "Wq", "Wk", "Wb", "Wn", "Wr"]
    ],
    turn: "W",
    opponent: "B",
    turnSwitch: function () {
        let a = data.turn;
        data.turn = data.opponent;
        data.opponent = a;
    },
    history: [],
    legalMoves: {},
    move: function (m, f) {
        let piece = m.slice(0, 2);
        let ogPosi = m.slice(2, 3);
        let ogPosj = m.slice(3, 4);
        let newPosi = m.slice(4, 5);
        let newPosj = m.slice(5, 6);
        let d = f;

        d[newPosi][newPosj] = piece;
        d[ogPosi][ogPosj] = "e";
        return d;
    },
    legalMovesPush: function (move) {
        let bool = true;
        let z = {};
        let piece = move.slice(0, 2)
        let start = move.slice(2, 4)
        for (item in data.legalMoves) {
            if (item === `${piece + start}`) {
                bool = false;
            }
        }
        if (bool === false) {
            data.legalMoves[`${piece + start}`].push(move);
        } else {
            data.legalMoves[`${piece + start}`] = [move];
        }
    },
    getLegalMoves: function () {
        for (let i = 0; i < 8; i++) {                  //row
            for (let j = 0; j < 8; j++) {
                let piece = data.board[i][j]             //column
                if (data.board[i][j].includes(data.turn)) {

                    if (piece.includes("k")) {  //king move
                        for (let k = -1; k <= 1; k++) {
                            for (let l = -1; l <= 1; l++) {
                                if (data.board[i + k] !== undefined) {
                                    if (data.board[i + k][j + l] !== undefined) {

                                        if (data.board[i + k][j + l] === "e") {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            data.legalMovesPush(move)
                                        }

                                        if (data.board[i + k][j + l].includes(data.opponent)) {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            data.legalMovesPush(move)
                                        }

                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("p")) {                    //pawn move
                        if (piece.includes("W") && data.turn === "W") {
                            if (data.board[i - 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i - 1}${j}`
                                data.legalMovesPush(move)
                                if (data.board[i - 2] !== undefined) {
                                    if (data.board[i - 2][j] === "e" && i === 6) {  //double move forward
                                        let move = `${piece}${i}${j}${i - 2}${j}`
                                        data.legalMovesPush(move)
                                    }
                                }

                            }
                            if (data.board[i - 1][j - 1] !== undefined) {
                                if (data.board[i - 1][j - 1].includes("B")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i - 1}${j - 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i - 1][j + 1] !== undefined) {
                                if (data.board[i - 1][j + 1].includes("B")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i - 1}${j + 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                        } else if (piece.includes("B") && data.turn === "B") {
                            if (data.board[i + 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i + 1}${j}`
                                data.legalMovesPush(move)
                                if (data.board[i + 2] !== undefined) {
                                    if (data.board[i + 2][j] === "e" && i === 1) {  //double move forward
                                        let move = `${piece}${i}${j}${i + 2}${j}`
                                        data.legalMovesPush(move)
                                    }
                                }
                            }
                            if (data.board[i + 1][j - 1] !== undefined) {
                                if (data.board[i + 1][j - 1].includes("W")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i + 1}${j - 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i + 1][j + 1] !== undefined) {
                                if (data.board[i + 1][j + 1].includes("W")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i + 1}${j + 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                        }
                    }
                    if (piece.includes("r")) {  //rook move
                        for (let k = 1; k < 8; k++) {  //up
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j] !== undefined) {
                                    if (data.board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j] !== undefined) {
                                    if (data.board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j - k] !== undefined) {
                                    if (data.board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j + k] !== undefined) {
                                    if (data.board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }
                    if (piece.includes("n")) { //knight move
                        let knightMove = function (r, c) {
                            if (data.board[i + r] !== undefined) {
                                if (data.board[i + r][j + c] !== undefined) {
                                    if (data.board[i + r][j + c] === "e" || data.board[i + r][j + c].includes(`${data.opponent}`)) {
                                        let move = `${piece}${i}${j}${i + r}${j + c}`
                                        data.legalMovesPush(move)
                                    }
                                }
                            }
                        }
                        knightMove(2, 1)
                        knightMove(2, -1)
                        knightMove(-2, 1)
                        knightMove(-2, -1)
                        knightMove(1, 2)
                        knightMove(1, -2)
                        knightMove(-1, 2)
                        knightMove(-1, -2)

                    }
                    if (piece.includes("b")) {
                        for (let k = 1; k < 8; k++) {  //up right
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j + k] !== undefined) {
                                    if (data.board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j + k] !== undefined) {
                                    if (data.board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j - k] !== undefined) {
                                    if (data.board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j - k] !== undefined) {
                                    if (data.board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("q")) {

                        for (let k = 1; k < 8; k++) {  //up
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j] !== undefined) {
                                    if (data.board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j] !== undefined) {
                                    if (data.board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j - k] !== undefined) {
                                    if (data.board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j + k] !== undefined) {
                                    if (data.board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }

                        for (let k = 1; k < 8; k++) {  //up right
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j + k] !== undefined) {
                                    if (data.board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j + k] !== undefined) {
                                    if (data.board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down left
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j - k] !== undefined) {
                                    if (data.board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j - k] !== undefined) {
                                    if (data.board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(data.board)
        var canCastle = require("./canCastle")
        let a = canCastle(data.turn)
        console.log(data.board)
        if (a[0] !== 0 || a[1] || 1) {
            data.legalMoves.castle = [];
        }
        if (data.turn === "W") {
            if (a[0] === 1) {
                let move = "whiteCastleLeft"
                data.legalMoves.castle.push(move)
            }
            if (a[1] === 1) {
                let move = "whiteCastleRight"
                data.legalMoves.castle.push(move)
            }
        } else {
            if (a[0] === 1) {
                let move = "blackCastleLeft"
                data.legalMoves.castle.push(move)
            }
            if (a[1] === 1) {
                let move = "blackCastleRight"
                data.legalMoves.castle.push(move)
            }
        }
    },
    removeChecks: function () {
        console.log(data.board, "!")
        for (item in data.legalMoves) {
            if (item !== "castle") {
                let check = false;
                for (let i = 0; i < data.legalMoves[item].length; i++) {  //iterating through every move
                    var holder = []


                    for (let j = 0; j < 8; j++) {
                        holder[j] = [];
                        for (let k = 0; k < 8; k++) {
                            holder[j][k] = data.board[j][k]
                        }
                    }


                    check = false;
                    let a = data.move(data.legalMoves[item][i], data.board)
                    data.board = a;
                    data.turnSwitch();

                    let ki = "";  //kings position
                    let kj = "";
                    for (let k = 0; k < 8; k++) {//find the king
                        for (let l = 0; l < 8; l++) {
                            if (data.board[k][l] === `${data.opponent}k`) {
                                ki = k
                                kj = l
                            }
                        }
                    }


                    if (data.opponent === "W") {  //checking for pawns
                        if (data.board[ki - 1] !== undefined) {
                            if (data.board[ki - 1][kj + 1] !== undefined) {
                                if (data.board[ki - 1][kj + 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                        if (data.board[ki - 1] !== undefined) {
                            if (data.board[ki - 1][kj - 1] !== undefined) {
                                if (data.board[ki - 1][kj - 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                    } else {
                        if (data.board[ki + 1] !== undefined) {
                            if (data.board[ki + 1][kj + 1] !== undefined) {
                                if (data.board[ki + 1][kj + 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                        if (data.board[ki + 1] !== undefined) {
                            if (data.board[ki + 1][kj - 1] !== undefined) {
                                if (data.board[ki + 1][kj - 1] === `${data.turn}p`) {
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
                                        if (data.board[ki + inc1 * m][kj + inc2 * m] === `${data.turn}k` && m === 1) {
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

                    if (array.includes("!") || array.includes(`${data.turn}q`)) { //check for kings and queens
                        check = true;
                    }
                    for (let c = 0; c < 9; c += 2) { //check diagonals
                        if (array[c] === `${data.turn}b`) {
                            check = true;
                        }
                    }
                    for (let c = 1; c < 9; c += 2) { //check straights
                        if (array[c] === `${data.turn}r`) {
                            check = true;
                        }
                    }

                    var knightKingCheck = function (lMove) {
                        if (data.board[ki + lMove[0]] !== undefined) {
                            if (data.board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                                if (data.board[ki + lMove[0]][kj + lMove[1]] === `${data.turn}n`) {
                                    check = true;
                                }
                            }
                        }
                    }
                    var x = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]



                    for (let q = 0; q < x.length; q++) {
                        knightKingCheck(x[q])
                    }

                    //finally finished with checking
                    data.board = holder;
                    data.turnSwitch();
                    if (check === true) {
                        console.log("!!!removing move", data.legalMoves[item][i])
                        data.legalMoves[item].splice(i, 1)
                        i--;
                    }
                }
            }
        }
    },
    executeMove: {
        start: function (move) {
            console.log("move:", move)
            let pawnPromotionCheck = require("./pawnPromotionCheck")
            console.log("execute move start board pos: ", data.board)
            pawnPromotionCheck.run();
            pawnPromotionCheck.finish(move);
        },
        finish: function (move) {
            let isLegal = false;
            for (item in data.legalMoves) {
                for (let i = 0; i < data.legalMoves[item].length; i++) {
                    if (data.legalMoves[item][i] === move) {
                        isLegal = true;
                    }
                }
            }
            //I don't think any of this is neccessary
            /*let fakeData = data;
            let ki = ""
            let kj = "";
            for (let k = 0; k < 8; k++) {//find the king
                for (let l = 0; k < 8; k++) {
                    if (fakeData.board[i][j] === `${opponent}k`) {
                        ki = i;
                        kj = j;
                    }
                }
            }
            if (opponent === "W") {  //checking for pawns
                if (fakeData.board[ki + 1][kj + 1] === `${opponent}p` || fakeData.board[ki + 1][k - 1] === `${opponent}p`) {
                    isLegal = false;
                }
            } else {
                if (fakeData.board[ki - 1][kj + 1] === `${opponent}p` || fakeData.board[ki - 1][k - 1] === `${opponent}p`) {
                    isLegal = false;
                }
            }
            let array = [];
            function lineCheck(inc1, inc2) {
                for (let m = 1; m < 8; m++) {
                    if (fakeData.board[i + inc1][j + inc2] !== "e" && fakeData.board[i + inc1][j + inc2] !== undefined) {
                        if (fakeData.board[i + inc1][j + inc2] === opponent + "k" && m === 1) {
                            array.push("!")
                        }
                        array.push(fakeData.board[i + inc1][j + inc2]);
                        m = 8;
                    } else if (fakeData.board[i + inc1][j + inc2] === undefined) {
                        array.push("e")
                    }
                }
                return array;
            }
            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    lineCheck(a, b)
                }
            }
            if (array.includes("!") || array.includes(`${turn}q`)) { //check for kings and queens
                isLegal = false;
            }
            for (let c = 0; c < 9; c += 2) { //check diagonals
                if (array[c] === `${turn}b`) {
                    isLegal = false;
                }
            }
            for (let c = 0; c < 9; c += 2) { //check straights
                if (array[c] === `${turn}r`) {
                    isLegal = false;
                }
            }
            var knightKingCheck = function (lMove) {
                for (item in lMove) {
                    if (data.board[ki + lMove.item[1]][kj + lMove.item[2]] === `${turn}n`) {
                        isLegal = false;
                    }
                }
            }
            knightKingCheck(2, 1)
            knightKingCheck(2, -1)
            knightKingCheck(-2, 1)
            knightKingCheck(-2, -1)
            knightKingCheck(1, 2)
            knightKingCheck(1, -2)
            knightKingCheck(-1, 2)
            knightKingCheck(-1, -2)*/

            //finally finished with checking
            console.log("move", move)

            if (isLegal === false) {
                console.log("Invalid move")
            } else {
                if (!move.includes("Castle")) {
                    document.getElementById("info").innerHTML = "";
                    let piece = move.slice(0, 2);
                    let ogPosi = move.slice(2, 3);
                    let ogPosj = move.slice(3, 4);
                    let newPosi = move.slice(4, 5);
                    let newPosj = move.slice(5, 6);

                    data.board[newPosi][newPosj] = piece;
                    data.board[ogPosi][ogPosj] = "e";
                } else if (move === "whiteCastleLeft") {
                    data.board[7][0] = "e"
                    data.board[7][2] = "Wk"
                    data.board[7][3] = "Wr"
                    data.board[7][4] = "e"
                } else if (move === "whiteCastleRight") {
                    data.board[7][4] = "e"
                    data.board[7][5] = "Wr"
                    data.board[7][6] = "Wk"
                    data.board[7][7] = "e"
                } else if (move === "blackCastleLeft") {
                    data.board[0][0] = "e"
                    data.board[0][2] = "Bk"
                    data.board[0][3] = "Br"
                    data.board[0][4] = "e"
                } else if (move === "blackCastleRight") {
                    data.board[0][4] = "e"
                    data.board[0][5] = "Br"
                    data.board[0][6] = "Bk"
                    data.board[0][7] = "e"
                }
                var isInCheck = require("./isInCheck")
                if (isInCheck(data.opponent)) {
                    data.history.push(`${move}!`)
                    p = document.createElement("p")
                    if (data.opponent === "B") {
                        p.textContent = "Black is in check!"
                    } else {
                        p.textContent = "White is in check!"
                    }

                    document.getElementById("info").appendChild(p);

                } else {
                    data.history.push(move)
                }


                data.turnSwitch();
                data.legalMoves = {};
                data.getLegalMoves();
                data.removeChecks();
                let domPrinter = require("./domPrinter")
                domPrinter();
                selectedPiece = "";
                console.log("board after move: ", data.board)

                let count = 0
                for (item in data.legalMoves) {
                    count = count + data.legalMoves[item].length
                }
                if (count === 0) {
                    if (data.history[data.history.length - 1].includes("!")) {
                        if (data.opponent === "W") {
                            document.getElementById("info").firstChild.textContent = "Checkmate! White wins!"
                        } else {
                            document.getElementById("info").firstChild.textContent = "Checkmate! Black wins!"
                        }
                    } else {
                        p = document.createElement("p")
                        p.textContent = "There is a draw"
                        document.getElementById("info").appendChild(p)
                    }
                }

                if (document.getElementById("aiMove") === null || document.getElementById("aiMove") === undefined) {
                    let button = document.createElement("button")
                    button.id = "aiMove"
                    button.type = "button"
                    ai = require("./ai")
                    button.addEventListener("click", function () {
                        ai.execute(data.board, data.turn);
                    })
                    button.textContent = "Make AI move"
                    document.getElementById("info").appendChild(button)
                }
            }
        }
    },
    selectedPiece: ""
}

module.exports = data;