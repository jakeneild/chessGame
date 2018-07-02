var data = require("./data")

var selectPiece = function(id){
    let arr = document.querySelectorAll(".active");
    for(let i = 0; i < arr.length; i++){
        arr[i].classList = " "
    }

    if(data.legalMoves[id] !== undefined){
        data.selectedPiece = id;
        for(let i = 0; i < data.legalMoves[id].length; i++){
            let myi = data.legalMoves[id][i].slice(4,5);
            let myj = data.legalMoves[id][i].slice(5,6);
            let a = "";
            if(data.board[myi][myj] !== "e"){
                a = data.board[myi][myj]
            }

            document.getElementById(a+myi+myj).className = "active";
        }
    }

    if(id.includes("k")){  //castle stuff
        if(data.legalMoves.castle !== undefined){
            console.log("pullingCastleMoves")
            for(let i = 0; i < data.legalMoves.castle.length; i++){
                if(data.legalMoves.castle[i] === "whiteCastleLeft"){
                    document.getElementById("72").className = "active";
                }
                if(data.legalMoves.castle[i] === "whiteCastleRight"){
                    document.getElementById("76").className = "active";
                }
                if(data.legalMoves.castle[i] === "blackCastleLeft"){
                    document.getElementById("02").className = "active";
                }
                if(data.legalMoves.castle[i] === "blackCastleRight"){
                    document.getElementById("06").className = "active";
                }
            }
        }
    }
}

module.exports = selectPiece;