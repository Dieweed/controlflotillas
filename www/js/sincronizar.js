var sincronizar={};
var automovilSeleccionado='';
var usuario='';
$(document).ready(function(){
    //obtenemos el usuario firmado
    usuario = almacenamiento.dameUsuario();   
    
    
    
    
});


sincronizar.realizaSincronizacion=function(){
    //si no hay internet no sincronizamos
    
    
    //obtenemos todos los automoviles
    //si no hay autos no sincronizamos
    sincronizacion = almacenamiento.dameTodoParaSincronizar();
    console.log(sincronizacion);
    if(sincronizacion!=undefined){
        $(".boton").removeClass('fa fa-cloud-upload fa-2x');
        $(".boton").addClass('fa fa-refresh fa-spin fa-2x fa-fw');
        $(".botonSincronizar").attr("disabled","disabled");
                var clav=clave();
                $.ajax({
                    url:      dominio+"sincronizar",
                    type:     'POST',
                    data:	{
                        clave:     clav,
                        codigo:    sha1(clav+palaSecr),
                        datos: JSON.stringify(sincronizacion)
                    },
                    processData:true,
                    success:	function(re){
                        console.log("respuesta de sincronizacion: ");
                        console.log(re);
                        if(re!='' && re!=1){
                            _mensaje("Sincronización incorrecta","Hubo un problema al tratar de sincronizar. Vuelva a inténtarlo más tarde.","Entendido");
                        }else{
                            //ClearDirectory();
                            _mensajeCallback("¡Sincronización Correcta!","Se ha sincronizado toda la información de manera correcta.","Entendido", exitAppFromBackground2);
                            
                        }
                        $(".boton").removeClass('fa fa-refresh fa-spin fa-2x fa-fw');
                        $(".boton").addClass('fa fa-cloud-upload fa-2x');
                        $(".botonSincronizar").removeAttr("disabled");
                    },
                    error: function(re){
                        _mensaje("Atención","No hay señal de Internet para poder sincronizar, o la señal es muy débil. Inténtelo de nuevo","Entendido");
                        console.log(re);
                        $(".boton").removeClass('fa fa-refresh fa-spin fa-2x fa-fw');
                        $(".boton").addClass('fa fa-cloud-upload fa-2x');
                        $(".botonSincronizar").removeAttr("disabled");
                    }
                }); 
            
    }else{
        _mensaje("Atención","No hay autmoviles por sincronizar","Entendido");
    }
}