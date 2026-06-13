local Piece = require("src.piece")

local Input = {}

function Input.keypressed(key)
    if key == "left" then
        Piece.moveLeft()
    elseif key == "right" then
        Piece.moveRight()
    elseif key == "up" then
        Piece.rotate()
    elseif key == "down" then
        Piece.rotate()
    elseif key == "space" then
        Piece.drop()
    end
end

return Input