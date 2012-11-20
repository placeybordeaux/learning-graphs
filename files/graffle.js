Raphael.fn.connection = function (obj1, obj2, line, weight, bg) {
    if(!weight){
        weight = "";
    }
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            text: r.text(x2,y2,weight).attr({"font-weight": "bold"}),
            from: obj1,
            to: obj2
        };
    }
};



//monkey patching stuff

Array.prototype.contains = function(obj) {
        var i;
        for (i = 0; i < this.length; i++) {
            if (this[i] === obj) {return true;}
        }
        return false;
};

Array.prototype.remove = function(obj) {
        var i;
        for (i = 0; i < this.length; i++) {
            if (this[i] === obj) {
                this.splice(i,1);
                return null;
            }
        }
};

var el;
window.onload = function () {
        r = Raphael("holder", 640, 480);

        g = graph.create([[20,20],[80,20],[20,80],[80,80],[80,140],[140,80]],
                [[0,2],[0,1],[1,3],[3,4],[3,5]]);
        algorithm = BFS();
};

//algorithm stuff
var algo = {};
algo.create = function () {
    var n = g.nodes[Math.floor(Math.random()*g.nodes.length)];
    n.animate({"opacity": 1}, 500);
    return {visited: [],
            frontier: [n],
            next_frontier: []
    };
};

var DFS = function (){
    a = algo.create();
    a.click = function (n){
        if(a.frontier.contains(n)){
            n.animate({"fill-opacity": 1}, 500);
            reveal_from_node(n);
            a.frontier.remove(n);
            a.next_frontier.push(a.frontier.splice(0));
            a.visited.push(n);
            a.frontier = [];
            var ns = g.neighbors(n);
            for (var i=0;i<ns.length;i++){
                if(!(a.visited.contains(ns[i]))){
                    a.frontier.push(ns[i]);
                }
            }
            while(a.frontier.length == 0 && a.next_frontier.length > 0){
                a.frontier = a.next_frontier.pop();
            }
        }
    }
    return a;
};

var BFS = function (){
    a = algo.create();
    a.click = function (n){
        if(a.frontier.contains(n)){
            n.animate({"fill-opacity": 1}, 500);
            reveal_from_node(n);
            a.frontier.remove(n);
            a.visited.push(n);
            var ns = g.neighbors(n);
            for (var i=0;i<ns.length;i++){
                if(!(a.visited.contains(ns[i]))){
                    a.next_frontier.push(ns[i]);
                }
            }
            while(a.frontier.length == 0 && a.next_frontier.length > 0){
                a.frontier = a.next_frontier;
                a.next_frontier = [];
            }
        }
    }
    return a;
};



var reveal_from_node = function (n) {
        var ns = g.neighbors(n);
        for (var i=0;i<ns.length;i++){
            ns[i].animate({"opacity": 1}, 500);
        }
        var es = g.get_edges(n);
        for (var i=0;i<es.length;i++){
            es[i].line.animate({"opacity": 1}, 500);
            es[i].text.animate({"opacity": 1}, 500);
        }
};
 
    

//click function
var click = function () {
    algorithm.click(this);
};

//graph functions
var graph = {};
graph.create = function (ns,es,ws) {
    var radius = 10,
    nodes = [],
    edges = [];
    //node creation
    for (var i=0; i<ns.length; i++){
        var n = r.ellipse(ns[i][0],ns[i][1],radius,radius);
        var color = Raphael.getColor();
        n.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, "opacity": 0});
        //shapes[i].drag(move, dragger, up);
        n.click(click);
        nodes.push(n);
    };
    //edge creation
    for (var i=0; i<es.length; i++){
        if(ws){
            var c = r.connection(nodes[es[i][0]],nodes[es[i][1]], "#fff", ws[i]);
        }else{
            var c = r.connection(nodes[es[i][0]],nodes[es[i][1]], "#fff");
        }
        c.line.attr({"opacity": 0});
        c.text.attr({"opacity": 0});
        edges.push(c);
    };
    return {nodes: nodes,edges: edges, neighbors: graph.neighbors, get_edges: graph.get_edges};
};

graph.neighbors = function (node) {
    var neighbors = [];
    for (var i = 0; i < this.edges.length; i++){
        if (this.edges[i].to == node){
            neighbors.push(this.edges[i].from);
        }
        if (this.edges[i].from == node){
            neighbors.push(this.edges[i].to);
        }
    }
    return neighbors;
};

graph.get_edges = function (node){
    var e = [];
    for (var i = 0; i < this.edges.length; i++){
        if (this.edges[i].to == node){
            e.push(this.edges[i]);
        }
        if (this.edges[i].from == node){
            e.push(this.edges[i]);
        }
    }
    return e;
};