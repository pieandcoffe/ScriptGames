if arg[2] == "debug" then
    require("lldebugger").start()
end

local titleFont
local uiFont
local WINDOW_W, WINDOW_H, SCALE
local boardW, boardH
local boardX, boardY

local fallTimer = 0
local fallDelay = 0.5
local x = 0
local y = 0
local cellSize = 0
local cols = 10
local rows = 0

function love.load()
    WINDOW_W = love.graphics.getWidth()
    WINDOW_H = love.graphics.getHeight()
    SCALE = 1

    local boardPadding = 20
    boardW = WINDOW_W / 3
    boardH = WINDOW_H - boardPadding * 2
    boardX = WINDOW_W / 3
    boardY = boardPadding

    cellSize = boardW / cols
    rows = math.floor(boardH / cellSize)
    boardH = rows * cellSize

    titleFont = love.graphics.newFont(36)
    uiFont = love.graphics.newFont(18)

    love.graphics.setDefaultFilter("nearest", "nearest")
    love.graphics.setFont(titleFont)
end

function love.update(dt)
    fallTimer = fallTimer + dt
    if fallTimer >= fallDelay then
        y = math.max(0, math.min(y + 1, rows - 1))
        fallTimer = 0
    end
end

function love.draw()
    love.graphics.push()
    love.graphics.scale(SCALE, SCALE)

    love.graphics.clear(0.06, 0.12, 0.18)

    draw_board()
    draw_piece(x, y)

    love.graphics.pop()
end

function love.keypressed(key)
    if key == "left" then
        x = math.max(0, x - 1)
    elseif key == "right" then
        x = math.min(cols - 1, x + 1)
    elseif key == "up" then
        y = math.max(0, y - 1)
    elseif key == "down" then
        y = math.min(rows - 1, y + 1)
    elseif key == "space" then
    end
end

function draw_board()
    love.graphics.rectangle("line", boardX, boardY, boardW, boardH)
end

function draw_piece(x, y)
    local px = boardX + cellSize * x
    local py = boardY + cellSize * y
    love.graphics.rectangle("fill", px, py, cellSize, cellSize)
end

local love_errorhandler = love.errorhandler

function love.errorhandler(msg)
    if lldebugger then
        error(msg, 2)
    else
        return love_errorhandler(msg)
    end
end