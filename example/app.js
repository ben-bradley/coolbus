'use strict';

var coolbus = require('../'),
  moduleA = require('./moduleA'),
  moduleB = require('./moduleB');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busB.on('beep/*', function (from) {
  console.log('app.js heard bus "b" emit "beep/*" from ' + from);
});

console.log('app.js is emitting "beep/a" on bus "a".');
busA.emit('beep/a', 'app.js');
