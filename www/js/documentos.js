var automovilSeleccionado='';
var usuario='';
var editar = false;
documentos={};
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //request();
    //obtenemos el usuario firmado
    usuario = almacenamiento.dameUsuario();
        
    console.log(usuario);
    //obtenemos los datos del automovil seleccionado de localstorage
    automovil = almacenamiento.dameAutomovilSeleccionado();
    automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
    documentos.dameTiposDisponibles();
    //documentos.obtenerDocumentos(automovilSeleccionado.id);
    $("#btnCargaDocumentos").attr("onclick","documentos.obtenerDocumentos("+automovilSeleccionado.id+");");
    $("#frmDocumentos").attr("action",urlSistema+"automovil/guardar-documento");
    $("#automovil_id_documento").val(automovilSeleccionado.id);
    
    
    $("#archivo").bind("change",function(){
        console.log("cambio input");
        $(".botonFile").removeClass("btn-primary");
        $(".botonFile").addClass("btn-success");
    });
    /*console.log(cordova.file);
   $("#archivo").bind("change",function(e){

          var files = this.files;
          window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs){
            // Duplicate each file the user selected to the app's fs.
            for (var i = 0, file; file = files[i]; ++i) {

                  // Capture current iteration's file in local scope for the getFile() callback.
                  (function(f) {
                      console.log(f);
                    fs.root.getFile(f.name, {create: true, exclusive: true}, function(fileEntry) {
                        console.log(fileEntry);
                        fileEntry.createWriter(function(fileWriter) {
                            fileWriter.write(f); // Note: write() can take a File or Blob object.
                        }, function(){
                          console.log("error al escribir");
                        });
                    }, function(){
                        console.log("error al obtener el archivo");
                    });
                  })(file);

                }
          }, function(){
              console.log("error al ejecutar la funcion anonima");
          });

   });*/
   //localStorage.setItem('pestanaActiva','3');
}

 documentos.obtenerDocumentos=function(idAutomovil){

     var clav=clave();
        $.ajax({
            url:      dominio+"dame-documentos-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr),
                idAutomovil: automovilSeleccionado.id
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los documentos del automovil: "+automovilSeleccionado.id);
                
                     if(re!=undefined && re!=null && re!=''){
                            $("#gridDocumentos").html('');
                            var ciclo = re.length;
                            var contador =0;
                            $.each(re, function(i, item){
                                
                                //request(rutaDocumentos+item.archivo,item.archivo,'2','');
                                console.log(item);
                                almacenamiento.guardarDocumento(item.automovil_id,item.id,item.tipo_documento_id,item.tipo_documento,item.fecha,item.archivo,rutaDocumentos+item.archivo,item.status);
                                //realizamos la descarga de los archivos
                                //if(guardado){
                                   
                                /*}else{
                                    _mensaje("Atención","El archivo no se encuentra o ha sido removido.","Entendido")
                                }*/
                                
                                
                                if(contador==ciclo-1){
                                    documentos.insertarDocumentos();
                                }
                                contador++;
                            });
                         
                     }else{
                        $("#gridDocumentos").html('');
                        documentos.insertarDocumentos();
                     }
            },
            error: function(re){
                //no hay internet. cargo los documentos localmente
                $("#gridDocumentos").html('');
                documentos.insertarDocumentos();
                
            }
        }); 
     
     
 }
 
 
 documentos.insertarDocumentos=function(){
    var registros = almacenamiento.dameDocumentosAutomovil(automovilSeleccionado.id);
    registros = burbuja(registros);
     console.log("cargamos los dcumentos");
    $.each(registros, function(i, item){
        var doc='';
        var fecha = item.fecha.split("T");
        console.log("archivo: "+item.archivo);
        extension = item.archivo.split(".");
        extension = extension[1].toLowerCase();
        
         var d = new Date();
        
        if(extension!='jpg' && extension!='png' && extension!='jpeg' && extension!='gif' ){
             doc+='<tr onclick="documentos.cargarDocumento(\''+automovilSeleccionado.id+'\',\''+item.id+'\')">'+
                '<td class="col-xs-4 text-16 sinPadding">'+item.tipo_documento+'</td>'+
                '<td class="col-xs-4 text-16 sinPadding">'+fecha[0]+'</td>'+
                '<td class="col-xs-4"><button class="btn btn-lg btn-warning center-block" type="button" onclick="documentos.ver(\''+automovilSeleccionado.id+'\',\''+item.id+'\')">'+
                     '<i class="fa fa-search" aria-hidden="true"></i>'+
                    '</button>'+ 
                '</td>'+
            '</tr>';
        }else{
            doc+='<tr onclick="documentos.cargarDocumento(\''+automovilSeleccionado.id+'\',\''+item.id+'\')">'+
                        '<td class="col-xs-4 text-16 sinPadding">'+item.tipo_documento+'</td>'+
                        '<td class="col-xs-4 text-16 sinPadding">'+fecha[0]+'</td>'+
                        '<td class="col-xs-4">'+
                        '<a class="example-image-link" href="javascript:void(0)" onclick="documentos.verificaConexion(this,\''+urlSistema+"cargas/documentos/"+item.archivo+'?'+d.getTime()+'\',0)" data-lightbox="example-set">'+
                        '<button class="btn btn-lg btn-warning center-block" type="button">'+
                             '<i class="fa fa-search" aria-hidden="true"></i>'+
                            '</button></a>'+ 
                        '</td>'+
                    '</tr>';
        }
              
                

        /*
       doc+='<tr onclick="documentos.cargarDocumento(\''+automovilSeleccionado.id+'\',\''+item.id+'\')">'+
                '<td class="col-xs-4 text-16 sinPadding">'+item.tipo_documento+'</td>'+
                '<td class="col-xs-4 text-16 sinPadding">'+fecha[0]+'</td>'+
                '<td class="col-xs-4"><button class="btn btn-lg btn-warning center-block" type="button" onclick="documentos.ver(\''+automovilSeleccionado.id+'\',\''+item.id+'\')">'+
                     '<i class="fa fa-search" aria-hidden="true"></i>'+
                    '</button>'+ 
                '</td>'+
            '</tr>';
        */
       
        
       $("#gridDocumentos").append(doc);
    }); 
 }
 documentos.verificaConexion=function(obj, ruta, bandera){
     console.log("verificando conexion");
              $.ajax({
                  type: 'HEAD',
                  url: ruta,
                  complete: function (xhr){
                    if (xhr.status == 404){
                        console.log("sin conexion");
                        $("#lightboxOverlay").trigger("click");
                        $(obj).attr("href",ruta).attr("onclick","documentos.verificaConexion(this,'"+ruta+"',0)");
                        _mensaje("Atención","Hubo un problema al cargar la imagen, inténtelo nuevamente.<br> Una de las causas más probable es que no cuente con conexión a internet.","Entendido")
                    }else{
                        console.log("con conexion");
                        $(obj).attr("href",ruta).attr("onclick","documentos.verificaConexion(this,'"+ruta+"',1)");
                        if(bandera==0){
                             $(obj).trigger("click");
                        }
                    }
                  },error: function (xhr){
                      $("#lightboxOverlay").trigger("click");
                      $(obj).attr("href",ruta).attr("onclick","documentos.verificaConexion(this,'"+ruta+"',0)");
                       console.log("sin conexion");
                  }
            });
 }
 documentos.ver=function(idAutomovil,idDocumento){
    //obteemos el documento seleccionado
    documento = almacenamiento.dameDocumento(idAutomovil,idDocumento);
     console.log(documento);
    //ejecutamos un windows opener a la ruta donde estan los archivos
        $.ajax({
          type: 'HEAD',
          url: rutaDocumentos+"/"+documento.archivo,
          complete: function (xhr){
            if (xhr.status == 404){
              //_mensaje("Atención","El archivo no se encuentra o ha sido removido.","Entendido");
                _mensaje("Atención","Hubo un problema al cargar el archivo, inténtelo nuevamente.<br> Una de las causas más probable es que no cuente con conexión a internet.","Entendido")
            }else{
               window.open(rutaDocumentos+"/"+documento.archivo, '_blank', 'location=0', 'closebuttoncaption=Cerrar');
            }
          }
        });
    
 }
 
