
Node = {r = 40, selected_img = love.graphics.newImage("imgs/circle1.png"), unselected_img = love.graphics.newImage("imgs/uncircle1.png"),
invisible_img = love.graphics.newImage("imgs/invisible.png")}

function Node.new(x,y)
  local self = {}

  self.x = x + Node.r
  self.y = y + Node.r
  self.img = Node.invisible_img
  self.edges = {}
  self.color = {0,0,0,0}

  function self.draw()
    love.graphics.setColor(self.color)
    love.graphics.circle("fill",self.x , self.y, Node.r, 30)
  end

  function self.neighbors()
    neighbors = {}
    for _, edge in pairs(self.edges) do
      neighbors[#neighbors+1] = edge.other_node(self)
    end
    return neighbors
  end

  function self.click()
    self.selected()
    for _, edge in pairs(self.edges) do
      edge.setVisible(true)
    end
  end

  function self.set_color(c)
      for k,v in ipairs(c) do
          self.color[k] = v
      end
  end

  function self.invisible()
    self.color[4] = 0
  end

  function self.grayed_out()
    self.set_color({0xfe,0x3f,0x44})
  end

  function self.selectable()
    self.set_color({0x1D,0x76,0x6F})
  end

  function self.selected()
    self.set_color({0x33, 0xCE, 0xC3})
  end

  function self.visible()
    self.color[4] = 255
  end

  function self.at(x,y)
    if math.abs(self.x - x) + math.abs(self.y - y) <= Node.r then
      return true
    end
    return false
  end

  return self
end
