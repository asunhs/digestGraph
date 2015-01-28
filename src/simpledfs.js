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

Edge.prototype.clean = function () {
    this.used = false;
};

Edge.prototype.is = function (vertex) {
    return this.vertexes[0] === vertex || this.vertexes[1] === vertex;
};

Edge.prototype.opposite = function (vertex) {
    return this.vertexes[0] === vertex ? this.vertex[1] : this.vertex[0];
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
}

SimpleDFS.prototype.parse = function () {
    var self = this;

    // vertex 만큼 생성
    _.each(self.vertexes, function (vertex) {
        self.link[vertex.id] = link[vertex.id] || [];
    });

    // edge 를 기반으로 link 를 생성
    _.each(self.edges, function (edge) {
        return edge.each(function (a) {
            self.link[a.id].push(new self.Link(a, edge));
        });
    });
};




function digest (vertex, path) {

}

SimpleDFS.prototype.digest = function () {
    _.each(this.vertexes, function (vertex) {
        digest(vertex);
    });
}