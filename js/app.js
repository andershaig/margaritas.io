'use strict';

// Declare app level module which depends on filters, and services
angular.module('marg', [
  'ngRoute',
  'ui.bootstrap',
  'marg.filters',
  'marg.services',
  'marg.directives',
  'marg.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/home.html',
    controller: 'homeCtrl'
  });

  $routeProvider.when('/about', {
    templateUrl: 'partials/about.html',
    controller: 'aboutCtrl'
  });

  $routeProvider.when('/account', {
    templateUrl: 'partials/account.html',
    controller: 'accountCtrl'
  });

  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'loginCtrl'
  });

  $routeProvider.when('/admin', {
    templateUrl: 'partials/admin.html',
    controller: 'adminCtrl'
  });

  $routeProvider.when('/single', {
    templateUrl: 'partials/single.html',
    controller: 'singleCtrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/'
  });
}]).
run(['$rootScope', '$location', 'MargUser', function ($scope, $location, MargUser) {
  Parse.initialize("xTwk4RNMtDgUU4D9wE2li0AyicN8l3yy4U80gqqn", "9joElVWS65tA2L5y8MKFTfQQCUrqDYqDAxTwXZeE");

  // User functions
  // TODO: Get some feedback about how this should be coded. Is it appropriate to use $rootScope?
  $scope.auth = {
    setCurrent: function () {
      $scope.currentUser = MargUser.current();
    },
    signUp: function (form) {
      var user = new MargUser();
      user.set('email', form.email);
      user.set('username', form.username);
      user.set('password', form.password);

      user.signUp(null, {
        success: function (user) {
          $scope.currentUser = user;
          $scope.$apply(); // Notify AngularJS to sync currentUser
        },
        error: function (user, error) {
          alert('Unable to sign up:  ' + error.code + ' ' + error.message);
        }
      });
    },
    login: function (form) {
      console.log(form);
      MargUser.logIn(form.username, form.password, {
        success: function (user) {
          // Do stuff after successful login.
          console.log(user);
        },
        error: function (user, error) {
          // The login failed. Check error to see why.
          console.log(user);
          console.log(error);
        }
      });
    },
    logOut: function (form) {
      MargUser.logOut();
      $scope.currentUser = null;
    }
  };

  $scope.auth.setCurrent();

  // $scope.signUp = function (form) {
  //   var user = new MargUser();
  //   user.set("email", form.email);
  //   user.set("username", form.username);
  //   user.set("password", form.password);
  //
  //   user.signUp(null, {
  //     success: function (user) {
  //       $scope.currentUser = user;
  //       $scope.$apply(); // Notify AngularJS to sync currentUser
  //     },
  //     error: function (user, error) {
  //       alert("Unable to sign up:  " + error.code + " " + error.message);
  //     }
  //   });
  // };
  //
  // $scope.logOut = function (form) {
  //   MargUser.logOut();
  //   $scope.currentUser = null;
  // };

  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
      appId: '430064143797675',
      // channelUrl : '//www.margaritas.io/channel.html',
      // The 'status' flag passed into FB.init, when set to true, can interfere with Parse Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.
      // status: true, //
      cookie: true,
      xfbml: true
    });
  };
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}]);
