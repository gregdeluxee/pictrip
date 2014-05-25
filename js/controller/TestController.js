

app.controller('TestController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

	$rootScope.hideNav = 0;

	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://pictrip.me/img/picture/5.jpg");

/*
	var fileTransfer = new FileTransfer();
	var uri = encodeURI("http://pictrip.me/img/picture/5.jpg");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);
	function onSuccess(fileSystem){
		alert(fileSystem.name);
		fileTransfer.download(
		    uri,
		    "file:///pictrip/test.jpg",
		    function(entry) {
		    	fileURI = entry.toURL();
		        alert("download complete: " + fileURI);
	            $("#test").css("background-image", "url(\""+fileURI+"\")")
		    },
		    function(error) {
		        alert("download error source " + error.source);
		        alert("download error target " + error.target);
		        alert("upload error code" + error.code);
		    }
		);
	}
	function onError(evt){
		alert(evt.target.error.code);
	}
*/
 //OK WORKS
	fileTransfer.download(
	    uri,
	    "/sdcard/pictrip/test.jpg",
	    function(entry) {
	    	fileURI = entry.toURL();
	        alert("download complete: " + fileURI);
            $("#test").css("background-image", "url(\""+fileURI+"\")")
	    },
	    function(error) {
	        alert("download error source " + error.source);
	        alert("download error target " + error.target);
	        alert("upload error code" + error.code);
	    }
	);
	// /storage/emulated/0/pictrip


/*
    var ft = new FileTransfer();
    ft.download(encodeURI("http://pictrip.me/img/picture/5.jpg"), test.jpg,  
        function(entry) {
            alert("download complete");
            $("#test").css("background-image", "url("+entry+")")
        },
        function(error) {
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("upload error code" + error.code);
        }
    );


	downloadFile();

	function downloadFile(){
        window.requestFileSystem(
	        LocalFileSystem.PERSISTENT, 0, 
	        function onFileSystemSuccess(fileSystem) {
		        fileSystem.root.getFile(
		            "dummy.html", {create: true, exclusive: false}, 
		            function gotFileEntry(fileEntry){
		                var sPath = fileEntry.fullPath.replace("dummy.html","");
		                var fileTransfer = new FileTransfer();
		                fileEntry.remove();

		                fileTransfer.download(
		                    encodeURI("http://www.w3.org/2011/web-apps-ws/papers/Nitobi.pdf"),
		                    sPath + "theFile.pdf",
		                    function(theFile) {
		                        alert("download complete: " + theFile.toURI());
		                        showLink(theFile.toURI());
		                    },
		                    function(error) {
		                       	alert("download error source " + error.source);
		                        alert("download error target " + error.target);
		                        alert("upload error code: " + error.code);
		                    }
		                );
		            }, 
		        fail);
	    	}, 
	    fail);
    }
    function fail(evt) {
       alert(evt.target.error.code);
    }
    function showLink(url){
        alert(url);
        var divEl = document.getElementById("ready");
        var aElem = document.createElement("a");
        aElem.setAttribute("target", "_blank");
        aElem.setAttribute("href", url);
        aElem.appendChild(document.createTextNode("Ready! Click To Open."))
        divEl.appendChild(aElem);
    }
*/

}]);