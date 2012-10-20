
Node = {r = 40, selected_img = love.graphics.newImage("imgs/circle1.png"), unselected_img = love.graphics.newImage("imgs/uncircle1.png"),
invisible_img = love.graphics.newImage("imgs/invisible.png")}

function Node.new(x,y)
  local self = {}

  self.x = x + Node.r
  self.y = y + Node.r
  self.img = Node.invisible_img
  self.edges = {}
  self.visible = false

  function self.draw()
    love.graphics.draw(self.img, self.x, self.y,0,1,1,Node.r,Node.r)
  end

  function self.neighbors()
    neighbors = {}
    for _, edge in pairs(self.edges) do
      neighbors[#neighbors+1] = edge.other_node(self)
    end
    return neighbors
  end

  function self.click()
    self.visible = true
    self.img = Node.selected_img
    for _, edge in pairs(self.edges) do
      edge.setVisible(true)
    end
  end

  function self.invisible()
    self.img = Node.invisible_img
  end

  function self.make_visible()
    self.visible = true
    if self.img == Node.selected_img then
      return nil
    else
      self.img = Node.unselected_img
    end
  end

  function self.at(x,y)
    if math.abs(self.x - x) + math.abs(self.y - y) <= Node.r then
      return true
    end
    return false
  end

  return self
end
