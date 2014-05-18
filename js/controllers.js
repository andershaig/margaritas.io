'use strict';

/* Controllers */

angular.module('marg.controllers', []).
controller('homeCtrl', ['$scope', '$http', 'Margarita', function ($scope, $http, Margarita) {
  $scope.activeRecipe = null;
  //$scope.recipes = []; // = TODO: Get recipes from storage instead of $http?

  $scope.$watch('recipes', function () {
    // TODO: Save on changes?
  }, true);

  $scope.showRecipe = function (recipe) {
    console.log('> Show Recipe');
    $scope.activeRecipe = recipe;
  }

  $scope.hideRecipe = function () {
    console.log('> Hide Recipe');
    $scope.activeRecipe = null;
  }

  // var init = function () {
    // Margarita.listByUser($scope.sessionUser).then(function (Margaritas) {
    Margarita.list().then(function (Margaritas) {
      $scope.recipes = Margaritas;
    }, function (err) {
      // Something went wrong, handle the error
      console.log(err);
    });

    // Load Recipe JSON
    // $http({
    //   method: 'GET',
    //   url: 'data/recipes.json'
    // }).success(function (data, status, headers, config) {
    //   var recipes = data;
    //   recipes.forEach( function (recipe) {
    //     $scope.recipes.push(recipe);
    //   });
    // }).error(function (data, status, headers, config) {
    //   console.log('> Error getting recipes.json');
    // });
  // }
  //
  // init();

}])
.controller('aboutCtrl', [function ($scope) {

}])
.controller('singleCtrl', [function ($scope) {

}])
.controller('accountCtrl', [function ($scope) {

}]);
