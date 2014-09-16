var request = require('request')
  , Q = require('q')
  , _ = require('underscore');

var Bus = function(bus, callback) {
  if (!bus) throw new Error('Missing bus number');
  var deferred = Q.defer();
  this.promise = deferred.promise;

  request({
    url: 'http://countdown.tfl.gov.uk/search?searchTerm=' + bus
  }, function(err, res) {
    this.data = JSON.parse(res.body).results.routeResults[0];

    this.data.directions.forEach(function(direction) {
      direction.segments[0].markers.forEach(function(busStop) {
        busStop.smsCode = Number(busStop.smsCode);
        busStop.id = Number(busStop.id);
      });
    });

    if (!callback) {
      deferred.resolve(this);
      return;
    }
    callback.call(this, this);
  }.bind(this));

  if (!callback) return this.promise;
  else return this;
};

Bus.prototype.first = function() {
  return {
    lat: this.data.swLatBB,
    lng: this.data.swLngBB
  };
};

Bus.prototype.last = function() {
  return {
    lat: this.data.neLatBB,
    lng: this.data.neLngBB
  };
}

Bus.prototype.findStopBySmsCode = function(smsCode) {
  return (_.findWhere(this.data.directions[0].segments[0].markers, { smsCode: smsCode }) || _.findWhere(this.data.directions[1].segments[0].markers, { smsCode: smsCode }));
};

Bus.prototype.findStopByName = function(name) {
  return (_.findWhere(this.data.directions[0].segments[0].markers, { name: name}) || _.findWhere(this.data.directions[1].segments[0].markers, { name: name }));
};

Bus.prototype.geometry = function() {
  return {there: this.data.directions[0].routeGeometry[0], back: this.data.directions[1].routeGeometry[0]};
};

module.exports = Bus;