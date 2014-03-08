#tfl-bus-api (WIP)
Simple node service for grabbing bus route information.

##Usage:
```javascript
var myBus = new Bus(11).then(function(bus) {
    //access to methods on bus
});
```

###Methods:
```javascript
bus.start() //Return lat & lng for first bus stop

bus.end() //Return lat & lng for last bus stop

/**
 * Search list of stops by smsCode/name displayed on stop sign
 * @param smsCode {Number}
 * @returns {id, smsCode, name, stopIndicator, towards, direction, lat, lng, routes}
 */
bus.findStopBySmsCode(int)
bus.findStopByName(String)

bus.geometry() // Returns array of lat & lng, start to end
```