var medicionLlantas={};
var automovilSeleccionado='';
var usuario='';
var configuracion='';
var fechaCambio='';
    $(document).ready(function(){
         fechaCambio = myApp.calendar({
            input: '.fechaCambio',
            dateFormat: 'yyyy-mm-dd',
            closeOnSelect:true,
            maxDate:fechaMananaBien(),
            monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
            dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
        });
        
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        
        console.log(usuario);
        //obtenemos los datos del automovil seleccionado de localstorage
        automovil = almacenamiento.dameAutomovilSeleccionado();
        automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
        
        //limpiamos las mediciones y cargamos de nuevo
        $("#gridMediciones").html('');
        //obtenemos la configuracion
        configuracion = almacenamiento.dameConfiguracion();
        //cargamos la informacion en pantalla de la base de datos
        medicionLlantas.cargarMediciones();
        
         //cargamos los cambios de llantas para este automovil
        medicionLlantas.cargarCambios();
        
        var usua=almacenamiento.dameUsuario();
        $(".btnDesa").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        if(usua["tipo"]=='2'||usua["tipo"]=='3')
            for(var i=0; i<=$(".txtDesa").length-1; i++){
                $(".txtDesa")[i].disabled=true;
            }//for
    });



medicionLlantas.cargarMediciones=function(){
    //obtenemos las mediciones de la base de datos y las almacenamos localmente
    
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-medicion-llantas-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: automovilSeleccionado.id,
            verde_llantas: configuracion.verde_llantas,
            amarillo_llantas:configuracion.amarillo_llantas
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo mediciones del automovil: "+automovilSeleccionado.id);
            console.log(re);
            
                 if(re!=undefined && re!=null && re!=''){
                        //limpiamos el grid y cargamos los registros
                        $("#gridMediciones").html('');
                        var ciclo = re.length;
                        var contador =0;
                        $.each(re, function(i, item){
                            
                            almacenamiento.guardarMedicionLlanta(item.idAutomovil,item.id,item.fecha,item.delantera_izquierda,item.delantera_derecha,item.trasera_izquierda,item.trasera_derecha,item.status_delantera_izquierda,item.status_delantera_derecha,item.status_trasera_izquierda,item.status_trasera_derecha,0);
                            if(contador==ciclo-1){
                                medicionLlantas.insertarMedicion();
                            }
                            contador++;
                        });
                        
                 }else{
                     $("#gridMediciones").html('');
                     medicionLlantas.insertarMedicion();
                    //console.log(re);
                    //_mensaje("Atención","No se encontrarón mediciones de llantas para el Automóvil seleccionado","Entendido");
                 }
		},
		error: function(re){
            $("#gridMediciones").html('');
            medicionLlantas.insertarMedicion();
            /*console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener las mediciones de las llantas del automovil.","Entendido");*/
		}
	});
}//function
medicionLlantas.insertarMedicion=function(){
    //medicionLlantas.insertarMedicion(item.idAutomovil,item.id,item.fecha,item.delantera_izquierda,item.delantera_derecha,item.trasera_izquierda,item.trasera_derecha,item.status_delantera_izquierda,item.status_delantera_derecha,item.status_trasera_izquierda,item.status_trasera_derecha);
    var registros = almacenamiento.dameMedicionesRegistradasAutomovil(automovilSeleccionado.id);
    registros = burbuja(registros);// necesario campo 'fecha' para poder orenar
    $.each(registros, function(i, item){
                    fecha = item.fecha.split("T");
                    var medicion='';
                    onclic = 'medicionLlantas.cargarMedicion(\''+item.id+'\')';
                    
                    
                    medicion+='<tr onclick="'+onclic+'">'+
                                    '<td class="text-9 padding5px">'+fecha[0]+'</td>'+
                                    '<td class="text-11 padding5px">'+
                                        '<div class="col-xs-4 sinPadding">'+
                                            '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+item.status_delantera_izquierda+'.png">'+
                                        '</div>'+
                                        '<div class="col-xs-8 sinPadding negro">'+item.delantera_izquierda+'</div>'+
                                    '</td>'+
                                    '<td class="text-11 padding5px">'+
                                        '<div class="col-xs-4 sinPadding">'+
                                            '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+item.status_delantera_derecha+'.png">'+
                                        '</div>'+
                                        '<div class="col-xs-8 sinPadding negro">'+item.delantera_derecha+'</div>'+
                                    '</td>'+
                                    '<td class="text-11 padding5px">'+
                                        '<div class="col-xs-4 sinPadding">'+
                                            '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+item.status_trasera_izquierda+'.png">'+
                                        '</div>'+
                                        '<div class="col-xs-8 sinPadding negro">'+item.trasera_izquierda+'</div>'+
                                    '</td>'+
                                    '<td class="text-11 padding5px">'+
                                        '<div class="col-xs-4 sinPadding">'+
                                            '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+item.status_trasera_derecha+'.png">'+
                                        '</div>'+
                                        '<div class="col-xs-8 sinPadding negro">'+item.trasera_derecha+'</div>'+
                                    '</td>'+
                              '</tr>';
                    $("#gridMediciones").append(medicion);
    });
    
    
                   
}
medicionLlantas.cargarMedicion=function(idMedicion){
    
    var registro = almacenamiento.dameMedicionAutomovil(automovilSeleccionado.id,idMedicion);
    console.log(registro);
    if(registro!=undefined && registro!=''){
        if(registro.sincronizable==0){
            _mensaje("Atención","El registro ya fue sincronizado, no es posible su edición.","Entendido");
            $("#del_izq").val('');
            $("#del_der").val('');
            $("#tras_izq").val('');
            $("#tras_der").val('');
        }else{
            $("#del_izq").val(registro.delantera_izquierda);
            $("#del_der").val(registro.delantera_derecha);
            $("#tras_izq").val(registro.trasera_izquierda);
            $("#tras_der").val(registro.trasera_derecha);
            $(".btn_registrar").attr("onclick",'medicionLlantas.registrarMedicion(\''+idMedicion+'\')');
        }
    }else{
         _mensaje("Atención","No se pudo obtener la medición. Inténtelo de nuevo más tarde.","Entendido");
        $("#del_izq").val('');
        $("#del_der").val('');
        $("#tras_izq").val('');
        $("#tras_der").val('');
    }
}


