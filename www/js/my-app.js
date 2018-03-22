/*
var dominio ="http://avansys-admin.dyndns.org:8080/flotillasfinvivir/app/";
var urlSistema ="http://avansys-admin.dyndns.org:8080/flotillasfinvivir/";
var descargaDocumentos="/storage/emulated/0/ControlDeFlotillas";
var rutaDocumentos="http://avansys-admin.dyndns.org:8080/flotillasfinvivir/cargas/documentos/";
var palaSecr="ControlFlotillasFinvivir";
*/

//var dominio ="http://201.163.100.84:8080/flotillasfinvivir/app/";
var dominio ="http://192.168.1.20:8081/flotillasfinvivir/app/";
//var urlSistema ="http://201.163.100.84:8080/flotillasfinvivir/";
var urlSistema ="http://192.168.1.20:8081/flotillasfinvivir/";
var descargaDocumentos="/storage/emulated/0/ControlDeFlotillas";
//var rutaDocumentos="http://201.163.100.84:8080/flotillasfinvivir/cargas/documentos/";
var rutaDocumentos="http://192.168.1.20:8081/flotillasfinvivir/cargas/documentos/";
var palaSecr="ControlFlotillasFinvivir";


 

 
// Initialize your app
var myApp = new Framework7({

});
//redireccionamientos para las secciones

        $(document).ready(function(){

            //si existe el span con el identificador
            //buscamos en local storage y si existe el elemento lo ponemos en el header
            if($(".numero_flotilla").length>0){
                var flotilla= almacenamiento.dameNumeroFlotillaSeleccionada();
                if(flotilla!=null){
                    $(".numero_flotilla").html('<strong>'+flotilla.numero+'</strong>');
                }
            }
            
            /*// Wait for PhoneGap to load
            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
               intel.xdk.cache.clearAllCookies();
            }*/
        });//function

            // Name: exitFromBackground()
            // Author: Matrix Lee
            // Function: Exit app, and remove it from the background.
            function exitAppFromBackground(){
               
                
                sincronizacion = almacenamiento.dameTodoParaSincronizar();
                if(sincronizacion!=undefined){
                    
                    myApp.modal({
                        title: "Atención",
                        text: "¿Estas seguro de querer salir de la aplicación?, Si lo haces la información almacenada en el teléfono se perderá",
                        buttons: [
                          {
                            text: "Sí, Salir",
                            onClick: function() {
                                almacenamiento.limpiarTodo();
                                window.close();
                                if(navigator.app){
                                    navigator.app.exitApp();
                                }else if(navigator.device){
                                    navigator.device.exitApp();
                                }
                            }
                          },
                        {
                            text: "No Salir",
                            onClick: function() {
                                    myApp.closeModal();
                            }
                          }
                        ]
                      })
                    //myApp.hidePreloader();
                }else{
                    
                                    window.close();
                                    if(navigator.app){
                                        navigator.app.exitApp();
                                    }else if(navigator.device){
                                        navigator.device.exitApp();
                                    }
                   // myApp.hidePreloader();
                }
                
                
                
               
            }
            function exitAppFromBackground2(){
                    almacenamiento.limpiarTodo();
                    window.close();
                
                    if(navigator.app){
                        navigator.app.exitApp();
                    }else if(navigator.device){
                        navigator.device.exitApp();
                    }

            }
function burbuja(jsonObject){
    //recorreremos todos los elementos hasta n-1
    for(i=0;i<(jsonObject.length-1);i++){
        //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
        for(j=0;j<(jsonObject.length-i);j++){
            //comparamos
            if(jsonObject[j]!=undefined)
                fecha1 = jsonObject[j].fecha.split("T");
            else{
                fecha1[0] = '';
            }
            if(jsonObject[j+1]!=undefined)
                fecha2 = jsonObject[j+1].fecha.split("T");
            else{
                fecha2[0] = '';
            }
            if(fecha2[0]>fecha1[0]){
                 //guardamos el numero mayor en el auxiliar
                 aux=jsonObject[j];
                 //guardamos el numero menor en el lugar correspondiente
                 jsonObject[j]=jsonObject[j+1];
                 //asignamos el auxiliar en el lugar correspondiente
                 jsonObject[j+1]=aux;

            }

        }
    }
    console.log("arreglo final: ");
    console.log(jsonObject);
    return jsonObject
}

function burbujaCambiosDeLLantas(jsonObject){
    //recorreremos todos los elementos hasta n-1
    for(i=0;i<(jsonObject.length-1);i++){
        //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
        for(j=0;j<(jsonObject.length-i);j++){
            //comparamos
            if(jsonObject[j]!=undefined)
                fecha1 = jsonObject[j].fecha_cambio.split("T");
            else{
                fecha1[0] = '';
            }
            if(jsonObject[j+1]!=undefined)
                fecha2 = jsonObject[j+1].fecha_cambio.split("T");
            else{
                fecha2[0] = '';
            }
            if(fecha2[0]>fecha1[0]){
                 //guardamos el numero mayor en el auxiliar
                 aux=jsonObject[j];
                 //guardamos el numero menor en el lugar correspondiente
                 jsonObject[j]=jsonObject[j+1];
                 //asignamos el auxiliar en el lugar correspondiente
                 jsonObject[j+1]=aux;

            }

        }
    }
    console.log("arreglo final: ");
    console.log(jsonObject);
    return jsonObject
}

