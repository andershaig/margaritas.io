'use strict';

/* Controllers */

angular.module('marg.controllers', [])
.controller('headerCtrl', ['$scope', '$modal', function ($scope, $modal) {
  // Debugging Only
  $scope.debug = false;
  $scope.toggleDebugging = function () {
    $scope.debug = !$scope.debug;
  }

  $scope.register = function () {
    console.log('> Modal Opening');

    $scope.items = ['item1', 'item2', 'item3'];

    var registerModal = $modal.open({
      templateUrl: 'partials/register.html',
      controller: RegisterModalCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    registerModal.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };

  var RegisterModalCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;

    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  $scope.login = function () {
    console.log('> Modal Opening');

    $scope.items = ['item1', 'item2', 'item3'];

    var loginModal = $modal.open({
      templateUrl: 'partials/login.html',
      controller: LoginModalCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    loginModal.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };

  var LoginModalCtrl = function ($scope, $modalInstance, items) {
    $scope.items = items;

    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
}])
.controller('homeCtrl', ['$scope', '$http', 'Margarita', function ($scope, $http, Margarita) {
  $scope.activeRecipe = null;
  $scope.recipes = [];

  // // TODO: Only load margaritas once
  // Margaritas.list().then(function (Margaritas) {
  //   $scope.recipes = Margaritas;
  // }, function (err) {
  //   // Something went wrong, handle the error
  //   console.log(err);
  // });

  $scope.$watch('recipes', function () {
    // TODO: Save on changes?
  }, true);

  console.log('> Current User')
  console.log($scope.currentUser);

  $scope.showRecipe = function (recipe) {
    console.log('> Show Recipe');
    $scope.activeRecipe = recipe;
  }

  $scope.hideRecipe = function () {
    console.log('> Hide Recipe');
    $scope.activeRecipe = null;
  }



}])
.controller('aboutCtrl', ['$scope', function ($scope) {

}])
.controller('singleCtrl', ['$scope', function ($scope) {

}])
.controller('loginCtrl', ['$scope', function ($scope) {

}])
.controller('adminCtrl', ['$scope', function ($scope) {

}])
.controller('accountCtrl', ['$scope', function ($scope) {

}]);
