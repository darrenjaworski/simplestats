var normalDistribution = function() {

  var values = d3.range(100).map(function(i) {
      return ~~d3.random.normal(50, 15)();
    });

  var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = $(".page-content").width() - margin.left - margin.right,
    height = $(".page-content").width() / 2 - margin.top - margin.bottom,
    binTicks = 20;

  var x = d3.scale.linear()
    .domain([0, 100])
    .range([0, width]);

  var data = d3.layout.histogram()
    .bins(x.ticks(binTicks))(values);

  var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var svg = d3.select(".normal-distribution")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var bar = svg.selectAll(".bar")
    .data(data)
    .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

  bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data[0].dx) - 1)
    .attr("height", function(d) { return height - y(d.y); });

  bar.append("text")
    .attr("dy", ".75em")
    .attr("y", -10)
    .attr("x", x(data[0].dx) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) { return d.y > 0 ? d.y : ""; });

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  var display = svg.append("g")
    .attr("class", "central-tendency")
    .attr("transform", "translate(0,0)")

  display.append("text")
    .attr("class", "mean")
    .text("mu: " + d3.mean(values));

  display.append("text")
    .attr("class", "standard-deviation")
    .attr("transform", "translate(0,15)")
    .text("sigma: " + d3.deviation(values));

  d3.select("#normalPoints").on("input", function(){

    $('.normal-dist-label span').html(this.value);

    var newNormal = d3.range(this.value).map(function(i) {
        return ~~d3.random.normal(50, 15)();
      });

    var newData = d3.layout.histogram()
      .bins(x.ticks(binTicks))(newNormal);

    var bar = svg.selectAll(".bar").data(newData);
    var rect = svg.selectAll("rect");
    var stdDev = svg.select(".standard-deviation");
    var mean = svg.select(".mean");
    var duration = 100;

    y.domain([0, d3.max(newData, function(d) {return d.y; })])

    bar.transition().duration(duration).attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.select("rect")
      .transition()
      .duration(duration)
      .attr("x", 1)
      .attr("width", x(data[0].dx) - 1)
      .attr("height", function(d) { return height - y(d.y); });

    bar.select("text")
      .text(function(d) { return d.y > 0 ? d.y : ""; });

    stdDev.text("sigma: " + d3.deviation(newNormal));
    mean.text("mu: " + d3.mean(newNormal));

  });

}

module.exports = normalDistribution;
