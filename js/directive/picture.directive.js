app.directive('ptPicture', function(){
	return{
		templateUrl : 'partials/_pic.html',
		restrict : 'E',
		scope: {
			comment : "@",
			country : "@",
			place : "@",
			pic : "@",
			like : "@"
			//options: "=pictureOptions"
		},
		link: function(scope, element, attrs){
			console.log(scope);
		}
	}
});