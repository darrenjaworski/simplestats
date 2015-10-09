'use strict';

var ss = require('simple-statistics');

var simpleDataset = d3.range(15).map(function(i) {
    return ~~(Math.random() * 50);
  }).sort(function(a, b){
    return a - b;
  });

var descriptive = require('./extra_modules/descriptive.js')(simpleDataset);

var boxWhisker = require('./extra_modules/box-whisker.js')(simpleDataset);

var normal = require('./extra_modules/normal-distribution.js')();

var sampling = require('./extra_modules/sampling.js')();

var correlation = require('./extra_modules/correlation.js')();
