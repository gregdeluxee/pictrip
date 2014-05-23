function MainController($rootScope, $location, $timeout, $scope){

	$rootScope.menuOpen = 0;
	$rootScope.loader = 0;

	document.addEventListener("deviceready", function(){
	    //Verification user loged or not
		var logged = window.localStorage.getItem("pictripLogged");
		if(logged === null){
			$timeout(function(){
				$location.path('/connexion');
			},10);
		}else{
			window.pictripLogged = true;
			window.pictripLogin = window.localStorage.getItem("pictripLogin");
		}

		

	}, false);

}


var app = angular.module('pictrip', ['ngRoute', 'hmTouchEvents']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/', {templateUrl : 'partials/home.html', controller: 'HomeController'})
	.when('/connexion', {templateUrl : 'partials/connexion.html', controller: 'ConnexionController'})
	.when('/explorer', {templateUrl : 'partials/explorer.html', controller: 'ExplorerController'})
	.when('/moi', {templateUrl : 'partials/profil.html', controller: 'ProfilController'})
	.when('/preference', {templateUrl : 'partials/preference.html', controller: 'PreferenceController'})
	.otherwise({redirectTo: '/'});


}]);

