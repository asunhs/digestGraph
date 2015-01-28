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
function Edge (lhs, rhs, weight) {
    if (!(this instanceof Edge)) {
        return new Edge(lhs, rhs, weight);
    }

    this.weight = weight;
    this.vertexes = [lhs, rhs];
    this.used = false;
}

Edge.prototype.use = function () {
    this.used = true;
};

Edge.prototype.clear = function () {
    this.used = false;
};

Edge.prototype.is = function (vertex) {
    return this.vertexes[0] === vertex || this.vertexes[1] === vertex;
};

Edge.prototype.opposite = function (vertex) {
    return this.vertexes[0] === vertex ? this.vertexes[1] : this.vertexes[0];
};

Edge.prototype.each = function (job) {
    var result = [];
    result.push(job(this.vertexes[0], this.vertexes[1], this));
    result.push(job(this.vertexes[1], this.vertexes[0], this));
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
    this.weight = edge.weight;
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



SimpleDFS.prototype.solveCycle = function (cycle) {
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
        return self.solveCycle(path);
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