'use strict';

/* Controllers */

angular.module('marg.controllers', [])
.controller('pageCtrl', ['$scope', function ($scope) {

}])
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
      success: function (marg) {
        // The object was retrieved successfully.
        $scope.activeMarg = marg;
        $scope.$apply();
        console.log($scope.activeMarg);
      },
      error: function (object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
        console.log('> Parse.Query Error');
        console.log(object);
        console.log(error);
      }
    });
  }
}])
.controller('margaritaCtrl', ['$scope', '$routeParams', 'Margarita', 'Ingredient', function ($scope, $routeParams, Margarita, Ingredient) {
  var handleError = function (obj, error) {
    console.log('Something went wrong when trying to modify the object, with error code: ' + error.description);
  }

  $scope.marg = {};
  $scope.marg.ingredients = [];
  $scope.marg.instructions = [];

  $scope.editingMargarita = false;

  if ($routeParams.id) {
    $scope.editingMargarita = true;

    if ($scope.margaritas.length) {
      $scope.marg = $scope.margaritas.get($routeParams.id);
      console.log($scope.marg);
    } else {
      var query = new Parse.Query(Margarita);
      query.get($routeParams.id, {
        success: function (marg) {
          // The object was retrieved successfully.
          $scope.marg = marg;
          $scope.$apply();
          console.log($scope.marg);
        },
        error: function (object, error) {
          // The object was not retrieved successfully.
          // error is a Parse.Error with an error code and description.
          console.log('> Parse.Query Error');
          console.log(object);
          console.log(error);
        }
      });
    }
  }

  /*
   * Instructions
   */
  $scope.addInstruction = function (instruction) {
    $scope.marg.instructions.pushUnique(instruction);
    $scope.instruction = '';
  }

  $scope.removeInstruction = function (array, index) {
    array.splice(index, 1);
  }

  /*
   * Ingredients
   */

  $scope.addIngredient = function (ingredient) {
    var ingredientEntry = {
      id: ingredient.id,
      name: ingredient.name,
      amount: null,
      unit: null
    }

    $scope.marg.ingredients.pushUnique(ingredientEntry);
    $scope.ingredient = '';
  }

  $scope.removeIngredient = function (array, index) {
    array.splice(index, 1);
  }

  /*
   * Save
   */

  $scope.saveMargarita = function (attrs) {
    if ($scope.editingMargarita) {
      var margarita = attrs;
      margarita.save(null, {
        success: function (marg) {
          // Execute any logic that should take place after the object is saved.
          console.log('Objected updated with objectId: ' + marg.id);
          $scope.marg = {}; // Clear Form
          $scope.editingMargarita = false; // Stop Editing
          $scope.$apply();
        },
        error: handleError
      });
    } else {
      var margarita = new Margarita;
      attrs.rating = 0;
      attrs.createdBy = $scope.currentUser;

      margarita.save(attrs, {
        success: function (marg) {
          // Execute any logic that should take place after the object is saved.
          console.log('New object created with objectId: ' + marg.id);
          $scope.margaritas.add(marg);
          $scope.marg = {}; // Clear Form
          $scope.editingMargarita = false; // Stop Editing
          $scope.$apply();
        },
        error: handleError
      });
    }
  }
}])
.controller('adminCtrl', ['$scope', 'Margarita', 'Ingredient', function ($scope, Margarita, Ingredient) {
  var handleError = function (obj, error) {
    console.log('Something went wrong when trying to modify the object, with error code: ' + error.description);
  }

  /*
   * Margaritas
   */

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
  $scope.editingIngredient = false;

  $scope.saveIngredient = function (attrs) {
    if ($scope.editingIngredient) {
      var ingredient = attrs;
      ingredient.save(null, {
        success: function (marg) {
          // Execute any logic that should take place after the object is saved.
          console.log('Objected updated with objectId: ' + marg.id);
          $scope.ingred = {}; // Clear Form
          $scope.editingIngredient = false; // Stop Editing
          $scope.$apply();
        },
        error: handleError
      });
    } else {
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
      });
    }
  }

  $scope.editIngredient = function (ingredient) {
    $scope.ingred = ingredient;
    $scope.editingIngredient = true;
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
.controller('searchCtrl', ['$scope', '$filter', function ($scope, $filter) {
  // Sort Options
  // $scope.sortOptions = [
  //   {name:'Rating Desc', field:'rating'}
  //   {name:'Rating Asc', field:'rating'},
  //   {name:'Newest', field:'createdAt'},
  //   {name:'None',   field:false}
  // ];

  $scope.margs = [];
  $scope.ingreds = [];

  // Keep marg list updated
  $scope.$watch('margaritas.models', function () {
    $scope.margs = $scope.margaritas.models;
    displayFilteredResults();
  });

  // Keep ingredient list update
  $scope.$watch('ingredients.models', function () {
    $scope.ingreds = $scope.ingredients.models;
    displayFilteredResults();
  });

  $scope.sort = '-rating';

  $scope.reverseSort = false;

  // Watch searches
  $scope.$watch('search', function (query) {
    // console.log('> Search Watch');
    displayFilteredResults();
  }, true);

  var displayFilteredResults = function () {
    // console.log('> displayFilteredResults();');
    var query = $scope.search;

    if (query) {
      $scope.filteredMargs = $filter('textSearch')($scope.margs, query);
    } else {
      $scope.filteredMargs = $scope.margs;
    }

    $scope.counted = $scope.filteredMargs.length;

    displayIngredientCounts();
  };

  var displayIngredientCounts = function () {
    if ($scope.filteredIngredients) {
      $scope.filteredIngredients.length = 0;
    } else {
      $scope.filteredIngredients = [];
    }

    if ($scope.margs && $scope.ingreds) {

      $scope.filteredMargs.forEach( function (marg, i) {
        if (marg.ingredients) {
          marg.ingredients.forEach( function (ing, j) {
            var globalIng = $scope.ingredients.get(ing.id);
            if (globalIng) {
              console.log(globalIng);
              $scope.filteredIngredients.pushUnique(globalIng);
              console.log($scope.filteredIngredients);
            }
          });
        }
      });

      $scope.filteredIngredients.forEach( function (ingredient, i) {
        ingredient.count = 0;

        $scope.filteredMargs.forEach( function (marg, i) {
          if (marg.ingredients) {
            marg.ingredients.forEach( function (ing, j) {
              if (ing.id === ingredient.id) {
                ingredient.count++;
              }
            });
          }
        });

        // console.log('Ingredient ' + (i+1) + ': ' + ingredient.name);
      });

      // $scope.ingreds.forEach( function (ingred, i) {
      //   console.log('Ingredient ' + (i+1) + ': ' + ingred.name)
      // });
    } else {
      // $scope.filteredIngredients = $scope.ingreds;
    }

  };
}])
.controller('accountCtrl', ['$scope', function ($scope) {

}]);
