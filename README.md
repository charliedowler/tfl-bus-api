#tfl-bus-api [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
Simple node service for grabbing bus route information.

##Usage:
```javascript
//Using a promise
var myBus = new Bus(11).then(function(bus) {
    //access to methods on bus
});

//Using a callback
var myBus = new Bus(11, function(bus) {
    //access to methods on bus
});
```

###Methods:
```javascript
/**
 * Find the bus stop by sms code listed on bus stop sign
 * @param smsCode {!number}
 * @returns {id: number, smsCode: number, name: string, stopIndicator: string, towards: string, direction: string, lat: number, lng: number, routes: array}
 */
bus.findStopBySmsCode(smsCode)

/**
 * Find the bus stop by name listed on bus stop sign
 * @param stopName {!string}
 * @returns {id: number, smsCode: number, name: string, stopIndicator: string, towards: string, direction: string, lat: number, lng: number, routes: array}
 */
bus.findStopByName(stopName)

/**
 * Filter stop by direction
 * @param {!string} direction - (N | NE| E | SE | S | SW | W | NW)
 * @returns {id: number, smsCode: number, name: string, stopIndicator: string, towards: string, direction: string, lat: number, lng: number, routes: array}
 */
bus.findStopByName(direction)

bus.geometry() // Returns array of lat & lng, start to end

bus.first() //Return lat & lng for first bus stop

bus.last() //Return lat & lng for last bus stop
```

[npm-url]: https://npmjs.org/package/tfl-bus-api
[npm-image]: https://badge.fury.io/js/tfl-bus-api.png

[travis-url]: http://travis-ci.org/charliedowler/tfl-bus-api
[travis-image]: https://secure.travis-ci.org/charliedowler/tfl-bus-api.png?branch=master

[depstat-url]: https://david-dm.org/charliedowler/tfl-bus-api
[depstat-image]: https://david-dm.org/charliedowler/tfl-bus-api.png