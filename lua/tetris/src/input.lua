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
        if Board.canRotatePiece() then
            Piece.rotate()
        end
    elseif key == "down" then
        if Board.canRotatePiece() then
            Piece.rotate()
        end
    elseif key == "space" then
        Piece.drop()
    end
end

return Input