function burbujaDetalle(jsonObject){
    //recorreremos todos los elementos hasta n-1
    for(i=0;i<(jsonObject.length-1);i++){
        //recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
        for(j=0;j<(jsonObject.length-i);j++){
            //comparamos
            if(jsonObject[j]!=undefined)
                fecha1 = jsonObject[j].fecha_detalle.split("T");
            else{
                fecha1[0] = '';
            }
            if(jsonObject[j+1]!=undefined)
                fecha2 = jsonObject[j+1].fecha_detalle.split("T");
            else{
                fecha2[0] = '';
            }
            if(fecha2[0]>fecha1[0]){
                 //guardamos el numero mayor en el auxiliar
                 aux=jsonObject[j];
                 //guardamos el numero menor en el lugar correspondiente
                 jsonObject[j]=jsonObject[j+1];
                 //asignamos el auxiliar en el lugar correspondiente
                 jsonObject[j+1]=aux;

            }

        }
    }
    console.log("arreglo final: ");
    console.log(jsonObject);
    return jsonObject
}





    
function clave(){
    var cara="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    clav="";
    for(var i=0; i<=20-1; i++){
        clav+=cara.substr(parseInt(Math.random()*cara.length),1);
    }//for
    return clav;
}//function

function quitaNull(txt){
    return txt==null?"":txt;
}//function


function _mensaje(titulo,texto,btnLabel,callback){
                myApp.modal({
                    title: titulo,
                    text: texto,
                    buttons: [
                      {
                        text: btnLabel,
                        onClick: function(){
                            if(callback!==undefined){
                                callback();
                            }//if
                        }//function
                      }
                    ]
                  })
}
function _mensajeCallback(titulo,texto,btnLabel,funcion){
                myApp.modal({
                    title: titulo,
                    text: texto,
                    buttons: [
                      {
                        text: btnLabel,
                        onClick: function() {
                           funcion();
                        }
                      }
                    ]
                  })
}


function _confirmar(titulo,texto,btnConfirmar,btnCancelar,funcion){
     myApp.modal({
                    title: titulo,
                    text: texto,
                    buttons: [
                      {
                        text: btnConfirmar,
                        onClick: function() {
                               //funcion();
                        }
                      },
                    {
                        text: btnCancelar,
                        onClick: function() {
                                myApp.closeModal();
                        }
                      }
                    ]
                  })

}
function _confirmarSiNo(titulo,texto,btnConfirmar,btnCancelar,funcion,error){
     myApp.modal({
                    title: titulo,
                    text: texto,
                    buttons: [
                      {
                        text: btnConfirmar,
                        onClick: function() {
                               funcion();
                        }
                      },
                    {
                        text: btnCancelar,
                        onClick: function(){
                            error();
                                myApp.closeModal();
                        }
                      }
                    ]
                  })

}
function _confirmarAntesDeEliminar(confirmar,texto,btnConfirmar,btnCancelar,funcionConfirmar){
     myApp.modal({
                    title: 'Atención',
                    text: '¿Estas seguro de querer limpiar esta y todas las secciones?',
                    buttons: [
                      {
                        text: 'Limpiar',
                        onClick: function() {
                                funcionConfirmar();
                        }
                      },
                    {
                        text: 'Cancelar',
                        onClick: function() {
                                myApp.closeModal();
                        }
                      }
                    ]
                  })

}


