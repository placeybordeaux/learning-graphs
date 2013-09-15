//makes the lines that connect the nodes
Raphael.fn.connection = function (obj1, obj2, line, weight, bg) {
    var fill_opacity = 0.75;
    if(!weight){
        weight = "";
        fill_opacity = 0;
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
    var dx, dy;
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            dx = Math.abs(p[i].x - p[j].x);
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i !== 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    var res;
    if (dis.length === 0) {
        res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    var c = r.circle((x1+x4)/2,(y1+y4)/2,10).attr({"stroke-width": 0, fill: "#FFF", "fill-opacity": fill_opacity, "color": "#FFF"});
    var t = r.text((x1+x4)/2,(y1+y4)/2,weight).attr({"font-weight": "bold","font-size": 17});
    r.safari();
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");


    if (line && line.line) {
        line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        var return_obj = {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            text: t,
            line: this.path(path).attr({stroke: "#5A6351", "stroke-width": 3, fill: "none"}),
            from: obj1,
            to: obj2,
            weight: parseInt(weight, 10),
            backdrop_for_text: c
        };
        return_obj.line.p = return_obj;
        return_obj.text.p = return_obj;
        return_obj.backdrop_for_text.p = return_obj;
        return_obj.backdrop_for_text.toFront();
        return_obj.text.toFront();
        return return_obj;
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
                this.remove(obj);
                return null;
            }
        }
};

var get_graph = function (weighted) {
        graphs = [
        graph.create([[40,40],[100,40],[40,100],[160,100],[160,180],[400,100],[420,420]],
                [[0,2],[0,1],[1,3],[3,4],[3,5],[2,3],[4,6],[1,5],[5,6]]),
 
        graph.create([[140,20],[120,80],[160,80],[100,120],[130,120],[170,120]],
                [[0,2],[0,1],[1,3],[1,4],[2,5]]),
        graph.create([[340,200],[310,280],[305,210],[260,180],[300,340],[400,120],[420,20]],
                [[0,1],[1,2],[2,3],[3,4],[4,1],[1,5],[5,6]]),
        graph.create([[40,40],[140,40],[240,40],[340,40],[440,40],[540,40],[320,240],[60,300],[300,300],[400,400]],
                [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,6],[1,6],[1,7],[6,7],[7,8],[8,9],[5,9]])
 
 
            ];

        weighted_graphs = [
        graph.create([[40,40],[100,40],[40,100],[160,100],[160,180],[400,100],[420,420]],
                [[0,2],[0,1],[1,3],[3,4],[3,5],[2,3],[4,6],[1,5],[5,6]],
                [1,2,3,4,5,6,2,3,2,1]),
        graph.create([[240,20],[200,120],[280,120],[160,220],[240,220],[300,220]],
                [[0,2],[0,1],[1,3],[1,4],[2,5]],
                [5,3,3,4,1,2]),
        graph.create([[340,200],[310,280],[305,210],[260,180],[300,340],[400,120],[420,20]],
                [[0,1],[1,2],[2,3],[3,4],[4,1],[1,5],[5,6],[3,6]],
                [1,3,2,5,2,3,4,2]),
        graph.create([[40,40],[140,40],[240,40],[340,40],[440,40],[540,40],[320,240],[60,300],[300,300],[400,400]],
                [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[3,6],[1,6],[1,7],[6,7],[7,8],[8,9],[5,9]],
                [3,4,5,6,4,3,4,7,3,1,3,2,3])
 
            ];

	if(weighted){
		return weighted_graphs[Math.floor(Math.random()*weighted_graphs.length)];
	}
		return graphs[Math.floor(Math.random()*weighted_graphs.length)];
};


