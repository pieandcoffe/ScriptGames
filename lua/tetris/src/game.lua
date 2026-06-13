local Board = require("src.board")
local Piece = require("src.piece")
local Input = require("src.input")

local Game = {}

local titleFont
local uiFont
local WINDOW_W
local WINDOW_H
local SCALE

function Game.load()
    WINDOW_W = love.graphics.getWidth()
    WINDOW_H = love.graphics.getHeight()
    SCALE = 1

    Board.load(WINDOW_W, WINDOW_H)

    titleFont = love.graphics.newFont(36)
    uiFont = love.graphics.newFont(18)

    love.graphics.setDefaultFilter("nearest", "nearest")
    love.graphics.setFont(titleFont)
end

function Game.update(dt)
    Board.update(dt)
end

function Game.draw()
    love.graphics.push()
    love.graphics.scale(SCALE, SCALE)

    love.graphics.clear(0.06, 0.12, 0.18)

    Board.draw()

    love.graphics.pop()
end

function Game.keypressed(key)
    Input.keypressed(key)
end

return Game