medicionLlantas.registrarMedicion=function(idMedicion){
   var edicion = false;
    if(idMedicion!=undefined && idMedicion!='' && idMedicion>0){//registro sincronizado el registro
        idMedicion = idMedicion;
        sincronizable = 0;
    }else if(idMedicion<0){// edicion registro local
        sincronizable = 1;
        idMedicion = idMedicion;
        edicion = true;
    }else{//registro local nuevo
        sincronizable = 1;
        idMedicion = "-"+almacenamiento.pedirIdNuevo();
    }
    
    
    if($("#del_izq").val()<0 ||$("#del_der").val()<0 ||$("#tras_izq").val()<0||$("#tras_der").val()<0 ){
        _mensaje("Atención","Los valores ingresados deben ser mayor o igual a cero","Entendido");
    }else if($("#del_izq").val()=='' ||$("#del_der").val()==''||$("#tras_izq").val()==''||$("#tras_der").val()=='' ){
        _mensaje("Atención","Es necesario que ingrese la profundidad en mm de todas las llantas","Entendido");
    }else if(parseFloat($("#del_izq").val())>9){
         _mensaje("Atención","El valor de la llanta Delantera Izquierda es incorrecto.<br>La profundidad debe ser menor o igual a 9mm","Entendido");
    }
    else if(parseFloat($("#del_der").val())>9){
        _mensaje("Atención","El valor de la llanta Delantera Derecha es incorrecto.<br>La profundidad debe ser menor o igual a 9mm","Entendido");
    }
    else if(parseFloat($("#tras_izq").val())>9){
        _mensaje("Atención","El valor de la llanta Trasera Izquierda es incorrecto.<br>La profundidad debe ser menor o igual a 9mm","Entendido");
    }
    else if(parseFloat($("#tras_der").val())>9){
        _mensaje("Atención","El valor de la llanta Trasera Derecha es incorrecto.<br>La profundidad debe ser menor o igual a 9mm","Entendido");
    }else{
        
        var status_delantera_izquierda='',status_delantera_derecha='',status_trasera_izquierda='',status_trasera_derecha='';
        
        if($("#del_izq").val()>=configuracion.verde_llantas){
            status_delantera_izquierda='llanta_verde';
        }else if($("#del_izq").val()<configuracion.verde_llantas && $("#del_izq").val()>=configuracion.amarillo_llantas){
            status_delantera_izquierda='llanta_amarillo';
        }else if($("#del_izq").val()<configuracion.amarillo_llantas){
            status_delantera_izquierda='llanta_roja';
        }
        
        if($("#del_der").val()>=configuracion.verde_llantas){
            status_delantera_derecha='llanta_verde';
        }else if($("#del_der").val()<configuracion.verde_llantas && $("#del_der").val()>=configuracion.amarillo_llantas){
            status_delantera_derecha='llanta_amarillo';
        }else if($("#del_der").val()<configuracion.amarillo_llantas){
            status_delantera_derecha='llanta_roja';
        }
        
        if($("#tras_izq").val()>=configuracion.verde_llantas){
            status_trasera_izquierda='llanta_verde';
        }else if($("#tras_izq").val()<configuracion.verde_llantas && $("#tras_izq").val()>=configuracion.amarillo_llantas){
            status_trasera_izquierda='llanta_amarillo';
        }else if($("#tras_izq").val()<configuracion.amarillo_llantas){
            status_trasera_izquierda='llanta_roja';
        }
        
        if($("#tras_der").val()>=configuracion.verde_llantas){
            status_trasera_derecha='llanta_verde';
        }else if($("#tras_der").val()<configuracion.verde_llantas && $("#tras_der").val()>=configuracion.amarillo_llantas){
            status_trasera_derecha='llanta_amarillo';
        }else if($("#tras_der").val()<configuracion.amarillo_llantas){
            status_trasera_derecha='llanta_roja';
        }
         
        fecha = hoySQL().split("T");
        var medicionesLlantas = JSON.parse(localStorage.getItem("medicionesRegistradas")) || [];
        var existe = true;
        //comprobamos que la medicion no tenga la misma fecha que la de hoy
        $.each(medicionesLlantas, function(i, item) {
                if(automovilSeleccionado.id == item.idAutomovil){
                    f = item.fecha.split("T");
                    if(f[0]==fecha[0]){
                        existe = false;
                    }
                }
        });
        if(existe==false && edicion==false){
            _mensaje("Atención","Solo puede registrar una medición por día","Entendido");
        }else{
            $(".btn_registrar").attr("onclick",'onclick="medicionLlantas.registrarMedicion()"');
            almacenamiento.guardarMedicionLlanta(automovilSeleccionado.id,idMedicion,fecha[0],$("#del_izq").val(),$("#del_der").val(),$("#tras_izq").val(),$("#tras_der").val(),status_delantera_izquierda,status_delantera_derecha,status_trasera_izquierda,status_trasera_derecha,sincronizable);
            //medicionLlantas.insertarMedicion(automovilSeleccionado.id,0,fecha[0],$("#del_izq").val(),$("#del_der").val(),$("#tras_izq").val(),$("#tras_izq").val(),$("#tras_der").val(),status_delantera_izquierda,status_delantera_derecha,status_trasera_izquierda,status_trasera_derecha);
            
            //borramos el grid y lo recargamoms de nuevo
            $("#gridMediciones").html('');
            medicionLlantas.insertarMedicion();
            /*
            
            var medicion='';
                        medicion+='<tr>'+
                                        '<td class="text-9 padding5px">'+fecha[0]+'</td>'+
                                        '<td class="text-11 padding5px">'+
                                            '<div class="col-xs-4 sinPadding">'+
                                                '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+status_delantera_izquierda+'.png">'+
                                            '</div>'+
                                            '<div class="col-xs-8 sinPadding negro">'+$("#del_izq").val()+'</div>'+
                                        '</td>'+
                                        '<td class="text-11 padding5px">'+
                                            '<div class="col-xs-4 sinPadding">'+
                                                '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+status_delantera_derecha+'.png">'+
                                            '</div>'+
                                            '<div class="col-xs-8 sinPadding negro">'+$("#del_der").val()+'</div>'+
                                        '</td>'+
                                        '<td class="text-11 padding5px">'+
                                            '<div class="col-xs-4 sinPadding">'+
                                                '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+status_trasera_izquierda+'.png">'+
                                            '</div>'+
                                            '<div class="col-xs-8 sinPadding negro">'+$("#tras_izq").val()+'</div>'+
                                        '</td>'+
                                        '<td class="text-11 padding5px">'+
                                            '<div class="col-xs-4 sinPadding">'+
                                                '<img class="col-xs-12 w100 hauto sinPadding" src="imagenes/'+status_trasera_derecha+'.png">'+
                                            '</div>'+
                                            '<div class="col-xs-8 sinPadding negro">'+$("#tras_der").val()+'</div>'+
                                        '</td>'+
                                  '</tr>';
            $("#gridMediciones").prepend(medicion);*/
        }
        $("#del_izq").val('');
        $("#del_der").val('');
        $("#tras_izq").val('');
        $("#tras_der").val('');
    }
   
}


