local Board = require("src.board")
local Input = require("src.input")

local Game = {}

local titleFont
local uiFont
local WINDOW_W
local WINDOW_H
local SCALE = 1

local paused = true
local gameOver = false
local points = 0

local function drawLogo()
    love.graphics.setFont(titleFont)
    love.graphics.setColor(1, 1, 1)
    love.graphics.printf("TETRIS", 0, WINDOW_H / (2 * SCALE) - 50, WINDOW_W / SCALE, "center")
    love.graphics.setFont(uiFont)
    love.graphics.printf("Press any key", 0, WINDOW_H / (2 * SCALE) + 10, WINDOW_W / SCALE, "center")
    love.graphics.setColor(1, 1, 1, 1)
end

local function drawGameOver()
    love.graphics.setFont(titleFont)
    love.graphics.setColor(1, 1, 1)
    love.graphics.printf("Game Over", 0, WINDOW_H / (2 * SCALE) - 50, WINDOW_W / SCALE, "center")
    love.graphics.setFont(uiFont)
    love.graphics.printf("Your Score: " .. points, 0, WINDOW_H / (2 * SCALE) + 10, WINDOW_W / SCALE, "center")
    love.graphics.setColor(1, 1, 1, 1)
end

local function drawPoints()
    love.graphics.setFont(uiFont)
    love.graphics.setColor(1, 1, 1)
    love.graphics.print("Points: " .. points, 10, 10)
end

function Game.load()
    WINDOW_W = love.graphics.getWidth()
    WINDOW_H = love.graphics.getHeight()

    -- initialize random seed and discard first value
    math.randomseed(os.time() + os.clock() * 1000)
    math.random()

    Board.load(WINDOW_W, WINDOW_H)

    titleFont = love.graphics.newFont(36)
    uiFont = love.graphics.newFont(18)

    love.graphics.setDefaultFilter("nearest", "nearest")
    love.graphics.setFont(titleFont)
end

function Game.update(dt)
    if paused or gameOver then
        return
    end

    if Board.getGameOver() then
        gameOver = true
        return
    end

    Board.update(dt)
    points = Board.getLinesCleared() * 100
end

function Game.draw()
    love.graphics.push()
    love.graphics.scale(SCALE, SCALE)
    love.graphics.clear(0.06, 0.12, 0.18)

    if gameOver then
        drawGameOver()
        love.graphics.pop()
        return
    end

    if paused then
        drawLogo()
        love.graphics.pop()
        return
    end

    Board.draw()
    drawPoints()
    love.graphics.pop()
end

function Game.keypressed(key)
    if gameOver then
        -- restart
        gameOver = false
        paused = true
        points = 0
        Board.reset()
        return
    end

    if key == "escape" and not paused then
        paused = true
        return
    end

    if paused then
        paused = false
        return
    end

    Input.keypressed(key)
end

function Game.keyreleased(key)
    Input.keyreleased(key)
end

return Game
