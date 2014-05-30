'use strict';

/* Controllers */

angular.module('marg.controllers', [])
.controller('headerCtrl', ['$scope', '$modal', function ($scope, $modal) {
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

    var loginModal = $modal.open({
      templateUrl: 'partials/login.html',
      controller: LoginModalCtrl
    });

    loginModal.result.then(function (form) {
      $scope.auth.login(form)
    }, function () {
      console.info('Modal dismissed at: ' + new Date());
    });
  };

  var LoginModalCtrl = function ($scope, $modalInstance) {
    $scope.ok = function (user) {
      $modalInstance.close(user);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
}])
.controller('homeCtrl', ['$scope', '$http', 'Margarita', function ($scope, $http, Margarita) {
  // $scope.showRecipe = function (recipe) {
  //   console.log('> Show Recipe');
  //   $scope.activeRecipe = recipe;
  // }
  //
  // $scope.hideRecipe = function () {
  //   console.log('> Hide Recipe');
  //   $scope.activeRecipe = null;
  // }

}])
.controller('aboutCtrl', ['$scope', function ($scope) {
 // TODO: Does this need a controller?
}])
.controller('singleCtrl', ['$scope', '$routeParams', 'Margarita', function ($scope, $routeParams, Margarita) {
  console.log('Marg ID: ' + $routeParams.id);

  console.log($scope.margaritas.length);
  if ($scope.margaritas.length) {
    $scope.activeMarg = $scope.margaritas.get($routeParams.id);
    console.log($scope.activeMarg);
  } else {
    var query = new Parse.Query(Margarita);
    query.get($routeParams.id, {
      success: function(marg) {
        // The object was retrieved successfully.
        $scope.activeMarg = marg;
        $scope.$apply();
        console.log($scope.activeMarg);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        console.log('> Parse.Query Error');
        console.log(object);
        console.log(error);
      }
    });
  }


}])
.controller('adminCtrl', ['$scope', function ($scope) {

  $scope.createMargarita = function (margarita) {
    // TODO: Create it
  }

  $scope.editMargarita = function (margarita) {
    // TODO: This should start editing, it needs a separate save function though.
    // Potentially use the create form but change the action button?
  }

  $scope.deleteMargarita = function (margarita) {
    // TODO: Delete it
  }

}])
.controller('accountCtrl', ['$scope', function ($scope) {

}]);
