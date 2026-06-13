local Game = {}

local titleFont
local uiFont
local boardW, boardH
local boardX, boardY

local fallTimer = 0
local fallDelay = 0.5
local x = 0
local y = 0
local cellSize = 0
local cols = 10
local rows = 0

local function calculate_board()
    local boardPadding = 20
    boardW = WINDOW_W / 3
    boardH = WINDOW_H - boardPadding * 2
    boardX = WINDOW_W / 3
    boardY = boardPadding

    cellSize = boardW / cols
    rows = math.floor(boardH / cellSize)
    boardH = rows * cellSize
end

local function draw_board()
    love.graphics.rectangle("line", boardX, boardY, boardW, boardH)
end

local function draw_piece(px, py)
    local xPos = boardX + cellSize * px
    local yPos = boardY + cellSize * py
    love.graphics.rectangle("fill", xPos, yPos, cellSize, cellSize)
end

function Game.load()
    WINDOW_W = love.graphics.getWidth()
    WINDOW_H = love.graphics.getHeight()
    SCALE = 1

    calculate_board()

    titleFont = love.graphics.newFont(36)
    uiFont = love.graphics.newFont(18)

    love.graphics.setDefaultFilter("nearest", "nearest")
    love.graphics.setFont(titleFont)
end

function Game.update(dt)
    fallTimer = fallTimer + dt
    if fallTimer >= fallDelay then
        y = math.max(0, math.min(y + 1, rows - 1))
        fallTimer = 0
    end
end

function Game.draw()
    love.graphics.push()
    love.graphics.scale(SCALE, SCALE)

    love.graphics.clear(0.06, 0.12, 0.18)

    draw_board()
    draw_piece(x, y)

    love.graphics.pop()
end

function Game.keypressed(key)
    if key == "left" then
        x = math.max(0, x - 1)
    elseif key == "right" then
        x = math.min(cols - 1, x + 1)
    elseif key == "up" then
        y = math.max(0, y - 1)
    elseif key == "down" then
        y = math.min(rows - 1, y + 1)
    elseif key == "space" then
        -- drop
    end
end

return Game
