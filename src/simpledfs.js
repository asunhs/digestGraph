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

Edge.prototype.equals = function (edge) {
    return this.from === edge.from && this.to === edge.to && this.weight === edge.weight;
};

Edge.prototype.same = function (edge) {
    return this.from === edge.from && this.to === edge.to;
};

Edge.prototype.contrary = function (edge) {
    return this.from === edge.to && this.to === edge.from;
};







function SimpleDFS (options) {
    if (!(this instanceof SimpleDFS)) {
        return new SimpleDFS(options);
    }

    options = options || {};

    _.extend(this, {
        vertexes : [],
        edges : [],
        link : {},
        onDetectCycle : null
    }, options);
}

SimpleDFS.prototype.Link = function (vertex, edge) {
    if (!(this instanceof SimpleDFS.prototype.Link)) {
        return new SimpleDFS.prototype.Link(vertex, edge);
    }

    this.vertex = vertex;
    this.opposite = edge.opposite(vertex);
    this.weight = edge.from === vertex ? edge.weight : -edge.weight;
    this.edge = edge;
    this.disabled = false;
};

SimpleDFS.prototype.Link.prototype.lock = function () {
    this.disabled = true;
};

SimpleDFS.prototype.Link.prototype.unlock = function () {
    this.disabled = false;
};

SimpleDFS.prototype.parse = function () {
    var self = this;

    // vertex 만큼 생성
    _.each(self.vertexes, function (vertex) {
        self.link[vertex.id] = self.link[vertex.id] || {};
    });

    // edge 를 기반으로 link 를 생성
    _.each(self.edges, function (edge) {
        return edge.each(function (a, b) {
            self.link[a.id][b.id] = new self.Link(a, edge);
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


SimpleDFS.prototype.pairLink = function (link) {
    return this.link[link.opposite.id][link.vertex.id];
};


SimpleDFS.prototype.solveCycle = function (cycle) {
    var self = this,
        min = _.min(cycle, function (link) {
            return link.weight;
        }),
        weight = min.weight;

    _.each(cycle, function (link) {
        link.weight -= weight;
        self.pairLink(link).weight += weight;
    });

    min.lock();
    self.pairLink(min).lock();
};


SimpleDFS.prototype._trace = function (vertex, path) {

    var self = this;

    if (vertex.visited) {
        if (_.isString(self.onDetectCycle) && _.isFunction(self[self.onDetectCycle])) {
            return self[self.onDetectCycle](self.findCycle(path));
        } else if (_.isFunction(self.onDetectCycle)) {
            return self.onDetectCycle(self.findCycle(path));
        }
        return;
    }

    vertex.visit();
    _.chain(this.link[vertex.id])
        .values()
        .each(function (link) {
            if (link.disabled || link.edge.used) {
                return;
            }

            link.edge.use();
            path.push(link);
            self._trace(link.opposite, path);
            path.pop();
            link.edge.clear();
        });
    vertex.leave();
};

SimpleDFS.prototype.trace = function () {
    var self = this;

    self.parse();
    _.each(self.vertexes, function (vertex) {
        self._trace(vertex, []);
    });
    return self.link;
};

SimpleDFS.prototype.digest = function () {
    var self = this;

    self.trace();

    return _.chain(self.link).values().map(function (links) {
        return _.chain(links)
            .values()
            .filter(function (link) {
                return link.weight > 0;
            })
            .map(function (link) {
                return new Edge(link.vertex, link.opposite, link.weight);
            })
            .value();
        })
        .flatten()
        .value();
};