
app.controller('ConnexionController', ['$scope', '$rootScope', '$http', '$location', function ($scope, $rootScope, $http, $location) {
	
	$rootScope.openMenu = 1;
	$rootScope.hideNav = 1;

	$scope.connexion = 1;

	//Connexion form traitement
	$scope.connectData = {};
	$scope.connect = function(){
		//loading gif
		$rootScope.loader = 1;
		//Data process 
		$pseudo = $scope.connectData.pseudo;
		$password = $scope.connectData.password;
		//Encryption
		var encryptedPassword = CryptoJS.SHA512(CryptoJS.SHA512($password)+salt);
		var httpVerb = "GET";
		var currentTime = +new Date();
		var url = "http://tripshelper.com/appcontrol/connexion.php?pseudo="+$pseudo+"&timestamp="+currentTime;
		var httpUrl = httpVerb + ":" + url;
		encryptedPassword = encryptedPassword.toString();
		var sign = CryptoJS.HmacSHA512(httpUrl,encryptedPassword).toString(CryptoJS.enc.Base64);
		//Prepare to send
		$data = {
			"pseudo": $pseudo,
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
		.success(connectSuccess).error(connectError);
	};

	connectSuccess = function(response){
		$rootScope.loader = 0;
		if (response['status'] == "connected")
		{
			window.localStorage.setItem("pictripLogged", "true");
			window.localStorage.setItem("pictripLogin", response['pseudo']);
			window.localStorage.setItem("pictripToken", response['token']);
			window.localStorage.setItem("pictripEmail", response['email']);
			window.localStorage.setItem("pictripName", response['name']);
			window.localStorage.setItem("pictripPlace", response['place']);
			window.localStorage.setItem("pictripDescription", response['description']);
			window.localStorage.setItem("pictripPicture", response['picture']);
			window.pictripToken = response['token'];
			window.pictripLogged = true;
			window.pictripLogin = response['pseudo'];
			$location.path('/');
		}else if (response['status'] == "emailnotchecked")
		{
			alert ("Avant de pouvoir vous connecter, vérifiez vos mails et confirmer votre inscription !");
		}
	};
	connectError = function(){
		$rootScope.loader = 0;
		alert('Impossible de vous connecter, vérifiez votre connexion internet !');
	};


	//Inscription form traitement
	$scope.inscriptionData = {};
	$scope.inscription = function(){
		//loading gif
		$rootScope.loader = 1;
		//Data process 
		$pseudo = $scope.inscriptionData.pseudo;
		$email = $scope.inscriptionData.email;
		$password = $scope.inscriptionData.password;
		if (angular.isUndefined($password))
		{
			$rootScope.loader = 0;
			alert("Vous devez fournir un mot de passe");
			return false;
		}
		//Encryption ............... need improve
		var encryptedPassword = CryptoJS.SHA512($password);
		//Prepare to send
		$data = "pseudo="+$pseudo+"&email="+$email+"&password="+encryptedPassword;
		//Sending
		$http({
			method  : 'POST',
			url     : 'http://tripshelper.com/appcontrol/inscription.php',
			data    : $data,  // pass in data as strings
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		})
		.success(inscriptiontSuccess).error(inscriptiontError);
	};

	inscriptiontSuccess = function(response){
		$rootScope.loader = 0;
		if (response['status'] == "registred")
		{
			window.localStorage.setItem("pictripLogged", "true");
			window.localStorage.setItem("pictripLogin", response['pseudo']);
			window.localStorage.setItem("pictripToken", response['token']);
			window.pictripToken = response['token'];
			window.pictripLogged = true;
			window.pictripLogin = response['pseudo'];
			$location.path('/');
		}
		else{alert(response);}
		
	};
	inscriptiontError = function(){
		$rootScope.loader = 0;
		alert('Impossible de vous inscrire, vérifiez votre connexion internet !');
	};


}]);