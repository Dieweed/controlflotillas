    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function fotoSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var canvas = document.getElementById('canvas');

      // Unhide image elements
      //
      canvas.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      canvas.src = "data:image/jpeg;base64," + imageData;
        
      $("#imagenes").animate({ scrollTop: $('#imagenes')[0].scrollHeight}, 1000);
      $("#canvas").removeAttr("id");
      $("#imagenes").append('<img scr="" class="col-xs-12 radius hauto bcenter fondo-azul-claro bordeClaro" id="canvas" style="display:none">');
        
    }

    // Called when a photo is successfully retrieved
    //
    function fotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var canvas = document.getElementById('canvas');

      // Unhide image elements
      //
      canvas.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      canvas.src = imageURI;
    }

    // A button will call this function
    //
    function capturar() {
        // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(fotoSuccess, fotoFail, { 
            quality: 90,
            destinationType: destinationType.DATA_URL ,
            saveToPhotoAlbum:true
        });
    }

    // A button will call this function
    //
    function capturarEditar() {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
        navigator.camera.getPicture(fotoSuccess, fotoFail, { 
            quality: 90, 
            allowEdit: true,
            destinationType: destinationType.DATA_URL 
        });
    }

    // A button will call this function
    //
    function obtenerPhoto(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture(fotoURISuccess, fotoFail, { 
            quality: 90,
            destinationType: destinationType.FILE_URI,
            sourceType: source,
            
        });
    }

    // Called if something bad happens.
    //
    function fotoFail(message) {
      _mensaje("¡Oops!",message,"Entendido","");
    }
