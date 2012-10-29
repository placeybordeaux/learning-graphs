function love.load()
  require("node")
  require("graph")
  require("edge")
  require("algorithms")

  toggle = true
  algo = BFS(Graph1())
  love.graphics.setFont(love.graphics.newFont(40))
end

function love.draw()
  love.graphics.setBackgroundColor(255,255,255,255)
  algo.draw()
end

function love.update()
    algo.update()
    if algo.done() and toggle then
        toggle = false
        algo = DFS(Graph2())
    end
end

function love.mousepressed(x,y,button)
  if button == "l" then
    algo.click(x,y)
  end
end

