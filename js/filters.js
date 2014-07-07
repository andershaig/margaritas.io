'use strict';

/* Filters */
angular.module('marg.filters', [])
.filter('textSearch', function () {
  return function (items, search) {
    // console.log(items);
    // console.log(search);

    if (!search) {
      return items;
    }

    var queryStr = search.query;
    if (!queryStr || '' === queryStr) {
      return items;
    }

    return items.filter(function (element, index, array) {
      var title = element.title.toLowerCase();
      return title.indexOf(queryStr.toLowerCase()) !== -1;
    });
  }
})
.filter('interpolate', ['version', function (version) {
  return function (text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  }
}]);
