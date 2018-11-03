var servicios={};
var automovilSeleccionado='';
var usuario='';
var tipoServicioSeleccionado = 1;
var editar = false;
var sincronizarFactura = false;
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
             if(servicioSeleccionado.id==''){
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
        servicioSeleccionado = almacenamiento.dameServicioSeleccionado();
        console.log("servicio seleccionado");
        console.log(servicioSeleccionado);
        //cargamos la informacion en pantalla de la base de datos
        servicios.cargarServicios();
        
        //si es nuevo
        if(servicioSeleccionado.id==''){
            //es una alta de servicio
             campoFechaPrometida = myApp.calendar({
                input: '.campoFechaPrometida',
                dateFormat: 'yyyy-mm-dd',
                minDate:fechaHoy(),
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
                monthNames:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto' , 'Septiembre' , 'Octubre', 'Noviembre', 'Diciembre'],
                monthNamesShort:['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],	
                dayNames:['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
                dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
            });
            tipoServicioSeleccionado = 1;
            $(".selectServicio").trigger("click");
            servicios.cambiaServicio(1);
            editar=false;
            $("#id").val('');
        }else{
            editar=true;
            $(".selectSistema").trigger("click");
            
            //edicion de un servicio
            //$(".campoFecha").removeClass("date").datetimepicker('remove');
            campoFecha.destroy();
            servicioLocal = almacenamiento.dameServicioSeleccionadoCompleto(servicioSeleccionado.id,servicioSeleccionado.idAutomovil,servicioSeleccionado.servicio_id,servicioSeleccionado.sistema_id);
            if(servicioLocal.sincronizable==0 && servicioLocal.sincronizableFactura==1){
                //$(".campoFechaEntrega").attr("disabled","disabled").removeAttr("readonly");
                $(".campoFechaPrometida").attr("disabled","disabled").removeAttr("readonly");
            }
            //$("#preventivo, #correctivo").attr("disabled","disabled");
            console.log("cargando");
            console.log(servicioLocal.tipo_servicio_id);
            
           
            $("#tipo_servicio").attr("disabled","disabled");
            $("#taller_id").attr("disabled","disabled");
            $("#servicio_id").attr("disabled","disabled");
            $("#sistema_id").attr("disabled","disabled");
            //$("#factura").attr("readonly","readonly");
            //$("#monto").attr("readonly","readonly");
            $("#kilometraje").attr("readonly","readonly");
            $("#id").val(servicioSeleccionado.id);
        }
        console.log("Actualizar registr: "+editar);
        
        localStorage.setItem('pestanaActiva','4');
        
        
        
        var usua=almacenamiento.dameUsuario();
        $(".btnDesa").css("display", usua["tipo"]=='2'||usua["tipo"]=='3' ?"none":"");
        if(usua["tipo"]=='2'||usua["tipo"]=='3')
            for(var i=0; i<=$(".txtDesa").length-1; i++){
                $(".txtDesa")[i].disabled=true;
            }//for
    });

servicios.cargarServicios=function(){
    //obtenemos el servicio si el id es dirente de vacio
    if(servicioSeleccionado.id!=undefined && servicioSeleccionado!=''){
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-servicio-automovil",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr),
                id: servicioSeleccionado.id
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo el servicio del automovil: "+servicioSeleccionado.id);
                console.log(re);
                     /*if(re!=undefined && re!=null && re!=''){
                         console.log("encuentra resultados en el servidor");
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
                         if(re[0].tipo_servicio_id==0){
                             $("#correctivo").prop("checked",true);
                             servicios.cambiaServicio(0);
                         }else{
                             $("#preventivo").prop("checked",true);
                             servicios.cambiaServicio(1);
                         }
                        //obtengo los talleres
                        servicios.dameTalleresDisponibles(re[0].taller_id);
                         console.log("despues de descargar talleres: ");
                         console.log(re[0].servicio_id+" : "+re[0].sistema_id);
                         if(re[0].servicio_id!=null && re[0].sistema_id==null){
                             //obtengo los servicios
                             console.log("obteniendo select de servicios");
                            servicios.dameServiciosDisponibles(re[0].servicio_id);
                            servicios.dameSistemasDisponibles();
                         }else if(re[0].sistema_id!=null && re[0].servicio_id==null){
                             //obtengo los servicios
                             console.log("obteniendo select de sistemas");
                            servicios.dameSistemasDisponibles(re[0].sistema_id);
                             servicios.dameServiciosDisponibles();
                         }
                        
                        $("#factura").val(re[0].factura);
                        $("#monto").val(re[0].monto);
                        $("#kilometraje").val(re[0].kilometraje);
                        $("#fecha_prometida").val(fecha_prometida[0]);
                        $("#fecha_entrega").val(fecha_entrega[0]);
                        
                     }else{
                         console.log("vacio:");
                         console.log(servicioSeleccionado.id)*/
                         if(servicioSeleccionado.id!=""){
                             servicios.cargaLocalServicio();
                         }else{
                            servicios.dameTalleresDisponibles();
                            servicios.dameServiciosDisponibles();
                            servicios.dameSistemasDisponibles();
                         }
                        
                     //}
            },
            error: function(re){
                // console.log(re);
                //_mensaje("Atención","No hay internet, no se pudo obtener los servicios del automovil.","Entendido");
                //bbuscamos el servicio localmente
                if(servicioSeleccionado.id==''){
                    servicios.dameTalleresDisponibles();
                    servicios.dameServiciosDisponibles();
                    servicios.dameSistemasDisponibles();
                }else{
                    servicios.cargaLocalServicio();
                }
                
            }
        }); 
    }
   
}//function
servicios.cargaLocalServicio=function(){
                        servicioLocal = almacenamiento.dameServicioSeleccionadoCompleto(servicioSeleccionado.id,servicioSeleccionado.idAutomovil,servicioSeleccionado.servicio_id,servicioSeleccionado.sistema_id);
                        console.log("servicio seleccionado: ");
                        console.log(servicioLocal);
        
                        if(servicioLocal.fecha!=undefined && servicioLocal.fecha!=null ){
                            fecha = servicioLocal.fecha.split("T");
                        }else{
                            fecha = '';
                        }
                        if(servicioLocal.fecha_entrega!=undefined && servicioLocal.fecha_entrega!=null){
                            fecha_entrega = servicioLocal.fecha_entrega.split("T");
                        }else{
                            fecha_entrega = '';
                        }
                        if(servicioLocal.fecha_prometida!=undefined && servicioLocal.fecha_prometida!=null){
                            fecha_prometida = servicioLocal.fecha_prometida.split("T");
                        }else{
                            fecha_prometida = '';
                        }
                        //seteo el formulario con los datos del servicio
                        $("#fecha").val(fecha[0]).change();
    
                        if(servicioLocal.tipo_servicio_id=='1' || servicioLocal.tipo_servicio_id=='3'){
                            $("#tipo_servicio").attr("onchange","servicios.cambiaServicio(1)");
                        }else{
                            $("#tipo_servicio").attr("onchange","servicios.cambiaServicio(0)");
                        }
                        $("#tipo_servicio").val(servicioLocal.tipo_servicio_id).change();
    
                         /*if(servicioLocal.tipo_servicio_id==0){
                             //$("#correctivo").prop("checked",true);
                             $("#tipo_servicio").attr("onchange","servicios.cambiaServicio(1)");
                             servicios.cambiaServicio(0);
                         }else{
                             //$("#preventivo").prop("checked",true);
                             $("#tipo_servicio").attr("onchange","servicios.cambiaServicio(0)");
                             servicios.cambiaServicio(1);
                         }*/
                        //obtengo los talleres
                        servicios.dameTalleresDisponibles(servicioLocal.taller_id);
                         if(servicioLocal.servicio_id!=null && servicioLocal.sistema_id==null){
                             //obtengo los servicios
                             console.log("obteniendo select de servicios");
                            servicios.dameServiciosDisponibles(servicioLocal.servicio_id);
                            //$("#servicio_id").change();
                         }else if(servicioLocal.sistema_id!=null && servicioLocal.servicio_id==null){
                             //obtengo los servicios
                             console.log("obteniendo select de sistemas");
                            servicios.dameSistemasDisponibles(servicioLocal.sistema_id);
                         }
                        console.log("mostramos el monto: ");
                        console.log(servicioLocal.monto);
                        $("#factura").val(servicioLocal.factura);
                        $("#monto").val(servicioLocal.monto);
                        $("#kilometraje").val(servicioLocal.kilometraje);
                        $("#fecha_prometida").val(fecha_prometida[0]);
                        $("#fecha_entrega").val(fecha_entrega[0]);
    
                        var usua=almacenamiento.dameUsuario();
                        if(servicioLocal.sincronizable==0 && servicioLocal.sincronizableFactura==1){
                            if(!(usua["tipo"]=='2'||usua["tipo"]=='3'))
                                $(".botonGuardar").show();
                            sincronizarFactura=true;
                            console.log("SINCRONIZACION DE FACTURA");
                        }else if(servicioLocal.sincronizable==0 && servicioLocal.sincronizableFactura==0){
                            $(".botonGuardar").hide();
                            console.log("SINCRONIZADO CON EL SERVIDOR");
                        }else{
                            if(!(usua["tipo"]=='2'||usua["tipo"]=='3'))
                                $(".botonGuardar").show();
                            console.log("EDICION NORMAL");
                        }
    
}


