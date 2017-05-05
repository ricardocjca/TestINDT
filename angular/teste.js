'use strict';

angular.module('meuTeste', ['ngRoute', 'User']).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.when('/', {templateUrl: 'views/index.html'}).otherwise({redirectTo:'/'});
}]);