SCALE = 4
WINDOW_W, WINDOW_H = 240, 160

function love.conf(t)
    t.window.title  = "Tetris"
    t.window.width  = WINDOW_W * SCALE
    t.window.height = WINDOW_H * SCALE
    t.window.vsync  = 1
end