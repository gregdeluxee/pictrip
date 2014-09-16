

app.controller('AddpicController', ['$scope', '$location', '$rootScope', '$route', '$http', '$timeout', 'SignFactory', function ($scope, $location, $rootScope, $route, $http, $timeout, SignFactory) {
	
	$rootScope.menuOpen = 0;
	$rootScope.hideNav = 0;
//Take a picture event
	openCamera();
	function openCamera(){
		if (!navigator.camera) {
			$location.path('/');
			$timeout(function(){
				alert("Camera API not supported", "Error");
			}, 1000);
			
			return;
		}
		
		navigator.camera.getPicture(onSuccess, onFail, {
			quality: 60,
			targetWidth: 1500,
			targetHeight: 2000,
			destinationType: Camera.DestinationType.DATA_URL
		});
	}
	function onSuccess(imageData) {
		$("#addPic").css("background-image", "url(data:image/jpeg;base64," + imageData + ")");
		$scope.addPic.pic = imageData;
	}
	function onFail(message) {
		$timeout(function(){$location.path('/');}, 50);
		$timeout(function(){alert('Failed because: ' + message);}, 700);
	}
//End Take a picture event

//Reload page for new photo
	$("#takePic").hammer({prevent_default: false, drag_vertical: false}).on("tap", function(ev){
		$route.reload();
	});
//End Reload page for new photo

//Submit new pic to server
	$scope.addPic = function(){
		//loading gif
		$rootScope.loader = 1;
		//Data process 
		$pic = $scope.addPic.pic;
		var country = $scope.addPic.country;
		var countryId;
		angular.forEach($rootScope.countryLang, function(value, key) {
			if (value == country) {countryId=key;}
		});
		$place = $scope.addPic.place;
		$comment = $scope.addPic.comment;
		$pseudo = window.localStorage.getItem("pictripLogin");
		//Sign encryption
		$token = window.localStorage.getItem("pictripToken");
		var encryptedToken = CryptoJS.SHA512($token);
		encryptedToken = encryptedToken+salt;
		encryptedToken = CryptoJS.SHA512(encryptedToken);
		var httpVerb = "GET";
		var currentTime = +new Date();
		var url = "http://tripshelper.com/appcontrol/addpic.php?pseudo="+$pseudo+"&timestamp="+currentTime;
		var httpUrl = httpVerb + ":" + url;
		encryptedToken = encryptedToken.toString();
		var sign = CryptoJS.HmacSHA512(httpUrl,encryptedToken).toString(CryptoJS.enc.Base64);
//Prepare to send
		$data = {
			"pic": $pic,
			"country": countryId,
			"place": $place,
			"comment": $comment,
			"pseudo": $pseudo,
			"timestamp": currentTime,
			"sign": SignFactory.getsign("addpic", currentTime)
		};
		//Sending
		$http({
			method  : 'POST',
			url     : 'http://tripshelper.com/appcontrol/addpic.php',
			data    : $data,  // pass in data as json
			headers : { 'Content-Type' : 'application/json' }
		})
		.success(addPicSuccess).error(addPicError);
	};
	addPicSuccess = function(response){
		$rootScope.loader = 0;
		if (response['status'] == "picadded")
		{
			window.localStorage.setItem("pictripToken", response['token']);
			window.pictripToken = response['token'];
			$location.path('/');
		}
		
	};
	addPicError = function(){
		$rootScope.loader = 0;
		alert("Impossible de se connecter, votre photo sera ajoutée ultérieurement.");
	};
//EndSubmit new pic to server

}]);