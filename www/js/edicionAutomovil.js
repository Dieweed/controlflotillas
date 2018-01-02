var edicionAutomovil={};
var automovilSeleccionado='';
var usuario='';
    $(document).ready(function(){

        
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        
        console.log(usuario);
        //obtenemos los datos del automovil seleccionado de localstorage
        automovil = almacenamiento.dameAutomovilSeleccionado();
        console.log(automovil);
        automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
        console.log(automovilSeleccionado);
        
        //cargamos la informacion en pantalla
        edicionAutomovil.cargarFormulario();
        //limpiamos las caracteristicas y las cargamos de localstorage
        $("#disponibles").html('');
        $("#seleccionadas").html('');
        edicionAutomovil.cargarCaracteristicas();
        
        var usua=almacenamiento.dameUsuario();
        $(".btnDesa").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        $("input:checkbox").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        if(usua["tipo"]=='2'||usua["tipo"]=='3')
            for(var i=0; i<=$(".txtDesa").length-1; i++){
                $(".txtDesa")[i].disabled=true;
            }//for
    });
edicionAutomovil.notificacion = function(obj){
    var valor = $(obj).val();
    var attributo = $(obj).attr("notificacionActual");
    var km = $("#kilometraje").val();
    
            if(valor==3 && attributo!=3){
                //si hay un automovil y cambian el estatus a En circulación
                var labelns ='';
                if(attributo==1){
                    labelns = 'Para Servicio';
                }else if(attributo==2){
                    labelns = 'En Servicio';
                }else if(attributo==3){
                    labelns = 'En Circulación';
                }else if(attributo==4){
                    labelns = 'Servicio Retrasado';
                }
                _confirmarSiNo("Notificación de Servicio","El automóvil cuenta con el <b>kilometraje "+km+"</b><br/>Un <b>estatus de notificacion: "+labelns+"</b>;<br/>Al cambiar el estatus a <b>En circulación</b> se actualizará la frecuencia para el próximo servicio. ¿Estas de acuerdo?","Aceptar","Cancelar",pasarAlProximoServicio,setearNotificacionOriginal);
            }else{
                //actualizamos el status de la notificación en el automóvil
                almacenamiento.actualizarEstatusNotificacionServicio(automovil.id,valor);
            }
    
}
edicionAutomovil.cargarFormulario=function(){
    
    $("#modelo").val(automovilSeleccionado.modelo);
    $("#vin").val(automovilSeleccionado.numero_economico);
    $("#placas").val(automovilSeleccionado.placas);
    $("#gps_id").val(automovilSeleccionado.id_gps);
    $("#ruta").val(automovilSeleccionado.ruta);
    $("#region").val(automovilSeleccionado.region);
    $("#conductor").val(typeof automovilSeleccionado.conductor=='string'?automovilSeleccionado.conductor:'');
    $("#status").val(automovilSeleccionado.status);
    $("#kilometraje").val(automovilSeleccionado.kilometraje);
    $("#select_notificacion_servicio").val(automovilSeleccionado.notificacion_servicio);
    $("#select_notificacion_servicio").attr("notificacionActual",automovilSeleccionado.notificacion_servicio);
    
    
}//function



edicionAutomovil.cargarCaracteristicas=function(){
    var caracteristicas = almacenamiento.dameCaracteristicasAutomovil(automovil.id);
    console.log(caracteristicas);
    $.each(caracteristicas, function(i, item){
        //disponibles
        if(i=='disponible'){
             $.each(item, function(x, c){
                 var caracteristica ='';
                 caracteristica+='<li class="clear">'+
                                    '<div class="col-xs-2 sinPadding text-center">'+
                                        '<input type="checkbox" class="disponibles" id="'+c.caracteristica_id+'" value="'+c.caracteristica+'">'+
                                    '</div>'+
                                    '<div class="col-xs-10 sinPadding paddingLeft5px lineHeight27px">'+c.caracteristica+'</div>'+
                                 '</li>';
                $("#disponibles").append(caracteristica);                              
            });
        }else{
            //seleccionadas
            $.each(item, function(x, c){
                 var caracteristica ='';
                 caracteristica+='<li class="clear">'+
                                    '<div class="col-xs-2 sinPadding text-center">'+
                                        '<input type="checkbox" class="seleccionadas" id="'+c.caracteristica_id+'" value="'+c.caracteristica+'">'+
                                    '</div>'+
                                    '<div class="col-xs-10 sinPadding paddingLeft5px lineHeight27px">'+c.caracteristica+'</div>'+
                                 '</li>';
                $("#seleccionadas").append(caracteristica);                              
            });
        }

    });

}//function

