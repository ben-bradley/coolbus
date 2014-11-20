'use strict';

var coolbus = require('../');

var busA = coolbus.bus('busA'),
  busB = coolbus.bus('busB');

busA.on('beep/*', function () {
  busB.emit('beeped/a');
});
