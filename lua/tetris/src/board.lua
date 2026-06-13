local Piece = require("src.piece")

local Board = {}

local boardW, boardH
local boardX, boardY

local cellSize = 0
local cols = 10
local rows = 0

local matrix = {}

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

local function clearMatrix()
    matrix = {}
end

local function initializeMatrix(height, width)
    clearMatrix()

    for i = 1, height do
        matrix[i] = {}
        for j = 1, width do
            matrix[i][j] = {0, 0, 0, 0}
        end
    end
end

local function projectPieceOntoBoard(pieceMatrix, pieceX, pieceY)
    local projectedMatrix = {}
    for i = 1, rows do
        projectedMatrix[i] = {}
        for j = 1, cols do
            projectedMatrix[i][j] = matrix[i][j]
        end
    end

    for i = 1, #pieceMatrix do
        for j = 1, #pieceMatrix[i] do
            local boardRow = pieceY + i
            local boardCol = pieceX + j
            if pieceMatrix[i][j] and boardRow >= 1 and boardRow <= rows and boardCol >= 1 and boardCol <= cols then
                projectedMatrix[boardRow][boardCol] = Piece.getColor()
            end
        end
    end

    return projectedMatrix
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
    
    initializeMatrix(rows, cols)
    Piece.load(boardX, boardY, cellSize, rows)
    Board.projectedMatrix = projectPieceOntoBoard(Piece.getMatrix(), Piece.getX(), Piece.getY())
end

function Board.update(dt)
    Piece.update(dt)
    Board.projectedMatrix = projectPieceOntoBoard(Piece.getMatrix(), Piece.getX(), Piece.getY())
end

local function drawPiece()
    for i = 1, rows do
        for j = 1, cols do
            local cell = Board.projectedMatrix[i][j]
            if type(cell) == "table" and cell[4] and cell[4] > 0 then
                local xPos = boardX + cellSize * (j - 1)
                local yPos = boardY + cellSize * (i - 1)
                love.graphics.setColor(cell)
                love.graphics.rectangle("fill", xPos, yPos, cellSize, cellSize)
            end
        end
    end
    love.graphics.setColor(1, 1, 1, 1)
end

function Board.draw()
    love.graphics.rectangle("line", boardX, boardY, boardW, boardH)

    drawPiece()
end

return Board