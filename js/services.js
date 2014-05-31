'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('marg.services', []).

value('version', '0.1').

factory('MargUser', [ function () {
  var User = Parse.User.extend({
    getImage : function () {
      // return the appropriate facebook image url or gravatar image url
    }

  }, {
    // Class methods
  });

  return User;
}]).

factory('MargaritaCollection', ['Margarita', function (Margarita) {
  // Collection of "Margarita" objects
  var MargaritaCollection = Parse.Collection.extend({
    model: Margarita
  });

  return MargaritaCollection;
}]).

factory('Margarita', ['Helpers', function (Helpers) {

  var Margarita = Parse.Object.extend('Margarita', {
    // Instance Methods
    initialize: function (attrs, options) {
      // console.log('> Initialize function called');
    }
  }, {
    // Class Methods
  });

  // Expose attributes get and set
  var fields = ['createdBy', 'title', 'description', 'rating'];

  Helpers.exposeAttributes(Margarita, fields);

  return Margarita;
}]).

factory('Helpers', [ function () {
  return {
    exposeAttributes: function (parseObject, fields) {
      // Verify Parameters
      if (parseObject === undefined) {
        throw new Error('> Missing parseObject');
      }

      if (fields === undefined) {
        throw new Error('> Missing fields');
      }

      // Add dynamic properties from fields
      var self = this;

      for (var i = 0; i < fields.length; i++) {
        (function () {
          var propName = fields[i];

          // console.log('> Setting up ' + propName);

          Object.defineProperty(parseObject.prototype, propName, {
            get: function () {
              return this.get(propName);
            },
            set: function (value) {
              this.set(propName, value);
            }
          });
        })();
      }
    }
  };
}]).

factory('Placeholder', ['$scope', function ($scope) {
  // Placeholder
}]);
