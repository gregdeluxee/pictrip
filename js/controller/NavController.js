

function NavController($rootScope , $scope, $timeout){
		
	$rootScope.menuOpen = 0;
	$rootScope.hideNav = 0;
	$scope.search = 0;

	//Tutoriel display
	$("#menu ul li:last-child a").hammer({prevent_default: false, drag_vertical: false}).on("tap", function(ev){
		$timeout(function(){
			$(".tutoriel").css("display", "block")
		},500);
		$timeout(function(){
			$(".tutoriel").css("display", "none")
		},10000);
	});
	//End tutoriel display

	//Open and close menu
	$scope.menuOpenOn = function(){
		$rootScope.menuOpen = 1;
		$rootScope.hideNav = 1;
	}
	$scope.menuOpenOff = function(){
		$rootScope.menuOpen = 0;
		$rootScope.hideNav = 0;
	}
	//End Open and close menu

	//Return rootscoop vars
	$scope.menuOpenf = function(){
		return $rootScope.menuOpen;
	}
	$scope.hideNavf = function(){
		return $rootScope.hideNav;
	}
	//End Return rootscoop vars

	//Take a picture event
	$scope.takePicture = function(){
		if (!navigator.camera) {
	        alert("Camera API not supported", "Error");
	        return;
	    }
	    
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		    destinationType: Camera.DestinationType.FILE_URI 
		});
	}

	function onSuccess(imageData) {
	    $(".pics").css("background-image", "url(" + imageData + ")");
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
	//End Take a picture event

	//Search focus
	$scope.searchFocus = function(){
		if ($scope.search == 0) {
			$scope.search = 1;
			$("#nav form input").addClass("search");
		}else{
			$scope.search = 0;
			$("#nav form input").removeClass("search");
		}
			
	}
	//End Search focus

}