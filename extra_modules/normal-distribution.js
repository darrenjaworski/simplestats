var normalDistribution = function() {

  var values = d3.range(50).map(function(i) {
      return ~~d3.random.normal(50, 13)();
    });

  var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = (d3.select('.page-content')[0][0].offsetWidth - 42) - margin.left - margin.right,
    height = (d3.select('.page-content')[0][0].offsetWidth - 42) / 1.75 - margin.top - margin.bottom,
    binTicks = 20,
    pathData = [];

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

  var yArea = d3.scale.linear()
    .range([height, 0])
    .domain(d3.extent(pathData, function(d) {
        return d.p;
    }));

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
    .attr("transform", "translate(0,0)");

  display.append("text")
    .attr("class", "mean")
    .text("mu: " + d3.mean(values));

  display.append("text")
    .attr("class", "standard-deviation")
    .attr("transform", "translate(0,17)")
    .text("sigma: " + d3.deviation(values));

  drawCurve(values);

  d3.select("#normalPoints").on("input", function(){

    d3.select('.normal-dist-label span').html(this.value);

    var newNormal = d3.range(this.value).map(function(i) {
        return ~~d3.random.normal(50, 13)();
      });

    var newData = d3.layout.histogram()
      .bins(x.ticks(binTicks))(newNormal);

    var bar = svg.selectAll(".bar").data(newData);
    var rect = svg.selectAll("rect");
    var stdDev = svg.select(".standard-deviation");
    var mean = svg.select(".mean");
    var duration = 300;

    y.domain([0, d3.max(newData, function(d) { return d.y; })]);

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

    drawCurve(newNormal);

  });

  d3.select("#showCurve").on("change", function(){
    var show = this.checked;
    d3.select(".area")
      .style("opacity", function(){ return show ? .75 : 0; });
  });

  function drawCurve(dataSet) {

    getData(dataSet);

    yArea.domain(d3.extent(pathData, function(d) { return d.p; }));

    var area = d3.svg.area()
      .x(function(d) { return x(d.q); })
      .y0(height)
      .y1(function(d) { return yArea(d.p); });

    d3.select(".area").remove();

    svg.append("path")
      .datum(pathData)
      .attr("class", "area")
      .attr("d", area)
      .style("opacity", function(){ return d3.select("#showCurve")[0][0].checked ? .75 : 0; });

  }

  function getData(dataSet) {
    pathData = [];

    for (var i = 0; i < 500; i++) {
      var which = getRandomIntInclusive(0, dataSet.length - 1);
      q = dataSet[which]
      p = gaussian(q, d3.mean(dataSet), d3.deviation(dataSet))
      el = {
          "q": q,
          "p": p
      }
      pathData.push(el)
    };

    pathData.sort(function(x, y) { return x.q - y.q; });
  };

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function gaussian(x, mean, sigma) {
  	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
      x = (x - mean) / sigma;

    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
  };

}

module.exports = normalDistribution;
