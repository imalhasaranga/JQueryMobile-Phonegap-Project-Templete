document.addEventListener("deviceready", onDeviceReady, false);
var destinationType; 
var pictureSource;  
function onDeviceReady() {
    //alert("device is ready man");
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    if(networkState == "none"){
        return false;
    }else{
        return true;
    }
}

function imageCapture(imagecallback){
   
   var  options = {
            quality: 35,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: navigator.camera.EncodingType.JPEG,
            targetWidth: 620,
            targetHeight: 620
        };
   
   navigator.camera.getPicture(imagecallback, OnError, options); 
}
  

function OnError(message) {
  alert('Failed because: ' + message);
}



function uploadImageFile(imageUri,urltosend,authkey1,email, uploadSuccessCallBack) {

            var params = new Object();
            params.authkey = authkey1; 
			      params.email = email; 

            options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageUri.substr(imageUri.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageUri, urltosend , uploadSuccessCallBack, 
                function(error) {
                  alert('Error uploading file ' + path + ': ' + error.code);
                }, 
            options);

        
}



function captureVideo(captureSuccess) {
        // Launch device video recording application, 
        // allowing user to capture up to 2 video clips
        /*
            function captureSuccess(mediaFiles) {
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    uploadFile(mediaFiles[i]);
                }       
            }
        */
        navigator.device.capture.captureVideo(captureSuccess, function(error){
            var msg = 'An error occurred during capture: ' + error.code;
            navigator.notification.alert(msg, null, 'Uh oh!');
        }, {limit: 1 , duration : 10, });
}


function captureVideoGAPPLUGIN(captureSuccess){


  window.plugins.videocaptureplus.captureVideo(
      captureSuccess, // your success callback
      function(error){
            var msg = 'An error occurred during capture: ' + error.code;
            navigator.notification.alert(msg, null, 'Uh oh!');
        },   // your error callback
      {
        limit: 1, // the nr of videos to record, default 1 (on iOS always 1)
        duration: 10, // max duration in seconds, default 0, which is 'forever'
        highquality: false, // set to true to override the default low quality setting
        frontcamera: true//, // set to true to override the default backfacing camera setting
        // you'll want to sniff the useragent/device and pass the best overlay based on that.. assuming iphone here
        //portraitOverlay: 'www/img/cameraoverlays/overlay-iPhone-portrait.png', // put the png in your www folder
        //landscapeOverlay: 'www/img/cameraoverlays/overlay-iPhone-landscape.png' // not passing an overlay means no image is shown for the landscape orientation
      }
  );

  //TO USE THIS FUNCTION YOU NEED TO USE THIS GAP PLUGIN 
  // <gap:plugin name="nl.x-services.plugins.videocaptureplus" />
}



function uploadVideoFile(videoFile,uploadPath,Params,uploadSuccessCallBack){
            var ft = new FileTransfer(),
            path = videoFile.fullPath,
            name = videoFile.name;

            ft.upload(path,uploadPath, uploadSuccessCallBack,
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                alert('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name, params : Params  });  
}


function getCurrentLocationLatLon(onLocationAvailable,onLocationError){


    var config = {
       enableHighAccuracy: true,
       timeout: 30000,
       maximumAge: 3000
    }

    navigator.geolocation.getCurrentPosition(onLocationAvailable, onLocationError,config);
    /*
     function(position) {
          'Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n';
    }
    */
    /*
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    */

}


function openURLInDefaultBrowser(url){

/*
navigator.app.loadUrl(url, { openExternal:true });

*/
window.open(url, "_system");
return false;

}
