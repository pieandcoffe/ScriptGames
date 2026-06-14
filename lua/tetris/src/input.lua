local Piece = require("src.piece")
local Board = require("src.board")

local Input = {}

function Input.keypressed(key)
    if key == "left" then
        if Board.canMovePieceLeft() then
            Piece.moveLeft()
        end
    elseif key == "right" then
        if Board.canMovePieceRight() then
            Piece.moveRight()
        end
    elseif key == "up" then
        Piece.setFallMode("slow")
    elseif key == "down" then
        Piece.setFallMode("fast")
    elseif key == "space" then
        if Board.canRotatePiece() then
            Piece.rotate()
        end
    end
end

function Input.keyreleased(key)
    if key == "up" or key == "down" then
        Piece.setFallMode("normal")
    end
end

return Input