var inicio={};
var usuario='';
    $(document).ready(function(){
        //vacio mi listado de carros
        $("#CarsList").html('');
        
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        
        console.log(inicio);
        //obtenemos los automoviles del usuario firmado
        //alert("dame autos del gestor"+usuario.id);
        inicio.dameAutosDelGestor(usuario.id,'');
        $(".barra_buscadora").attr("onkeyup","inicio.buscador('"+usuario.id+"',this.value)");

    });
inicio.buscador = function (gestor_id,numero_economico){
    if(numero_economico==undefined || numero_economico==null){
        numero_economico = '';
    }
     re = almacenamiento.dameAutomoviles();
    $("#gridAutomoviles").html('');
    $.each(re, function(i, item){
        criterio = numero_economico;
        if (item.numero_economico.search(new RegExp(criterio,"i")) != -1){
            console.log("La busqueda arroja: ");
            console.log(item);
            inicio.insertaAutomovil(item.id, item.numero_economico,item.ruta,item.placas,item.conductor,item.fecha_actualizacion,item.semaforo,item.notificacion_servicio,item.proximo_servicio);
        }
    });
}
inicio.dameAutosDelGestor=function(gestor_id,numero_economico){
    if(numero_economico==undefined || numero_economico==null){
        numero_economico = '';
    }
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-automoviles",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			gestor_id: gestor_id,
            numero_economico: numero_economico
		},
        processData:true,
		success:	function(re){
            console.log("Automoviles del gestor_: ");
            console.log(re);
            $("#gridAutomoviles").html('');
            if(re.length>0){
                //recorremos los automoviles
                var cuantos = re.length;
                var z =0;
                $.each(re, function(i, item) {
                    console.log(item);
                     //insertamos el html necesario para el automovil
                    almacenamiento.guardarAutomovil(item.id,item.conductor,item.placas,item.numero_serie,item.numero_economico,item.id_gps,item.kilometraje,item.modelo_id,item.modelo,item.marca_id,item.marca,item.ruta_id,item.nombre,item.region_id,item.region,item.fecha_actualizacion,item.status,item.semaforo);
                    //inicio.insertaAutomovil(item.id, item.numero_economico,item.nombre,item.placas,item.conductor,item.fecha_actualizacion,item.semaforo);
                    
                    if(z==(cuantos-1)){
                        inicio.cargaLocales();
                    }
                    z++;
                });

            }else{
                console.log(re);
                _mensaje("Atención","No hay automóviles ligados al gestor de servicios firmado","Entendido");
            }//if
		},
		error: function(re){
            re = almacenamiento.dameAutomoviles();
            console.log("automoviles sin conexion: ");
            console.log(re);
            $("#gridAutomoviles").html('');
            $.each(re, function(i, item){
                criterio = numero_economico;
                if (item.numero_economico.search(new RegExp(criterio,"i")) != -1){
                    console.log("La busqueda arroja: ");
                    console.log(item);
                    inicio.insertaAutomovil(item.id, item.numero_economico,item.ruta,item.placas,item.conductor,item.fecha_actualizacion,item.semaforo,item.notificacion_servicio,item.proximo_servicio);
                }
            });
            
            
             /*$.each(re, function(i, item) {
                    console.log(item);
                    
                });*/
            /*console.log(re);
            _mensaje("Atención","No hay internet, no se pudo ingresar.","Entendido");*/
            
		}
	});

}//function

inicio.cargaLocales = function(){
    re = almacenamiento.dameAutomoviles();   
    $("#gridAutomoviles").html('');
    $.each(re, function(i, item){
        inicio.insertaAutomovil(item.id, item.numero_economico,item.ruta,item.placas,item.conductor,item.fecha_actualizacion,item.semaforo,item.notificacion_servicio,item.proximo_servicio);
    });
}

