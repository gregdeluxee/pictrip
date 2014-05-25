

app.controller('ProfilController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

	$rootScope.hideNav = 0;
	$scope.picsContainerPos = 0;
	$scope.profil = 1;
	$scope.myPics = 0;
	$scope.myFav = 0;


//Gesture events
	//Next pic
	$scope.nextPic = function(){
		if ($scope.picsContainerPos > -100) {
			$scope.picsContainerPos-=100;
		};
	};
	//Prev pic
	$scope.prevPic = function(){
		if ($scope.picsContainerPos < 0) {
			$scope.picsContainerPos+=100;
		};
	};
	//Swipe
	$scope.profilSwipeLeft = function(){
		$scope.profil = 0;
		$scope.myPics = 1;
	};
	$scope.myPicsSwipeLeft = function(){
		$scope.myPics = 0;
		$scope.myFav = 1;
	};
	$scope.myPicsSwipeRight = function(){
		$scope.myPics = 0;
		$scope.profil = 1;
	};
	$scope.myFavSwipeRight = function(){
		$scope.myFav = 0;
		$scope.myPics = 1;
	};
	//Menu tap
	$scope.profilTap = function(){
		$scope.myPics = 0;
		$scope.myFav = 0;
		$scope.profil = 1;
	};
	$scope.myPicsTap = function(){
		$scope.profil = 0;
		$scope.myFav = 0;
		$scope.myPics = 1;
	};
	$scope.myFavTap = function(){
		$scope.profil = 0;
		$scope.myPics = 0;
		$scope.myFav = 1;
	};
//End Gesture events

}]);