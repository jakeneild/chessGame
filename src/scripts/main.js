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

let button = document.createElement("button")
button.id = "aiMove"
button.type = "button"
button.addEventListener("click", function(){
    ai.execute(data.board, data.turn);
})
button.textContent = "Make AI move"

document.getElementById("info").appendChild(button)


