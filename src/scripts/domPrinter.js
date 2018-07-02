var data = require("./data")
var selectPiece = require("./selectPiece")
var makeMove = require("./makeMove")

var domPrinter = function () {
    document.getElementById("board").innerHTML = ""
    document.getElementById("board").addEventListener("click", function(e){
        makeMove(e.target.className, e.target.id)
        makeMove(e.target.parentElement.className, e.target.parentElement.id)
    })
    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div")
        row.style.display = "flex";
        for (let j = 0; j < 8; j++) {
            let box = document.createElement("div");
            box.id = i.toString() + j.toString();
            box.style.border = "2px solid black";
            box.style.width = "75px";
            box.style.height = "75px";
            if (data.board[i][j] !== "e") {
                box.id = data.board[i][j] + i.toString() + j.toString();
                if (data.board[i][j].includes(data.turn)) {
                    box.addEventListener("click", function () {
                        selectPiece(box.id);
                    })
                }
                let imgDiv = document.createElement("div")
                imgDiv.style.width = "75px";
                imgDiv.style.height = "75px";
                if (data.board[i][j] === "Wp") {
                    imgDiv.style.backgroundImage = "url('./img/Wp.png')"
                } else if (data.board[i][j] === "Wr") {
                    imgDiv.style.backgroundImage = "url('./img/Wr.png')"
                } else if (data.board[i][j] === "Wn") {
                    imgDiv.style.backgroundImage = "url('./img/Wn.png')"
                } else if (data.board[i][j] === "Wb") {
                    imgDiv.style.backgroundImage = "url('./img/Wb.png')"
                } else if (data.board[i][j] === "Wq") {
                    imgDiv.style.backgroundImage = "url('./img/Wq.png')"
                } else if (data.board[i][j] === "Wk") {
                    imgDiv.style.backgroundImage = "url('./img/Wk.png')"
                } else if (data.board[i][j] === "Bp") {
                    imgDiv.style.backgroundImage = "url('./img/Bp.png')"
                } else if (data.board[i][j] === "Br") {
                    imgDiv.style.backgroundImage = "url('./img/Br.png')"
                } else if (data.board[i][j] === "Bn") {
                    imgDiv.style.backgroundImage = "url('./img/Bn.png')"
                } else if (data.board[i][j] === "Bb") {
                    imgDiv.style.backgroundImage = "url('./img/Bb.png')"
                } else if (data.board[i][j] === "Bq") {
                    imgDiv.style.backgroundImage = "url('./img/Bq.png')"
                } else if (data.board[i][j] === "Bk") {
                    imgDiv.style.backgroundImage = "url('./img/Bk.png')"
                }
                box.appendChild(imgDiv)
            }

            row.appendChild(box);
        }
        document.getElementById("board").appendChild(row)
    }
}

module.exports = domPrinter