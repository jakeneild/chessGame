let data = require("./data")
let domPrinter = require("./domPrinter")

let promotePawn = function(posArr){
    console.log(document.getElementById("info").firstChild)
    if(document.getElementById("info").firstChild === null){
        let completePromotion = function(e){
            document.getElementById("info")
            if(e.target.id.includes("q") || e.target.id.includes("r") || e.target.id.includes("k") || e.target.id.includes("b")){
                document.getElementById("info").innerHTML = " "
                data.board[posArr[0]][posArr[1]] = `${data.opponent}${e.target.id}`

                var isInCheck = require("./isInCheck")
                if (isInCheck(data.turn)) {
                    p = document.createElement("p")
                    if (data.opponent === "B") {
                        p.textContent = "Black is in check!"
                        data.history[data.history.length -1] += "!"
                    } else {
                        p.textContent = "White is in check!"
                        data.history[data.history.length -1] += "!"
                    }

                    document.getElementById("info").appendChild(p);

                }

                data.legalMoves = {};
                data.getLegalMoves();
                data.removeChecks();
                let domPrinter = require("./domPrinter")
                domPrinter();
                selectedPiece = "";

                let count = 0
                for (item in data.legalMoves) {
                    count = count + data.legalMoves[item].length
                }
                if (count === 0) {
                    if (data.history[data.history.length - 1].includes("!")) {
                        if (data.opponent === "B") {
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
            }
        }
        let returnBox = function(id){
            let box = document.createElement("div")
            box.style.width = "75px"
            box.style.height = "75px"
            box.id = id
            box.addEventListener("click", completePromotion)
            return box
        }
        let knightBox = returnBox("n");
        let bishopBox = returnBox("b");
        let rookBox = returnBox("r");
        let queenBox = returnBox("q");
        document.getElementById("info").appendChild(knightBox)
        document.getElementById("info").appendChild(bishopBox)
        document.getElementById("info").appendChild(rookBox)
        document.getElementById("info").appendChild(queenBox)
        if(data.opponent === "W"){
            document.getElementById("n").style.backgroundImage = "url('./img/Wn.png')"
            document.getElementById("b").style.backgroundImage = "url('./img/Wb.png')"
            document.getElementById("r").style.backgroundImage = "url('./img/Wr.png')"
            document.getElementById("q").style.backgroundImage = "url('./img/Wq.png')"
        } else {
            document.getElementById("n").style.backgroundImage = "url('./img/Bn.png')"
            document.getElementById("b").style.backgroundImage = "url('./img/Bb.png')"
            document.getElementById("r").style.backgroundImage = "url('./img/Br.png')"
            document.getElementById("q").style.backgroundImage = "url('./img/Bq.png')"
        }
    }
}

module.exports = promotePawn