/**
 *
 * @param id : vertex id
 * @param neighbors : vertexes linked this vertex
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
    this.neighbors = [];
    this.edges = [];
    this.visited = false;
}

Vertex.prototype.link = function (vertex) {
    this.neighbors.push(vertex);
    vertex.neighbors.push(this);
};

Vertex.prototype.unlink = function (vertex) {
    if (this.neighbors.indexOf(vertex) > 0) {
        this.neighbors.splice(this.neighbors.indexOf(vertex), 1);
    }

    if (vertex.neighbors.indexOf(this) > 0) {
        vertex.neighbors.splice(vertex.neighbors.indexOf(this), 1);
    }
};

Vertex.prototype.add = function (edge) {
    var opposite = edge.opposite(this);
    this.edges.push(edge);
    opposite.edges.push(this);
    this.link(opposite);
};

Vertex.prototype.remove = function (edge) {
    if (this.edges.indexOf(edge) > 0) {
        this.edges.splice(this.edges.indexOf(edge), 1);
    }
    var opposite = edge.opposite(this);

    if (opposite.edges.indexOf(edge) > 0) {
        opposite.edges.splice(opposite.edges.indexOf(edge), 1);
    }

    this.unlink(opposite);
};

Vertex.prototype.visit = function () {
    this.visited = true;
};

Vertex.prototype.leave = function () {
    this.visited = false;
};



function Edge (lhs, rhs, weight) {
    if (!(this instanceof Edge)) {
        return new Edge(lhs, rhs, weight);
    }

    this.weight = weight;
    this.vertexes = [lhs, rhs];
    lhs.add(this);
}

Edge.prototype.is = function (vertex) {
    return this.vertexes[0] === vertex || this.vertexes[1] === vertex;
};

Edge.prototype.opposite = function (vertex) {
    return this.vertexes[0] === vertex ? this.vertex[1] : this.vertex[0];
};







function SimpleDFS (edges) {
    if (!(this instanceof SimpleDFS)) {
        return new SimpleDFS(edges);
    }

    this.edges = edges;
    this.vertexes = _.union.apply(_, _.map(edges, function (edge) {
        return edge.vertexes;
    }));
}


function findCycle (path) {

    var last = _.last(path),
        initial = _.initial(path),
        cycle = path.slice(initial.lastIndexOf(last));



    return console.table(cycle);
}


function digest (vertex, path) {

    path = path || [];

    var before = _.last(path);

    path.push(vertex);

    if (vertex.visited) {
        // detect cycle;
        return findCycle(path);
    }

    vertex.visit();
    _.each(_.without(vertex.neighbors, before), function (neighber) {
        digest(neighber, path);
        path.pop();
    });
    vertex.leave();
}

SimpleDFS.prototype.digest = function () {
    _.each(this.vertexes, function (vertex) {
        digest(vertex);
    });
}