var el;
window.onload = function () {
        r = Raphael("holder", 640, 480);

	g = get_graph(true);

        notice_text = r.text(40,450, "").attr({"text-anchor": "start","font": "30px Helvetica", "color": "#000"});

        set_text = function (t) {
            notice_text.attr({"text": t});
            notice_text.animate({"opacity": 1}, 600, "<", function () {notice_text.animate({"opacity": 0}, 4000, "<");});
        };

        algorithm = Prims();
        r.safari();

        img = r.image("files/dholler_ok.png",200,100,200,200).hide();

        success = (function () {
            img.show();
            img.animate({"transform": "s4"}, 2000);
            img.animate({"opacity": 0}, 2000, img.hide);
        });

        (function ticker() {
            for (var i = 0; i < algorithm.frontier.length; i++){
                if(i == algorithm.frontier.length - 1){
                    if (algorithm.frontier[i].attr("r") == 10){
                        algorithm.frontier[i].animate({"r": 13}, 500, "linear", ticker);
                    }else{
                        algorithm.frontier[i].animate(Raphael.animation({"r": 10}, 500, "linear", ticker));
                    }    
                }else{
                    if (algorithm.frontier[i].attr("r") == 10){
                        algorithm.frontier[i].animate({"r": 13}, 500);
                    }else{
                        algorithm.frontier[i].animate(Raphael.animation({"r": 10}, 500));
                    }
                }
            }
            for (i = 0; i < algorithm.visited.length; i++){
                    algorithm.visited[i].animate(Raphael.animation({"r": 10}, 500));
            }
        })();
        
};

//algorithm stuff
var algo = {};
algo.create = function () {
    var n = g.nodes[Math.floor(Math.random()*g.nodes.length)];
    n.animate({"opacity": 1}, 500);
    n.show();
    return {visited: [],
            frontier: [n],
            next_frontier: []
    };
};

var Kruskals = function() {
    a = algo.create();
    a.frontier.pop();
    for(var i=0;i<g.nodes.length;i++){
        g.nodes[i].animate({"opacity": 1},500);
        g.nodes[i].show();
        g.nodes[i].rank = 0;
        g.nodes[i].pointer = g.nodes[i];
    }
    for(i=0;i<g.edges.length;i++){
        g.edges[i].line.animate({"opacity": 0.6},500);
        g.edges[i].text.animate({"opacity": 1},500);
        g.edges[i].line.show();
        g.edges[i].text.show();
        g.edges[i].backdrop_for_text.show();
    }
    a.counter = 0;
    a.click = function (e){
       if('p' in e){
            e = e.p;
            var j=0;
            var c;
             while(j<g.edges.length){
                    c = g.edges[j].to;
                    b = g.edges[j].from;
                    while(c.pointer != c){
                        c = c.pointer;
                    }
                    while(b.pointer != b){
                        b = b.pointer;
                    }
                    if(b == c){
                        g.edges.remove(g.edges[j]);
                    }else{
                        j++;
                    }
            }
                for(var i=0; i< g.edges.length; i++){
                    if(e.weight > g.edges[i].weight){
                        set_text("There is an edge with a lower weight");
                        return false;
                    }
                }
                c = e.to;
                b = e.from;
                while(c.pointer != c){
                    c = c.pointer;
                }
                while(b.pointer != b){
                    b = b.pointer;
                }
                if(b == c){
                    set_text("These nodes are already connected");
                    return false;
                }
                if(b.rank > c.rank){
                    c.pointer = b;
                }else if(c.rank > b.rank){
                    b.pointer = c;
                }else {
                    b.rank++;
                    c.pointer = b;
                }
                g.edges.remove(e);
                e.to.animate({"fill-opacity": 1}, 500);
                e.from.animate({"fill-opacity": 1}, 500);
                e.line.animate({"stroke": "#49E20E"},500);
                a.counter++;
            }
       console.log(g.edges.length);
       if(g.nodes.length == a.counter + 1){
           success();
       }
    };
    return a;
};