servicios.guardarServicio=function(){

    if($("#fecha").val()==''){
        _mensaje("Atención","Debe seleccionar la fecha de ingreso al taller","Entendido");
    }/*else if(!$("#preventivo").is(':checked') && !$("#correctivo").is(':checked')){
        _mensaje("Atención","Debe seleccionar un tipo de servicio","Entendido");
    }*/else if($("#taller_id").val()==''){
        _mensaje("Atención","Debe seleccionar un taller mecánico","Entendido");
    }else if(tipoServicioSeleccionado==3 && $("#servicio_id").val()==''){
        _mensaje("Atención","Debe seleccionar el servicio a realizar para el automóvil","Entendido");
    }else if(tipoServicioSeleccionado==1 && $("#servicio_id").val()==''){
        _mensaje("Atención","Debe seleccionar el servicio a realizar para el automóvil","Entendido");
    }else if(tipoServicioSeleccionado==0 && $("#sistema_id").val()==''){
        _mensaje("Atención","Debe seleccionar el sistema  para el automóvil","Entendido");
    }else if($("#kilometraje").val()==''){
        _mensaje("Atención","Debe ingresar el kilometraje del automovil","Entendido");
    }else if($("#fecha_prometida").val()==''){
        _mensaje("Atención","Debe seleccionar la fecha promesa para el automóvil","Entendido");
    }else{
        /*tipo_servicio_id = ($('#preventivo:checked').val()=='on'?1:0);
        tipo_servicio = ($('#preventivo:checked').val()=='on'?'Preventivo':'Correctivo');*/
        tipo_servicio_id = $('#tipo_servicio').val();
        if($('#tipo_servicio').val()=='1'){
            tipo_servicio ="Preventivo";
        }else if($('#tipo_servicio').val()=='3'){
            tipo_servicio ="Conservación";
        }else{
            tipo_servicio ="Correctivo";
        }
        //tipo_servicio =($('#tipo_servicio').val()=='1'?'Preventivo':'Correctivo');
        
        
        
        fecha_entrega = $("#fecha_entrega").val()!=''?$("#fecha_entrega").val():'';
        fecha_promesa = $("#fecha_prometida").val()!=''?$("#fecha_prometida").val():'';
        
        //fecha_promesa = fecha_promesa.replace("-","");
        //fecha_entrega = fecha_entrega.replace("-","");
        fhoy = fechaHoy();
        
        console.log(fhoy);
        //fhoy = fhoy.replace("-","");
        var status='';
        if(fecha_entrega!=''){
            status = 'verde';
            console.log("verde");
        //}else if(fecha_entrega <= fecha_promesa && fecha_entrega==''){
        }else if((fhoy <= fecha_promesa ) && fecha_entrega==''){
            status = 'amarillo';
            console.log("amarillo");
        }else if((fhoy > fecha_promesa ) && fecha_entrega==''){
            status = 'rojo';
            console.log("rojo");
        }
        
        if(tipoServicioSeleccionado==1 || tipoServicioSeleccionado==3){
            servicio_id=$("#servicio_id").val();
            servicio = $("#servicio_id option:selected").text();
            sistema_id=null;
            sistema=null;
            
        }else{
            servicio_id=null;
            servicio=null;
            sistema_id=$("#sistema_id").val();
            sistema = $("#sistema_id option:selected").text();
        }
        

        id = $("#id").val()!='' && $("#id").val()!=undefined && $("#id").val()!=null?$("#id").val():"-"+almacenamiento.pedirIdNuevo();
        console.log("Actualizar registr: "+editar);
        //verificamos si el servicio ya esta registrado y si es registro nuevo para no dejar al macenar duplicados
        //obtenemos los datos del automovil seleccionado
        //obtengo el kilometraje y lo comparo con el del campo del formulario. si es menor al del auto no permito guardar
        auto = almacenamiento.dameAutomovil(automovilSeleccionado.id);
        
        if(editar==false){
            
            //obtenemos los servicios
            var servicios = JSON.parse(localStorage.getItem("servicios")) || [];
            var existe = true;
           
            //comprobamos que el automovil tenga todos los servicios con fecha de entrega
            $.each(servicios, function(i, item){
                
                console.log("false: ");
                console.log(item);
                if(automovilSeleccionado.id == item.idAutomovil && (item.fecha_entrega=='' || item.fecha_entrega==null || item.fecha_entrega==undefined)){
                    existe = false;
                }
               
            });
            
            if(existe==false){
                _mensaje("Atención","Aún existe un servicio pendiente para este automóvil.","Entendido")
            }else if(parseFloat($("#kilometraje").val())<parseFloat(auto.kilometraje)){
                _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido")
            }else{
                 if(editar==true){
                     almacenamiento.actualizarServicio(automovilSeleccionado.id,id,servicio_id,servicio,$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),tipo_servicio_id,tipo_servicio,status,sistema_id,sistema,1,0);
                }else{
                     almacenamiento.guardarServicio(automovilSeleccionado.id,id,servicio_id,servicio,$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),tipo_servicio_id,tipo_servicio,status,sistema_id,sistema,1,0 );
                }

                irA('secciones','','','','','#servicios');
            }

        }else{
            if(sincronizarFactura==true){
                sincronizable = 0,
                sincronizableFact=1;
            }else{
                sincronizable = 1,
                sincronizableFact=0;
            }
            /*if($("#kilometraje").val()<auto.kilometraje){
                _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido")
            }else{*/
                if(editar==true){
                     almacenamiento.actualizarServicio(automovilSeleccionado.id,id,servicio_id,servicio,$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),tipo_servicio_id,tipo_servicio,status,sistema_id,sistema,sincronizable,sincronizableFact);
                    if(sincronizarFactura==true){
                        if($("#fecha_entrega").val()!=''){
                            almacenamiento.actualizarEstatusAutomovil(automovilSeleccionado.id,1,'verde');
                        }else{
                            almacenamiento.actualizarEstatusAutomovil(automovilSeleccionado.id,2,'amarillo');
                        }
                    }
                }else{
                     almacenamiento.guardarServicio(automovilSeleccionado.id,id,servicio_id,servicio,$("#taller_id").val(),$("#taller_id option:selected").text(),$("#factura").val(),$("#monto").val(),$("#kilometraje").val(),1,$("#fecha").val(),$("#fecha_prometida").val(),$("#fecha_entrega").val(),tipo_servicio_id,tipo_servicio,status,sistema_id,sistema,sincronizable,sincronizableFact);
                }

                irA('secciones','','','','','#servicios');
            //}
                
        }
    }
   
}


