var data = require("./data")

var makeMove = function(classList, id){

    if(classList === "active"){
        if(data.selectedPiece.includes("k") && id === "76"){
            data.executeMove.start("whiteCastleRight")
        } else if (data.selectedPiece.includes("k") && id === "72"){
            data.executeMove.start("whiteCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "02"){
            data.executeMove.start("blackCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "06"){
            data.executeMove.start("blackCastleRight")
        } else {
            let f = id;
            if(id.length > 2){
                f = id.slice(2,4);
            }
            data.executeMove.start(data.selectedPiece+f)
        }
    }
}

module.exports = makeMove