documentos.cargarDocumento=function(idAutomovil,idDocumento){
    var registro = almacenamiento.dameDocumento(idAutomovil,idDocumento);
    console.log(registro);
    if(registro!=undefined && registro!=null){
        $("#fecha").val(registro.fecha);
        $("#idDocumento").val(registro.id);
        $(".botonFile").removeClass("btn-primary");
        $(".botonFile").addClass("btn-success");
        $("#tipo").val(registro.tipo_documento_id);
        $("#automovil_id_documento").val(registro.idAutomovil);
        $("#status_documento").val(registro.status);
    }else{
        _mensaje("Atención","Error al obtener el documento seleccionado","Entendido");
    }
}
documentos.adjuntarArchivo=function(){
    if($("#fecha").val()==""){
        _mensaje("Atención","Debe seleccionar La fecha para el documento","Entendido");
    }else if($("#tipo").val()<=0){
        _mensaje("Atención","Debe seleccionar el tipo de documento.","Entendido");
    }else if($("#idDocumento").val()=='' && $("#archivo").val()==''){
        _mensaje("Atención","Debe seleccionar el archivo.","Entendido");
    }else if($("#automovil_id_documento").val()==''){
        _mensaje("Atención","Debe seleccionar el automóvil.","Entendido");
    }else if($("#statusDocumento").val()==''){
        _mensaje("Atención","Debe seleccionar el status del documento.","Entendido");
    }else{
       myApp.showPreloader('Subiendo el documento al servidor, espere un momento por favor...');
       $(".btnAdjuntar").hide();
        $("#frmDocumentos").validate({
            submitHandler: function(form){
                $(form).ajaxSubmit({
                    success: function(respuesta){
                        console.log("success"); 
                        console.log(respuesta);
                        documentos.obtenerDocumentos(automovilSeleccionado.id);
                        $("#fecha").val('');
                        $("#tipo").val('');
                        $("#idDocumento").val('');
                        myApp.hidePreloader();
                        $(".btnAdjuntar").show();
                        // _mensaje("Atención","RespuestaDelServidor"+respuesta,"Entendido");
                    } //success
                    ,error: function(respuesta){
                        myApp.hidePreloader();
                        $(".btnAdjuntar").show();
                        _mensaje("Atención","Hubo un problema al cargar la imagen, inténtelo nuevamente.<br> Una de las causas más probable es que no cuente con conexión a internet.","Entendido");
                    } //error
                }) //ajaxSubmit

            } //submitHandler
        }) //validate


        $("#frmDocumentos").submit();   
    }
       

 }


documentos.dameTiposDisponibles=function(tipo_id){
    //obtenemos los talleres disponibles
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-tipo-documentos-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los tipos de documentos disponibles: ");
                console.log(re);
                $("#tipo").html('');
                $("#tipo").append('<option value="">- Tipo de documento -</option>');
                $.each(re, function(i, item){
                    if(item.id==tipo_id){
                        $("#tipo").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#tipo").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
            },
            error: function(re){
                //cargamos los talleres disponibles localmente
                re = almacenamiento.dameTiposDeDocumentosDisponibles();
                console.log("obteniendo los talleres disponibles localmente: ");
                console.log(re);
                $("#tipo").html('');
                $("#tipo").append('<option value="">- Tipo de documento -</option>');
                $.each(re, function(i, item){
                    if(item.id==tipo_id){
                        $("#tipo").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#tipo").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
                /*console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener obtener la información de los documentos disponibles.","Entendido");
                */
            }
        }); 
}

