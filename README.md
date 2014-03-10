#tfl-bus-api (WIP) [![Build Status](https://travis-ci.org/charliedowler/tfl-bus-api.png?branch=master)](https://travis-ci.org/charliedowler/tfl-bus-api)
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
bus.first() //Return lat & lng for first bus stop

bus.last() //Return lat & lng for last bus stop

/**
 * Search list of stops by smsCode/name displayed on stop sign
 * @param smsCode {Number}
 * @returns {id, smsCode, name, stopIndicator, towards, direction, lat, lng, routes}
 */
bus.findStopBySmsCode(int)
bus.findStopByName(String)

bus.geometry() // Returns array of lat & lng, start to end
```