function irA(peticion,flotilla,id,idAutomovil,servicio_id,redireccion){
    var url='';

    switch(peticion){
        case "login":
            url='index.html';
            break;
        case "inicio":
            url='inicio.html';
            break;
        case "edicionAutomovil":
            url='edicionAutomovil.html';
            break;
        case "edicionEntradas":
            url='edicionEntradas.html';
            break;
        case "edicionSalidas":
            url='edicionSalidas.html';
            break;
        case "medicionLlantas":
            autoSeleccionado = almacenamiento.dameAutomovilSeleccionado();
            auto = almacenamiento.dameAutomovil(autoSeleccionado.id);
            if($("#kilometraje").val()==""){
                _mensaje("Atención","Debe ingresar el kilometraje para el automóvil.","Entendido");
                return null;
            }
            if(parseFloat($("#kilometraje").val())<parseFloat(auto.kilometraje)){
                 _mensaje("Atención","El kilometraje que se ingresó debe ser mayor o igual al que ya esta almacenado.","Entendido");
                return null;
            }
            //guardamos el kilometraje y el status del automovil
            almacenamiento.guardarKilometrajeAutomovil(automovilSeleccionado.id,$("#status").val(),$("#kilometraje").val());
            url='medicionLlantas.html';
            break;
        case "secciones":
            console.log("redireccionando a: ");
            console.log(peticion+":"+redireccion);
            if(redireccion!=undefined && redireccion!='' && redireccion!=null){
                url='secciones.html'+redireccion;
            }else{
                url='secciones.html'; 
            }
            //return null;
            break;
        case "sincronizacion":
            url='sincronizacion.html';
            break;
        case "edicion-servicios":
            id=(id!=undefined && id!=''? id:'');
            
            idAutomovil=(idAutomovil!=undefined && idAutomovil!=''? idAutomovil:0);
            
            servicio_id=(servicio_id!=null? servicio_id:null);
            console.log(id+' '+idAutomovil+' '+servicio_id);
            
            //redireccion en este caso trae el id del sistema y no el hash cn la ruta
            sistema_id=(redireccion!=null? redireccion:null);
            console.log(id+' '+idAutomovil+' '+sistema_id);
            
            almacenamiento.seleccionarServicio(id,idAutomovil,servicio_id,sistema_id);
            url='edicion-servicios.html';
            break;
        case "edicion-incidentes":
            id=(id!=undefined && id!=''? id:'');
            
            idAutomovil=(idAutomovil!=undefined && idAutomovil!=''? idAutomovil:0);
            
            incidente_id=(servicio_id!=undefined && servicio_id!=''? servicio_id:0);
            console.log(id+' '+idAutomovil+' '+incidente_id);
            
            almacenamiento.seleccionarIncidente(id,idAutomovil,incidente_id);
            url='edicion-incidentes.html';
            break;
        case "edicion-detalle":
            id=(id!=undefined && id!=''? id:'');
            
            idAutomovil=(idAutomovil!=undefined && idAutomovil!=''? idAutomovil:0);
            
            almacenamiento.seleccionarDetalle(id,idAutomovil);
            url='edicion-detalle.html';
            break;
        case "acercaDe":
            url='acercaDe.html';
            break;
        case "salir":
            break;
        case "Entradas":
             url='Entradas.html';
            break;
        case "Salidas":
             url='Salidas.html';
            break;
    }
    if(peticion!="salir"){
        window.location = ''+url;
    }
}

function cerrarApp(){
    almacenamiento.limpiarTodo();
    navigator.app.exitApp();
}

function permiteNumerosConDecimal(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;

    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
        
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46 && value!='') return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}
function prueba(){
     console.log("entra a la funcion prueba");
}
function permiteNumerosConDosDecimales(evt, obj)
{
    console.log("entra a la funcion");
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;

    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
        
    var dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if(dotcontains){
        valor = value.split(".");
        if(valor[1].length>=2){
            return false;
        }
    }
    if (charCode == 46 && value!='') return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}
function permiteNumerosSinDecimal(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    console.log(charCode);
    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
    var dotcontains = value.indexOf(".") != 1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}

function permiteNumerosSinDecimalConGuionConEspacio(evt, obj)
{
    
    var charCode = (evt.which) ? evt.which : event.keyCode
    var value = obj.value;
    if(charCode==127 ||charCode==37 ||charCode==39)
        return true;
    var dotcontains = value.indexOf(".") != 1;
    var spacecontains = value.indexOf(" ") != -1;
    var guioncontains = value.indexOf("-") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (spacecontains)
        if (charCode == 32) return false;
    if (guioncontains)
        if (charCode == 45) return false;

    if (charCode == 46) return true;
    if (charCode == 32) return true;
    if (charCode == 45) return true;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}

function hoy(){
    var hoy = new Date();
    var anio = hoy.getFullYear();
    var mes = ((hoy.getMonth()+1) <10)? '0' +(hoy.getMonth()+1) :  (hoy.getMonth()+1);
    var dia = ((hoy.getDate()) <10) ?'0'+(hoy.getDate()+1) : (hoy.getDate());
    console.log(anio+"-"+mes+"-"+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getMilliseconds());
    
    return (anio+"-"+mes+"-"+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":00");
}

function fechaHoy(){
    var hoy = new Date();
    var anio = hoy.getFullYear();
    var mes = ((hoy.getMonth()+1) <10)? '0' +(hoy.getMonth()+1) :  (hoy.getMonth()+1);
    var dia = ((hoy.getDate()) <10) ?'0'+(hoy.getDate()) : hoy.getDate();
    console.log(hoy.getDate());
    console.log(anio+"-"+mes+"-"+dia);
    
    return anio+"-"+mes+"-"+dia;
}

function fechaMananaBien(){
    var hoy=new Date();
	hoy.setDate(hoy.getDate()+1);
    var anio=hoy.getFullYear();
    var mes =((hoy.getMonth()+1) <10)? '0' +(hoy.getMonth()+1) :  (hoy.getMonth()+1);
    var dia =((hoy.getDate()) <10) ?'0'+(hoy.getDate()) : hoy.getDate();
    return anio+"-"+mes+"-"+dia;
}//function

function fechaMañana(){
    var hoy = new Date();
    var anio = hoy.getFullYear();
    var mes = ((hoy.getMonth()+1) <10)? '0' +(hoy.getMonth()+1) :  (hoy.getMonth()+1);
    var dia = ((hoy.getDate()) <10) ?'0'+(hoy.getDate()+1) : (hoy.getDate()+1);
    console.log(anio+"-"+mes+"-"+dia);
    
    return anio+"-"+mes+"-"+dia;
}

