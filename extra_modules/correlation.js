var correlation = function() {

  var margin = { top: 30, right: 45, bottom: 30, left: 45 },
    width = (d3.select('.page-content')[0][0].offsetWidth - 42) - margin.left - margin.right,
    height = (d3.select('.page-content')[0][0].offsetWidth - 42) * .75 - margin.top - margin.bottom,
    data = d3.range(100).map( function(i) { return { A: d3.random.normal(10, 3)(), B: d3.random.normal(10, 3)() }; }),
    varA = data.map(function(d){ return d.A; }),
    varB = data.map(function(d){ return d.B; }),
    correlation = ss.sampleCorrelation(varA, varB),
    covariance = ss.sampleCovariance(varA, varB);

  d3.select("#correlationCoefficient").html(correlation);
  d3.select("#covariance").html(covariance);

  var x = d3.scale.linear()
    .range([0, width])
    .domain(d3.extent(data, function(d) { return d.A; }))
    .nice();

  var y = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(data, function(d) { return d.B; }))
    .nice();

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var svg = d3.select(".correlation")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("variable a");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("variable b");

  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.A); })
    .attr("cy", function(d) { return y(d.B); });

}

module.exports = correlation;
