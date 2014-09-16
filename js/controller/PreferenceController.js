
app.controller('PreferenceController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
	
	$rootScope.hideNav = 0;

//Store and display info
	$rootScope.pseudo = window.localStorage.getItem("pictripLogin");
	$rootScope.email = window.localStorage.getItem("pictripEmail");
	$rootScope.name = window.localStorage.getItem("pictripName");
	$rootScope.place = window.localStorage.getItem("pictripPlace");
	$rootScope.description = window.localStorage.getItem("pictripDescription");
	$rootScope.picture = window.localStorage.getItem("pictripPicture");
	if ($rootScope.name == "null") {$rootScope.name = "";}
	if ($rootScope.place == "null") {$rootScope.place = "My Place";}
	if ($rootScope.description == "null") {$rootScope.description = "Tell us about you !";}
	if ($rootScope.localisation == "null") {$rootScope.localisation = "1";}
	else if ($rootScope.localisation == "0") {$rootScope.localisation = "";}
	else if ($rootScope.localisation == "1") {$rootScope.localisation = "checked";}
//End Store and display info

//Take a picture event
	$scope.openCamera = function (){
		if (!navigator.camera) {
			alert("Camera API not supported", "Error");
			return;
		}

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI, cameraDirection: 1
		});
	};
	function onSuccess(imageData) {
		$("#profilPhoto").css("background-image", "url(" + imageData + ")");
	}
	function onFail(message) {
		alert('Failed because: ' + message);
	}
//End Take a picture event

//Disconnect
	$scope.disconnect = function(){
		window.localStorage.removeItem("pictripLogged");
		window.localStorage.removeItem("pictripLogin");
		window.localStorage.removeItem("pictripToken");
	};
//End Disconnect

//Save new informations
/*
	$scope.saveInformation = function(){
		//Prepare to send
		$data = {
			"pseudo": $pseudo,
			"email": $email,
			"name": $name,
			"place": $place,
			"description": $description,
			"picture": $picture,
			"timestamp": currentTime,
			"sign": sign
		};
		//Sending
		$http({
			method  : 'POST',
			url     : 'http://tripshelper.com/appcontrol/connexion.php',
			data    : $data,  // pass in data as json
			headers : { 'Content-Type' : 'application/json' }
		})
		.success(saveInfoSuccess).error(saveInfoError);
	};
	saveInfoSuccess = function(response){
		
	};
	saveInfoError = function(){
		
	};
*/
//End Save new informations
		
}]);