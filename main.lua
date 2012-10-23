function love.load()
  require("node")
  require("graph")
  require("edge")
  require("algorithms")

  algo = DFS(Graph1())
end

function love.draw()
  love.graphics.setBackgroundColor(255,255,255,255)
  algo.draw()
end

function love.update()
    algo.update()
end

function love.mousepressed(x,y,button)
  if button == "l" then
    algo.click(x,y)
  end
end