var Prims = function() {
    a = algo.create();
    var to_reveal = a.frontier[0];
    a.frontier.remove(to_reveal);
    a.visited.push(to_reveal);
    to_reveal.animate({"fill-opacity": 1},500);
    reveal_from_node(to_reveal);
    a.click = function (e){
        if('p' in e){
            e = e.p;
            if(a.visited.contains(e.to) ^ a.visited.contains(e.from)){
                for(var i=0; i< a.visited.length; i++){
                    var n = a.visited[i];
                    var edges = g.get_edges(n);
                    for(var j=0; j < edges.length;j++){
                        if(a.visited.contains(edges[j].to) ^ a.visited.contains(edges[j].from)){
                            if(edges[j].weight < e.weight){
                                set_text("There is an edge with a lower weight");
                                return false;
                            }
                        }
                    }
                }
                e.to.animate({"fill-opacity": 1}, 500);
                e.from.animate({"fill-opacity": 1}, 500);
                reveal_from_node(e.to);
                reveal_from_node(e.from);
                a.visited.remove(e.to);
                a.visited.remove(e.from);
                a.visited.push(e.to);
                a.visited.push(e.from);
                e.line.animate({"stroke": "#49E20E"},500);
            }else if(a.visited.contains(e.to) && a.visited.contains(e.from)){
                set_text("These two edges are already connected");
        }
        if(a.visited.length == g.nodes.length){
            success();
        }
 
        }
    };
    return a;
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
            while(a.frontier.length === 0 && a.next_frontier.length > 0){
                a.frontier = a.next_frontier.pop();
            }
        }else {
            set_text("Try clicking the flashing nodes");
        }
        if(a.visited.length == g.nodes.length){
            success();
        }
    };
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
            var nodes_ = g.neighbors(n);
            for (var i=0;i<nodes_.length;i++){
                if(!(a.visited.contains(nodes_[i]))){
                    a.next_frontier.push(nodes_[i]);
                }
            }
            while(a.frontier.length === 0 && a.next_frontier.length > 0){
                a.frontier = a.next_frontier;
                a.next_frontier = [];
            }
        }else{
            set_text("Try clicking the flashing nodes");
        }
        if(a.visited.length == g.nodes.length){
            success();
        }
    };
    return a;
};

//shows everything related to the node and it's neighbors
var reveal_from_node = function (n) {
        var nodes_ = g.neighbors(n);
        for (var i=0;i<nodes_.length;i++){
            nodes_[i].animate({"opacity": 1}, 500);
            nodes_[i].show();
            nodes_[i].da_glow.show();
        }
        var edges_ = g.get_edges(n);
        for (i=0;i<edges_.length;i++){
            edges_[i].line.show();
            edges_[i].text.show();
            edges_[i].backdrop_for_text.show();
            edges_[i].line.animate({"opacity": 1}, 500);
            edges_[i].text.animate({"opacity": 1}, 500);
        }
};
 
//click function
var click = function () {
    algorithm.click(this);
};

//graph functions
var graph = {};
graph.create = function (nodes_,edges_,weights_) {
    Raphael.getColor.reset();
    var radius = 10,
    nodes = [],
    edges = [];
    //node creation
    for (var i=0; i<nodes_.length; i++){
        var n = r.circle(nodes_[i][0],nodes_[i][1],radius);
        var color = Raphael.getColor(1);
        n.attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, "opacity": 0});
        n.click(click);
        n.hide();
        n.da_glow = n.glow({"width": 3, "opacity": 0.25}).hide();
        nodes.push(n);
    }
    //edge creation
    for (i=0; i<edges_.length; i++){
        var c;
        if(weights_){
            c = r.connection(nodes[edges_[i][0]],nodes[edges_[i][1]], "#fff", Math.ceil((Math.random()*7)));
        }else{
            c = r.connection(nodes[edges_[i][0]],nodes[edges_[i][1]], "#fff");
        }
        c.line.click(click);
        c.text.click(click);
        c.backdrop_for_text.click(click);
        c.line.attr({"opacity": 0});
        c.text.attr({"opacity": 0});
        c.line.hide();
        c.text.hide();
        c.backdrop_for_text.hide();
        edges.push(c);
    }
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
