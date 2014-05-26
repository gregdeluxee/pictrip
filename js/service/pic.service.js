

app.factory('PicFactory',[ 'SignFactory', '$http', '$q', function(SignFactory, $http, $q){
	var factory = {
		pics: new Array(),
		getPics : function($picrequest, $nextPicId){
			var deferred = $q.defer();
			$pseudo = window.localStorage.getItem("pictripLogin");
			var currentTime = +new Date();
			//Prepare to send
			$data = {
				"picrequest": $picrequest,
				"nextpicid": $nextPicId,
				"pseudo": $pseudo,
				"timestamp": currentTime,
				"sign": SignFactory.getsign("getpic", currentTime)
			};
			//Sending
			$http({
		        method  : 'POST',
		        url     : 'http://pictrip.me/appcontrol/getpic.php',
		        data    : $data,  // pass in data as json
		        headers : { 'Content-Type' : 'application/json' }
		    })
		    .success(function(data){
		    	if (data.status == "picrecieved") 
				{
					window.localStorage.setItem("pictripToken", data['token']);
					window.pictripToken = data['token'];
					$pics = factory.pics;
					angular.forEach(data, function(value, key){
						if (key.length == 1) 
						{
							$pics.push(value);
						};
					})
					factory.pics = $pics;
		    		deferred.resolve(factory.pics);
				};
		    }).error(function(data){
		    	deferred.reject("Impossible de se connecter");
		    });
		    return deferred.promise;
		},
		getPic : function() {

		}
	};
	return factory;
}]);