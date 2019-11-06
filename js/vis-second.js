//Example taken directly from https://bl.ocks.org/d3noob/80c100e35817395e88918627eeeac717 with edits


var margin = {top: 30, right: 0, bottom: 30, left: 230},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg2 = d3.select(".nd").append("svg")
.attr("width", width + margin.right + margin.left)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate("
      + margin.left + "," + margin.top + ")");

var i = 0, duration = 750,root;
var treemap = d3.tree().size([height, width]);


d3.json("data/malaria-parasites.json", function(error, treeData) {
    root = d3.hierarchy(treeData, function(d) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;
    root.children.forEach(collapse);
    update(root);
});

function collapse(d) {
    if(d.children) {
        d._children = d.children
    }
}

function update(source) {
    var treeData = treemap(root);

    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Change the depth of vis
    nodes.forEach(function(d){ d.y = d.depth * 150});

    var node = svg2.selectAll('g.node')
    .data(nodes, function(d) {return d.id || (d.id = ++i); });


    //All directly from /bl.ocks.org/

    // Enter any new modes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
    .attr('class', 'node')
    .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d) {
        return d._children;
    });

    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", function(d) {
        return d.children || d._children ? 5 : 0;
    })
        .attr("x", function(d) {
        return d.children || d._children ? -30 : 30;
    })
        .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
    })
        .text(function(d) { return d.data.name; })
        .attr("fill", "white");

    nodeEnter.append('text')
        .attr("dy", function(d) {
        return d.children || d._children ? 30 : 25;
    })
        .attr("x", function(d) {
        return d.children || d._children ? -30 : 30;
    })
        .attr("text-anchor", function(d) {
        return d.children || d._children ? "end" : "start";
    })
        .text(function(d) { if(d.data.parent !== "null"){return "parent: " + d.data.parent;}else{return " ";} })
        .attr("fill", "white")
        .attr("opacity", "0.2");

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
    });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d) {
        return d._children;
    })
        .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
    })
    .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
        .attr('r', 1);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
        .style('fill-opacity', 1);

    // ****************** links section ***************************

    // Update the links...
    var link = svg2.selectAll('path.link')
    .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
    .attr("class", "link")
    .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
    });

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
    .duration(duration)
    .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
    })
    .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {

        path = `M ${s.y} ${s.x}
C ${(s.y + d.y) / 2} ${s.x},
${(s.y + d.y) / 2} ${d.x},
${d.y} ${d.x}`

        return path
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}