local Piece = require("src.piece")

local Board = {}

local boardW, boardH
local boardX, boardY

local cellSize = 0
local cols = 10
local rows = 0

function Board.getCellSize()
    return cellSize
end

function Board.getBoardX()
    return boardX
end

function Board.getBoardY()
    return boardY
end

function Board.getCols()
    return cols
end

function Board.getRows()
    return rows
end

function Board.load(windowW, windowH)
    local boardPadding = 20
    boardW = windowW / 3
    boardH = windowH - boardPadding * 2
    boardX = windowW / 3
    boardY = boardPadding

    cellSize = boardW / cols
    rows = math.floor(boardH / cellSize)
    boardH = rows * cellSize

    Piece.load(boardX, boardY, cellSize, rows)
end

function Board.update(dt)
    Piece.update(dt)
end

function Board.draw()
    love.graphics.rectangle("line", boardX, boardY, boardW, boardH)
    Piece.draw()
end

return Board