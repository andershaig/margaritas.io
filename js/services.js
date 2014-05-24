'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('marg.services', []).
value('version', '0.1').
factory('MargUser', function () {
  var User = Parse.User.extend({
    getImage : function () {
      // return the appropriate facebook image url or gravatar image url
    }

  }, {
    // Class methods
  });

  return User;
}).
factory('Margarita', function ($q) {

  var Margarita = Parse.Object.extend('Margarita', {
    // Instance methods
  }, {
    // Class methods
    list: function () {
      var defer = $q.defer();

      var query = new Parse.Query(this);
      query.find({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (err) {
          defer.reject(err);
        }
      });

      return defer.promise;
    },
    listByUser: function (user) {
      var defer = $q.defer();

      var query = new Parse.Query(this);
      query.equalTo('author', user);
      query.find({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (err) {
          defer.reject(err);
        }
      });

      return defer.promise;
    }
  });

  // Properties
  Object.defineProperty(Margarita.prototype, 'author', {
    get: function () {
      return this.get('author');
    },
    set: function (value) {
      this.set('author', value);
    }
  });

  Object.defineProperty(Margarita.prototype, 'title', {
    get: function () {
      return this.get('title');
    },
    set: function (value) {
      this.set('title', value);
    }
  });

  Object.defineProperty(Margarita.prototype, 'rating', {
    get: function () {
      return this.get('rating');
    },
    set: function (value) {
      this.set('rating', value);
    }
  });

  return Margarita;
}).
factory('Placeholder', ['$scope', function ($scope) {
  // Placeholder
}]);
