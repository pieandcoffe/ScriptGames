if arg[2] == "debug" then
    require("lldebugger").start()
end

local titleFont
local uiFont

function love.load()
    love.graphics.setDefaultFilter("nearest", "nearest")
    titleFont = love.graphics.newFont(36)
    uiFont = love.graphics.newFont(18)
    love.graphics.setFont(titleFont)
end

function love.update(dt)
end

function love.draw()
    love.graphics.push()
    love.graphics.scale(SCALE, SCALE)

    love.graphics.clear(0.06, 0.12, 0.18)

    love.graphics.pop()
end

function love.keypressed(key)
    if key == "left"  then
    elseif key == "right" then
    elseif key == "up"   then
    elseif key == "down" then
    elseif key == "space" then
    end
end

local love_errorhandler = love.errorhandler

function love.errorhandler(msg)
    if lldebugger then
        error(msg, 2)
    else
        return love_errorhandler(msg)
    end
end