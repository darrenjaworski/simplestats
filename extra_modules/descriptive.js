var descriptive = function(data) {

  var format = d3.format(".02f"),
    mean = d3.mean(data),
    sigma = d3.deviation(data);


  d3.select('.simple-dataset').html("[ " + data.join(', ') + " ]");
  d3.selectAll('.mean').html( format( mean ) );
  d3.select('.median').html(d3.median(data));
  d3.select('.range').html(d3.max(data) - d3.min(data));
  d3.select('.mode').html(ss.mode(data));
  d3.select('.variance').html( format(d3.variance(data)) );
  d3.selectAll('.standard-deviation').html( format(sigma) );

  var x = data[ ~~(Math.random() * data.length - 1) ];
  d3.select('.z-score').html( format( (x - mean) / sigma ) )
  d3.selectAll('.z-point').html(x)

};

module.exports = descriptive;