function hoySQL(){
    var hoy = new Date();
    var anio = hoy.getFullYear();
    var mes = ((hoy.getMonth()+1) <10)? '0' +(hoy.getMonth()+1) :  (hoy.getMonth()+1);
    var dia = ((hoy.getDate()) <10) ?'0'+(hoy.getDate()) : (hoy.getDate());
    console.log(anio+"-"+mes+"-"+dia+" "+hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getMilliseconds());
    
    return (anio+"-"+mes+"-"+dia+"T"+hoy.getHours()+":"+hoy.getMinutes()+":00");
}
function fechaMasUnDia(fecha){
    var fecha = fecha.split("-");
    var dia = parseInt(fecha[2]);
    dia = dia+1;
    if(dia<10){
        dia = '0'+dia;
    }
    console.log(fecha[0]+"-"+fecha[1]+"-"+dia);
    
    return (fecha[0]+"-"+fecha[1]+"-"+dia); 
}
function fechaMenosUnDia(fecha){
    var fecha = fecha.split("-");
    var dia = parseInt(fecha[2]);
    dia--;
    console.log(fecha[0]+"-"+fecha[1]+"-"+dia);
    
    return (fecha[0]+"-"+fecha[1]+"-"+dia);
}
var idAuto='';
var cuantosDocumentos=0;
var contadorDocumentos=0;
function dameTodosLosAutosDelGestor(gestor_id){
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-automoviles",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			gestor_id: gestor_id
		},
        processData:true,
		success:	function(re){
            console.log("Automoviles del gestorr: ");
            console.log(JSON.stringify(re));
           
            if(re.length>0){
                //recorremos los automoviles
                var ciclos = re.length;
                var z=0;
                var configuracion ='';
                configuracion = almacenamiento.dameConfiguracion();
                //obtenemos los componentes y detalles disponibles
                dameTodosLosComponentesDisponibles();
                dameTodosLosDetallesDisponibles();
                
                $.each(re, function(ii, itemm) {
                    console.log("Auto: ");
                    console.log(itemm); 
                    idAuto=itemm.id;
                    //console.log(itemm);
                    if(typeof itemm.conductor == 'object' || itemm.conductor == undefined){
                        console.log("objeto vacio");
                        itemm.conductor = "";
                    }
 
                    if(typeof itemm.placas == 'object' || itemm.placas == undefined){
                        console.log("objeto vacio");
                        itemm.placas = "";
                    }
                    //guardamos localmente todos los autos
                    almacenamiento.guardarAutomovil(itemm.id,itemm.conductor,itemm.placas,itemm.numero_serie,itemm.numero_economico,itemm.id_gps,itemm.kilometraje,itemm.modelo_id,itemm.modelo,itemm.marca_id,itemm.marca,itemm.ruta_id,itemm.nombre,itemm.region_id,itemm.region,itemm.fecha_actualizacion,itemm.status,itemm.semaforo,0,itemm.notificacion_servicio,itemm.proximo_servicio,itemm.frecuencia_servicio);
                    configuracion = almacenamiento.dameConfiguracion();
                    dameTodasLasMedicionesDelAuto(itemm.id,configuracion.verde_llantas,configuracion.amarillo_llantas);
                    dameTodosLosCambiosRegistrados(itemm.id);
                    
                    
                    //obtenemos los detalles relacionados al auto
                    dameTodosLosDetallesDelAutomovil(itemm.id);
                    
                    dameTodosLosServiciosDelAutomovil(itemm.id);
                    dameTodosLosIncidentesDelAutomovil(itemm.id);
                    dameTodosLosDocumentosDisponibles(itemm.id);
                    
                    //obtenemos todas
                    
                    if(z == ciclos-1){
                        //obtenemos las caracteristicas de cada auto
                        dameTodasLasCaracteristicas();
                    }
                    z++;
                });
            }else{
                _mensaje("Atención","No tienes automoviles ligados","Entendido");
            }//if
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los autos del gestor.","Entendido");
		}
	});
}
function dameTodasLasCaracteristicas(){
    var automoviles = almacenamiento.dameAutomoviles();
    //recorremos cada auto
    $.each(automoviles, function(ai, aitem){
        idAutomovil = aitem.id;
        //obtenemos las caracteristicas para cada carro
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
                         z=0;
                         if(ciclos==0){
                            dameTodosLosTiposDeDocumentosDisponibles(idAutomovil);
                          }
                            $.each(re, function(i, item){
                                console.log(i);
                                console.log(item);

                                $.each(item, function(x, caracteristica) {
                                    console.log(caracteristica);
                                    if(i=="seleccionadas"){
                                        console.log("guarda la caracteristica como seleccionada: "+ aitem.id);
                                         almacenamiento.guardarCaracteristica(caracteristica.automovil_id,caracteristica.caracteristica_id,caracteristica.caracteristica,0,1,0);
                                    }else{
                                        console.log("guarda la caracteristica como disponible: "+aitem.id);
                                        almacenamiento.guardarCaracteristica(aitem.id,caracteristica.caracteristica_id,caracteristica.caracteristica,1,0,0);
                                    }                                
                                });
                               
                                
                                if(z == ciclos-1){
                                    dameTodosLosTiposDeDocumentosDisponibles(idAutomovil);
                                }
                                z++;
                            });

                     }
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener las caracteristicas del automovil.","Entendido");
            }
        });
    });
    
}


