require("graph")

Algo = {}

function DFS(g)
    local self = {}

    self.graph = g

    local visited = {}
    local frontier = {}
    local nextfrontier = {}
    local text = ""

    n = g.nodes[math.random(#g.nodes)]

    frontier[n] = true
    n.make_visible()

    function self.draw()
        g.draw()
    end

    function self.click(x,y)
        n = g.get_node_at(x,y)
        if frontier[n] then
            visited[n] = true
            n.click()
            for _, neighbor in pairs(n.neighbors()) do
                nextfrontier[neighbor] = true
            end
        end
        print("frontier")
        for k,v in pairs(frontier) do print(k,v) end
        print("visited")
        for k,v in pairs(visited) do print(k,v) end
        print("nextfrontier")
        for k,v in pairs(nextfrontier) do print(k,v) end
 
        if self.frontier_is_visited() then
            frontier = nextfrontier
            nextfrontier = {}
        end
    end

    function self.frontier_is_visited()
        for k,_ in pairs(frontier) do
            if not visited[k] then
                return false
            end
        end
        return true
    end

    return self

end

