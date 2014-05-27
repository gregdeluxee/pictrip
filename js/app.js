function MainController($rootScope, $location, $timeout, $scope){

	$rootScope.menuOpen = 0;
	$rootScope.hideNav = 0;
	$rootScope.loader = 0;
	$rootScope.picsContainerPos = 0;
	$rootScope.currentPic = 0;

	document.addEventListener("deviceready", function(){
	    //Verification user loged or not
		var logged = window.localStorage.getItem("pictripLogged");
		if(logged !== null){
			$timeout(function(){
				window.pictripLogged = true;
				window.pictripLogin = window.localStorage.getItem("pictripLogin");
				$location.path('/');
			},10);
		};

		function checkLocale() {
      		navigator.globalization.getLocaleName(
        		function (locale) {window.pictripLocale = locale.value;},
        		function () {}
      		);
    	}
    	function checkLanguage() {
    		navigator.globalization.getPreferredLanguage(
			  	function (language) {window.pictripLanguage = language.value;},
			  	function () {}
			);
    	}
    	if (navigator.globalization) {
    		checkLocale();
	    	checkLanguage();
    	};
	    	
    	if (window.pictripLanguage == "français") {
    		$rootScope.lang = $langFrench;
    		$rootScope.country = $countryFR;
    	}else{
    		$rootScope.lang = $langEnglish;
    		$rootScope.country = $countryEN;
    	}



	}, false);
	$rootScope.lang = $langFrench;
	$rootScope.countryLang = $countryEN;
		
		

}

const salt = "sb/@0713";

var app = angular.module('pictrip', ['ngRoute', 'hmTouchEvents']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/', {templateUrl : 'partials/home.html', controller: 'HomeController'})
	.when('/connexion', {templateUrl : 'partials/connexion.html', controller: 'ConnexionController'})
	.when('/explorer', {templateUrl : 'partials/explorer.html', controller: 'ExplorerController'})
	.when('/moi', {templateUrl : 'partials/profil.html', controller: 'ProfilController'})
	.when('/preference', {templateUrl : 'partials/preference.html', controller: 'PreferenceController'})
	.when('/addpic', {templateUrl : 'partials/addpic.html', controller: 'AddpicController'})
	.when('/test', {templateUrl : 'partials/test.html', controller: 'TestController'})
	.otherwise({redirectTo: '/'});


}]);