function dameTodosLosDetallesDelAutomovil(idAutomovil){
        var clav=clave();
    $.ajax({
		url:      dominio+"dame-detalles-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo detalles del automovil: "+idAutomovil);
            console.log(re); 
            
                 if(re!=undefined && re!=null){
                       
                        
                        $.each(re, function(i, item){
                            sincronizableDetalle = 0;
                            console.log(item);
                            if(typeof item.fecha_reparacion == 'object' || item.fecha_reparacion == undefined){
                                console.log("objeto vacio");
                                item.fecha_reparacion = "";
                            }

                            almacenamiento.guardarDetalleAutomovil(idAutomovil,item.id,item.componente_id,item.nombre_componente,item.detalle_id,item.nombre_detalle,item.fecha_detalle,item.observacion,item.fue_reparado,item.fecha_reparacion,sincronizableDetalle);
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los detalles del automovil.","Entendido");
		}
	});
}

function dameTodosLosComponentesDisponibles(){
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-componentes-disponibles",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),

		},
        processData:true,
		success:	function(re){
            console.log("obteniendo los componentes disponibles: ");
            console.log(re);
            
                 if(re!=undefined && re!=null){
                       
                        $.each(re, function(i, item){
                            almacenamiento.guardarComponentes(item.id,item.nombre,item.status);
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los componentes del automovil.","Entendido");
		}
	});
}

function dameTodosLosDetallesDisponibles(){
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-detalles-disponibles",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),

		},
        processData:true,
		success:	function(re){
            console.log("obteniendo los detalles disponibles: ");
            console.log(re);
            
                 if(re!=undefined && re!=null){
                       
                        $.each(re, function(i, item){
                            almacenamiento.guardarDetallesDisponibles(item.id,item.nombre,item.status);
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los detalles del automovil.","Entendido");
		}
	});
}


function dameTodosLosServiciosDelAutomovil(idAutomovil){
        var clav=clave();
    $.ajax({
		url:      dominio+"dame-servicios-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo servicios del automovil: "+idAutomovil);
            console.log(re);
            
                 if(re!=undefined && re!=null){
                       
                        var ciclo = re.length;
                        var contador =0; 
                        
                        $.each(re, function(i, item){
                            sincronizableFactura = 0;
                            sincronizableServicio = 1;
                            
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
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los servicios del automovil.","Entendido");
		}
	});
}

function dameTodosLosIncidentesDelAutomovil(idAutomovil){
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-incidentes-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil
		},
        processData:true,
		success:	function(re){
           console.log("obteniendo incidentes del automovil: "+idAutomovil);
            console.log(re);
            
                 if(re!=undefined && re!=null){
                        
                        var ciclo = re.length;
                        var contador =0;

                        $.each(re, function(i, item){
                            sincronizableFactura = 0;
                            sincronizableIncidente = 1;
                            
                            console.log(item.factura);
                            if(typeof item.factura == 'object' || item.factura == undefined){
                                console.log("objeto vacio");
                                item.factura = "";
                                sincronizableFactura = 1;
                            }
                            if(typeof item.numero_siniestro == 'object' || item.numero_siniestro == undefined){
                                console.log("objeto vacio");
                                item.numero_siniestro = "";
                            }
                            
                            if(item.factura=='' || item.monto =='' || item.factura == undefined){
                                sincronizableFactura = 1;
                            }
                            
                            if(item.fecha_entrega=='' || item.fecha_entrega==undefined){
                                sincronizableIncidente = 1;
                            }else{
                                sincronizableIncidente = 0;
                            }
                            almacenamiento.guardarIncidente(item.idAutomovil,item.id,item.incidente_id,item.incidente,item.taller_id,item.taller,item.factura,item.monto,item.kilometraje,item.status,item.fecha,item.fecha_prometida,item.fecha_entrega,item.status_incidente,sincronizableIncidente,sincronizableFactura,item.numero_siniestro);
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener los incidentes del automovil.","Entendido");
		}
	});
}


function dameTodosLosTiposDeDocumentosDisponibles(idAutomovil){
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
                var ciclos = re.length;
                var z=0;
                if(ciclos==0){
                    dameTodosLosTalleresDisponibles(idAutomovil);
                }
                $.each(re, function(i, item){
                   
                    almacenamiento.guardarTiposDeDocumentosDisponibles(item.id,item.nombre,item.status);
                    
                    if(z == ciclos-1){
                        dameTodosLosTalleresDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener obtener los tipos de documentos disponibles.","Entendido");
            }
        });
}
function dameTodosLosTalleresDisponibles(idAutomovil){
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
                var ciclos = re.length;
                var z=0;
                if(ciclos==0){
                    dameTodosLosServiciosDisponibles(idAutomovil);
                }
                $.each(re, function(i, item){
                   
                    almacenamiento.guardarTalleresDisponibles(item.id,item.nombre,item.status);
                    
                    if(z == ciclos-1){
                        dameTodosLosServiciosDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los talleres.","Entendido");
            }
        });
}

function dameTodosLosServiciosDisponibles(idAutomovil){
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
                var ciclos = re.length;
                var z=0;
                if(ciclos==0){
                    dameTodosLosIncidentesDisponibles(idAutomovil);
                }
                
                $.each(re, function(i, item){
                   
                    almacenamiento.guardarServiciosDisponibles(item.id,item.nombre,item.status);
                    
                    if(z == ciclos-1){
                        dameTodosLosIncidentesDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los talleres.","Entendido");
            }
        });
}

function dameTodosLosIncidentesDisponibles(idAutomovil){
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
                console.log("obteniendo los incidente disponibles: ");
                console.log(re);
                var ciclos = re.length;
                var z=0;
                
                if(ciclos==0){
                    //window.location="inicio.html";
                    dameTodosLosSistemasDisponibles(idAutomovil);
                    //dameTodosLosDocumentosDisponibles(idAutomovil);
                }
                
                $.each(re, function(i, item){
                   
                    almacenamiento.guardarIncidentesDisponibles(item.id,item.nombre,item.status);
                    
                    if(z == ciclos-1){
                       // window.location="inicio.html";
                        dameTodosLosSistemasDisponibles(idAutomovil);
                        //dameTodosLosDocumentosDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los incidentes.","Entendido");
            }
        });
}
function dameTodosLosSistemasDisponibles(idAutomovil){
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
                var ciclos = re.length;
                var z=0;
                
                if(ciclos==0){
                    //dameTodosLosCambiosRegistrados(idAutomovil);
                     window.location="inicio.html";
                    //dameTodaLaConfiguracion();
                    //dameTodosLosSistemasDisponibles();
                    //dameTodosLosDocumentosDisponibles(idAutomovil);
                }
                
                $.each(re, function(i, item){
                    almacenamiento.guardarSistemasDisponibles(item.id,item.nombre,item.status);
                    
                    if(z == ciclos-1){
                        //dameTodosLosCambiosRegistrados(idAutomovil);
                         window.location="inicio.html";
                        //dameTodaLaConfiguracion();
                        //dameTodosLosSistemasDisponibles();
                        //dameTodosLosDocumentosDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los sistemas.","Entendido");
            }
        });
}

function dameTodosLosCambiosRegistrados(idAutomovil){
        var clav=clave();
        $.ajax({
            url:      dominio+"dame-cambios-de-llantas-automovil",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr),
                idAutomovil: idAutomovil
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo los cambios registrados disponibles: "+idAutomovil);
                console.log(re);
                var ciclos = re.length;
                var z=0;
                
                if(ciclos==0){
                    window.location="inicio.html";
                    //dameTodaLaConfiguracion();
                    //dameTodosLosSistemasDisponibles();
                    //dameTodosLosDocumentosDisponibles(idAutomovil);
                }
                
                $.each(re, function(i, item){
                    almacenamiento.guardarCambioLlanta(item.idAutomovil,item.idCambio,item.fecha_cambio,item.numero_llantas,0);
                    
                    if(z == ciclos-1){
                         window.location="inicio.html";
                        //dameTodaLaConfiguracion();
                        //dameTodosLosSistemasDisponibles();
                        //dameTodosLosDocumentosDisponibles(idAutomovil);
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los sistemas.","Entendido");
            }
        });
}
function dameTodaLaConfiguracion(gestor_id){
    var clav=clave();
        $.ajax({
            url:      dominio+"dame-configuracion",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr)
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo la configuración del sistema: ");
                console.log(re);
                var ciclos = re.length;
                var z=0;
                
                if(ciclos==0){
                    //window.location="inicio.html";
                     //dameTodosLosAutosDelGestor(gestor_id);
                }
                
                $.each(re, function(i, item){
                    almacenamiento.guardarConfiguracion(item.id,item.verde_llantas,item.amarillo_llantas);
                    dameTodosLosAutosDelGestor(gestor_id);
                    if(z == ciclos-1){
                       // window.location="inicio.html";
                       
                    }
                    z++;
                });
            },
            error: function(re){
                console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los sistemas.","Entendido");
            }
        });
    
}
function dameTodasLasMedicionesDelAuto(idAutomovil,verde,amarillo){
     //obtenemos las mediciones de la base de datos y las almacenamos localmente
    var clav=clave();
    $.ajax({
		url:      dominio+"dame-medicion-llantas-automovil",
		type:     'POST',
        dataType: "json",
		data:	{
            clave:     clav,
            codigo:    sha1(clav+palaSecr),
			idAutomovil: idAutomovil,
            verde_llantas:verde,
            amarillo_llantas:amarillo
		},
        processData:true,
		success:	function(re){
            console.log("obteniendo mediciones del automovil: "+idAutomovil);
            console.log(re);
            
                 if(re!=undefined && re!=null){
                     
                        $.each(re, function(i, item){
                            almacenamiento.guardarMedicionLlanta(item.idAutomovil,item.id,item.fecha,item.delantera_izquierda,item.delantera_derecha,item.trasera_izquierda,item.trasera_derecha,item.status_delantera_izquierda,item.status_delantera_derecha,item.status_trasera_izquierda,item.status_trasera_derecha,0);
                        });
                        
                 }
		},
		error: function(re){
            console.log(re);
            _mensaje("Atención","No hay internet, no se pudo obtener las mediciones de las llantas del automovil.","Entendido");
		}
	});
}

function dameTodosLosDocumentosDisponibles(idAutomovil){
    var clav=clave();
        $.ajax({
            url:      dominio+"dame-documentos-disponibles",
            type:     'POST',
            dataType: "json",
            data:	{
                clave:     clav,
                codigo:    sha1(clav+palaSecr),
                idAutomovil: idAutomovil
            },
            processData:true,
            success:	function(re){
                console.log("obteniendo el documento del automovil: "+idAutomovil);
                console.log(re);
                
                     if(re!=undefined && re!=null && re!=''){
                            
                            var ciclo = re.length;
                            var contador =0;
                           
                            if(contador==0){
                                //irA('inicio');
                            }
                         
                         
                            $.each(re, function(i, item){
                                 
                                almacenamiento.guardarDocumento(item.automovil_id,item.id,item.tipo_documento_id,item.tipo_documento,item.fecha,item.archivo,rutaDocumentos+item.archivo,item.status,0);
                                //realizamos la descarga de los archivos
                                //request(rutaDocumentos+item.archivo,item.archivo,'2','',idAutomovil);
                                if(contador==ciclo-1){
                                    
                                }
                                contador++;
                            });
                         
                     }
            },
            error: function(re){
                 console.log(re);
                _mensaje("Atención","No hay internet, no se pudo obtener los documentos del automovil.","Entendido");
            }
        }); 
}

function request(urlDescarga,nombreArchivo,opcionMostrar,idElement,idAutomovil){
    console.log("se requiere de un archivo: "+nombreArchivo);
    window.requestFileSystem(window.TEMPORARY, 500 * 1024 * 1024, function (fs){
        console.log('obteniendo el Archivo: ' + fs.name);
        // Make sure you add the domain name to the Content-Security-Policy <meta> element. 
        // Parameters passed to getFile create a new file or return the file if it already exists. 
        fs.root.getFile(nombreArchivo, { create: true, exclusive: false }, function (fileEntry) {
            console.log("Ruta: "+fileEntry.fullPath);
                download(fileEntry, urlDescarga, opcionMostrar,idElement,idAutomovil);
        }, function(e){//archivo creado
            console.log("error al crear el recurso: "+e);
            _mensaje("Atención","El documento "+nombreArchivo+" no se pudo guardar en el dispositivo.","Entendido");
        });
 
    }, function(e){//archivo obtenido
        var msg = '';
        console.log("error durante la peticion del archivo: "+nombreArchivo);
          switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
              msg = 'Limite de descarga excedido.';
              break;
            case FileError.NOT_FOUND_ERR:
              msg = 'NOT_FOUND_ERR';
              break;
            case FileError.SECURITY_ERR:
              msg = 'SECURITY_ERR';
              break;
            case FileError.INVALID_MODIFICATION_ERR:
              msg = 'INVALID_MODIFICATION_ERR';
              break;
            case FileError.INVALID_STATE_ERR:
              msg = 'INVALID_STATE_ERR';
              break;
            default:
              msg = 'La conexión inalámbrica a Internet puede ser intermitente o estar muy lenta.';
              break;
          };
        console.log("error al obtener el recurso: "+msg);
        console.log(e);
        _mensaje("Atención","Error al descargar el documento "+nombreArchivo+": "+msg,"Entendido");
    });
    
}

