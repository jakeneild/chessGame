var data = require("./data")
var domPrinter = require("./domPrinter")
var ai = require("./ai")



data.getLegalMoves();
data.removeChecks();

domPrinter();

console.log("Board:", data.board)
console.log("Legal moves:", data.legalMoves)

document.getElementById("display").addEventListener("click", function(){
    console.log(data.board)
    console.log(data.legalMoves)
    console.log(data.history)
})


console.log(ai.smartScore(data.board, data.turn))

