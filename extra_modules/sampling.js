var sampling = function() {

  var width = $(".page-content").width(),
    height = width * .75,
    center = { x: width / 2, y: height / 2 },
    nodeNumber = 175;

  var color = d3.scale.ordinal()
    .range(["#2ca02c", "#d62728", "#4682B4"]);

  var nodes = d3.range(nodeNumber).map(function(i) {
    return {
      color: ~~(Math.random() * 3) + 1
    }
  });

  $('.sample-population').html(nodeNumber)

  var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .on("tick", tick)
    .start();

  var svg = d3.select('.sampling')
    .attr("width", width)
    .attr("height", height);

  var node = svg.append("g").selectAll(".node")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 10)
    .style("fill", function(d) { return color(d.color); })
    .style("stroke", "rgba(0,0,0,.87)")
    .call(force.drag);

  svg.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

  var display = svg.append("g")
    .attr("class", "population")
    .attr("transform", "translate(30,30)")

  display.append("text")
    .text("population");

  var nested = d3.nest()
    .key(function(d){ return d.color;})
    .entries(nodes);

  display.selectAll(".total")
    .data(nested)
    .enter()
    .append("text")
    .attr("class", ".total")
    .attr("transform", function(d, i) {return "translate(0, " + 16 * (i + 1)+")";})
    .text(function(d, i) { return d.key + ": " + d.values.length + " (" + (d.values.length / nodeNumber) + ")"; });

  function tick(e) {
    // Push different nodes in different directions for clustering.
    var k = .04 * e.alpha;

    nodes.forEach(function(d) {
      d.x = d.x + (center.x - d.x) * k;
      d.y = d.y + (center.y - d.y) * k;
    });

    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  }

  d3.select("#sampleSwitch").on("change", function(){
    this.checked //true when checked
  })

}

module.exports = sampling;