function download(fileEntry, uri, mostrar,idElement,idAutomovil) {
    var fileTransfer = new FileTransfer();
    //asignamos la ruta donde se va a guardar
    var fileURL = descargaDocumentos+ fileEntry.fullPath;
    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            console.log("Descarga correcta...");
            console.log(entry);
            
            //mostrar: 1= lectura,0=solo mostrar,2 = no  hacer nada
            if(mostrar==1){
              leerArchivo(entry);
            }else if(mostrar==0){
              mostrarArchivo(entry,idElement);
            }
            
        },
        function (error) {
            console.log("error al descargar source " + error.source);
            console.log("error al descargar target " + error.target);
            console.log("error al subir code" + error.code);
            _mensaje("Atención","Error durante la descarga del documento: "+error.source,"Entendido");
        },
        null, // or, pass false 
        {
            //headers: { 
              //  "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==" 
            //} 
        }
    );
}
function leerArchivo(fileEntry,idElement) {
    fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log("Lectura correcta del archivo: " + this.result);
            // displayFileData(fileEntry.fullPath + ": " + this.result); 
 
            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            displayImage(blob,idElement);
        };
        reader.readAsArrayBuffer(file);
    }, function(e){
        console.log("Error al leer el archivo: "+e);
    });
}

function mostrarArchivo(fileEntry,idElement) {
    var elem = document.getElementById(idElement);
    elem.src = fileEntry.toURL();
}

