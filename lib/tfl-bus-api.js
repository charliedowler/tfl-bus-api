var request = require('request')
  , Q = require('q')
  , _ = require('underscore');

var Bus = function(bus) {
  if (!bus) throw new Error('Missing bus number');
  var deferred = Q.defer();
  this.promise = deferred.promise;

  request({
    url: 'http://countdown.tfl.gov.uk/search?searchTerm=' + bus
  }, function(err, res) {
    this.data = JSON.parse(res.body).results.routeResults[0];
    deferred.resolve(this);
  }.bind(this));

  return deferred.promise;
};

Bus.prototype.start = function() {
  return {
    lat: this.data.swLatBB,
    lng: this.data.swLngBB
  };
};

Bus.prototype.end = function() {
  return {
    lat: this.data.neLatBB,
    lng: this.data.neLngBB
  };
}

Bus.prototype.findStopBySmsCode = function(smsCode) {
  return _.find(this.data.directions[1].segments[0].markers, function(busStop) {
    return (busStop.smsCode == smsCode);
  });
};

Bus.prototype.findStopByName = function(name) {
  return _.find(this.data.directions[1].segments[0].markers, function(busStop) {
    return (busStop.name == name);
  });
};

Bus.prototype.geometry = function() {
  return this.data.directions[0].routeGeometry;
};

module.exports = Bus;