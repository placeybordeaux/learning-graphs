Edge = {}

function Edge.new(node_a,node_b)
  local self = {}

  self.node_a = node_a
  self.node_b = node_b
  node_a.edges[#node_a.edges + 1] = self
  node_b.edges[#node_b.edges + 1] = self
  self.visible = false
  self.selected = false

  function self.draw()
    love.graphics.setColor(0,0,0,255)
    love.graphics.setLineWidth(10)
    if self.visible and self.selected then
        love.graphics.setColor(200,0,0,255)
        love.graphics.line(node_a.x,node_a.y,node_b.x,node_b.y)
    elseif self.visible then
        love.graphics.line(node_a.x,node_a.y,node_b.x,node_b.y)
    end
  end

  function self.show_nodes()
    node_a.make_visible()
    node_b.make_visible()
  end

  function self.other_node(n)
      if n == self.node_a then
          return self.node_b
      end
      if n == self.node_b then
          return self.node_a
      end
      return nil
  end

  function self.setVisible(bool)
    self.visible = bool
    if bool then
      self.show_nodes()
    end
  end

  return self
end