function displayImage(blob,idElement) {
    // Note: Use window.URL.revokeObjectURL when finished with image. 
    var objURL = window.URL.createObjectURL(blob);
    // Displays image if result is a valid DOM string for an image. 
    var elem = document.getElementById(idElement);
    elem.src = objURL;
    window.URL.revokeObjectURL(blob);
}
function ClearDirectory() {
    console.log("entra a borrar archivos");

    console.log("remove file");
    ///storage/emulated/0/ControlDeFlotillas 
    var relativeFilePath = "ControlDeFlotillas/";
    window.resolveLocalFileSystemURL("file:///storage/emulated/0/ControlDeFlotillas/", function(fileSystem){
        console.log(fileSystem);
        fileSystem.removeRecursively(function(){
                
                console.log("correcto");
                
            },function(){
                console.log("incorrecto"); 
            });
        //absolute fileSystem path to the application storage directory
        /*fileSystem.root.getDirectory("", {create:false}, function(fileEntry){
            console.log(fileEntry);
            /*fileEntry.removeRecursively(function(){
                
                console.log("correcto");
                
            },function(){
                console.log("incorrecto"); 
            });*/
       /* },function(evt){
            console.log(evt);
        });*/
    },function(evt){
        console.log(evt);
    });
}

function pasarAlProximoServicio(no_cambiar_notificacion){
    a = almacenamiento.dameAutomovilSeleccionado();
    seleccion = almacenamiento.dameAutomovil(a.id);

    //obtenemos el kilometraje actual
    km_actual = parseFloat(seleccion.proximo_servicio);
    //obtenemos la frecuencia del servicio
    fs = parseFloat(seleccion.frecuencia_servicio);
    //hacemos una division para obtener el modulo y el cociente y residuo y formateamos con una decimal
    division = (km_actual/fs).toFixed(4);
    console.log("La division es: "+division);
    partes_division = division.split(".");
    console.log("Las partes son: "+partes_division.toString());
    cociente = parseFloat(partes_division[0]);
    residuo = parseFloat(partes_division[1]);

    ps = (fs * cociente)+fs;
    //actualizamos el automovil.
    console.log("El proximo servicio es: "+ps);
    //cuando actualizamos al proximo servicio, la notificacion del automovil la ponemos en circulacion.
    if(no_cambiar_notificacion == 1){
         almacenamiento.actualizarNotificacionServicio(seleccion.id,'',ps);
    }else{
         almacenamiento.actualizarNotificacionServicio(seleccion.id,3,ps);
    }
   
    $("#select_notificacion_servicio").attr("notificacionActual",3);
    alert("Notificación de Servicio\r\nLa notificación para el próximo servicio se actualizó correctamente");//Bustos dice el _mensaje no detiene el flujo del programa por lo tanto nunca se leera, porque se redirecciona de inmediato.
    //_mensaje("Notificación de Servicio","La notificación para el próximo servicio se actualizó correctamente","Entendido");
}

