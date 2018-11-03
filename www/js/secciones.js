var servicios={};
var automovilSeleccionado='';
var usuario='';
    $(document).ready(function(){

        /*$(".format-date").datetimepicker({
            language: 'es',
            format: "yyyy-mm-dd",
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
            
        });*/
        
        var format_date = myApp.calendar({
                input: '.format-date',
                dateFormat: 'yyyy-mm-dd',
                closeOnSelect:true,
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
        $("#gridServicios").html('');
        $("#gridIncidentes").html('');
        
        //cargamos la informacion en pantalla de la base de datos
        servicios.cargarServicios();
        servicios.cargarIncidentes();
        //cambiamos el atributo onclick para agregar un registro nuevo
        $("#servicio_agregar").attr("onclick","irA('edicion-servicios','','','"+automovilSeleccionado.id+"','0','0')");
        $("#incidente_agregar").attr("onclick","irA('edicion-incidentes','','','"+automovilSeleccionado.id+"','0','0')");
        $("#detalle_agregar").attr("onclick","irA('edicion-detalle','','','"+automovilSeleccionado.id+"','0','0')");
        
        //alert("uno");
        $(".tab-link").removeClass("active");
        $(".tab").removeClass("active");
        var temp=localStorage.getItem("pestanaActiva");
        temp=temp==null?"1":temp;
        $("#link"+temp).addClass("active");
        $("#tab"+temp).addClass("active");
        //alert("dos");
            
        var usua=almacenamiento.dameUsuario();
        $("input:checkbox").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
    });

servicios.cargarServicios=function(){
    //obtenemos las mediciones de la base de datos y las almacenamos localmente
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-servicios-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: automovilSeleccionado.id
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo servicios del automovil: "+automovilSeleccionado.id);
            console.log(re);
            
                 if(re!=undefined && re!=null && re!=''){
                        //limpiamos el grid y cargamos los registros
                        $("#gridServicios").html('');
                        var ciclo = re.length;
                        var contador =0; 
                        $.each(re, function(i, item){
                            sincronizableFactura = 0;
                            sincronizableServicio = 1;
                            
                            console.log("descargando servicios");
                            console.log(item.factura);
                            
                            if(typeof item.factura == 'object' || item.factura == undefined){
                                console.log("objeto vacio");
                                item.factura = "";
                                sincronizableFactura = 1;
                            }
                            if(item.factura=='' || item.monto =='' || item.factura==undefined){
                                sincronizableFactura = 1;
                            } 
                            
                             if(item.fecha_entrega=='' || item.fecha_entrega==undefined){
                                sincronizableServicio = 1;
                            }else{
                                sincronizableServicio = 0;
                            }
                            
                            almacenamiento.guardarServicio(item.idAutomovil,item.id,item.servicio_id,item.servicio,item.taller_id,item.taller,item.factura,item.monto,item.kilometraje,item.status,item.fecha,item.fecha_prometida,item.fecha_entrega,item.tipo_servicio_id,item.tipo_servicio,item.status_servicio,item.sistema_id,item.sistema,sincronizableServicio,sincronizableFactura,1);
                            if(contador==ciclo-1){
                                servicios.insertarServicio();
                            }
                            contador++;
                        });
                        
                 }else{
                     //se insertan los registros localmente
                     $("#gridServicios").html('');
                     servicios.insertarServicio();
                    //console.log(re);
                    //_mensaje("Atención","No se encontrarón servicios para el Automóvil seleccionado","Entendido");
                 }
		},
		error: function(re){
            //offline
            $("#gridServicios").html('');
            servicios.insertarServicio();
           // console.log(re);
            //_mensaje("Atención","No hay internet, no se pudo obtener los servicios del automovil.","Entendido");
		}
	});
}//function

servicios.insertarServicio=function(){
    
    var registros = almacenamiento.dameServiciosAutomovil(automovilSeleccionado.id);
    registros = burbuja(registros);
    $.each(registros, function(i, item){
        console.log("inserto servicio");
        console.log(item);
        fecha = item.fecha.split("T");
        var serv='';
        var clase ='';
        var letra = '';
        if(item.status_servicio=='rojo'){
            clase = 'bsred';
            letra = 'R';
        }else if(item.status_servicio=='verde'){
            clase = 'bsgreen';
            letra = 'E';
        }else if(item.status_servicio=='amarillo'){
            clase = 'bsyellow';
            letra = 'P';
        }
        //col-xs-12
        serv+='<tr style="width:100%;" class="sinPadding" onclick="'+(item.id>=0?"irA('edicion-servicios','','"+item.id+"','"+item.idAutomovil+"',"+item.servicio_id+","+item.sistema_id+")":"irA('edicion-servicios','','"+item.id+"','"+item.idAutomovil+"',"+item.servicio_id+","+item.sistema_id+")")+'">'+
                    '<td class="" style="width:100%;">'+
                        '<div class="col-xs-2 '+clase+' text-center blanco text-30 lineHeight90px sinPadding">'+letra+'</div>'+
                        '<div class="col-xs-9">'+
                            '<div class="col-xs-12 bold text-16 text-center">'+(item.servicio!=null?item.servicio:item.sistema)+'</div>'+
                            '<div class="col-xs-12 bold text-14">'+item.taller+'</div>'+
                            '<div class="col-xs-12 text-center italic text-13">'+item.kilometraje+' km</div>'+
                            '<div class="col-xs-12 text-center italic text-13">'+fecha[0]+'</div>'+
                        '</div>'+
                    '</td>'+
                '</tr>';
                $("#gridServicios").append(serv);
    });
    
    
                   
}



