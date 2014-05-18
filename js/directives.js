'use strict';

/* Directives */
angular.module('marg.directives', []).
directive('perspectiveOrigin', ['origin', function (origin) {
  var docElem = window.document.documentElement;

  function scrollX() {
  	return window.pageXOffset || docElem.scrollLeft;
  }

  function scrollY() {
  	return window.pageYOffset || docElem.scrollTop;
  }

  // from http://responsejs.com/labs/dimensions/
  function getViewportW() {
  	var client = docElem['clientWidth'],
  		inner = window['innerWidth'];

  	if( client < inner )
  		return inner;
  	else
  		return client;
  }

  function getViewportH() {
  	var client = docElem['clientHeight'],
  		inner = window['innerHeight'];

  	if( client < inner )
  		return inner;
  	else
  		return client;
  }

  function extend( a, b ) {
  	for( var key in b ) {
  		if( b.hasOwnProperty( key ) ) {
  			a[key] = b[key];
  		}
  	}
  	return a;
  }

  // change the grid perspective origin as we scroll the page
  window.addEventListener('scroll', function () {
  	scrollHandler();
  });

  var scrollHandler = function () {
  	var self = this;
  	if( !this.didScroll ) {
  		this.didScroll = true;

  		setTimeout( function () {
        // changes the grid perspective origin as we scroll the page
        var perspY = scrollY() + getViewportH() / 2;
        this.gridWrap.style.WebkitPerspectiveOrigin = '50% ' + perspY + 'px';
        this.gridWrap.style.MozPerspectiveOrigin = '50% ' + perspY + 'px';
        this.gridWrap.style.perspectiveOrigin = '50% ' + perspY + 'px';
        this.didScroll = false;
      }, 60);
  	}
  };

  return function (scope, elm, attrs) {

  }
}])
