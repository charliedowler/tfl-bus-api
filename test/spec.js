var nock = require('nock')
  , vows = require('vows')
  , assert = require('assert');

var ExpectedResponse = require('./expected');
var Bus = require('../index');


vows.describe('Start & End of bus route').addBatch({
  'first bus stop returns correct lat & lng': function() {
    var BusNumber = 410;
    nock('http://countdown.tfl.gov.uk').get('/search?searchTerm=' + BusNumber).reply(200, ExpectedResponse[BusNumber]);
    var myBus = new Bus(BusNumber, function(bus) {
      assert.equal(bus.first().lat, 51.356791, 'find ' + BusNumber + ' lat position');
      assert.equal(bus.first().lng, -0.153829, 'find ' + BusNumber + ' lng position');
    });
  },
  'last bus stop returns correct lat & lng': function() {
    var BusNumber = 151;
    nock('http://countdown.tfl.gov.uk').get('/search?searchTerm=' + BusNumber).reply(200, ExpectedResponse[BusNumber]);
    var myBus = new Bus(BusNumber, function(bus) {
      assert.equal(bus.last().lat, 51.384787, 'find ' + BusNumber + ' lat position');
      assert.equal(bus.last().lng, -0.149323, 'find ' + BusNumber + ' lng position');
    });
  }
}).run();
vows.describe('findStopBySmsCode').addBatch({
  'exists': function() {
    var BusNumber = 151;
    nock('http://countdown.tfl.gov.uk').get('/search?searchTerm=' + BusNumber).reply(200, ExpectedResponse[BusNumber]);
    var myBus = new Bus(BusNumber, function(bus) {
      assert.equal(typeof bus.findStopBySmsCode(49524) != 'undefined', true);
    });
  }
}).run();