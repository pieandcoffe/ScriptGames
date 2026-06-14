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
local normalFallDelay = 0.5
local fastFallDelay = 0.05
local slowFallDelay = 0.9

local x = 0
local y = 0
local fallMode = "normal"

local matrix = {}
local color = {1, 1, 1, 1}

local drawX = 0
local drawY = 0
local cellSize = 0
local cols = 0
local rows = 0

local currentType = nil
local nextType = nil
local placed = false

local function getPieceData(type)
    local function build(height, width, callback, c)
        local m = {}
        for i = 1, height do
            m[i] = {}
            for j = 1, width do
                m[i][j] = callback(i, j)
            end
        end
        return m, c
    end

    if type == PieceType.I then
        return build(4, 1, function(i, j) return true end, {0, 1, 1, 1})
    elseif type == PieceType.O then
        return build(2, 2, function(i, j) return true end, {1, 1, 0, 1})
    elseif type == PieceType.J then
        return build(2, 3, function(i, j) return (i == 1 and j == 3) or i == 2 end, {0.5, 0, 0.5, 1})
    elseif type == PieceType.L then
        return build(2, 3, function(i, j) return (i == 1 and j == 1) or i == 2 end, {0, 1, 0, 1})
    elseif type == PieceType.S then
        return build(2, 3, function(i, j) return (i == 1 and j < 3) or (i == 2 and j > 1) end, {1, 0, 0, 1})
    elseif type == PieceType.Z then
        return build(2, 3, function(i, j) return (i == 1 and j > 1) or (i == 2 and j < 3) end, {0, 0, 1, 1})
    elseif type == PieceType.T then
        return build(2, 3, function(i, j) return (i == 1 and j == 2) or i == 2 end, {1, 0.5, 0, 1})
    else
        return build(2, 2, function(i, j) return true end, {1, 1, 1, 1})
    end
end

local function getMatrixWidth()
    return matrix[1] and #matrix[1] or 0
end

local function getMatrixHeight()
    return #matrix
end

local function applyPieceData(type)
    matrix, color = getPieceData(type)
end

function Piece.load(p_drawX, p_drawY, p_cellSize, p_rows, p_cols)
    drawX = p_drawX
    drawY = p_drawY
    cellSize = p_cellSize
    rows = p_rows
    cols = p_cols
    matrix = {}
    Piece.respawn(cols)
end

function Piece.update(dt)
    fallTimer = fallTimer + dt
    local delay = fallMode == "fast" and fastFallDelay or (fallMode == "slow" and slowFallDelay or normalFallDelay)
    if fallTimer >= delay then
        y = math.max(0, math.min(y + 1, rows - getMatrixHeight()))
        fallTimer = 0
    end

    if y >= rows - getMatrixHeight() then
        placed = true
    end
end

function Piece.draw()
    love.graphics.setColor(Piece.getColor())
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

function Piece.setFallMode(mode)
    fallMode = mode
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

function Piece.getPlaced()
    return placed
end

function Piece.setY(newY)
    y = newY
end

function Piece.setPlaced(value)
    placed = value
end

function Piece.respawn(gridWidth)
    currentType = nextType or math.random(1, #pieceTypeNames)
    nextType = math.random(1, #pieceTypeNames)

    applyPieceData(currentType)
    x = math.max(0, math.min(x, gridWidth - getMatrixWidth()))
    y = 0
    placed = false
    fallTimer = 0
    fallMode = "normal"
end

function Piece.getNextMatrix()
    return getPieceData(nextType)
end

function Piece.getRotatedMatrix()
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

    return rotated
end

function Piece.rotate()
    matrix = Piece.getRotatedMatrix()
end

function Piece.getNextType()
    return nextType
end

function Piece.getCurrentType()
    return currentType
end

return Piece