local Music = {}

function Music.load()
    music = love.audio.newSource("assets/music/katia1v2.wav", "stream")
    music:setLooping(true)
end

function Music.play()
    if not music:isPlaying() then
        music:play()
    end
end

function Music.stop()
    if music:isPlaying() then
        music:stop()
    end
end

function Music.pause()
    if music:isPlaying() then
        music:pause()
    end
end

return Music