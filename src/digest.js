var datas = [
    { from : 'a', to : 'b', amount : 1000 },
    { from : 'c', to : 'f', amount : 2500 },
    { from : 'd', to : 'a', amount : 2500 },
    { from : 'a', to : 'b', amount : 4000 },
    { from : 'b', to : 'c', amount : 1000 },
    { from : 'g', to : 'e', amount : 3500 },
    { from : 'a', to : 'b', amount : 2500 },
    { from : 'b', to : 'a', amount : 2500 },
    { from : 'a', to : 'c', amount : 3000 },
    { from : 'b', to : 'g', amount : 1000 },
    { from : 'a', to : 'e', amount : 1500 },
    { from : 'b', to : 'f', amount : 2000 },
    { from : 'f', to : 'd', amount : 3000 },
    { from : 'a', to : 'f', amount : 3500 },
    { from : 'g', to : 'a', amount : 4000 },
    { from : 'g', to : 'b', amount : 2000 },
    { from : 'b', to : 'c', amount : 1000 },
    { from : 'a', to : 'e', amount : 4000 },
    { from : 'c', to : 'e', amount : 4000 },
    { from : 'd', to : 'a', amount : 500 },
    { from : 'c', to : 'f', amount : 3500 },
    { from : 'e', to : 'g', amount : 1500 },
    { from : 'f', to : 'a', amount : 2000 },
    { from : 'c', to : 'b', amount : 3000 },
    { from : 'a', to : 'd', amount : 2500 },
    { from : 'c', to : 'd', amount : 2000 },
    { from : 'd', to : 'g', amount : 2000 },
    { from : 'a', to : 'g', amount : 500 },
    { from : 'c', to : 'a', amount : 500 },
    { from : 'd', to : 'c', amount : 3000 },
    { from : 'b', to : 'd', amount : 1500 },
    { from : 'd', to : 'e', amount : 2000 },
    { from : 'g', to : 'a', amount : 4000 },
    { from : 'b', to : 'c', amount : 2500 },
    { from : 'e', to : 'd', amount : 1000 },
    { from : 'a', to : 'b', amount : 1500 },
    { from : 'e', to : 'a', amount : 1500 },
    { from : 'c', to : 'e', amount : 1000 },
    { from : 'f', to : 'g', amount : 4000 },
    { from : 'e', to : 'b', amount : 3500 },
    { from : 'f', to : 'g', amount : 3500 },
    { from : 'b', to : 'e', amount : 3000 },
    { from : 'd', to : 'a', amount : 3000 },
    { from : 'd', to : 'e', amount : 1500 },
    { from : 'b', to : 'd', amount : 3500 },
    { from : 'b', to : 'c', amount : 500 }
];

var members = _.union(_.pluck(datas, 'from'), _.pluck(datas, 'to'));

var edges = _.map(members, function (member) {
    return _.filter(datas, function (data) {
        return data.from === member || data.to === member;
    });
});