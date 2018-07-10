const ai = {
    execute: function (board, turn) {
        console.log("begin AI calculation")
        const obj = ai.smartScore(board, turn)
        console.log("smartScore complete", obj)
        let bestMove = ""
        let bestMeta = -999;
        if (turn === "B") {
            bestMeta = 999
        }
        for (item in obj.start) {
            if (item !== "meta" && item !== "score" && item !== "turn" !== item !== "board" && item !== "pruneDump") {
                if (obj.start[item].meta !== undefined) {
                    if (turn === "W") {
                        if (obj.start[item].meta > bestMeta) {
                            bestMeta = obj.start[item].meta
                            bestMove = item;
                        }
                    } else {
                        if (obj.start[item].meta < bestMeta) {
                            bestMeta = obj.start[item].meta
                            bestMove = item;
                        }
                    }
                }
            }
        }
        const data = require("./data")

        console.log("Best move:", bestMove)

        data.legalMoves.bestMove = [bestMove]
        data.executeMove.start(bestMove)
    },
    makeMove: function (m, boardInput) {

        let newBoard = function (myBoard) {
            let newBoard = [[]];

            for (let j = 0; j < 8; j++) {
                newBoard[j] = []
                for (let k = 0; k < 8; k++) {
                    newBoard[j][k] = myBoard[j][k]
                }
            }

            return newBoard
        }
        const piece = m.slice(0, 2);
        const ogPosi = m.slice(2, 3);
        const ogPosj = m.slice(3, 4);
        const newPosi = m.slice(4, 5);
        const newPosj = m.slice(5, 6);

        const b = newBoard(boardInput)
        b[newPosi][newPosj] = piece;
        b[ogPosi][ogPosj] = "e";

        return b;
    },
    getLegalMoves: function (board, turn) {
        let opponent = "B"
        if (turn === "B") {
            opponent = "W"
        }

        let move = function (m, f) {
            let piece = m.slice(0, 2);
            let ogPosi = m.slice(2, 3);
            let ogPosj = m.slice(3, 4);
            let newPosi = m.slice(4, 5);
            let newPosj = m.slice(5, 6);
            let d = f;

            d[newPosi][newPosj] = piece;
            d[ogPosi][ogPosj] = "e";
            return d;
        }
        let legalMoves = [];

        for (let i = 0; i < 8; i++) {                  //row
            for (let j = 0; j < 8; j++) {
                let piece = board[i][j]             //column
                if (board[i][j].includes(turn)) {

                    if (piece.includes("k")) {  //king move
                        for (let k = -1; k <= 1; k++) {
                            for (let l = -1; l <= 1; l++) {
                                if (board[i + k] !== undefined) {
                                    if (board[i + k][j + l] !== undefined) {

                                        if (board[i + k][j + l] === "e") {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            legalMoves.push(move)
                                        }

                                        if (board[i + k][j + l].includes(opponent)) {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            legalMoves.push(move)
                                        }

                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("p")) {                    //pawn move
                        if (piece.includes("W") && turn === "W") {
                            if (board[i - 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i - 1}${j}`
                                legalMoves.push(move)
                                if (board[i - 2] !== undefined) {
                                    if (board[i - 2][j] === "e" && i === 6) {  //double move forward
                                        let move = `${piece}${i}${j}${i - 2}${j}`
                                        legalMoves.push(move)
                                    }
                                }

                            }
                            if (board[i - 1][j - 1] !== undefined) {
                                if (board[i - 1][j - 1].includes("B")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i - 1}${j - 1}`
                                    legalMoves.push(move)
                                }
                            }
                            if (board[i - 1][j + 1] !== undefined) {
                                if (board[i - 1][j + 1].includes("B")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i - 1}${j + 1}`
                                    legalMoves.push(move)
                                }
                            }
                        } else if (piece.includes("B") && turn === "B") {
                            if (board[i + 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i + 1}${j}`
                                legalMoves.push(move)
                                if (board[i + 2] !== undefined) {
                                    if (board[i + 2][j] === "e" && i === 1) {  //double move forward
                                        let move = `${piece}${i}${j}${i + 2}${j}`
                                        legalMoves.push(move)
                                    }
                                }
                            }
                            if (board[i + 1][j - 1] !== undefined) {
                                if (board[i + 1][j - 1].includes("W")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i + 1}${j - 1}`
                                    legalMoves.push(move)
                                }
                            }
                            if (board[i + 1][j + 1] !== undefined) {
                                if (board[i + 1][j + 1].includes("W")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i + 1}${j + 1}`
                                    legalMoves.push(move)
                                }
                            }
                        }
                    }
                    if (piece.includes("r")) {  //rook move
                        for (let k = 1; k < 8; k++) {  //up
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j] !== undefined) {
                                    if (board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j] !== undefined) {
                                    if (board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (board[i] !== undefined) {
                                if (board[i][j - k] !== undefined) {
                                    if (board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i] !== undefined) {
                                if (board[i][j + k] !== undefined) {
                                    if (board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
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
                            if (board[i + r] !== undefined) {
                                if (board[i + r][j + c] !== undefined) {
                                    if (board[i + r][j + c] === "e" || board[i + r][j + c].includes(`${opponent}`)) {
                                        let move = `${piece}${i}${j}${i + r}${j + c}`
                                        legalMoves.push(move)
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
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j + k] !== undefined) {
                                    if (board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j + k] !== undefined) {
                                    if (board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j - k] !== undefined) {
                                    if (board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j - k] !== undefined) {
                                    if (board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
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
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j] !== undefined) {
                                    if (board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j] !== undefined) {
                                    if (board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (board[i] !== undefined) {
                                if (board[i][j - k] !== undefined) {
                                    if (board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i] !== undefined) {
                                if (board[i][j + k] !== undefined) {
                                    if (board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }

                        for (let k = 1; k < 8; k++) {  //up right
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j + k] !== undefined) {
                                    if (board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j + k] !== undefined) {
                                    if (board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down left
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j - k] !== undefined) {
                                    if (board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j - k] !== undefined) {
                                    if (board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
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




        for (let i = 0; i < legalMoves.length; i++) {  //iterating through every move
            var holder = []


            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = board[j][k]
                }
            }


            check = false;
            let a = move(legalMoves[i], board)
            board = a;

            turn = opponent;
            opponent = "W"
            if (turn === "W") {
                opponent = "B"
            }

            let ki = "";  //kings position
            let kj = "";
            for (let k = 0; k < 8; k++) {//find the king
                for (let l = 0; l < 8; l++) {
                    if (board[k][l] === `${opponent}k`) {
                        ki = k
                        kj = l
                    }
                }
            }


            if (opponent === "W") {  //checking for pawns
                if (board[ki - 1] !== undefined) {
                    if (board[ki - 1][kj + 1] !== undefined) {
                        if (board[ki - 1][kj + 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
                if (board[ki - 1] !== undefined) {
                    if (board[ki - 1][kj - 1] !== undefined) {
                        if (board[ki - 1][kj - 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
            } else {
                if (board[ki + 1] !== undefined) {
                    if (board[ki + 1][kj + 1] !== undefined) {
                        if (board[ki + 1][kj + 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
                if (board[ki + 1] !== undefined) {
                    if (board[ki + 1][kj - 1] !== undefined) {
                        if (board[ki + 1][kj - 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
            }

            array = [];
            function lineCheck(inc1, inc2) {   //looks in every direction from the king
                for (let m = 1; m < 8; m++) {
                    if (board[ki + inc1 * m] !== undefined) {
                        if (board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                            if (board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                                if (board[ki + inc1 * m][kj + inc2 * m] === `${turn}k` && m === 1) {
                                    array.push("!")
                                    m = 8;
                                } else {
                                    array.push(board[ki + inc1 * m][kj + inc2 * m]);
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

            if (array.includes("!") || array.includes(`${turn}q`)) { //check for kings and queens
                check = true;
            }
            for (let c = 0; c < 9; c += 2) { //check diagonals
                if (array[c] === `${turn}b`) {
                    check = true;
                }
            }
            for (let c = 1; c < 9; c += 2) { //check straights
                if (array[c] === `${turn}r`) {
                    check = true;
                }
            }

            var knightKingCheck = function (lMove) {
                if (board[ki + lMove[0]] !== undefined) {
                    if (board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                        if (board[ki + lMove[0]][kj + lMove[1]] === `${turn}n`) {
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
            board = holder;

            if (check === true) {
                legalMoves.splice(i, 1)
                i--;
            }
        }
        return legalMoves
    },
    isInCheck: function (board, turn) {
        let opponent = "W"
        if (turn === "W") {
            opponent = "B"
        }

        check = false;
        let ki = "";  //kings position
        let kj = "";
        for (let k = 0; k < 8; k++) {//find the king
            for (let l = 0; l < 8; l++) {
                if (board[k][l] === `${turn}k`) {
                    ki = k
                    kj = l
                }
            }
        }
        if (turn === "W") {  //checking for pawns
            if (board[ki - 1] !== undefined) {
                if (board[ki - 1][kj + 1] !== undefined) {
                    if (board[ki - 1][kj + 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
            if (board[ki - 1] !== undefined) {
                if (board[ki - 1][kj - 1] !== undefined) {
                    if (board[ki - 1][kj - 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
        } else {
            if (board[ki + 1] !== undefined) {
                if (board[ki + 1][kj + 1] !== undefined) {
                    if (board[ki + 1][kj + 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
            if (board[ki + 1] !== undefined) {
                if (board[ki + 1][kj - 1] !== undefined) {
                    if (board[ki + 1][kj - 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
        }

        array = [];
        function lineCheck(inc1, inc2) {   //looks in every direction from the king
            for (let m = 1; m < 8; m++) {
                if (board[ki + inc1 * m] !== undefined) {
                    if (board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                        if (board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                            if (board[ki + inc1 * m][kj + inc2 * m] === `${opponent}k` && m === 1) {
                                array.push("!")
                                m = 8;
                            } else {
                                array.push(board[ki + inc1 * m][kj + inc2 * m]);
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
                if (board[ki + lMove[0]] !== undefined) {
                    if (board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                        if (board[ki + lMove[0]][kj + lMove[1]] === `${opponent}n`) {
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
    },
    pruneMeta: function (obj) {
        console.log("obj before prune: ", obj)
        let pruneWorst = function (myObjArr, turn) {
            let meanScoreArr = [];
            let worstMeta = 999;
            let worstMove = "filler"
            let arrPos = 0
            let worstScore = 0;
            if (turn === "B") {
                worstMeta = -999
            }
            for (let j = 0; j < myObjArr.length; j++) {
                meanScoreArr.push(myObjArr[j].score)
                if (turn === "W") {
                    if (myObjArr[j].meta < worstMeta) {
                        worstMeta = myObjArr[j].meta
                        worstMove = myObjArr[j].move
                        worstScore = myObjArr[j].score
                        arrPos = j
                    }
                } else {
                    if (myObjArr[j].meta > worstMeta) {
                        worstMeta = myObjArr[j].meta
                        worstMove = myObjArr[j].move
                        worstScore = myObjArr[j].score
                        arrPos = j
                    }
                }
            }
            let meanScoreNum = 0;
            for (let k = 0; k < meanScoreArr.length; k++) {
                meanScoreNum += meanScoreArr[k]
            }
            meanScoreNum /= meanScoreArr.length

            objArr.splice(arrPos, 1)
            console.log(worstScore, meanScoreNum)

            if (worstScore <= meanScoreNum && turn === "W") {
                if (obj.pruneDump === undefined) {
                    obj.pruneDump = [{ move: worstMove, obj: obj[worstMove] }]
                } else {
                    obj.pruneDump.push({ move: worstMove, obj: obj[worstMove] })
                }
                delete obj[worstMove]
            } else if (worstScore >= meanScoreNum && turn === "B") {
                if (obj.pruneDump === undefined) {
                    obj.pruneDump = [{ move: worstMove, obj: obj[worstMove] }]
                } else {
                    obj.pruneDump.push({ move: worstMove, obj: obj[worstMove] })
                }
                delete obj[worstMove]
            }
        }
        let turn = obj.turn
        let objArr = []

        for (item in obj) {
            if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                objArr.push({ move: item, meta: obj[item].meta, score: obj[item].score })
            }
        }
        let length = objArr.length
        length = Math.round(length / 2)




        for (let i = 0; i < length - 1; i++) {
            let allTheSame = true;
            let first = objArr[0].meta
            for (let i = 0; i < objArr.length; i++) {
                if (objArr[i].meta !== first) {
                    allTheSame = false
                }
            }
            if (allTheSame === false) {
                // console.log("pruneWorst input:", objArr)
                pruneWorst(objArr, turn);

            }

        }
        console.log("obj after prune", obj)
        return obj
    },
    smartScore: function (board, turn) {
        let newBoard = function (myBoard) {
            let newBoard = [[]];

            for (let j = 0; j < 8; j++) {
                newBoard[j] = []
                for (let k = 0; k < 8; k++) {
                    newBoard[j][k] = myBoard[j][k]
                }
            }

            return newBoard
        }
        let changeTurn = function (turn) {
            if (turn === "W") {
                return "B"
            } else {
                return "W"
            }
        }
        let iteration = 0;
        let myObj = {
            start: {}
        };
        myObj.start.board = newBoard(board)

        let inc = function (num) {
            num++;
            return num
        }

        let explore = function (nBoard, turn, iteration, path, startAt) {
            //pawn promotion things
            for (let i = 0; i < 8; i++) {
                if (nBoard[0][i] === "Wp") {
                    nBoard[0][i] === "Wq"
                }
                if (nBoard[7][i] === "Bp") {
                    nBoard[7][i] === "Bq"
                }
            }

            if (iteration < 4 && iteration >= startAt) {
                let arr = ai.getLegalMoves(nBoard, turn);
                path.turn = turn;
                let nBoard2 = newBoard(nBoard)
                for (let i = 0; i < arr.length; i++) {
                    let nB = newBoard(nBoard2)
                    path[arr[i]] = { board: newBoard(ai.makeMove(arr[i], path.board)) }
                    explore(ai.makeMove(arr[i], nB), changeTurn(turn), inc(iteration), path[arr[i]], 0)
                }
            }
        }
        explore(newBoard(board), turn, inc(iteration), myObj.start, 0)

        console.log(myObj)

        let scoreExplore = function (bObj) {
            bObj.score = ai.scoreBoard(bObj.board, bObj.turn)
            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    scoreExplore(bObj[item])
                }
            }
        }
        scoreExplore(myObj.start)

        let metaExplore = function (bObj) {
            let metaArr = []
            if (Object.keys(bObj).length < 5) {
                return bObj.score
            }

            let canPruneMeta = true;
            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    if (bObj[item].meta === undefined) {
                        canPruneMeta = false;
                    }
                }
            }
            if (canPruneMeta === true) {
                bObj = ai.pruneMeta(bObj)
            }

            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    metaArr.push(metaExplore(bObj[item]))
                }
            }

            metaArr = metaArr.sort(function (a, b) {
                return a - b;
            })

            // console.log(metaArr)

            if(turn === "B"){
                metaArr = metaArr.slice(-2)
            } else {
                metaArr = metaArr.slice(0, 2)
            }

            // console.log(metaArr)

            bObj.meta = ((metaArr[0] + metaArr[1]) / metaArr.length)

            // console.log(bObj.meta)

            return bObj.meta
        }

        for (let i = 0; i <= 3; i++) {
            metaExplore(myObj.start)
        }
        for (item in myObj.start) {
            if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                explore(newBoard(myObj.start[item].board), changeTurn(turn), inc(iteration), myObj.start[item], 2)
                console.log(myObj)
                scoreExplore(myObj.start[item])

                for (let i = 0; i <= 3; i++) {
                    if (myObj.start[item] !== undefined) {
                        metaExplore(myObj.start[item])
                    }
                }
            }
        }
        return myObj
    },

    scoreBoard: function (board, turn) {
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let worth = 0;
                let mod = 1;
                let piece = board[i][j];
                if (piece.includes("B")) {
                    mod = -1
                }

                if (piece.includes("b") || piece.includes("n")) {
                    worth = 3
                }

                if (piece.includes("r")) {
                    worth = 5
                }

                if (piece.includes("p")) {
                    worth = 1
                }

                if (piece.includes("q")) {
                    worth = 8
                }

                score = score + (worth * mod)
            }
        }
        arr = ai.getLegalMoves(board, turn)

        if (ai.isInCheck(board, "W")) { //need to define all these
            score -= 1
            if (turn === "W" && arr.length === 0) {
                score -= 100
            }
        }

        if (ai.isInCheck(board, "B")) {
            score += 1
            if (turn === "B" && arr.length === 0) {
                score -= 100
            }
        }

        return score;
    }
}

module.exports = ai