/* https://github.com/ben-bradley/coolbus
 *
 * Copyright (c) 2014 Ben Bradley
 * Licensed under the MIT license.
 */

'use strict';

var pkg = require('../package'),
  EE2 = require('eventemitter2').EventEmitter2;

module.exports = {
  name: pkg.name,
  version: pkg.version,
  _busses: {},
  _options: {
    wildcard: true,
    delimiter: '/',
    newListener: true,
    maxListeners: 15
  }
};

module.exports.bus = function (name, options) {
  if (!name || typeof name !== 'string')
    throw new Error('bus() expects a string');
  if (this._busses[name])
    return this._busses[name];
  else
    return this.create(name, options);
}

module.exports.create = function (name, options) {
  return this._busses[name] = new EE2(options || this._options);
}

module.exports.stop = function (name) {
  var bus = this._busses[name];
  if (!bus)
    return false;
  bus.removeAllListeners();
  delete this._busses[name];
}

module.exports.stopAll = function () {
  for (var b in this._busses)
    this.stop(b);
}

module.exports.list = function () {
  return Object.keys(this._busses);
}

module.exports.each = function (callback) {
  for (var b in this._busses)
    callback(this._busses[b]);
}
