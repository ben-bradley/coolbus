'use strict';

var coolbus = require('../');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busB.on('beep/b', function (from) {
  console.log('moduleB.js heard bus "b" emit "beep/b" from ' + from);
});