servicios.dameTalleresDisponibles=function(taller_id){
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
                /*
                console.log(re);
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

servicios.dameServiciosDisponibles=function(servicio_id){
    //obtenemos los talleres disponibles
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-servicios-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los servicios disponibles: ");
                console.log(re);
                $("#servicio_id").html('');
                 $("#servicio_id").append('<option value="">- Seleccione un Servicio -</option>');
                $.each(re, function(i, item){
                    if(item.id==servicio_id){
                        $("#servicio_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#servicio_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
            },
            error: function(re){
                /*console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener obtener la información de los servicios disponibles.","Entendido");
                */
                //cargamos los servicios disponibles localmente
                re = almacenamiento.dameServiciosDisponibles();
                console.log("obteniendo los servicios disponibles localmente: ");
                console.log(re);
                $("#servicio_id").html('');
                $("#servicio_id").append('<option value="">- Seleccione un Servicio -</option>');
                
                $.each(re, function(i, item){
                    if(item.id==servicio_id){
                        $("#servicio_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#servicio_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                });
           
           }
        }); 
}
servicios.dameSistemasDisponibles=function(sistema_id){
    //obtenemos los talleres disponibles
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-sistemas-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los sistemas disponibles: ");
                console.log(re);
                $("#sistema_id").html('');
                 $("#sistema_id").append('<option value="">- Seleccione un Sistema -</option>');
                $.each(re, function(i, item){
                    if(item.id==sistema_id){
                        $("#sistema_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#sistema_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                    
                    
                });
            },
            error: function(re){
                
                //cargamos los sistemas disponibles localmente
                re = almacenamiento.dameSistemasDisponibles();
                console.log("obteniendo los sistemas disponibles localmente: ");
                console.log(re);
                $("#sistema_id").html('');
                $("#sistema_id").append('<option value="">- Seleccione un Sistema -</option>');
                
                $.each(re, function(i, item){
                    if(item.id==sistema_id){
                        $("#sistema_id").append('<option value="'+item.id+'" selected="selected">'+item.nombre+'</option>');
                    }else{
                        $("#sistema_id").append('<option value="'+item.id+'">'+item.nombre+'</option>');
                    }
                });
           
           }
        }); 
}

servicios.cambiaServicio=function(servicio_id){
    if(servicio_id==1){//preventivo
        console.log("el tipo de servicio seleccionado es preventivo");
        $(".selectServicio").removeClass("hidden");
        $(".selectSistema").addClass("hidden");
        tipoServicioSeleccionado = 1;
        //$("#tipo_servicio").attr("onchange","servicios.cambiaServicio(0)");
    }else if(servicio_id==3){//preventivo
        console.log("el tipo de servicio seleccionado es Conservación");
        $(".selectServicio").removeClass("hidden");
        $(".selectSistema").addClass("hidden");
        tipoServicioSeleccionado = 3;
        //$("#tipo_servicio").attr("onchange","servicios.cambiaServicio(3)");
    }else{//correctivo
        console.log("el tipo de servicio seleccionado es correctivo");
        $(".selectSistema").removeClass("hidden");
        $(".selectServicio").addClass("hidden");
        tipoServicioSeleccionado = 0;
        //$("#tipo_servicio").attr("onchange","servicios.cambiaServicio(1)");
    }
}