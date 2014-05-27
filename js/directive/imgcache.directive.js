app.directive('ptImgcache', function(){
	return{
		restrict : 'A',
		
		link: function(scope, element, attrs){

			var targeturl = 'lol';
			alert(targeturl);
/*
			scope.$watch(attrs.ptImgcache, function(value) {
		        targeturl = value;
		        alert(targeturl);
		        //putImgCache();
		    });

			function putImgCache(){
				ImgCache.isCached(targeturl, function(path, success){
				  	if(success){
				    	// already cached
				    	ImgCache.useCachedBackground($(element));
				  	} else {
				    	// not there, need to cache the image
				    	ImgCache.cacheBackground($(element), function(){
				      		ImgCache.useCachedBackground($(element));
				    	});
				  	}
				});	
			}	
*/
		}
	}
});

