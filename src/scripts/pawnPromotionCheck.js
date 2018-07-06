let data = require("./data")
let promotePawn = require("./promotePawn")

let pawnPromotionCheck = {
    run: function(){

        if(data.turn === "B"){
            for(let i = 0; i < 8; i++){
                if(data.board[0][i] === "Wp"){
                    pawnPromotionCheck.complete = false
                    promotePawn([0, i]);
                }
            }
        } else {
            for(let i = 0; i < 8; i++){
                if(data.board[7][i] === "Bp"){
                    pawnPromotionCheck.complete = false
                    promotePawn([7, i])
                }
            }
        }
    },
    finish: function(move){
        if(data.turn === "B"){
            for(let i = 0; i < 8; i++){
                if(data.board[0][i] === "Wp"){
                    return false
                }
            }
        } else {
            for(let i = 0; i < 8; i++){
                if(data.board[7][i] === "Bp"){
                    return false
                }
            }
        }
        data.executeMove.finish(move);
    }
}
module.exports = pawnPromotionCheck