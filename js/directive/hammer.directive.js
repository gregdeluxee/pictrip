app.directive('hrTap', function(){
	return{
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hammer({preventDefault: false, dragBlockVertical: false, tapMaxDistance: 50}).on("tap", function(ev){
				console.log("tap");
				console.log(scope);
				console.log(attrs);
				return scope.$apply(attrs['hrTap']);
			});
		}
	}
});





app.directive('hrSwipeLeft', function(){
	return{
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hammer({prevent_default: false, drag_vertical: false, swipeVelocityX: 0.2}).on("swipeleft, dragleft ", function(ev){
				console.log("swipeleft");
				return scope.$apply(attrs['hrSwipeLeft']);
			});
		}
	}
});




app.directive('hrSwipeRight', function(){
	return{
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hammer({prevent_default: false, drag_vertical: false, swipeVelocityX: 0.2}).on("swiperight, dragright", function(ev){
				console.log("swiperight");
				return scope.$apply(attrs['hrSwipeRight']);
			});
		}
	}
});

