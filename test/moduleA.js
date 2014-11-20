'use strict';

var coolbus = require('../');

var busA = coolbus.bus('busA');

busA.on('beep/a', function () {
  busA.emit('beeped/a');
});
