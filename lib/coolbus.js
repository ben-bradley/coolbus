/**
 * https://github.com/ben-bradley/coolbus
 *
 * Copyright (c) 2014 Ben Bradley
 * Licensed under the MIT license.
 */

'use strict';

var pkg = require('../package'),
  EE2 = require('eventemitter2').EventEmitter2;

/**
 * Return the base object
 */
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

/**
 * Method to create and/or return an event bus
 * @param   {String} name    The event bus name
 * @param   {Object} options The EventEmitter2 config object
 * @returns {Object} Returns an EventEmitter2 instance
 */
module.exports.bus = function (name, options) {
  if (!name || typeof name !== 'string')
    throw new Error('bus() expects a string');
  if (this._busses[name])
    return this._busses[name];
  else
    return this.create(name, options);
}

/**
 * Intended for interal use only, creates the new EventEmitter2 instance
 * @param   {String} name    The event bus name
 * @param   {Object} options The EventEmitter2 config object
 * @returns {Object} Returns a new EventEmitter2 instance
 */
module.exports.create = function (name, options) {
  return this._busses[name] = new EE2(options || this._options);
}

/**
 * Stops a specific event bus
 * @param   {String} name The event bus name
 */
module.exports.stop = function (name) {
  var bus = this._busses[name];
  if (!bus)
    return false;
  bus.removeAllListeners();
  delete this._busses[name];
}

/**
 * Stops all event busses in one call
 */
module.exports.stopAll = function () {
  for (var b in this._busses)
    this.stop(b);
}

/**
 * Lists all the event bus names
 * @returns {Array} Returns an array of strings that are event bus names
 */
module.exports.list = function () {
  return Object.keys(this._busses);
}

/**
 * Executes callback() with each bus as the argument
 * @param {[[Type]]} callback [[Description]]
 */
module.exports.each = function (callback) {
  for (var b in this._busses)
    callback(this._busses[b]);
}
