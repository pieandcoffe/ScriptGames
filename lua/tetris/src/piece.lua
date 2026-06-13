local Piece = {}

local fallTimer = 0
local fallDelay = 0.5
local dropFallDelay = 0.1

local x = 0
local y = 0
local dropping = false

local drawX = 0
local drawY = 0
local cellSize = 0
local cols = 10
local rows = 0

function Piece.load(p_drawX, p_drawY, p_cellSize, p_rows)
    drawX = p_drawX
    drawY = p_drawY
    cellSize = p_cellSize
    rows = p_rows
end

function Piece.update(dt)
    fallTimer = fallTimer + dt
    local delay = dropping and dropFallDelay or fallDelay
    if fallTimer >= delay then
        y = math.max(0, math.min(y + 1, rows - 1))
        fallTimer = 0
    end
end

function Piece.draw()
    local xPos = drawX + cellSize * x
    local yPos = drawY + cellSize * y
    love.graphics.rectangle("fill", xPos, yPos, cellSize, cellSize)
end

function Piece.moveLeft()
    x = math.max(0, x - 1)
end

function Piece.moveRight()
    x = math.min(cols - 1, x + 1)
end

function Piece.moveUp()
    y = math.max(0, y - 1)
end

function Piece.moveDown()
    y = math.min(rows - 1, y + 1)
end

function Piece.drop()
    dropping = not dropping
end

return Piece