medicionLlantas.cargarCambios=function(){
    //obtenemos los cambios de la base de datos y las almacenamos localmente
    
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-cambios-de-llantas-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: automovilSeleccionado.id,
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo cambios de llanta del automovil: "+automovilSeleccionado.id);
            console.log(re);
            
                 if(re!=undefined && re!=null && re!=''){
                        //limpiamos el grid y cargamos los registros
                        $("#gridCambios").html('');
                        var ciclo = re.length;
                        var contador =0;
                        $.each(re, function(i, item){
                            
                            almacenamiento.guardarCambioLlanta(item.idAutomovil,item.idCambio,item.fecha_cambio,item.numero_llantas,0);
                            if(contador==ciclo-1){
                                medicionLlantas.insertarCambio();
                            }
                            contador++;
                        });
                        
                 }else{
                     $("#gridCambios").html('');
                     medicionLlantas.insertarCambio();
                    //console.log(re);
                    //_mensaje("Atención","No se encontrarón mediciones de llantas para el Automóvil seleccionado","Entendido");
                 }
		},
		error: function(re){
            $("#gridCambios").html('');
            medicionLlantas.insertarCambio();
            /*console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener las mediciones de las llantas del automovil.","Entendido");*/
		}
	});
}//function

medicionLlantas.insertarCambio=function(){
    //medicionLlantas.insertarMedicion(item.idAutomovil,item.id,item.fecha,item.delantera_izquierda,item.delantera_derecha,item.trasera_izquierda,item.trasera_derecha,item.status_delantera_izquierda,item.status_delantera_derecha,item.status_trasera_izquierda,item.status_trasera_derecha);
    var registros = almacenamiento.dameCambiosRegistradosAutomovil(automovilSeleccionado.id);
    registros = burbujaCambiosDeLLantas(registros);// necesario campo 'fecha' para poder orenar
    $.each(registros, function(i, item){
                    fecha = item.fecha_cambio.split("T");
                    var cambios='';
                    onclic = 'medicionLlantas.cargarCambio(\''+item.idCambio+'\')';
                    
                    
                    cambios+='<tr onclick="'+onclic+'">'+
                                    '<td class="text-12 padding5px">'+fecha[0]+'</td>'+
                                    '<td class="text-12 padding5px">'+item.numero_llantas+'</td>'+
                              '</tr>';
                    $("#gridCambios").append(cambios);
    });
    
    
                   
}
medicionLlantas.cargarCambio=function(idCambio){
    
    var registro = almacenamiento.dameCambioAutomovil(automovilSeleccionado.id,idCambio);
    console.log(registro);
    if(registro!=undefined && registro!=''){
        if(registro.sincronizable==0){
            _mensaje("Atención","El registro ya fue sincronizado, no es posible su edición.","Entendido");
            $("#fecha_cambio").val('');
            $("#llantas_cambiadas").val('');
        }else{
             f = registro.fecha_cambio.split("T");
            $("#fecha_cambio").val(f[0]);
            $("#llantas_cambiadas").val(registro.numero_llantas);
            $(".btn_registrar_cambio").attr("onclick",'medicionLlantas.registrarCambio(\''+idCambio+'\')');
        }
    }else{
         _mensaje("Atención","No se pudo obtener el registro. Inténtelo de nuevo más tarde.","Entendido");
        $("#fecha_cambio").val('');
        $("#llantas_cambiadas").val('');
    }
}


