var sampling = function() {

  var width = (d3.select('.page-content')[0][0].offsetWidth - 42),
    height = width * .75,
    center = { x: width / 2, y: height / 2 },
    nodeNumber = 1000;

  var color = d3.scale.ordinal()
    .range(["#2ca02c", "#d62728", "#1f77b4"]);

  var nodes = d3.range(nodeNumber).map(function() {
    return { color: ~~(Math.random() * 3) + 1 };
  });

  d3.select('.sample-population').html(nodeNumber)
  d3.select('.green-sample').style("color", color(1));
  d3.select('.red-sample').style("color", color(2));
  d3.select('.blue-sample').style("color", color(3));

  var svg = d3.select('.sampling-population')
    .attr("width", width)
    .attr("height", height)
    .append("g");

  function update(data) {
    var force = d3.layout.force()
      .nodes(data)
      .size([width, height])
      .on("tick", tick)
      .start();

    var node = svg.selectAll(".node")
      .data(data);

    node.transition()
      .duration(750)
      .attr("r", 3);

    node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 3)
      .style("fill", function(d) { return color(d.color); })
      .style("stroke", function(d) { return color(d.color); });

    node.exit()
      .transition()
      .duration(750)
      .attr("r", 0)
      .remove();
  }

  svg.style("opacity", 1e-6)
    .transition()
    .duration(500)
    .style("opacity", 1);

  update(nodes);

  var display = svg.append("g")
    .attr("class", "population")
    .attr("transform", "translate(30,30)");

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
    .style("fill", function(d) {return color(d.key); })
    .text(function(d, i) { return d.values.length + " (" + (d.values.length / nodeNumber) + ")"; });

  function tick(e) {
    var k = .7 * e.alpha;

    nodes.forEach(function(d) {
      d.x = d.x + (center.x - d.x) * k;
      d.y = d.y + (center.y - d.y) * k;
    });

    d3.selectAll(".node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  }

  function takeSample(amount) {
    var simpleRandomSample = ss.sample(nodes, amount);

    update(simpleRandomSample);

    var sampleDisplay = svg.append("g")
      .attr("class", "sample")
      .attr("transform", "translate(30,100)");

    sampleDisplay.append("text")
      .text("sample");

    var nested = d3.nest()
      .key(function(d){ return d.color;})
      .entries(simpleRandomSample);

    sampleDisplay.selectAll(".total")
      .data(nested)
      .enter()
      .append("text")
      .attr("class", ".total")
      .attr("transform", function(d, i) {return "translate(0, " + 16 * (i + 1)+")";})
      .style("fill", function(d) {return color(d.key); })
      .text(function(d, i) { return d.values.length + " (" + (d.values.length / amount) + ")"; });
  }

  function removeSample(data) {
    update(data);
    d3.select('.sample').remove();
  }

  var sampleSize = 50;

  d3.select("#sampleSize").on("input", function(){
    sampleSize = this.value;
    d3.select(".sampleSize-dist-label span").html(sampleSize);
  });

  d3.select("#sampleSwitch").on("change", function(){
    if (this.checked) {
      takeSample(sampleSize);
    } else {
      removeSample(nodes);
    }
  });

};

module.exports = sampling;
