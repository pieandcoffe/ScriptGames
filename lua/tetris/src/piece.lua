local Piece = {}

local PieceType = {
    I = 1,
    O = 2,
    J = 3,
    L = 4,
    S = 5,
    Z = 6,
    T = 7
}

local pieceTypeNames = {"I", "O", "J", "L", "S", "Z", "T"}

local fallTimer = 0
local fallDelay = 0.5
local dropFallDelay = 0.05

local x = 0
local y = 0
local dropping = false
local placed = false

local matrix = {}
local color = {1, 1, 1, 1}

local drawX = 0
local drawY = 0
local cellSize = 0
local cols = 0
local rows = 0

local function clearMatrix()
    matrix = {}
end

local function getMatrixWidth()
    return matrix[1] and #matrix[1] or 0
end

local function getMatrixHeight()
    return #matrix
end

local function getPlaced()
    return placed
end

local function initializeMatrix(height, width, callback, newColor)
    color = newColor or color
    clearMatrix()

    for i = 1, height do
        matrix[i] = {}
        for j = 1, width do
            matrix[i][j] = callback(i - 1, j - 1)
        end
    end
end

local function initializePiece(type)
    if type == PieceType.I then
        initializeMatrix(4, 1, function(i, j) return true end, {0, 1, 1, 1})
    elseif type == PieceType.O then
        initializeMatrix(2, 2, function(i, j) return true end, {1, 1, 0, 1})
    elseif type == PieceType.J then
        initializeMatrix(2, 3, function(i, j) return (i == 0 and j == 2) or i == 1 end, {0.5, 0, 0.5, 1})
    elseif type == PieceType.L then
        initializeMatrix(2, 3, function(i, j) return (i == 0 and j == 0) or i == 1 end, {0, 1, 0, 1})
    elseif type == PieceType.S then
        initializeMatrix(2, 3, function(i, j) return (i == 0 and j < 2) or (i == 1 and j > 0) end, {1, 0, 0, 1})
    elseif type == PieceType.Z then
        initializeMatrix(2, 3, function(i, j) return (i == 0 and j > 0) or (i == 1 and j < 2) end, {0, 0, 1, 1})
    elseif type == PieceType.T then
        initializeMatrix(2, 3, function(i, j) return (i == 0 and j == 1) or i == 1 end, {1, 0.5, 0, 1})
    else
        initializeMatrix(2, 2, function(i, j) return true end, {1, 1, 1, 1})
    end
end

function Piece.load(p_drawX, p_drawY, p_cellSize, p_rows, p_cols)
    drawX = p_drawX
    drawY = p_drawY
    cellSize = p_cellSize
    rows = p_rows
    cols = p_cols
    clearMatrix()
    Piece.respawn(cols)
end

function Piece.update(dt)
    fallTimer = fallTimer + dt
    local delay = dropping and dropFallDelay or fallDelay
    if fallTimer >= delay then
        y = math.max(0, math.min(y + 1, rows - getMatrixHeight()))
        fallTimer = 0
    end

    if y >= rows - getMatrixHeight() then
        placed = true
    end
end

function Piece.draw()
    love.graphics.setColor(color)
    for i = 1, getMatrixHeight() do
        for j = 1, getMatrixWidth() do
            if matrix[i][j] then
                local xPos = drawX + cellSize * (x + j - 1)
                local yPos = drawY + cellSize * (y + i - 1)
                love.graphics.rectangle("fill", xPos, yPos, cellSize, cellSize)
            end
        end
    end
    love.graphics.setColor(1, 1, 1, 1)
end

function Piece.moveLeft()
    x = math.max(0, x - 1)
end

function Piece.moveRight()
    x = math.min(cols - getMatrixWidth(), x + 1)
end

function Piece.moveUp()
    y = math.max(0, y - 1)
end

function Piece.moveDown()
    y = math.min(rows - getMatrixHeight(), y + 1)
end

function Piece.drop()
    dropping = not dropping
end

function Piece.getMatrixWidth()
    return getMatrixWidth()
end

function Piece.getMatrixHeight()
    return getMatrixHeight()
end

function Piece.getMatrix()
    return matrix
end

function Piece.getX()
    return x
end

function Piece.getY()
    return y
end

function Piece.getColor()
    return color
end

function Piece.clearMatrix()
    clearMatrix()
end

function Piece.getPlaced()
    return getPlaced()
end

function Piece.setY(newY)
    y = newY
end

function Piece.setPlaced(value)
    placed = value
end

function Piece.respawn(gridWidth)
    local nextType = math.random(1, #pieceTypeNames)
    initializePiece(nextType)
    x = math.max(0, math.min(x, gridWidth - getMatrixWidth()))
    y = 0
    placed = false
    dropping = false
    fallTimer = 0
end

function Piece.rotate()
    local height = getMatrixHeight()
    local width = getMatrixWidth()
    local rotated = {}

    for i = 1, width do
        rotated[i] = {}
        for j = 1, height do
            rotated[i][j] = false
        end
    end

    for i = 1, height do
        for j = 1, width do
            rotated[j][height - i + 1] = matrix[i][j]
        end
    end

    matrix = rotated
end

return Piece