function setearNotificacionOriginal(){
    console.log("cancel modal");
    $("#select_notificacion_servicio").val($("#select_notificacion_servicio").attr("notificacionActual").valueOf());
}
function verificarProximoServicio(idAutomovil){
    
    automovil = almacenamiento.dameAutomovil(idAutomovil);

    km_actual = parseFloat(automovil.kilometraje);
    frecuencia_servicio = parseFloat(automovil.frecuencia_servicio);
    division = parseFloat(km_actual/frecuencia_servicio).toFixed(4);
    partes_division = division.split(".");
    cociente = partes_division[0];
    residuo = partes_division[1];

    if(division>0 && division<=1.1000){//el automovil actual aun no llega a su primer servicio
        proximo_servicio = automovil.proximo_servicio;//se queda igual. $configuracion->km_por_omision;
    }else{//ya ha tenido varios servicios
        proximo_servicio = parseFloat(automovil.frecuencia_servicio * cociente)+parseFloat(automovil.frecuencia_servicio);
    }
 
    almacenamiento.actualizarNotificacionServicio(idAutomovil,'',proximo_servicio,1);
}
function esNecesarioPasarAlProximoServicio(idAutomovil){
    //alert("Es necesario pasar al proximo");
    automovil = almacenamiento.dameAutomovil(idAutomovil);
    var km_actual = parseFloat(automovil.kilometraje);
    var rango_frecuencia = parseFloat(automovil.frecuencia_servicio/2);
    var proximo_servicio = parseFloat(automovil.proximo_servicio);
    
    
    if(km_actual > (proximo_servicio - rango_frecuencia)){
        //alert("pasará al proximo servicio");
        pasarAlProximoServicio(1);
    }
}


function verificarNotificacion(idAutomovil){
    console.log("se verifica la notificacion para el automovil_id: "+idAutomovil);
    automovil = almacenamiento.dameAutomovil(idAutomovil);
    console.log("kilometraje: "+parseFloat(automovil.kilometraje)+" y "+parseFloat(automovil.proximo_servicio));
    if(parseFloat(automovil.kilometraje)>=parseFloat(automovil.proximo_servicio - 1000) && parseFloat(automovil.kilometraje)<=parseFloat(automovil.proximo_servicio + 1000)){
        //para servicio
        notificacion_servicio = 1;
        console.log("notificacion 1"+parseFloat(automovil.kilometraje));
    }else if(parseFloat(automovil.kilometraje)>=(parseFloat(automovil.proximo_servicio) + 1000)){
        //servicio retrasado
        notificacion_servicio = 4;
        console.log("notificacion 4"+parseFloat(automovil.kilometraje));
    }else{
        //en circulacion; su proximo servicio aun no esta cerca
        notificacion_servicio = 3;
        console.log("notificacion 3"+parseFloat(automovil.kilometraje));
    }
    almacenamiento.actualizarNotificacionServicio(idAutomovil,notificacion_servicio,'');
       
}
