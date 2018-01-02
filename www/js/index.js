var ingreso={};
    $(document).ready(function(){
        
    });

ingreso.ingresar=function(){
    
    $("#cargando").removeClass("hidden");
    var clav=clave();
    $.ajax({
		url:      dominio+"ingresar",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			email:     $("#email").val(),
			contrasena:$("#contrasena").val()
		},
        processData:true,
		success:	function(re){
            console.log(dominio+"ingresar");
            console.log("Al ingresar el servidor responde: ");
            console.log(re[0]);
            
            if(re!=undefined && re[0]!=null){
                if(re[0].id!=''){
                    usuario = almacenamiento.dameUsuario();
                    if(usuario!=undefined && usuario!=null && usuario!=''){
                        if(usuario.email!=$("#email").val()){
                            almacenamiento.limpiarTodo();
                        }
                    }
                    almacenamiento.loguear(re[0].id, re[0].nombre,re[0].email,re[0].tipo,re[0].status);
                    almacenamiento.pedirIdNuevo();
                    //obtenemos las opciones de los catalogos antes de redireccionar para el modo offline.
                    //obtenemos el gestor
                    
                    //obtenemos todos los autos del gestor y encadenmos las funciones para el llenado de localstorage
                    usuario = almacenamiento.dameUsuario();
                    dameTodaLaConfiguracion(usuario.id);
                    //dameTodosLosAutosDelGestor(usuario.id);
                    
                    //obtenemos los tipos de documentos y encadenamos las funciones para el llenado de los select
                    //dameTodosLosTiposDeDocumentosDisponibles();
                    //obtenemos los talleres
                    //dameTodosLosTalleresDisponibles();
                    //obtenemos los servicios
                    //dameTodosLosServiciosDisponibles();
                    //obtenemos los incidentes
                    //dameTodosLosIncidentesDisponibles();
                    //window.location="inicio.html"; 
                }else{
                    _mensaje("Atención","Error al obtener al usuario.","Entendido");
                    console.log(re);
                    $("#cargando").addClass("hidden");
                }
                
            }else{
                _mensaje("Atención","No existe un usuario válido con los datos ingresados.","Entendido");
                $("#cargando").addClass("hidden");
                console.log(re);
                //alert(re.error);
            }//if
		},
		error: function(re){
            //si no hay internet verificamos si el usuario que esta tratando de ingresar es el ultimo que se logueo
            usuario = almacenamiento.dameUsuario();
            $("#cargando").addClass("hidden");
            console.log(re);
            if(usuario!=undefined && usuario!=null && usuario!=''){
                if(usuario.email==$("#email").val()){
                    window.location="inicio.html"; 
                }else{
                    console.log(re);
                    _mensaje("Atención","No hay internet, no se pudo ingresar.","Entendido");
                }
            }else{
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo ingresar.","Entendido");
            }
            
		}
	});
    
}//function

    