inicio.insertaAutomovil=function(id,numero_economico,ruta,placas,conductor,fecha_actualizacion,semaforo,notificacion_servicio,proximo_servicio){
    //CarList
    console.log(semaforo);
    fecha_actualizacion = fecha_actualizacion.split("T");
    var carro='';
    var clase='';
    if(semaforo=='rojo'){
        clase ='bred';
    }else if(semaforo=='amarillo'){
        clase ='byellow';
    }else if(semaforo=='verde'){
        clase ='bgreen';
    }else if(semaforo == 'azul'){
        clase = 'bblue';
    }
    
    if(notificacion_servicio=='1'){
        notificacion = 'ps';
    }else if(notificacion_servicio=='2'){
        notificacion = 'es';
    }else if(notificacion_servicio=='3'){
        notificacion = 'ec';
    }else{
        notificacion = 'sr';
    }
    
    
                    carro+='<tr class="col-xs-12 sinPadding" onclick="inicio.dameAutomovil(\''+id+'\',\''+numero_economico+'\')">'+
                                '<td class="col-xs-12">'+
                                    '<div class="col-xs-5 '+clase+' text-center blanco numeroFlotilla sinPadding">'+numero_economico+'</div>'+
                                    '<div class="col-xs-1 text-center blanco sinPadding"><img src="imagenes/'+notificacion+'.png"/></div>'+
                                    '<div class="col-xs-6">'+
                                        '<div class="col-xs-12 bold text-22">'+(ruta==undefined?"Sin ruta":ruta)+'</div>'+
                                        '<div class="col-xs-12 text-center text-16">'+placas+'</div>'+
                                        '<div class="col-xs-12 text-center italic color-gris">'+(typeof conductor=='string'?conductor:'')+'</div>'+
                                        '<div class="col-xs-12 text-center color gris bold">'+fecha_actualizacion[0]+'</div>'+
                                   ' </div>'+
                               '</td>'+
                            '</tr>';
    $("#gridAutomoviles").append(carro);
}
inicio.dameAutomovil=function(idAutomovil,flotilla){
    //alert("Dame automovil.....");
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil
		},
        processData:true,
		success:	function(re){
            //alert("Bien al obtener auto");
            console.log("obteniendo automovil: ");
            console.log(re);
            
                 if(re!=undefined && re[0]!=null){
                        if(re[0].id!=''){
                            
                            //se obtuvo el automovil de manera correcta
                            //guardamos la informacion en local storage y redireccionamos a la pagina de los datos generales.
                            //almacenamiento.guardarAutomovil(re[0].id,re[0].conductor,re[0].placas,re[0].numero_serie,re[0].numero_economico,re[0].id_gps,re[0].kilometraje,re[0].modelo_id,re[0].modelo,re[0].marca_id,re[0].marca,re[0].ruta_id,re[0].nombre,re[0].region_id,re[0].region,re[0].fecha_actualizacion,re[0].status,re[0].semaforo,sincronizable,notificacion_servicio,proximo_servicio,frecuencia_servicio); Bustos dice lo comente porque las variables se sincronizable no existen...
                            inicio.obtenerCaracteristicasAutomovil(re[0].id,"edicionAutomovil");
                            almacenamiento.seleccionFlotilla(flotilla);
                            almacenamiento.seleccionaAutomovil(re[0].id);

                        }else{
                            _mensaje("Atención","Error al obtener el Automóvil.","Entendido");
                            console.log(re);
                        }
                 }else{
                    console.log(re);
                    _mensaje("Atención","No se encontró el Automóvil seleccionado","Entendido");
                 }
                //irA('edicionAutomovil'); Bustos dice la redireccion a edicionAuto no debe de ser aqui sino hasta se ontengan las caracteristicas del auto, porque la obtencion de las caracteristicas es una llamada a Ajax.
		},
		error: function(re){
            //alert("Error al obtener auto");
           // console.log(re);
            //_mensaje("Atención","No hay internet, no se pudo obtener la información.","Entendido");
            almacenamiento.seleccionFlotilla(flotilla);
            almacenamiento.seleccionaAutomovil(idAutomovil);
            irA('edicionAutomovil');
		}
	});
    almacenamiento.seleccionFlotilla(flotilla);
    almacenamiento.seleccionaAutomovil(idAutomovil);
    //irA('edicionAutomovil'); Bustos dice la redireccion no debe de ser aqaui sino despues de la llamada a ajax de las caracteristicas.
}
inicio.obtenerCaracteristicasAutomovil=function(idAutomovil,redireccion){
    //alert("Obtener Caracteristicas automovil");
    console.log("Entro obtener caracteriaticas");
    var clav=clave(); 
    $.ajax({
		url:      dominio+"dame-caracteristicas-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil
		},
        processData:true,
		success:	function(re){
            //alert("Bien obtener");
            console.log("obteniendo caracteristicas del automovil: "+idAutomovil);
            console.log(re);
            
                 if(re!=undefined && re!=null){
                     var ciclos = 0; 
                     if(re.seleccionadas!=undefined){
                         ciclos++;
                     }
                     if(re.disponibles!=undefined){
                         ciclos++;
                     }
                     console.log("los ciclos son "+ciclos);
                     z=0;
                        $.each(re, function(i, item){
                            console.log(i);
                            console.log(item);
                            
                            $.each(item, function(x, caracteristica) {
                                console.log(caracteristica);
                                if(i=="seleccionadas"){
                                     almacenamiento.guardarCaracteristica(caracteristica.automovil_id,caracteristica.caracteristica_id,caracteristica.caracteristica,0,1);
                                }else{
                                    almacenamiento.guardarCaracteristica(idAutomovil,caracteristica.caracteristica_id,caracteristica.caracteristica,1,0);
                                }                                
                            });
                            console.log(ciclos);
                            console.log(z);
                            //si es la ultima caracteristica redireccionamos en caso de tener el parametro
                            if(redireccion !=undefined && redireccion!='' && z==ciclos-1){
                                irA(redireccion);
                            }
                            z++;
                        });
                     irA('edicionAutomovil');
                 }else{
                    console.log(re);
                    _mensaje("Atención","No se encontrarón caracteristicas para el Automóvil seleccionado","Entendido");
                     irA('edicionAutomovil');
                 }
		},
		error: function(re){
            //alert("Mal obtener");
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener las caracteristicas del automovil.","Entendido");
		}
	});
}