var boxWhisker = function(data) {

  var boxJS = require('./box.js');

  var margin = {top: 30, right: 150, bottom: 30, left: 150},
    width = (d3.select('.page-content')[0][0].offsetWidth - 42) - margin.left - margin.right,
    height = (d3.select('.page-content')[0][0].offsetWidth - 42) / 2 - margin.top - margin.bottom;

  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(width)
    .height(height)
    .domain(d3.extent(data, function(d) {return d; }));

  var array = [];
  array.push(data);

  var svg = d3.select(".box")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top);

  svg.selectAll('.box-whisker')
    .data(array)
    .enter()
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);

  function iqr(k) {
    return function(d, i) {
      var q1 = d.quartiles[0],
          q3 = d.quartiles[2],
          iqr = (q3 - q1) * k,
          j = d.length;
      i = -1;
      while (d[++i] < q1 - iqr);
      while (d[--j] > q3 + iqr);
      return [i, j];
    };
  }

};

module.exports = boxWhisker;
