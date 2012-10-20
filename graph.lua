require("node")
require("edge")

Graph = {}

function Graph.new(nodes,edges)
  local self = {}

  self.nodes = nodes
  self.edges = edges
 
  function self.get_node_at(x,y)
    for _, node in pairs(self.nodes) do
      if node.at(x,y) then
        return node
      end
    end
  end

  function self.draw()
    for _, node in pairs(self.nodes) do
      node.draw()
    end
    for _, edge in pairs(self.edges) do
      edge.draw()
    end
  end

  return self
end

function Graph1()
  a = Node.new(0,0)
  b = Node.new(100,100)
  c = Node.new(10,400)
  d = Node.new(200,50)
  e = Node.new(210,150)
  f = Node.new(300,60)
  g = Node.new(400,70)
  E = Edge.new(a,b)
  F = Edge.new(b,c)
  G = Edge.new(b,d)
  H = Edge.new(e,d)
  J = Edge.new(d,f)
  K = Edge.new(f,g)
  return Graph.new({a,b,c,d,e,f,g},{E,F,G,H,J,K})
end


