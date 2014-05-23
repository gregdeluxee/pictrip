

app.controller('HomeController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
	
	$rootScope.hideNav = 0;
	$scope.picsContainerPos=0;

	$scope.nextPic = function(){
		if ($scope.picsContainerPos > -100) {
			$scope.picsContainerPos-=100;
		};
	}
	$scope.prevPic = function(){
		if ($scope.picsContainerPos < 0) {
			$scope.picsContainerPos+=100;
		};
		
	}

}]);