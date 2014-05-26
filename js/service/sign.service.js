app.factory('SignFactory',[ function(){
	var factory = {
		getsign : function($page, $currentTime) {
			//Sign encryption
			$pseudo = window.localStorage.getItem("pictripLogin");
			$token = window.localStorage.getItem("pictripToken");
		    var encryptedToken = CryptoJS.SHA512($token);	  
		    var encryptedToken = encryptedToken+salt;	  
		    var encryptedToken = CryptoJS.SHA512(encryptedToken);
		    var httpVerb = "GET";
		    var url = "http://pictrip.me/appcontrol/"+$page+".php?pseudo="+$pseudo+"&timestamp="+$currentTime;
		    var httpUrl = httpVerb + ":" + url;
		    encryptedToken = encryptedToken.toString();	  
		    var sign = CryptoJS.HmacSHA512(httpUrl,encryptedToken).toString(CryptoJS.enc.Base64);
		    return sign;
		}
	};
	return factory;
}]);