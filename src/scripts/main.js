var data = require("./data")
var domPrinter = require("./domPrinter")



data.getLegalMoves();
data.removeChecks();

domPrinter();

//data.executeMove("Wp6353")

//data.executeMove("Bp1323");

console.log("Board:", data.board)
console.log("Legal moves:", data.legalMoves)

document.getElementById("display").addEventListener("click", function(){
    console.log(data.board)
    console.log(data.legalMoves)
    console.log(data.history)
})




