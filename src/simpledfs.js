/**
 *
 * @param id : vertex id
 * @param neighbors : vertexes linked this vertex
 * @returns {Vertex}
 * @constructor
 */
function Vertex (id, neighbors) {
    if (!(this instanceof Vertex)) {
        return new Vertex(id, neighbors);
    }

    if (!id) {
        throw new TypeError('id is required');
    }

    this.id = id;
    this.neighbors = neighbors || [];
    this.visited = false;
}

Vertex.prototype.link = function (vertex) {
    this.neighbors.push(vertex);
    vertex.neighbors.push(this);
};

Vertex.prototype.unlink = function (vertex) {
    if (this.neighbors.indexOf(vertex) > 0) {
        this.neighbors.splice(this.neighbors.indexOf(vertex), 0);
    }

    if (vertex.neighbors.indexOf(this) > 0) {
        vertex.neighbors.splice(vertex.neighbors.indexOf(this), 0);
    }
};

Vertex.prototype.visit = function () {
    this.visited = true;
};

Vertex.prototype.leave = function () {
    this.visited = false;
};

function SimpleDFS (vertexes) {
    if (!(this instanceof SimpleDFS)) {
        return new SimpleDFS(vertexes);
    }

    this.graph = vertexes;
}

function digest (vertex, path) {

    path = path || [];

    if (vertex.visited) {
        // detect cycle;
        return console.table(path);
    }

    vertex.visit();
    _.each(vertex.neighbors, function (neighber) {
        path.push(neighber);
        digest(neighber, path);
        path.pop();
    });
    vertex.leave();
}

SimpleDFS.prototype.digest = function () {
    _.each(this.graph, function (vertex) {
        digest(vertex);
    });
}