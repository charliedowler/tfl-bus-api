var nock = require('nock');

var ExpectedResponse = require('./expected');
var Bus = require('../index');

var apiMock = nock('http://countdown.tfl.gov.uk').get('/search?searchTerm=410').reply(200, ExpectedResponse);

var myBus = new Bus(410).then(function(bus) {
  //Write some tests!
});
