
app.controller('PreferenceController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
	
	$rootScope.hideNav = 1;

	$scope.disconnect = function(){
		window.localStorage.removeItem("pictripLogged");
		window.localStorage.removeItem("pictripLogin");
		window.localStorage.removeItem("pictripToken");
	};

	//Take a picture event
	$scope.openCamera = function (){
		if (!navigator.camera) {
	        alert("Camera API not supported", "Error");
	        return;
	    };
	    
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
		    destinationType: Camera.DestinationType.FILE_URI, cameraDirection: 1
		});
	};
	function onSuccess(imageData) {
	    $("#profilPhoto").css("background-image", "url(" + imageData + ")");
	};
	function onFail(message) {
	    alert('Failed because: ' + message);
	};
	//End Take a picture event
		
}]);