var detalles={};
var automovilSeleccionado='';
var usuario='';
var tipoServicioSeleccionado = 1;
var editar = false;
var sincronizableDetalle = false;
var campoFechaDetalle;
var campoFechaReparacion;

    $(document).ready(function(){
        
        var usua=almacenamiento.dameUsuario();
        $(".btnDesa").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        if(usua["tipo"]=='2'||usua["tipo"]=='3')
            for(var i=0; i<=$(".txtDesa").length-1; i++){
                $(".txtDesa")[i].disabled=true;
            }//for
        
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        
        console.log(usuario);
        detalleSeleccionado = almacenamiento.dameDetalleSeleccionado();
        console.log("detalle seleccionado");
        console.log(detalleSeleccionado);
        
        //obtenemos los datos del automovil seleccionado de localstorage
        automovil = almacenamiento.dameAutomovilSeleccionado();
        automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
        
        detalles.cargaLocal();
        
        $("#fue_reparado").bind("change",function(){// si cambia el input de fecha
           if($(this).val()==1){
                $("#fecha_reparacion").removeAttr("disabled");
                $("#fecha_reparacion").val("");
                campoFechaReparacion.destroy();
                campoFechaReparacion = myApp.calendar({
                        input: '.campoFechaReparacion',
                        dateFormat: 'yyyy-mm-dd',
                        closeOnSelect:true,
                        minDate:$("#fecha_detalle").val(),
                        maxDate:fechaMananaBien(),
                        monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                        monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                        dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
                });
            }else if($(this).val()==0) {
                $("#fecha_reparacion").attr("disabled","disabled");
                $("#fecha_reparacion").val("");
            }
        });
        
        $("#fecha_detalle").bind("change",function(){// si cambia el input de fecha
            $(".campoFechaReparacion").val('');
            campoFechaReparacion.destroy();
             
             campoFechaReparacion = myApp.calendar({
                input: '.campoFechaReparacion',
                dateFormat: 'yyyy-mm-dd',
                minDate:$("#fecha_detalle").val(),
                maxDate:fechaMananaBien(),
                closeOnSelect:true,
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
            
        });
        
        
        if(detalleSeleccionado.id!=''){
                editar=true;
                campoFechaDetalle = myApp.calendar({
                    input: '.campoFechaDetalle',
                    dateFormat: 'yyyy-mm-dd',
                    closeOnSelect:true,
                    maxDate:fechaMananaBien(),
                    monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                    monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                    dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
                });
                 campoFechaReparacion = myApp.calendar({
                        input: '.campoFechaReparacion',
                        dateFormat: 'yyyy-mm-dd',
                        closeOnSelect:true,
                        minDate:$("#fecha_detalle").val(),
                        maxDate:fechaMananaBien(),
                        monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                        monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                        dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
                });
            
            
                detalleLocal = almacenamiento.dameDetalleSeleccionadoCompleto(detalleSeleccionado.id,detalleSeleccionado.idAutomovil);
                $("#id").val(detalleSeleccionado.id);
                $("#sincronizableDetalle").val(detalleLocal.sincronizableDetalle);

                if(detalleLocal.sincronizableDetalle==0){
                    campoFechaDetalle.destroy();
                    $("#componente_id").attr("disabled","disabled");
                    $("#detalle_id").attr("disabled","disabled");
                    $("#fecha_detalle").attr("disabled","disabled");
                    $("#observacion").attr("disabled","disabled");
                }
           
                $("#componente_id").val(detalleLocal.componente_id);
                $("#detalle_id").val(detalleLocal.detalle_id);
                fecha_detalle = detalleLocal.fecha_detalle.split("T");
                $("#fecha_detalle").val(fecha_detalle[0]);
                $("#observacion").val(detalleLocal.observacion);
                if(detalleLocal.fue_reparado==1){
                    $("#fue_reparado").val(1);
                    $("#fecha_reparacion").removeAttr("disabled");
                    campoFechaReparacion.destroy();
                    campoFechaReparacion = myApp.calendar({
                        input: '.campoFechaReparacion',
                        dateFormat: 'yyyy-mm-dd',
                        minDate:$("#fecha_detalle").val(),
                        maxDate:fechaMananaBien(),
                        closeOnSelect:true,
                        monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                        monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                        dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
                    });
                    //$("#fue_reparado").change();
                }
                fecha_reparacion = detalleLocal.fecha_reparacion.split("T");
                $("#fecha_reparacion").val(fecha_reparacion[0]);

        }else{
            editar=false;
            $("#id").val('');
            $("#sincronizableDetalle").val('1');
            campoFechaDetalle = myApp.calendar({
                input: '.campoFechaDetalle',
                dateFormat: 'yyyy-mm-dd',
                closeOnSelect:true,
                maxDate:fechaMananaBien(),
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
             campoFechaReparacion = myApp.calendar({
                    input: '.campoFechaReparacion',
                    dateFormat: 'yyyy-mm-dd',
                    maxDate:$("#fecha_detalle").val(),//fechaMenosUnDia($("#fecha_detalle").val()),
                    closeOnSelect:true,
                    monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                    monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                    dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
        }
        
        localStorage.setItem('pestanaActiva','6');
    });

detalles.cargaLocal=function(){
        var componentes = almacenamiento.dameComponentesDisponibles();
        var detalles = almacenamiento.dameDetallesDisponibles();
        var opciones_componentes ='';
        var opciones_detalles ='';
        
        opciones_componentes+='<option value="">- Componente -</option>';
        $.each(componentes, function(i, item){
            opciones_componentes+='<option value="'+item.id+'">'+item.nombre+'</option>';
                    
        });
        
        opciones_detalles+='<option value="">- Detalle -</option>';
        $.each(detalles, function(i2, item2){
            opciones_detalles+='<option value="'+item2.id+'">'+item2.nombre+'</option>';
                    
        });
        
        
        $("#componente_id").empty().append(opciones_componentes);
        $("#detalle_id").empty().append(opciones_detalles);
}

detalles.guardarDetalle=function(){
    if($("#fecha_detalle").val()==''){
        _mensaje("Atención","Debe seleccionar la fecha del detalle","Entendido");
    }else if($("#componente_id").val()==''){
        _mensaje("Atención","Debe seleccionar un componente","Entendido");
    }else if($("#detalle_id").val()==''){
        _mensaje("Atención","Debe seleccionar un detalle","Entendido");
    }else if($.trim($("#observacion").val())==''){
        _mensaje("Atención","Debe Ingresar una observación para más detalle","Entendido");
    }else if($("#fue_reparado").val()=='1'&& $("#fecha_reparacion").val()==''){
        _mensaje("Atención","Debe ingresar la fecha de reparación","Entendido");
    }else{
        
        fecha_detalle = $("#fecha_detalle").val()!=''?$("#fecha_detalle").val():'';
        fecha_reparacion = $("#fecha_reparacion").val()!=''?$("#fecha_reparacion").val():'';

        var status='';
        if($("#fue_reparado").val()!=''){
            status = 'Reparado';
            console.log(status);
        }else{
            status = 'Sin Reparar';
            console.log(status);
        }
        
        id = $("#id").val()!='' && $("#id").val()!=undefined && $("#id").val()!=null?$("#id").val():"-"+almacenamiento.pedirIdNuevo();
        console.log("Actualizar registr: "+editar);
        console.log("seleccionado es: ");
        console.log($("#componente_id option:selected").text());
        if(editar==true){
            console.log("edita");
            almacenamiento.actualizarDetalle(automovilSeleccionado.id,id,$("#componente_id").val(),$("#componente_id option:selected").text(),$("#detalle_id").val(),$("#detalle_id option:selected").text(),fecha_detalle,$("#observacion").val(),$("#fue_reparado").val(),fecha_reparacion,$("#sincronizableDetalle").val());
        }else{
            console.log("guarda");
            almacenamiento.guardarDetalle(automovilSeleccionado.id,id,$("#componente_id").val(),$("#componente_id option:selected").text(),$("#detalle_id").val(),$("#detalle_id option:selected").text(),fecha_detalle,$("#observacion").val(),$("#fue_reparado").val(),fecha_reparacion,$("#sincronizableDetalle").val());
        }
        
        irA('secciones','','','','','#detalles');

        
    }
}