edicionAutomovil.agregarCaracteristicas=function(){
    //obtenemos los registros seleccionados
    // si no hay registros mandamos mensaje al usuario 
    console.log("disponibles: "+$(".disponibles:checked").length);
    if($(".disponibles:checked").length<=0){
        _mensaje("Atención","Debe seleccionar por lo menos una característica disponible.","Entendido");
    }else{
         //si hay caracteristicas seleccionadas modificamos la caracteristica en localstorage con seleccionada =1 y disponible =0
        $(".disponibles:checked").each(function(i){
            console.log($(this).attr("id").valueOf());
            caracteristica_id = $(this).attr("id").valueOf();
            caracteristica = $(this).val();
            //mandamos a actualizar en localStorage y mandamos un parametro que indique como actualizara
            almacenamiento.actualizarCaracteristicaAutomovil(automovil.id,caracteristica_id,caracteristica,"agregar");
            //eliminamos el li y lo agregamos a la lista de seleccionadas
            $(this).parent().parent().remove();
            var li='';
            li+='<li class="clear">'+
                                    '<div class="col-xs-2 sinPadding text-center">'+
                                        '<input type="checkbox" class="seleccionadas" id="'+caracteristica_id+'" value="'+caracteristica+'">'+
                                    '</div>'+
                                    '<div class="col-xs-10 sinPadding paddingLeft5px lineHeight27px">'+caracteristica+'</div>'+
                                 '</li>';
            $("#seleccionadas").append(li); 
        });
        
    }
   
}


edicionAutomovil.quitarCaracteristicas=function(){
    //obtenemos los registros seleccionados
    // si no hay registros mandamos mensaje al usuario
     if($(".seleccionadas:checked").length<=0){
        _mensaje("Atención","Debe seleccionar por lo menos una característica seleccionada.","Entendido");
    }else{
        //si hay caracteristicas seleccionadas modificamos la caracteristica en localstorage con seleccionad =0 y disponible =1
        $(".seleccionadas:checked").each(function(i){
            //console.log($(this).attr("id").valueOf());
            caracteristica_id = $(this).attr("id").valueOf();
            caracteristica = $(this).val();
            //mandamos a actualizar en localStorage y mandamos un parametro que indique como actualizara
            almacenamiento.actualizarCaracteristicaAutomovil(automovil.id,caracteristica_id,caracteristica,"quitar");
            //eliminamos el li y lo agregamos a la lista de seleccionadas
            $(this).parent().parent().remove();
            var li='';
            li+='<li class="clear">'+
                                    '<div class="col-xs-2 sinPadding text-center">'+
                                        '<input type="checkbox" class="disponibles" id="'+caracteristica_id+'" value="'+caracteristica+'">'+
                                        '<input type="hidden" id="dis_'+caracteristica+'" value="'+caracteristica+'" />'+
                                    '</div>'+
                                    '<div class="col-xs-10 sinPadding paddingLeft5px lineHeight27px">'+caracteristica+'</div>'+
                                 '</li>';
            $("#disponibles").append(li); 
        });
    }
}

edicionAutomovil.actualizarAutomovil=function(){
    //guardamos el kilometraje y el status del automovil
    auto = almacenamiento.dameAutomovil(automovilSeleccionado.id);
    console.log(auto);
    if($("#kilometraje").val()==""){
        _mensaje("Atención","Debe ingresar el kilometraje para el automóvil.","Entendido");
        $("#kilometraje").val(auto.kilometraje);
        return null;
    }else if(parseFloat($("#kilometraje").val())<parseFloat(auto.kilometraje)){
         _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido");
        $("#kilometraje").val(auto.kilometraje);
        return null;
    }else{
        almacenamiento.guardarKilometrajeAutomovil(automovilSeleccionado.id,$("#status").val(),$("#kilometraje").val());
    }
    
}

