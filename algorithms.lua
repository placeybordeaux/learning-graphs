require("graph")

Algo = {}

function DFS(g)
    local self = {}

    self.graph = g

    local visited = {}
    local frontiers = {{},{}}
    local text = "Depth First Search"
    local depth = 1

    n = g.nodes[math.random(#g.nodes)]

    frontiers[1][n] = true 
    n.visible()
    n.selectable()

    function self.draw()
        g.draw()
        love.graphics.setColor(0,0,0)
        love.graphics.print(text, 150, 550)
    end

    function self.done()
        for _,n in pairs(self.graph.nodes) do
            if not visited[n] then
                return false
            end
        end
        return true
    end

    function self.update()
        if self.frontier_is_visited() then
            depth = depth - 1
            frontiers[depth + 1] = {}
        end
        if depth > 1 then
            for k,_ in pairs(frontiers[depth-1]) do
                k.visible()
                k.grayed_out()
            end
        end
        for k,_ in pairs(frontiers[depth]) do
            k.visible()
            k.selectable()
        end
        for k,_ in pairs(visited) do
            k.visible()
            k.selected()
        end
 
    end

    function self.click(x,y)
        n = g.get_node_at(x,y)
        if frontiers[depth][n] then
            visited[n] = true
            n.click()
            for _, neighbor in pairs(n.neighbors()) do
                frontiers[depth + 1][neighbor] = true
            end
            depth = depth + 1
            frontiers[depth + 1] = {}
        end
   end

    function self.frontier_is_visited()
        if depth > 1 then
            for k,_ in pairs(frontiers[depth]) do
                if not visited[k] then
                    return false
                end
            end
            return true
        end
    end

    return self
end

function BFS(g)
    local self = {}

    self.graph = g

    local visited = {}
    local frontier = {}
    local nextfrontier = {}
    local text = "Breadth First Search"

    n = g.nodes[math.random(#g.nodes)]

    frontier[n] = true
    n.visible()
    n.selectable()

    function self.done()
        for _,n in pairs(self.graph.nodes) do
            if not visited[n] then
                return false
            end
        end
        return true
    end

    function self.draw()
        love.graphics.setColor(0,0,0)
        love.graphics.print(text, 150, 550)
        g.draw()
    end

    function self.update()
        if self.frontier_is_visited() then
            frontier = nextfrontier
            nextfrontier = {}
        end
        for k,_ in pairs(nextfrontier) do
            k.visible()
            k.grayed_out()
        end
        for k,_ in pairs(frontier) do
            k.visible()
            k.selectable()
        end
        for k,_ in pairs(visited) do
            k.visible()
            k.selected()
        end
 
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
