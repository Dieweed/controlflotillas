var incidentes={};
var automovilSeleccionado='';
var usuario='';
var sincronizarFactura = false;
var editar = false;
var campoFecha;
var campoFechaPrometida;
var campoFechaEntrega;
    $(document).ready(function(){
        
         campoFecha = myApp.calendar({
            input: '.campoFecha',
            dateFormat: 'yyyy-mm-dd',
            closeOnSelect:true,
            maxDate:fechaMananaBien(),
            monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
            dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
        });

        $("#fecha").bind("change",function(){// si cambia el input de fecha
             if(incidenteSeleccionado.id==''){
                campoFechaPrometida.destroy();
                campoFechaEntrega.destroy();
             }
            
             campoFechaPrometida = myApp.calendar({
                input: '.campoFechaPrometida',
                dateFormat: 'yyyy-mm-dd',
                minDate:$("#fecha").val(),
                closeOnSelect:true,
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
             campoFechaEntrega = myApp.calendar({
                input: '.campoFechaEntrega',
                dateFormat: 'yyyy-mm-dd',
                minDate:$("#fecha").val(),
                 maxDate:fechaMananaBien(),
                closeOnSelect:true,
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
            
            $(".campoFechaPrometida").val('');
            $(".campoFechaEntrega").val('');
            
        });
        
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        
        console.log(usuario);
        //obtenemos los datos del automovil seleccionado de localstorage
        automovil = almacenamiento.dameAutomovilSeleccionado();
        automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
        
        //obtenemos el servicio seleccionado; si es un servicio nuevo el campo id viene vacio
        incidenteSeleccionado = almacenamiento.dameIncidenteSeleccionado();
        
        //cargamos la informacion en pantalla de la base de datos
        incidentes.cargarIncidentes();
        
        //si es nuevo
        if(incidenteSeleccionado.id==''){
            //es una alta de servicio
             campoFechaPrometida = myApp.calendar({
                input: '.campoFechaPrometida',
                dateFormat: 'yyyy-mm-dd',
                minDate:$("#fecha").val(),
                closeOnSelect:true,
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
             campoFechaEntrega = myApp.calendar({
                input: '.campoFechaEntrega',
                dateFormat: 'yyyy-mm-dd',
                minDate:$("#fecha").val(),
                closeOnSelect:true,
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
            editar=false;
            $("#id").val('');
        }else{
            editar=true;
            //edicion de un servicio
            campoFecha.destroy();
            incidenteLocal = almacenamiento.dameIncidenteSeleccionadoCompleto(incidenteSeleccionado.id,incidenteSeleccionado.idAutomovil,incidenteSeleccionado.incidente_id);
            if(incidenteLocal.sincronizable==0 && incidenteLocal.sincronizableFactura==1){
                //$(".campoFechaEntrega").attr("disabled","disabled").removeAttr("readonly");
                $(".campoFechaPrometida").attr("disabled","disabled").removeAttr("readonly");
            }
            //$("#preventivo,#correctivo").attr("readonly","readonly");
            $("#taller_id").attr("disabled","disabled");
            $("#incidente_id").attr("disabled","disabled");
            //$("#factura").attr("readonly","readonly");
            //$("#monto").attr("readonly","readonly");
            $("#kilometraje").attr("readonly","readonly");
            $("#id").val(incidenteSeleccionado.id);
        }
        
        localStorage.setItem('pestanaActiva','5');
        
        
        var usua=almacenamiento.dameUsuario();
        $(".btnDesa").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        if(usua["tipo"]=='2'||usua["tipo"]=='3')
            for(var i=0; i<=$(".txtDesa").length-1; i++){
                $(".txtDesa")[i].disabled=true;
            }//for
        
    });

incidentes.cargarIncidentes=function(){
    //obtenemos el servicio si el id es dirente de vacio
    if(incidenteSeleccionado.id!=undefined && incidenteSeleccionado!=''){
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-incidente-automovil",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr),
                id: incidenteSeleccionado.id
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo el incidente del automovil: "+incidenteSeleccionado.id);
                console.log(re);
                     /*if(re!=undefined && re!=null && re!=''){
                         if(re[0].fecha!=undefined && re[0].fecha!=null){
                            fecha = re[0].fecha.split("T");
                        }else{
                            fecha = '';
                        }
                        if(re[0].fecha_entrega!=undefined && re[0].fecha_entrega!=null){
                            fecha_entrega = re[0].fecha_entrega.split("T");
                        }else{
                            fecha_entrega = '';
                        }
                        if(re[0].fecha_prometida!=undefined && re[0].fecha_prometida!=null){
                            fecha_prometida = re[0].fecha_prometida.split("T");
                        }else{
                            fecha_prometida = '';
                        }
                        //seteo el formulario con los datos del servicio
                        $("#fecha").val(fecha[0]).change();
                         
                        //obtengo los talleres
                        incidentes.dameTalleresDisponibles(re[0].taller_id);
                        //obtengo los servicios
                        incidentes.dameIncidentesDisponibles(re[0].incidente_id);
                        $("#factura").val(re[0].factura);
                        $("#monto").val(re[0].monto);
                        $("#kilometraje").val(re[0].kilometraje);
                        $("#fecha_prometida").val(fecha_prometida[0]);
                        $("#fecha_entrega").val(fecha_entrega[0]);
                        
                     }else{
                         console.log("vacio:");
                         console.log(incidenteSeleccionado.id)*/
                         if(incidenteSeleccionado.id!=""){
                             incidentes.cargaLocalIncidente();
                         }else{
                            incidentes.dameTalleresDisponibles();
                            incidentes.dameIncidentesDisponibles();
                         }
                         
                    // }
            },
            error: function(re){
                // console.log(re);
                //_mensaje("Atención","No hay internet, no se pudo obtener los servicios del automovil.","Entendido");
                //bbuscamos el servicio localmente
                if(incidenteSeleccionado.id==''){
                    incidentes.dameTalleresDisponibles();
                    incidentes.dameIncidentesDisponibles();
                }else{
                    incidentes.cargaLocalIncidente();
                }
                
            }
        }); 
    }
   
}//function


incidentes.cargaLocalIncidente=function(){
                        incidenteLocal = almacenamiento.dameIncidenteSeleccionadoCompleto(incidenteSeleccionado.id,incidenteSeleccionado.idAutomovil,incidenteSeleccionado.incidente_id);
                    
                        if(incidenteLocal.fecha!=undefined && incidenteLocal.fecha!=null){
                            fecha = incidenteLocal.fecha.split("T");
                        }else{
                            fecha = '';
                        }
                        if(incidenteLocal.fecha_entrega!=undefined && incidenteLocal.fecha_entrega!=null){
                            fecha_entrega = incidenteLocal.fecha_entrega.split("T");
                        }else{
                            fecha_entrega = '';
                        }
                        if(incidenteLocal.fecha_prometida!=undefined && incidenteLocal.fecha_prometida!=null){
                            fecha_prometida = incidenteLocal.fecha_prometida.split("T");
                        }else{
                            fecha_prometida = '';
                        }
                        //seteo el formulario con los datos del servicio
                        $("#fecha").val(fecha[0]).change();
                         /*if(incidenteLocal.tipo_servicio_id==0){
                             $("#correctivo").prop("checked",true);
                         }else{
                             $("#preventivo").prop("checked",true);
                         }*/
                        //obtengo los talleres
                        incidentes.dameTalleresDisponibles(incidenteLocal.taller_id);
                        //obtengo los servicios
                        console.log("incidente local: "+incidenteLocal.incidente_id);
                        incidentes.dameIncidentesDisponibles(incidenteLocal.incidente_id);
                        $("#factura").val(incidenteLocal.factura);
                        $("#monto").val(incidenteLocal.monto);
                        $("#kilometraje").val(incidenteLocal.kilometraje);
                        $("#fecha_prometida").val(fecha_prometida[0]);
                        $("#fecha_entrega").val(fecha_entrega[0]);
                        $("#numero_siniestro").val(incidenteLocal.numero_siniestro);
    
                        if(incidenteLocal.sincronizable==0){
                            $("#numero_siniestro").attr("readonly","readonly");
                        }

                        var usua=almacenamiento.dameUsuario();
                        if(incidenteLocal.sincronizable==0 && incidenteLocal.sincronizableFactura==1){
                            if(!(usua["tipo"]=='2'||usua["tipo"]=='3'))
                                $(".botonGuardar").show();
                            sincronizarFactura=true;
                            console.log("SINCRONIZACION DE FACTURA");
                        }else if(incidenteLocal.sincronizable==0 && incidenteLocal.sincronizableFactura==0){
                            $(".botonGuardar").hide();
                            console.log("SINCRONIZADO CON EL SERVIDOR");
                        }else{
                            if(!(usua["tipo"]=='2'||usua["tipo"]=='3'))
                                $(".botonGuardar").show();
                            console.log("EDICION NORMAL");
                        }
}


incidentes.guardarIncidente=function(){

    if($("#fecha").val()==''){
        _mensaje("Atención","Debe seleccionar la fecha de ingreso al taller","Entendido");
    }/*else if(!$("#preventivo").is(':checked') && !$("#correctivo").is(':checked')){
        _mensaje("Atención","Debe seleccionar un tipo de servicio","Entendido");
    }*/else if($("#taller_id").val()==''){
        _mensaje("Atención","Debe seleccionar un taller mecánico","Entendido");
    }else if($("#incidente_id").val()==''){
        _mensaje("Atención","Debe seleccionar el incidente que tuvo el automóvil","Entendido");
    }else if($("#kilometraje").val()==''){
        _mensaje("Atención","Debe ingresar el kilometraje del automovil","Entendido");
    }else if($("#fecha_prometida").val()==''){
        _mensaje("Atención","Debe seleccionar la fecha promesa para el automóvil","Entendido");
    }else{
       /* tipo_servicio_id = ($('#preventivo:checked').val()=='on'?1:0);
        tipo_servicio = ($('#preventivo:checked').val()=='on'?'Preventivo':'Correctivo');
        */
        fecha_entrega = $("#fecha_entrega").val()!=''?$("#fecha_entrega").val():'';
        fecha_promesa = $("#fecha_prometida").val()!=''?$("#fecha_prometida").val():'';
        
        
        //fecha_promesa = fecha_promesa.replace("-","");
        //fecha_entrega = fecha_entrega.replace("-","");
        fhoy = fechaHoy();//.replace("-","");
        var status='';
        
        if(fecha_entrega!=''){
            status = 'verde';
            console.log("verde");
        }else if((fhoy <= fecha_promesa ) && fecha_entrega==''){
            status = 'amarillo';
            console.log("amarillo");
        }else if((fhoy > fecha_promesa ) && fecha_entrega==''){
            status = 'rojo';
            console.log("rojo");
        }

        id = $("#id").val()!='' && $("#id").val()!=undefined && $("#id").val()!=null?$("#id").val():"-"+almacenamiento.pedirIdNuevo();
        console.log("Actualizar registr: "+editar);
        //obtenemos los datos del automovil seleccionado
        //obtengo el kilometraje y lo comparo con el del campo del formulario. si es menor al del auto no permito guardar
        auto = almacenamiento.dameAutomovil(automovilSeleccionado.id);

        if(editar==false){
            //obtenemos los servicios
            var incidentes = JSON.parse(localStorage.getItem("incidentes")) || [];
            var existe = true;
            //comprobamos que el automovil tenga todos los servicios con fecha de entrega
            $.each(incidentes, function(i, item){

                if(automovilSeleccionado.id == item.idAutomovil && (item.fecha_entrega=='' || item.fecha_entrega==null  || item.fecha_entrega==undefined)){
                    existe = false;
                }
               
            });
            if(existe!=true){
                _mensaje("Atención","Aún existe un incidente pendiente para este automóvil.","Entendido")
            }else if(parseFloat($("#kilometraje").val())<parseFloat(auto.kilometraje)){
                _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido")
            }else{
                if(editar==true){
                     almacenamiento.actualizarIncidente(automovilSeleccionado.id,id,$("#incidente_id").val(),$("#incidente_id option:selected").text(),$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),status,1,0,$("#numero_siniestro").val());
                }else{
                    almacenamiento.guardarIncidente(automovilSeleccionado.id,id,$("#incidente_id").val(),$("#incidente_id option:selected").text(),$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),status,1,0,$("#numero_siniestro").val());
                }

                irA('secciones','','','','','#incidentes');
            }
        }else{
            if(sincronizarFactura==true){
                sincronizable = 0,
                sincronizableFact=1;
            }else{
                sincronizable = 1,
                sincronizableFact=0;
            }
            /*if(parseFloat($("#kilometraje").val())<parseFloat(auto.kilometraje)){
                _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido")
            }else{*/
                if(editar==true){
                    almacenamiento.actualizarIncidente(automovilSeleccionado.id,id,$("#incidente_id").val(),$("#incidente_id option:selected").text(),$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),status,sincronizable,sincronizableFact,$("#numero_siniestro").val());
                    if(sincronizarFactura==true){
                        if($("#fecha_entrega").val()!=''){
                            almacenamiento.actualizarEstatusAutomovil(automovilSeleccionado.id,1,'verde');
                        }else{
                            almacenamiento.actualizarEstatusAutomovil(automovilSeleccionado.id,2,'amarillo');
                        }
                    }
                }else{
                    almacenamiento.guardarIncidente(automovilSeleccionado.id,id,$("#incidente_id").val(),$("#incidente_id option:selected").text(),$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),status,sincronizable,sincronizableFact,$("#numero_siniestro").val());
                }

                irA('secciones','','','','','#incidentes');
            //}
        }
        
        
        
        
        
        
    }
   
}


incidentes.dameTalleresDisponibles=function(taller_id){
    //obtenemos los talleres disponibles
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-talleres-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los talleres disponibles: ");
                console.log(re);
                $("#taller_id").html('');
                 $("#taller_id").append('<option value="">- Seleccione un Taller -</option>');
                $.each(re, function(i, item){
                    if(item.id==taller_id){
                        $("#taller_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#taller_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
            },
            error: function(re){
                /*console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener obtener la información de los talleres disponibles.","Entendido");
                */
                
                //cargamos los talleres disponibles localmente
                re = almacenamiento.dameTalleresDisponibles();
                console.log("obteniendo los talleres disponibles localmente: ");
                console.log(re);
                $("#taller_id").html('');
                $("#taller_id").append('<option value="">- Seleccione un Taller -</option>');
                
                $.each(re, function(i, item){
                    if(item.id==taller_id){
                        $("#taller_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#taller_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                });
            }
        }); 
    
}

incidentes.dameIncidentesDisponibles=function(incidente_id){
    //obtenemos los talleres disponibles
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-incidentes-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los incidentes disponibles: ");
                console.log(re);
                $("#incidente_id").html('');
                 $("#incidente_id").append('<option value="">- Seleccione un Incidente -</option>');
                $.each(re, function(i, item){
                    if(item.id==incidente_id){
                        $("#incidente_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#incidente_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
            },
            error: function(re){
                /*console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener la información de los incidentes disponibles.","Entendido");*/
                //cargamos los talleres disponibles localmente
                re = almacenamiento.dameIncidentesDisponibles();
                console.log("obteniendo los incidentes disponibles localmente: ");
                console.log(re);
                $("#incidente_id").html('');
                $("#incidente_id").append('<option value="">- Seleccione un Incidente -</option>');
                
                $.each(re, function(i, item){
                    if(item.id==incidente_id){
                        $("#incidente_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#incidente_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                });
            }
        }); 
}