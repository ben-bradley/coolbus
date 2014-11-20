'use strict';

var coolbus = require('../');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busA.on('beep/a', function (from) {
  console.log('moduleA.js heard bus "a" emit "beep/a" from ' + from + ' and is emitting "beep/b" on bus "b"');
  busB.emit('beep/b', 'moduleA.js')
});
