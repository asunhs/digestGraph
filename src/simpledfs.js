/**
 * Vertex
 * @param id : vertex id
 * @returns {Vertex}
 * @constructor
 */
function Vertex (id) {
    if (!(this instanceof Vertex)) {
        return new Vertex(id);
    }

    if (!id) {
        throw new TypeError('id is required');
    }

    this.id = id;
    this.visited = false;
}

Vertex.prototype.visit = function () {
    this.visited = true;
};

Vertex.prototype.leave = function () {
    this.visited = false;
};


/**
 * Edge
 * @param lhs : vertex
 * @param rhs : vertex
 * @param weight
 * @returns {Edge}
 * @constructor
 */
function Edge (from, to, weight) {
    if (!(this instanceof Edge)) {
        return new Edge(from, to, weight);
    }

    this.weight = weight;
    this.from = from;
    this.to = to;
    this.used = false;
}

Edge.prototype.use = function () {
    this.used = true;
};

Edge.prototype.clear = function () {
    this.used = false;
};

Edge.prototype.is = function (vertex) {
    return this.from === vertex || this.to === vertex;
};

Edge.prototype.opposite = function (vertex) {
    return this.from === vertex ? this.to : this.from;
};

Edge.prototype.each = function (job) {
    var result = [];
    result.push(job(this.from, this.to, this));
    result.push(job(this.to, this.from, this));
    return result;
};







function SimpleDFS (vertexes, edges) {
    if (!(this instanceof SimpleDFS)) {
        return new SimpleDFS(vertexes, edges);
    }

    this.vertexes = vertexes;
    this.edges = edges;
    this.link = {};

    this.parse();
}

SimpleDFS.prototype.Link = function (vertex, edge) {
    if (!(this instanceof SimpleDFS.prototype.Link)) {
        return new SimpleDFS.prototype.Link(vertex, edge);
    }

    this.vertex = vertex;
    this.opposite = edge.opposite(vertex);
    this.weight = edge.from === vertex ? edge.weight : -edge.weight;
    this.edge = edge;
};

SimpleDFS.prototype.parse = function () {
    var self = this;

    // vertex 만큼 생성
    _.each(self.vertexes, function (vertex) {
        self.link[vertex.id] = self.link[vertex.id] || [];
    });

    // edge 를 기반으로 link 를 생성
    _.each(self.edges, function (edge) {
        return edge.each(function (a) {
            self.link[a.id].push(new self.Link(a, edge));
        });
    });
};




SimpleDFS.prototype.findCycle = function (path) {
    var vertex = _.last(path).opposite;

    return _.reduceRight(path, function (cycle, link, index) {
        if (link.vertex === vertex) {
            return path.slice(index);
        }
        return cycle;
    }, []);
};


SimpleDFS.prototype.solveCycle = function (cycle) {

    var min = _.min(cycle, function (link) {
        return link.weight;
    });

    /*_.each(cycle, function (link) {
        link.weight -= min.weight;
    });*/

    console.table(_.map(cycle, function (link) {
        return {
            vertex : link.vertex.id,
            opposite : link.opposite.id,
            weight : link.weight
        };
    }));
};


SimpleDFS.prototype.trace = function (vertex, path) {

    var self = this;

    if (vertex.visited) {
        return self.solveCycle(self.findCycle(path));
    }

    vertex.visit();
    _.each(this.link[vertex.id], function (link) {
        if (link.edge.used) {
            return;
        }

        link.edge.use();
        path.push(link);
        self.trace(link.opposite, path);
        path.pop();
        link.edge.clear();
    });
    vertex.leave();
};

SimpleDFS.prototype.digest = function () {
    var self = this;

    _.each(self.vertexes, function (vertex) {
        self.trace(vertex, []);
    });
}