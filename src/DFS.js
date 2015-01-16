function Node (id, edges) {
    if (!(this instanceof Node)) {
        return new Node(id, edges);
    }

    this.id = id;
    this.edges = edges;
}

Node.prototype.iterator = function () {
    var edges = this.edges,
        index = 0;

    return function next() {
        if (index < edges.length) {
            return edges[index++];
        }
    };
};

function Edge (from, to, weight) {
    if (!(this instanceof Edge)) {
        return new Edge(from, to, weight);
    }

    this.from = from;
    this.to = to;
    this.weight = weight;

    if (weight > 0) {
        // TODO
    }
}

Edge.prototype.reverse = function () {
    var to = this.to;
    this.to = this.from;
    this.from = to;
    this.weight = -this.weight;

    return this;
};


/**
 *
 * @param nodes
 *  - Array of node
 * @returns {DFS}
 * @constructor
 */
function DFS (nodes) {
    if (!(this instanceof DFS)) {
        return new DFS(nodes);
    }

    this.nodes = nodes;
}

DFS.prototype.detectCycle = function detectCycle (start) {
    var node = start || _.first(this.nodes),
        next = node.iterator(),
        edge;

    while (edge = next()) {
        detectCycle(edge.to)
    }
};