servicios.cargarIncidentes=function(){
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-incidentes-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: automovilSeleccionado.id
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo incidentes del automovil: "+automovilSeleccionado.id);
            console.log(re);
            
                 if(re!=undefined && re!=null && re!=''){
                        //limpiamos el grid y cargamos los registros
                        
                        $("#gridIncidentes").html('');
                        var ciclo = re.length;
                        var contador =0; 
                        $.each(re, function(i, item){
                            sincronizableFactura = 0;
                            sincronizableIncidente = 1;
                            
                            console.log(item.factura);
                            if(typeof item.factura == 'object' || item.factura==undefined){
                                console.log("objeto vacio");
                                item.factura = "";
                                sincronizableFactura = 1;
                            }
                            if(item.factura=='' || item.monto =='' || item.factura==undefined){
                                sincronizableFactura = 1;
                            }
                            if(typeof item.numero_siniestro == 'object' || item.numero_siniestro==undefined){
                                console.log("objeto vacio");
                                item.numero_siniestro = "";
                            }
                            
                            if(item.fecha_entrega=='' || item.fecha_entrega==undefined){
                                sincronizableIncidente = 1;
                            }else{
                                sincronizableIncidente = 0;
                            }
                            almacenamiento.guardarIncidente(item.idAutomovil,item.id,item.incidente_id,item.incidente,item.taller_id,item.taller,item.factura,item.monto,item.kilometraje,item.status,item.fecha,item.fecha_prometida,item.fecha_entrega,item.status_incidente,sincronizableIncidente,sincronizableFactura,item.numero_siniestro);
                            if(contador==ciclo-1){
                                servicios.insertarIncidente();
                            }
                            contador++;
                        });
                        
                 }else{
                     //se insertan los registros localmente
                     $("#gridIncidentes").html('');
                     servicios.insertarIncidente();
                    //console.log(re);
                    //_mensaje("Atención","No se encontrarón servicios para el Automóvil seleccionado","Entendido");
                 }
		},
		error: function(re){
            //offline
            $("#gridIncidentes").html('');
            servicios.insertarIncidente();
           // console.log(re);
            //_mensaje("Atención","No hay internet, no se pudo obtener los servicios del automovil.","Entendido");
		}
	});
}//function

servicios.insertarIncidente=function(){
    
    var registros = almacenamiento.dameIncidentesAutomovil(automovilSeleccionado.id);
    registros = burbuja(registros);
    console.log("incidentes locales");
    console.log(registros);
    $.each(registros, function(i, item){
        console.log("incidente: "+i);
        console.log(item);
        fecha = item.fecha.split("T");
        var insc='';
        var clase ='';
        var letra = '';
        if(item.status_incidente=='rojo'){
            clase = 'bsred';
            letra = 'R';
        }else if(item.status_incidente=='verde'){
            clase = 'bsgreen';
            letra = 'E';
        }else if(item.status_incidente=='amarillo'){
            clase = 'bsyellow';
            letra = 'P';
        }
        insc+='<tr class="col-xs-12 sinPadding" onclick="'+(item.id>=0?"irA('edicion-incidentes','','"+item.id+"','"+item.idAutomovil+"','"+item.incidente_id+"')":"irA('edicion-incidentes','','"+item.id+"','"+item.idAutomovil+"','"+item.incidente_id+"')")+'">'+
                    '<td class="col-xs-12">'+
                        '<div class="col-xs-2 '+clase+' text-center blanco text-30 lineHeight90px sinPadding">'+letra+'</div>'+
                        '<div class="col-xs-9">'+
                            '<div class="col-xs-12 bold text-16 text-center">'+item.incidente+'</div>'+
                            '<div class="col-xs-12 bold text-14">'+item.taller+'</div>'+
                            '<div class="col-xs-12 text-center italic text-13">'+item.kilometraje+' km</div>'+
                            '<div class="col-xs-12 text-center italic text-13">'+fecha[0]+'</div>'+
                        '</div>'+
                    '</td>'+
                '</tr>';
                $("#gridIncidentes").append(insc);
    });
    
    
                   
}