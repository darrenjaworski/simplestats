'use strict';

var ss = require('simple-statistics');

var simpleDataset = d3.range(15).map(function(i) {
    return ~~(Math.random() * 50);
  }).sort(function(a, b){
    return a - b;
  });

d3.select('.simple-dataset').html(simpleDataset);
d3.select('.mean').html(d3.mean(simpleDataset));
d3.select('.median').html(d3.median(simpleDataset));
d3.select('.range').html(d3.max(simpleDataset) - d3.min(simpleDataset));
d3.select('.mode').html(ss.mode(simpleDataset));
d3.select('.variance').html(d3.variance(simpleDataset));
d3.select('.standard-deviation').html(d3.deviation(simpleDataset))

var boxWhisker = require('./extra_modules/box-whisker.js')(simpleDataset);

var normal = require('./extra_modules/normal-distribution.js')();

var sampling = require('./extra_modules/sampling.js')();

var correlation = require('./extra_modules/correlation.js')();
