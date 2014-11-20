# CoolBus [![Build Status](https://secure.travis-ci.org/ben-bradley/coolbus.png?branch=master)](http://travis-ci.org/ben-bradley/coolbus)

> A cross-module, shared event bus.

This module is intended to give developers a way to share events between various modules.  If you've broken your app into multiple modules, but you want to be able to share events between those moduels without having to pass an event object between each module at require time, CoolBus is for you!

This module's code sits on top of [EventEmitter2](https://github.com/asyncly/EventEmitter2)

## Install

```
npm install coolbus
```

## Use

To use CoolBus, you just have to `var coolbus = require('coolbus')` at the top of your module and you'll be able to share events across each module requiring the same instance of the script.  No need to pass objects back and forth at require time, the module handles all that for you!

## Example

### Basic usage

```javascript
var coolbus = require('coolbus');

var busA = coolbus.bus('busA');

busA.on('beep/1', function() {
  console.log('busA beeped a 1!');
});

busA.on('beep/2', function() {
  console.log('busA beeped a 2!');
});

busA.on('beep/*', function() {
  console.log('busA beeped!');
});

busA.emit('beep/1');
busA.emit('beep/2');
```

### Cross-module usage

*app.js*

```javascript
var coolbus = require('coolbus'),
  moduleA = require('./moduleA'),
  moduleB = require('./moduleB');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busB.on('beep/*', function (from) {
  console.log('app.js heard bus "b" emit "beep/*" from ' + from);
});

console.log('app.js is emitting "beep/a" on bus "a".');
busA.emit('beep/a', 'app.js');
```

*moduleA.js*

```javascript
var coolbus = require('coolbus');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busA.on('beep/a', function (from) {
  console.log('moduleA.js heard bus "a" emit "beep/a" from ' + from + ' and is emitting "beep/b" on bus "b"');
  busB.emit('beep/b', 'moduleA.js')
});
```

*moduleB.js*

```javascript
var coolbus = require('coolbus');

var busA = coolbus.bus('a'),
  busB = coolbus.bus('b');

busB.on('beep/b', function (from) {
  console.log('moduleB.js heard bus "b" emit "beep/b" from ' + from);
});
```

## Methods

- `bus(name[, options])` - This method will return or create the bus named `name` using `options` if provided.  The returned bus is an instance of [EventEmitter2](https://github.com/asyncly/EventEmitter2)
  - `name` - Required, string - This is the name of the event bus that you want to use.  If it doesn't exist, it is created.
  - `options` - Optional, object - This an EventEmitter2 [configuration object](https://github.com/asyncly/EventEmitter2#differences-non-breaking-compatible-with-existing-eventemitter)
    - Default options:
      - `wildcard` - true
      - `delimiter` - "/"
      - `newListener` - true
      - `maxListeners` - 15
- `stop(name)` - This method will stop the specified bus and remove it from operation in ALL of the modules interacting with it.
  - `name` - Required, string - This is the name of the bus you want to stop.
- `stopAll()` - This will stop *ALL* the busses using `stop(name)` above.
- `list()` - Returns an array of bus `name`s.
- `each(callback)` - Iterates all busses returned via `callback`
  - `callback` - Required, function - Signature is `function(bus)`

## Versions

- 0.0.1 *(2014-11-20)* Initial commit
