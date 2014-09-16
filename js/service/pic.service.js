

app.factory('PicFactory',[ 'SignFactory', '$http', '$q', function(SignFactory, $http, $q){
	var factory = {

		pics: new Array(),

		getPics : function($picrequest, $nextPicId){
			var deferred = $q.defer();
			$pseudo = window.localStorage.getItem("pictripLogin");
			var currentTime = +new Date();
			if (factory.pics.length == 0) {$nextPicId = 0};
			if ($nextPicId <= 0) {$nextPicId = 0};
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
				url     : 'http://tripshelper.com/appcontrol/getpic.php',
				data    : $data,  // pass in data as json
				headers : { 'Content-Type' : 'application/json' }
			})
			.success(function(data){
				if (data.status == "picrecieved")
				{
					window.localStorage.setItem("pictripToken", data['token']);
					window.pictripToken = data['token'];
					$pics = factory.pics;
					$nextPics = [];
					angular.forEach(data, function(value, key){
						if (key.length == 1) 
						{
							$pics.push(value);
							$nextPics.push(value);
						};
					})
					factory.pics = $pics;
		    		deferred.resolve($nextPics);
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