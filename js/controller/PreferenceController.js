
app.controller('PreferenceController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
	
	$rootScope.hideNav = 1;

	$scope.disconnect = function(){
		window.localStorage.removeItem("pictripLogged")
		window.localStorage.removeItem("pictripLogin");
	}
		
}]);