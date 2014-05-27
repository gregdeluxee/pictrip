

app.controller('HomeController', ['$scope', '$location', '$rootScope', '$http', 'PicFactory', '$compile', '$timeout', function ($scope, $location, $rootScope, $http, PicFactory, $compile, $timeout) {
	
	$rootScope.hideNav = 0;
	$scope.picsContainerPos = 0;

	$nextPic = window.localStorage.getItem("pictripNextPic");
	if($nextPic<=0 || $nextPic == null){$nextPic = 0};

	$timeout(function(){
		$scope.nbPic = $(".pics").length; 
	}, 10);
	
	$scope.nextPic = function(){
		if ($scope.picsContainerPos > -(($scope.nbPic-1)*100)) {
			$scope.picsContainerPos-=100;
		};
		if ($scope.picsContainerPos == -(($scope.nbPic-3)*100)) {
			$scope.nextPpics = PicFactory.getPics("newest", $nextPic).then(function(pics){
				var newPics = ' ';
				angular.forEach(pics, function(value, key) {
					newPics = newPics +'<pt-picture hm-swipeup="nextPic()" hm-swipedown="prevPic()" hm-options="{swipeVelocityY: 0.1, prevent_default: true}" comment="'+value["comment_pic"]+'" country="'+$rootScope.countryLang[value["country_pic"]]+'" place="'+value["place_pic"]+'" pic="'+value["file_pic"]+'" like="'+value["like_pic"]+'"></pt-picture>';
		       		$nextPic = value["id_pic"] - 1;
		       		window.localStorage.setItem("pictripNextPic", $nextPic);
		     	});

				//$(".picsContainer").append($compile(newPics)($scope));
				$rootScope.$apply($(".picsContainer").append(newPics));

				$timeout(function(){
					//$scope.$apply($scope.pics);
					$scope.nbPic = $(".pics").length; 
				}, 10);

			}, function(msg){
				$rootScope.loader = 0;
				alert(msg);
			});
		};
	};

	$scope.prevPic = function(){
		if ($scope.picsContainerPos < 0) {
			$scope.picsContainerPos+=100;
		};
	};

	$scope.pics = PicFactory.pics;
	if ($scope.pics.length == 0) {
		$rootScope.loader = 1;
		$scope.newPpics = PicFactory.getPics("newest", $nextPic).then(function(pics){
			
			$rootScope.loader = 0;
			$scope.newPpics = pics;
			var newPics = ' ';
			angular.forEach(pics, function(value, key) {
	       		$nextPic = value["id_pic"] - 1;
	       		window.localStorage.setItem("pictripNextPic", $nextPic);
	     	});
		
			$timeout(function(){
				$scope.nbPic = $(".pics").length; 
			}, 10);

		}, function(msg){
			$rootScope.loader = 0;
			alert(msg);
		});

	};
	
/*
//Get pic from server
	function getPic(){
		//loading gif
		$rootScope.loader = 1;
		//Sign encryption
		$pseudo = window.localStorage.getItem("pictripLogin");
		$token = window.localStorage.getItem("pictripToken");
	    var encryptedToken = CryptoJS.SHA512($token);	  
	    var encryptedToken = encryptedToken+salt;	  
	    var encryptedToken = CryptoJS.SHA512(encryptedToken);
	    var httpVerb = "GET";
	    var currentTime = +new Date();
	    var url = "http://pictrip.me/appcontrol/getpic.php?pseudo="+$pseudo+"&timestamp="+currentTime;
	    var httpUrl = httpVerb + ":" + url;
	    encryptedToken = encryptedToken.toString();	  
	    var sign = CryptoJS.HmacSHA512(httpUrl,encryptedToken).toString(CryptoJS.enc.Base64);	  
		//Prepare to send
		$nextPicId = $scope.nextPicId;
		$data = {
			"picrequest": "newest",
			"nextpicid": $nextPicId,
			"pseudo": $pseudo,
			"timestamp": currentTime,
			"sign": sign
		};
		//Sending
		$http({
	        method  : 'POST',
	        url     : 'http://pictrip.me/appcontrol/getpic.php',
	        data    : $data,  // pass in data as json
	        headers : { 'Content-Type' : 'application/json' }
	    })
	    .success(getPicSuccess).error(getPicError);
	};
	getPicSuccess = function(response){
		$rootScope.loader = 0;
		if (response.status == "picrecieved") 
		{
			window.localStorage.setItem("pictripToken", response['token']);
			window.pictripToken = response['token'];
			alert("ok");
		};
	};
	getPicError = function(){
		$rootScope.loader = 0;
		alert("Impossible de se connecter");
	};

//End Get pic from server

getPic();
*/
}]);