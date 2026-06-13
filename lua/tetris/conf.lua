SCALE = 4
local W, H = 240, 160

function love.conf(t)
    t.window.title  = "Tetris"
    t.window.width  = W * SCALE
    t.window.height = H * SCALE
    t.window.vsync  = 1
end