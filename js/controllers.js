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
.controller('adminCtrl', ['$scope', 'Margarita', 'Ingredient', function ($scope, Margarita, Ingredient) {
  var handleError = function (marg, error) {
    console.log('Something went wrong when trying to modify the object, with error code: ' + error.description);
  }

  /*
   * Margaritas
   */
  $scope.createMargarita = function (attrs) {
    var margarita = new Margarita;
        attrs.rating = 0;
        attrs.createdBy = $scope.currentUser;
        attrs.instructions = ['If using salt, place in a shallow dish. Moisten the rim of a rocks glass with a dampened paper towel, then dip in salt.', 'Fill the glass with ice; add tequila, lime juice, and Cointreau; and stir a few times until chilled. Serve immediately.'];
        margarita.save(attrs, {
          success: function (marg) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + marg.id);
            $scope.margaritas.add(marg);
            $scope.$apply();
          },
          error: handleError
        });;
  }

  $scope.editMargarita = function (margarita) {
    // TODO: This should start editing, it needs a separate save function though.
    // Potentially use the create form but change the action button?
    margarita.save(null, {
      success: function (marg) {
        // Execute any logic that should take place after the object is saved.
        console.log('Objected updated with objectId: ' + marg.id);
        $scope.apply();
      },
      error: handleError
    });
  }

  $scope.deleteMargarita = function (margarita) {
    margarita.destroy({
      success: function (marg) {
        console.log('The object was deleted from the Parse Cloud.');
      },
      error: handleError
    });
  }

  /*
   * Ingredients
   */
  Array.prototype.pushUnique = function (item) {
    if (this.indexOf(item) == -1) {
      this.push(item);
      return true;
    }
    return false;
  }

  $scope.marg = {};
  $scope.marg.ingredients = [];

  $scope.addIngredient = function (ingredient) {
    $scope.marg.ingredients.pushUnique(ingredient);
    $scope.selected = '';
  }

  $scope.removeIngredient = function (array, index) {
    array.splice(index, 1);
  }

  $scope.createIngredient = function (attrs) {
    var ingredient = new Ingredient;
        attrs.createdBy = $scope.currentUser;
        ingredient.save(attrs, {
          success: function (ingred) {
            // Execute any logic that should take place after the object is saved.
            console.log('New object created with objectId: ' + ingred.id);
            $scope.ingredients.add(ingred);
            $scope.$apply();
          },
          error: handleError
        });;
  }

  $scope.editIngredient = function (ingredient) {
    // TODO: This should start editing, it needs a separate save function though.
    // Potentially use the create form but change the action button?
    ingredient.save(null, {
      success: function (ingred) {
        // Execute any logic that should take place after the object is saved.
        console.log('Objected updated with objectId: ' + ingred.id);
        $scope.apply();
      },
      error: handleError
    });
  }

  $scope.deleteIngredient = function (ingredient) {
    ingredient.destroy({
      success: function (ingred) {
        console.log('The object was deleted from the Parse Cloud.');
      },
      error: handleError
    });
  }

}])
.controller('accountCtrl', ['$scope', function ($scope) {

}]);
