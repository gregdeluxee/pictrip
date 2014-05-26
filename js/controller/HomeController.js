

app.controller('HomeController', ['$scope', '$location', '$rootScope', '$http', 'PicFactory', '$compile', function ($scope, $location, $rootScope, $http, PicFactory, $compile) {
	
	$rootScope.hideNav = 0;
	$scope.picsContainerPos = 0;
	$scope.nextPicId = 0;

	$scope.alert = function(){
		alert("test");
	}

	$scope.nextPic = function(){
		if ($scope.picsContainerPos > -300) {
			$scope.picsContainerPos-=100;
		};
	};
	$scope.prevPic = function(){
		if ($scope.picsContainerPos < 0) {
			$scope.picsContainerPos+=100;
		};
	};

	//$rootScope.loader = 1;
	$scope.pics = PicFactory.getPics("newest", $scope.nextPicId).then(function(pics){
		$rootScope.loader = 0;
		$scope.pics = pics;


		//$("#test").html(pics[0]['id_pic'] + "<br>" + pics[1]['id_pic']);
		var newPics = '<pt-picture comment="'+pics[0]["comment_pic"]+'" country="'+pics[0]["country_pic"]+'" place="'+pics[0]["place_pic"]+'" pic="'+pics[0]["file_pic"]+'" like="'+pics[0]["like_pic"]+'"></pt-picture><pt-picture comment="'+pics[1]["comment_pic"]+'" country="'+pics[1]["country_pic"]+'" place="'+pics[1]["place_pic"]+'" pic="'+pics[1]["file_pic"]+'" like="'+pics[1]["like_pic"]+'"></pt-picture>';
		//alert(newPics);
		//$scope.$apply($(".picsContainer").append("<p>Pour remonter</p>"+nextPics));
		//$scope.$digest();
		$(".picsContainer").append($compile(newPics)($scope));
		
		
		alert(pics);
	}, function(msg){
		$rootScope.loader = 0;
		alert(msg);
	});

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