medicionLlantas.registrarCambio=function(idCambio){
   var edicion = false;
    if(idCambio!=undefined && idCambio!='' && idCambio>0){//registro sincronizado el registro
        idCambio = idCambio;
        sincronizable = 0;
    }else if(idCambio<0){// edicion registro local
        sincronizable = 1;
        idCambio = idCambio;
        edicion = true;
    }else{//registro local nuevo
        sincronizable = 1;
        idCambio = "-"+almacenamiento.pedirIdNuevo();
    }
    
    
    if($("#fecha_cambio").val()==''){
        _mensaje("Atención","La fecha de cambio no puede ir vacía.","Entendido");
    }else if($("#llantas_cambiadas").val()<=0||$("#llantas_cambiadas").val()==''){
        _mensaje("Atención","Es necesario que ingrese la cantidad de llantas a cambiar.","Entendido");
    }else{
        
        fecha = hoySQL().split("T");
        var cambioLlantas = JSON.parse(localStorage.getItem("cambioDeLlantasRegistradas")) || [];
        var existe = true;
        //comprobamos que la carga de llantas no tenga la misma fecha que la de hoy
        $.each(cambioLlantas, function(i, item) {
                if(automovilSeleccionado.id == item.idAutomovil){
                    f = item.fecha_cambio.split("T");
                    if(f[0]==fecha[0]){
                        existe = false;
                    }
                }
        });
        if(existe==false && edicion==false){
            _mensaje("Atención","Solo puede registrar un cambio de llantas por día","Entendido");
        }else{
            $(".btn_registrar_cambio").attr("onclick",'medicionLlantas.registrarCambio()');
            almacenamiento.guardarCambioLlanta(automovilSeleccionado.id,idCambio,$("#fecha_cambio").val(),$("#llantas_cambiadas").val(),sincronizable);
            //medicionLlantas.insertarMedicion(automovilSeleccionado.id,0,fecha[0],$("#del_izq").val(),$("#del_der").val(),$("#tras_izq").val(),$("#tras_izq").val(),$("#tras_der").val(),status_delantera_izquierda,status_delantera_derecha,status_trasera_izquierda,status_trasera_derecha);
            
            //borramos el grid y lo recargamoms de nuevo
            $("#gridCambios").html('');
            medicionLlantas.insertarCambio();
            
        }
        $("#fecha_cambio").val('');
        $("#llantas_cambiadas").val('');
    }
   
}


