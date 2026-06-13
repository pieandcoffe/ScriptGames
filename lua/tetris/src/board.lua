local Piece = require("src.piece")

local Board = {}

local boardW, boardH
local boardX, boardY

local cellSize = 0
local cols = 8
local rows = 0

local linesCleared = 0

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

function Board.getLinesCleared()
    return linesCleared
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

local function isFilledCell(cell)
    return type(cell) == "table" and cell[4] and cell[4] > 0
end

local function canPlacePieceAt(pieceMatrix, pieceX, pieceY)
    for i = 1, #pieceMatrix do
        for j = 1, #pieceMatrix[i] do
            if pieceMatrix[i][j] then
                local boardRow = pieceY + i
                local boardCol = pieceX + j
                if boardRow < 1 or boardRow > rows or boardCol < 1 or boardCol > cols then
                    return false
                end
                if isFilledCell(matrix[boardRow][boardCol]) then
                    return false
                end
            end
        end
    end
    return true
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

local function commitPieceToBoard()
    for i = 1, rows do
        for j = 1, cols do
            local cell = Board.projectedMatrix[i][j]
            if isFilledCell(cell) then
                matrix[i][j] = cell
            end
        end
    end
end

local function clearFullLines()
    for i = rows, 1, -1 do
        local isFullLine = true
        for j = 1, cols do
            if not isFilledCell(matrix[i][j]) then
                isFullLine = false
                break
            end
        end

        if isFullLine then
            table.remove(matrix, i)
            table.insert(matrix, 1, {})
            for j = 1, cols do
                matrix[1][j] = {0, 0, 0, 0}
            end
            linesCleared = linesCleared + 1
        end
    end
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
    Piece.load(boardX, boardY, cellSize, rows, cols)
    Board.projectedMatrix = projectPieceOntoBoard(Piece.getMatrix(), Piece.getX(), Piece.getY())
end

function Board.update(dt)
    local pieceMatrix = Piece.getMatrix()
    local pieceX = Piece.getX()
    local pieceY = Piece.getY()
    local previousY = pieceY

    Piece.update(dt)
    local newY = Piece.getY()

    if newY > previousY and not canPlacePieceAt(pieceMatrix, pieceX, newY) then
        Piece.setY(previousY)
        Piece.setPlaced(true)
    end

    Board.projectedMatrix = projectPieceOntoBoard(pieceMatrix, Piece.getX(), Piece.getY())

    if Piece.getPlaced() then
        commitPieceToBoard()
        Piece.respawn(cols)
        Board.projectedMatrix = projectPieceOntoBoard(Piece.getMatrix(), Piece.getX(), Piece.getY())
    end

    clearFullLines()
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