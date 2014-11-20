'use strict';
var should = require('should'),
  EE2 = require('eventemitter2').EventEmitter2,
  coolbus = require('../');

var moduleA = require('./moduleA'),
  moduleB = require('./moduleB');

var busA = coolbus.bus('busA'),
  busB = coolbus.bus('busB');

describe('CoolBus', function () {

  it('should cause busA & busB to detect events generated here', function (done) {
    var a, b;

    busA.on('beeped/a', function () {
      a = true;
      if (a, b)
        done();
    });

    busB.on('beeped/a', function () {
      b = true;
      if (a && b)
        done();
    });

    busA.emit('beep/a');
  });

  it('should give a list of busses', function () {
    (coolbus.list()).should.eql(['busA', 'busB']);
  });

  it('should create a new bus', function () {
    (coolbus.list()).should.not.containEql('busC');
    var busC = coolbus.bus('busC');
    (coolbus.list()).should.containEql('busC');
    (busC).should.be.an.instanceOf(EE2);
  });

  it('should iterate each bus', function () {
    coolbus.each(function (bus) {
      (bus).should.be.an.instanceOf(EE2);
    });
  });

  it('should stop all busses', function () {
    (coolbus.list().length).should.not.eql(0);
    coolbus.stopAll();
    (coolbus.list().length).should.eql(0);
  });

});
