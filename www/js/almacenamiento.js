almacenamiento={};
almacenamiento.limpiarTodo=function(){
    try{
       localStorage.clear();
        return true;
    }catch(error){
        return false;
    }//try
};
almacenamiento.pedirIdNuevo=function(){
    var id=localStorage.getItem("idLocal");
    if(id!=null){
        eval("id="+id+";");
        incrementable = parseInt(id.id)+1;
        localStorage.setItem("idLocal",JSON.stringify({id:incrementable}));
    }else{
        localStorage.setItem("idLocal",JSON.stringify({id:1}));
        incrementable = 1;
    }
    return incrementable;
    
}//function
almacenamiento.loguear=function(id, nombre, email, tipo, status){
    localStorage.setItem("usuario",JSON.stringify({id:id,nombre:nombre,email:email,tipo:tipo,status:status}));
}//function

almacenamiento.dameUsuario=function(){
    var usuario=localStorage.getItem("usuario");
    if(usuario!=null){
        eval("usuario="+usuario+";");
        return usuario;
    }//if
    return null;
}//function

almacenamiento.seleccionFlotilla=function(flotilla){
    localStorage.setItem("flotillaSeleccionada",JSON.stringify({numero:flotilla}));
}//function


almacenamiento.dameNumeroFlotillaSeleccionada=function(){
    var flotillaSeleccionada=localStorage.getItem("flotillaSeleccionada");
    if(flotillaSeleccionada!=null){
        eval("flotillaSeleccionada="+flotillaSeleccionada+";");
        return flotillaSeleccionada;
    }//if
    return null;
}//function


almacenamiento.seleccionaAutomovil=function(idAutomovil){
    localStorage.setItem("automovilSeleccionado",JSON.stringify({id:idAutomovil}));
}//function

almacenamiento.dameAutomovilSeleccionado=function(){
    var automovilSeleccionado=localStorage.getItem("automovilSeleccionado");
    if(automovilSeleccionado!=null){
        eval("automovilSeleccionado="+automovilSeleccionado+";");
        return automovilSeleccionado;
    }//if
    return null;
}//function

almacenamiento.dameAutomoviles=function(){
    var autos=localStorage.getItem("autos");
    if(autos!=null){
        eval("autos="+autos+";");
        return autos;
    }//if
    return null;
}//function
almacenamiento.guardarConfiguracion=function(id,verde_llantas,amarillo_llantas){
    localStorage.setItem("configuracion",JSON.stringify({id:id,verde_llantas:verde_llantas,amarillo_llantas:amarillo_llantas})); 
}
almacenamiento.dameConfiguracion=function(){
    var configuracion=localStorage.getItem("configuracion");
    if(configuracion!=null){
        eval("configuracion="+configuracion+";");
        return configuracion;
    }//if
    return null;
}//function
almacenamiento.guardarAutomovil=function(id,conductor,placas,numero_serie,numero_economico,id_gps,kilometraje,modelo_id,modelo,marca_id,marca,ruta_id,ruta,region_id,region,fecha_actualizacion,status,semaforo,sincronizable,notificacion_servicio,proximo_servicio,frecuencia_servicio, usuario_jcr_id, usuario_jcr2_id, usuario_director_id){
    sincronizable = (sincronizable==0)?0:1;
    
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var existe = true;
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){ 
            existe = false;
        }
    });
    if(existe==true){
        console.log("se agrego un auto al almacenamiento interno: "+id+" ->"+kilometraje+" notificacion: "+notificacion_servicio);
       //agregamos el nuevo auto
        autos.push({id:id,conductor:conductor,placas:placas,numero_serie:numero_serie,numero_economico:numero_economico,id_gps:id_gps,kilometraje:kilometraje,modelo_id:modelo_id,modelo:modelo,marca_id:marca_id,marca:marca,ruta_id:ruta_id,ruta:ruta,region_id:region_id,region:region,fecha_actualizacion:fecha_actualizacion,status:status,semaforo:semaforo,sincronizable:sincronizable,notificacion_servicio:notificacion_servicio,proximo_servicio:proximo_servicio,frecuencia_servicio:frecuencia_servicio,usuario_jcr_id:usuario_jcr_id,usuario_jcr2_id:usuario_jcr2_id,usuario_director_id:usuario_director_id});
        //guardamos ahora todos los automoviles
        localStorage.setItem("autos", JSON.stringify(autos));
    }
    
}
almacenamiento.guardarKilometrajeAutomovil=function(id,status,kilometraje){
    console.log("guardarKilometrajeAutomovil***" )
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var Actualizar=[];
    var verificarNotificacion = 0;
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            if(kilometraje!=item.kilometraje){
                console.log("hubo cambios en el kilometraje");
                //verificarNotificacion = 1;
                //el cron se debe encargar de ajustar los estatus de la otificacion
                if(parseInt(kilometraje)>parseInt(item.proximo_servicio)){
                    console.log("entra en servicio retrasado");
                    item.notificacion_servicio = 4;//si se modifico el kilometraje y sobrepasa el proximo servicio entonces lo pasamos a servicio rechazado
                }
            }
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    
    //verificamos en base al nuevo kilometraje (si es que se modifico) si es necesario actualizar su notificacion
    if(verificarNotificacion == 1){
        //verificarProximoServicio(id)
        //verificarNotificacion(id); 
    }
    
    
}
almacenamiento.actualizarKilometrajeAutomovil=function(id,kilometraje){
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var Actualizar=[];
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    
    
}
almacenamiento.actualizarEstatusNotificacionServicio=function(id,notificacion_servicio){
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var Actualizar=[];
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio});
        }
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    
    
}
almacenamiento.actualizarNotificacionServicio=function(id,ns,ps,verificar){
    
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || []; 
    var Actualizar=[];
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            if(ns=='' || ns ==undefined || ns<=0){
                ns = item.notificacion_servicio;
            }else{
                ns = ns;
            } 
            
            if(ps=='' || ps ==undefined || ps<=0){
                ps = item.proximo_servicio;
            }else{ 
                ps = ps;
            }
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:ns,proximo_servicio:ps,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }
    });
    console.log("Autos: ");
    console.log(Actualizar);
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    if(verificar==1){
        verificarNotificacion(id);
    }
}
almacenamiento.actualizarEstatusAutomovil=function(id,status,color){
    //obtenemos los autos almacenados
    console.log("Se actualiza el estatus del automovil: "+id);
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var Actualizar=[];
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:status,semaforo:color,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    
    
}
almacenamiento.dameAutomovil=function(idAutomovil){
    var auto=[];
    var automoviles=JSON.parse(localStorage.getItem("autos"));
    //return automoviles;
    if(automoviles!=null){
        $.each(automoviles, function(i, item) {
            if(item.id==idAutomovil){
               auto.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,sincronizable:item.sincronizable,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id, usuario_jcr2_id:item.usuario_jcr2_id, usuario_director_id:item.usuario_director_id});
            }
        });
        return auto[0];
    }else{
        return null;
    }
}//function

almacenamiento.guardarCaracteristica=function(automovil_id,caracteristica_id,caracteristica,disponible,seleccionada,sincronizable){
    sincronizable = (sincronizable==0)?0:1;
    
    //obtenemos los autos almacenados
    var caracteristicas_autos = JSON.parse(localStorage.getItem("caracteristicas_autos")) || [];
    var existe = false;
    
    if(seleccionada == 1){// si viene seleccionada de la base de datos
        //busco si ya esta almacenada en localstorage
        $.each(caracteristicas_autos, function(i, item) {
            if(item.automovil_id==automovil_id && caracteristica_id == item.caracteristica_id){
                existe = true;
            }
        });
        //si no existe la agrego
        if(existe==false){
            console.log("se agrego una caracteristica para el auto "+automovil_id+" al almacenamiento interno.");
            console.log(automovil_id+" "+caracteristica_id+" "+caracteristica+" "+disponible+" "+seleccionada);
           //agregamos ela nueva caracteristica
            caracteristicas_autos.push({automovil_id:automovil_id, caracteristica_id:caracteristica_id,caracteristica:caracteristica,disponible:disponible,seleccionada:seleccionada});
            //guardamos ahora todas las caracteristicas
            localStorage.setItem("caracteristicas_autos", JSON.stringify(caracteristicas_autos));
        }
   }else{
       console.log(automovil_id+" "+caracteristica_id+" "+caracteristica+" "+disponible+" "+seleccionada);
        //si viene como disponible
        //la busco en local storage
        $.each(caracteristicas_autos, function(i, item) {
            if(item.automovil_id==automovil_id && caracteristica_id == item.caracteristica_id){
                existe = true;
            }
        });
        // sin no la encuentra la agrega como no disponible
        if(existe==false){
            console.log("se agrego una caracteristica para el auto "+automovil_id+" al almacenamiento interno.");
            console.log(automovil_id+" "+caracteristica_id+" "+caracteristica+" "+disponible+" "+seleccionada);
           //agregamos ela nueva caracteristica
            caracteristicas_autos.push({automovil_id:automovil_id, caracteristica_id:caracteristica_id,caracteristica:caracteristica,disponible:disponible,seleccionada:seleccionada});
            //guardamos ahora todas las caracteristicas
            localStorage.setItem("caracteristicas_autos", JSON.stringify(caracteristicas_autos));
        }

    }

}
almacenamiento.dameCaracteristicasAutomovil=function(idAutomovil){
    var features={};
    features.seleccionada=[];
    features.disponible=[];
    var todas=JSON.parse(localStorage.getItem("caracteristicas_autos"));
    if(todas!=null){
        $.each(todas, function(i, item){
            //caracteristicas reacionadas al auto = seleccionadas
            if(item.automovil_id==idAutomovil){
                    if(item.seleccionada==1){
                        features.seleccionada.push({automovil_id:item.automovil_id,caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada});
                    }else{
                        features.disponible.push({automovil_id:"0",caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada}); 
                    }
            }/*else if(item.automovil_id==0){
                //caracteristicas sin relacion al auto = disponnibles
               features.disponible.push({automovil_id:"0",caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada}); 
            }*/
        });
        return features;
    }//if
    return null;
}//function

almacenamiento.actualizarCaracteristicaAutomovil=function(idAutomovil,caracteristica_id,caracteristica,accion){
    var todas=JSON.parse(localStorage.getItem("caracteristicas_autos"));
    var Actualizar=[];
    if(todas!=null){
        if(accion == "agregar"){
            $.each(todas, function(i, item){
                //buscamos la caracteristica a agregar
                if(item.automovil_id==idAutomovil && item.caracteristica_id==caracteristica_id){
                    Actualizar.push({automovil_id:idAutomovil,caracteristica_id:caracteristica_id,caracteristica:caracteristica,disponible:0,seleccionada:1});
                }else{
                    //no nos interesa actualizar esta caracteristica  y la pasamos intacta
                    Actualizar.push({automovil_id:item.automovil_id,caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada});
                }
            });
            //guardamos las caracteristicas restantes en loclstorage
            localStorage.setItem("caracteristicas_autos", JSON.stringify(Actualizar));
        }else if(accion == "quitar"){
            $.each(todas, function(i, item){
                if(item.automovil_id==idAutomovil){
                    if(item.caracteristica_id!=caracteristica_id){
                        //si la caracteristica no coincide a la del auto la pasamos intacta, 
                        Actualizar.push({automovil_id:item.automovil_id,caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada});
                    }else{
                        Actualizar.push({automovil_id:idAutomovil,caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:1,seleccionada:0});
                    }
                }else{
                    //si la caracteristica no pertenece al auto la pasamos intacta
                    Actualizar.push({automovil_id:item.automovil_id,caracteristica_id:item.caracteristica_id,caracteristica:item.caracteristica,disponible:item.disponible,seleccionada:item.seleccionada});
                }
            });
            //guardamos las caracteristicas restantes en loclstorage
            localStorage.setItem("caracteristicas_autos", JSON.stringify(Actualizar));
        }
    }//if
   
}
almacenamiento.dameMedicionesRegistradasAutomovil=function(idAutomovil){
    var mediciones=JSON.parse(localStorage.getItem("medicionesRegistradas"));
    console.log("mediciones");
    console.log(mediciones);
    var obtenidas=[];
    if(mediciones!=null){
        $.each(mediciones, function(i, item){
            console.log(item);
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,fecha:item.fecha,delantera_izquierda:item.delantera_izquierda,delantera_derecha:item.delantera_derecha,trasera_izquierda:item.trasera_izquierda,trasera_derecha:item.trasera_derecha,status_delantera_izquierda:item.status_delantera_izquierda,status_delantera_derecha:item.status_delantera_derecha,status_trasera_izquierda:item.status_trasera_izquierda,status_trasera_derecha:item.status_trasera_derecha,sincronizable:item.sincronizable});
            }
        });
        //eval("mediciones="+mediciones+";");
        return obtenidas;
    }//if
    return null;
}//function

almacenamiento.guardarMedicionLlanta=function(idAutomovil,id,fecha,delantera_izquierda,delantera_derecha,trasera_izquierda,trasera_derecha,status_delantera_izquierda,status_delantera_derecha,status_trasera_izquierda,status_trasera_derecha,sincronizable){
    sincronizable = (sincronizable==0)?0:1;
    console.log("guardamos registro de mediciones: "+idAutomovil+"->"+id);
    //obtenemos los las mediciones almacenadas
    var medicionesLlantas = JSON.parse(localStorage.getItem("medicionesRegistradas")) || [];
    var existe = true;
    //comprobamos que la medicion no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(medicionesLlantas, function(i, item) {
        //if(item.id!=0){
            
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
                item.idAutomovil = idAutomovil;
                item.id=id;
                item.fecha=fecha;
                item.delantera_izquierda=delantera_izquierda;
                item.delantera_derecha=delantera_derecha;
                item.trasera_izquierda=trasera_izquierda;
                item.trasera_derecha=trasera_derecha;
                item.status_delantera_izquierda=status_delantera_izquierda;
                item.status_delantera_derecha=status_delantera_derecha;
                item.status_trasera_izquierda=status_trasera_izquierda;
                item.status_trasera_derecha=status_trasera_derecha;
            }
        //}
        
    });
    if(existe==true){
        console.log("se agrego una medicion al almacenamiento interno: "+id);
       //agregamos la medicion
        medicionesLlantas.push({idAutomovil:idAutomovil,id:id,fecha:fecha,delantera_izquierda:delantera_izquierda,delantera_derecha:delantera_derecha,trasera_izquierda:trasera_izquierda,trasera_derecha:trasera_derecha,status_delantera_izquierda:status_delantera_izquierda,status_delantera_derecha:status_delantera_derecha,status_trasera_izquierda:status_trasera_izquierda,status_trasera_derecha:status_trasera_derecha,sincronizable:sincronizable});
        //guardamos ahora todos los automoviles
        
    }
    localStorage.setItem("medicionesRegistradas", JSON.stringify(medicionesLlantas));
}
almacenamiento.dameMedicionAutomovil=function(idAutomovil,id){
    var mediciones=JSON.parse(localStorage.getItem("medicionesRegistradas"));
    var obtenidas=[];
    if(mediciones!=null){
        $.each(mediciones, function(i, item){
            if(item.idAutomovil==idAutomovil && item.id==id){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,fecha:item.fecha,delantera_izquierda:item.delantera_izquierda,delantera_derecha:item.delantera_derecha,trasera_izquierda:item.trasera_izquierda,trasera_derecha:item.trasera_derecha,status_delantera_izquierda:item.status_delantera_izquierda,status_delantera_derecha:item.status_delantera_derecha,status_trasera_izquierda:item.status_trasera_izquierda,status_trasera_derecha:item.status_trasera_derecha,sincronizable:item.sincronizable});
            }
        });
        return obtenidas[0];
    }//if
    return null;
}//function



almacenamiento.dameCambiosRegistradosAutomovil=function(idAutomovil){
    var cambioLlantas=JSON.parse(localStorage.getItem("cambioDeLlantasRegistradas"));
    console.log("cambioLlantas");
    console.log(cambioLlantas);
    var obtenidas=[];
    if(cambioLlantas!=null){
        $.each(cambioLlantas, function(i, item){
            console.log(item);
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,idCambio:item.idCambio,fecha_cambio:item.fecha_cambio,numero_llantas:item.numero_llantas,sincronizable:item.sincronizable});
            }
        });
        //eval("mediciones="+mediciones+";");
        return obtenidas;
    }//if
    return null;
}//function

almacenamiento.guardarCambioLlanta=function(idAutomovil,idCambio,fecha_cambio,numero_llantas,sincronizable){
     sincronizable = (sincronizable==0)?0:1;
    console.log("guardamos registro de cambio de llantas: "+idAutomovil+"->"+idCambio);
    //obtenemos los las mediciones almacenadas
    var cambioLlantas = JSON.parse(localStorage.getItem("cambioDeLlantasRegistradas")) || [];
    var existe = true;
    //comprobamos que la medicion no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(cambioLlantas, function(i, item) {
        //if(item.id!=0){
            if(item.idCambio==idCambio && idAutomovil == item.idAutomovil){
                existe = false;
                item.idAutomovil = idAutomovil;
                item.idCambio = idCambio;
                item.fecha_cambio = fecha_cambio;
                item.numero_llantas = numero_llantas;
            }
        //}
    });
    if(existe==true){
        console.log("se agrego un cambio de llanta al almacenamiento interno: "+idCambio);
       //agregamos la medicion
        cambioLlantas.push({idAutomovil:idAutomovil,idCambio:idCambio,fecha_cambio:fecha_cambio,numero_llantas:numero_llantas,sincronizable:sincronizable});        
    }
    localStorage.setItem("cambioDeLlantasRegistradas", JSON.stringify(cambioLlantas));
}


almacenamiento.dameCambioAutomovil=function(idAutomovil,idCambio){
    var cambios=JSON.parse(localStorage.getItem("cambioDeLlantasRegistradas"));
    var obtenidas=[];
    if(cambios!=null){
        $.each(cambios, function(i, item){
            if(item.idAutomovil==idAutomovil && item.idCambio==idCambio){
                obtenidas.push({idAutomovil:item.idAutomovil,idCambio:item.idCambio,fecha_cambio:item.fecha_cambio,numero_llantas:item.numero_llantas,sincronizable:item.sincronizable});
            }
        });
        return obtenidas[0];
    }//if
    return null;
}//function


almacenamiento.guardarServicio=function(idAutomovil,id,servicio_id,servicio,taller_id,taller,factura,monto,kilometraje,status,fecha,fecha_prometida,fecha_entrega,tipo_servicio_id,tipo_servicio,status_servicio,sistema_id,sistema,sincronizable,sincronizableFactura,cargaInicial){
    sincronizable = (sincronizable==0)?0:1;
    //obtenemos los servicios
    console.log("guardamos servicio: "+tipo_servicio+" "+tipo_servicio_id);
    var servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    var existe = true;
    
    if(servicio_id!=null && sistema_id==null){
        sistema_id=null;
        sistema=null;
    }else if(sistema_id!=null && servicio_id==null){
        servicio_id=null;
        servicio=null; 
    }
    
    //comprobamos que los servicios no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(servicios, function(i, item) {
        if(item.id!=0){
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
            }
        }
        
    });
    //alert("Comprobamos servicios... Noexiste:"+existe+","+cargaInicial);
    if(existe==true){
        console.log("se agrego un servicios al almacenamiento interno: "+id);
       //agregamos la medicion
        servicios.push({idAutomovil:idAutomovil,id:id,servicio_id:servicio_id,servicio:servicio,taller_id:taller_id,taller:taller,factura:factura,monto:monto,kilometraje:kilometraje,status:status,fecha:fecha,fecha_prometida:fecha_prometida,fecha_entrega:fecha_entrega,tipo_servicio_id:tipo_servicio_id,tipo_servicio:tipo_servicio,status_servicio:status_servicio,sistema_id:sistema_id,sistema:sistema,sincronizable:sincronizable,sincronizableFactura:sincronizableFactura});
        //guardamos ahora todos los automoviles
        localStorage.setItem("servicios", JSON.stringify(servicios));
        
        
        //actualizar el estatus de la notificacion del servicio cuando guarde un servicio
        //alert(tipo_servicio+" , "+cargaInicial);
        if(tipo_servicio=="Preventivo" && cargaInicial!=1){//si el tipo de servicio que se esta guardando es preventivo
            console.log("verificando el servicio preventivo");
            notificacion_servicio = 0;
            //verificamos si el estatus de la notificacion de servicio es "Para Servicio"
            automovil = almacenamiento.dameAutomovil(idAutomovil);
            //si el servicio ya tiene fecha de entrega, entonces lo pasamos a en circulación
            if(fecha_entrega!=''){
                console.log("con fecha de entrega");
                notificacion_servicio = 3;
            }else if(fecha_entrega==''){
                console.log("sin fecha  de entrega");
               // if(automovil.notificacion_servicio==1 || automovil.notificacion_servicio==3){
                    notificacion_servicio = 2;
                    console.log("en servicio");
                //}
            }else if(fecha_entrega!=''){
                //if(automovil.notificacion_servicio==2 || automovil.notificacion_servicio==4){
                    notificacion_servicio = 3;
                    console.log("en circulacion");
                //}
            } 
            //actualizamos el auto
            if(idAutomovil>0 && notificacion_servicio>0){
                console.log("actualizando notificacion de servicios");
                almacenamiento.actualizarNotificacionServicio(idAutomovil,notificacion_servicio,'');
                esNecesarioPasarAlProximoServicio(idAutomovil);
            }
        }
        
        
        
        if(sincronizable==1){
            //despues de guardar el incidente, actualizo el kilometraje del carro
            almacenamiento.actualizarKilometrajeAutomovil(idAutomovil,kilometraje);
            //cambiamos el color en base al status_servicio
            if(status_servicio=='verde'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,status_servicio);
            }else if(status_servicio=='amarillo'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,status_servicio);
            }else if(status_servicio=='rojo'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,0,status_servicio);
            }
            /*if(fecha_entrega!=''){
                //almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,'verde');
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,status_servicio);
            }else{
                //almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,'amarillo');
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,status_servicio);
            }*/
        }
        //obtenemos el automovil
        
    }
}

almacenamiento.actualizarServicio=function(idAutomovil,id,servicio_id,servicio,taller_id,taller,factura,monto,kilometraje,status,fecha,fecha_prometida,fecha_entrega,tipo_servicio_id,tipo_servicio,status_servicio,sistema_id,sistema,sincronizable,sincronizableFactura){
    sincronizable = (sincronizable==0)?0:1;
    
    //obtenemos los servicios
    console.log("recibo esto en actualizar");
    console.log(idAutomovil+" : "+id+" : "+servicio_id+" : "+servicio+" : "+taller_id+" : "+taller+" : "+factura+" : "+monto+" : "+kilometraje+" : "+status+" : "+fecha+" : "+fecha_prometida+" : "+fecha_entrega+" : "+tipo_servicio_id+" : "+tipo_servicio+" : "+status_servicio+" : "+sistema_id+" : "+sistema);
    var servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    var existe = true;
    var Actuales=[];
    //comprobamos que los servicios no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(servicios, function(i, item) {
        console.log("ciclo actualizar");
        console.log(item);
        
        if(servicio_id!=null && sistema_id==null){
            if(item.id==id && item.idAutomovil==idAutomovil && item.servicio_id==servicio_id){
                   //actualizamos el servicio con los nuevos valores
                   console.log("Actualiza el servicio");
                   Actuales.push({idAutomovil:idAutomovil,id:id,servicio_id:servicio_id,servicio:servicio,taller_id:taller_id,taller:taller,factura:factura,monto:monto,kilometraje:kilometraje,status:status,fecha:fecha,fecha_prometida:fecha_prometida,fecha_entrega:fecha_entrega,tipo_servicio_id:tipo_servicio_id,tipo_servicio:tipo_servicio,status_servicio:status_servicio,sistema_id:sistema_id,sistema:sistema,sincronizable:sincronizable,sincronizableFactura:sincronizableFactura});
            }else{
                   //pasamos intacto el servicio que no nos interesa
                   Actuales.push({idAutomovil:item.idAutomovil,id:item.id,servicio_id:item.servicio_id,servicio:item.servicio,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,tipo_servicio_id:item.tipo_servicio_id,tipo_servicio:item.tipo_servicio,status_servicio:item.status_servicio,sistema_id:item.sistema_id,sistema:item.sistema,sincronizable:sincronizable,sincronizableFactura:item.sincronizableFactura});
            }   
        }else if(servicio_id==null && sistema_id!=null){
            if(item.id==id && item.idAutomovil==idAutomovil && item.sistema_id==sistema_id){
                   //actualizamos el servicio con los nuevos valores
                   console.log("Actualiza el servicio");
                   Actuales.push({idAutomovil:idAutomovil,id:id,servicio_id:servicio_id,servicio:servicio,taller_id:taller_id,taller:taller,factura:factura,monto:monto,kilometraje:kilometraje,status:status,fecha:fecha,fecha_prometida:fecha_prometida,fecha_entrega:fecha_entrega,tipo_servicio_id:tipo_servicio_id,tipo_servicio:tipo_servicio,status_servicio:status_servicio,sistema_id:sistema_id,sistema:sistema,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura});
            }else{
                   //pasamos intacto el servicio que no nos interesa
                   Actuales.push({idAutomovil:item.idAutomovil,id:item.id,servicio_id:item.servicio_id,servicio:item.servicio,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,tipo_servicio_id:item.tipo_servicio_id,tipo_servicio:item.tipo_servicio,status_servicio:item.status_servicio,sistema_id:item.sistema_id,sistema:item.sistema,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura});
            }
        }
        
        
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("servicios", JSON.stringify(Actuales));
    
    //actualizar el estatus de la notificacion del servicio cuando guarde un servicio
        if(tipo_servicio=="Preventivo"){//si el tipo de servicio que se esta guardando es preventivo
            console.log("verificando el servicio preventivo");
            notificacion_servicio = 0;
            //verificamos si el estatus de la notificacion de servicio es "Para Servicio"
            automovil = almacenamiento.dameAutomovil(idAutomovil);
            //si el servicio ya tiene fecha de entrega, entonces lo pasamos a en circulación
            if(fecha_entrega!=''){
                console.log("con fecha de entrega");
                notificacion_servicio = 3;
            }else if(fecha_entrega==''){
                console.log("sin fecha de entrega");
               // if(automovil.notificacion_servicio==1 || automovil.notificacion_servicio==3){
                    notificacion_servicio = 2;
                    console.log("en servicio");
               // }
            }else if(fecha_entrega!=''){
                //if(automovil.notificacion_servicio==2 || automovil.notificacion_servicio==4){
                    notificacion_servicio = 3;
                    console.log("en circulacion");
               // }
            } 
            //actualizamos el auto
            if(idAutomovil>0 && notificacion_servicio>0){
                console.log("actualizando notificacion de servicios");
                almacenamiento.actualizarNotificacionServicio(idAutomovil,notificacion_servicio,'');
            }
        }
    
    
    if(sincronizable==1){
        //despues de guardar el incidente, actualizo el kilometraje del carro
       // almacenamiento.actualizarKilometrajeAutomovil(idAutomovil,kilometraje);
        
        //cambiamos el color en base al status_servicio
        if(status_servicio=='verde'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,status_servicio);
        }else if(status_servicio=='amarillo'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,status_servicio);
        }else if(status_servicio=='rojo'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,0,status_servicio);
        }
        /*if(fecha_entrega!=''){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,'verde');
        }else{
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,'amarillo');
        }*/
    }
}

almacenamiento.dameServiciosAutomovil=function(idAutomovil){
    var servicios=JSON.parse(localStorage.getItem("servicios"));
    var obtenidas=[];
    if(servicios!=null){
        $.each(servicios, function(i, item){
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,servicio_id:item.servicio_id,servicio:item.servicio,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,tipo_servicio_id:item.tipo_servicio_id,tipo_servicio:item.tipo_servicio,status_servicio:item.status_servicio,sistema_id:item.sistema_id,sistema:item.sistema,sincronizable:item.sincronizable});
            }
        });
        return obtenidas;
    }//if
    return null;
}//function

almacenamiento.seleccionarServicio=function(id,idAutomovil,servicio_id,sistema_id){
    localStorage.setItem("servicioSeleccionado",JSON.stringify({id:id,idAutomovil:idAutomovil,servicio_id:servicio_id,sistema_id:sistema_id}));
}//function
almacenamiento.dameServicioSeleccionado=function(){
    var servicioSeleccionado=localStorage.getItem("servicioSeleccionado");
    if(servicioSeleccionado!=null){
        eval("servicioSeleccionado="+servicioSeleccionado+";");
        return servicioSeleccionado;
    }//if
    return null;
}//function

almacenamiento.dameServicioSeleccionadoCompleto=function(id,idAutomovil,servicio_id,sistema_id){
     //obtenemos los servicios
    var servicios = JSON.parse(localStorage.getItem("servicios")) || [];
    var existe = true;
    var servicio = [];
    //reccorremos los servicios tratando de encontrar el mismo servicio seleccionado
    $.each(servicios, function(i, item) {
        if(servicio_id!=null && sistema_id==null){
            if(item.id==id && item.idAutomovil==idAutomovil && item.servicio_id==servicio_id){
               servicio.push({idAutomovil:item.idAutomovil,id:item.id,servicio_id:item.servicio_id,servicio:item.servicio,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,tipo_servicio_id:item.tipo_servicio_id,tipo_servicio:item.tipo_servicio,status_servicio:item.status_servicio,sistema_id:item.sistema_id,sistema:item.sistema,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura});
            }
        }else if(servicio_id==null && sistema_id!=null){
            if(item.id==id && item.idAutomovil==idAutomovil && item.sistema_id==sistema_id){
               servicio.push({idAutomovil:item.idAutomovil,id:item.id,servicio_id:item.servicio_id,servicio:item.servicio,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,tipo_servicio_id:item.tipo_servicio_id,tipo_servicio:item.tipo_servicio,status_servicio:item.status_servicio,sistema_id:item.sistema_id,sistema:item.sistema,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura});
            }
        }
    });
    return servicio[0];
}

almacenamiento.dameDetalleSeleccionado=function(){
    var detalleSeleccionado=localStorage.getItem("detalleSeleccionado");
    if(detalleSeleccionado!=null){
        eval("detalleSeleccionado="+detalleSeleccionado+";");
        return detalleSeleccionado;
    }//if
    return null;
}//function

almacenamiento.dameDetalleSeleccionadoCompleto=function(id,idAutomovil){
     //obtenemos los servicios
    var detalles = JSON.parse(localStorage.getItem("detalles")) || [];
    var existe = true;
    var detalle = [];
    //reccorremos los servicios tratando de encontrar el mismo servicio seleccionado
    $.each(detalles, function(i, item) {

        if(item.id==id && item.idAutomovil==idAutomovil){
           detalle.push({idAutomovil:item.idAutomovil,id:item.id,componente_id:item.componente_id,componente:item.componente,detalle_id:item.detalle_id,detalle:item.detalle,fecha_detalle:item.fecha_detalle,observacion:item.observacion,fue_reparado:item.fue_reparado,fecha_reparacion:item.fecha_reparacion,sincronizableDetalle:item.sincronizableDetalle});
        }

    });
    return detalle[0];
}
almacenamiento.guardarDetalle=function(idAutomovil,id,componente_id,componente,detalle_id,detalle,fecha_detalle,observacion,fue_reparado,fecha_reparacion,sincronizableDetalle){
    sincronizableDetalle = (sincronizableDetalle==0)?0:1;
    console.log("guardamos el detalle del automovil: "+idAutomovil);
    var det = JSON.parse(localStorage.getItem("detalles")) || [];
    var existe = true;
    
    //comprobamos que el detalle no este ya almacenado, si no esta lo agrega, y si ya esta actualizamos los datos
    $.each(det, function(i, item) {
        if(item.id!=0){
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
            }
        }
        
    });
    
    if(existe==true){//agregamos registro nuevo
        console.log("se agrego un detalle nuevo al almacenamiento interno: "+id);
       //agregamos el detalle
        det.push({idAutomovil:idAutomovil,id:id,componente_id:componente_id,componente:componente,detalle_id:detalle_id,detalle:detalle,fecha_detalle:fecha_detalle,observacion:observacion,fue_reparado:fue_reparado,fecha_reparacion:fecha_reparacion,sincronizableDetalle:sincronizableDetalle});
        //guardamos ahora todos los detalles
        console.log("arreglo final");
        console.log(det);
        localStorage.setItem("detalles", JSON.stringify(det));
    }
}
almacenamiento.actualizarDetalle=function(idAutomovil,id,componente_id,componente,detalle_id,detalle,fecha_detalle,observacion,fue_reparado,fecha_reparacion,sincronizableDetalle){
    sincronizableDetalle = (sincronizableDetalle==0)?0:1;
    console.log("actualizamos el detalle del automovil: "+idAutomovil);
    var detalles = JSON.parse(localStorage.getItem("detalles")) || [];
    var Actuales=[];
    
     $.each(detalles, function(i, item) {
        if(item.id==id && item.idAutomovil==idAutomovil){
            if(sincronizableDetalle==0){
               Actuales.push({idAutomovil:item.idAutomovil,id:item.id,componente_id:item.componente_id,componente:item.componente,detalle_id:item.detalle_id,detalle:item.detalle,fecha_detalle:item.fecha_detalle,observacion:item.observacion,fue_reparado:fue_reparado,fecha_reparacion:fecha_reparacion,sincronizableDetalle:item.sincronizableDetalle});
            }else{
                Actuales.push({idAutomovil:idAutomovil,id:id,componente_id:componente_id,componente:componente,detalle_id:detalle_id,detalle:detalle,fecha_detalle:fecha_detalle,observacion:observacion,fue_reparado:fue_reparado,fecha_reparacion:fecha_reparacion,sincronizableDetalle:sincronizableDetalle});
            }
        }else{//si no es el registro lo pasamos intacto
            Actuales.push({idAutomovil:item.idAutomovil,id:item.id,componente_id:item.componente_id,componente:item.componente,detalle_id:item.detalle_id,detalle:item.detalle,fecha_detalle:item.fecha_detalle,observacion:item.observacion,fue_reparado:item.fue_reparado,fecha_reparacion:item.fecha_reparacion,sincronizableDetalle:item.sincronizableDetalle});
        }

    });
     //guardamos ahora todos los detalles
    localStorage.setItem("detalles", JSON.stringify(Actuales));
    
}
almacenamiento.dameIncidenteSeleccionado=function(){
    var incidenteSeleccionado=localStorage.getItem("incidenteSeleccionado");
    if(incidenteSeleccionado!=null){
        eval("incidenteSeleccionado="+incidenteSeleccionado+";");
        return incidenteSeleccionado;
    }//if
    return null;
}//function

almacenamiento.guardarIncidente=function(idAutomovil,id,incidente_id,incidente,taller_id,taller,factura,monto,kilometraje,status,fecha,fecha_prometida,fecha_entrega,status_incidente,sincronizable,sincronizableFactura,numero_siniestro){
    sincronizable = (sincronizable==0)?0:1;
    
    //obtenemos los servicios
    console.log("antes de guarar");
    console.log(incidente_id+":"+incidente);
    var incidentes = JSON.parse(localStorage.getItem("incidentes")) || [];
    var existe = true;
    //comprobamos que los incidentes no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(incidentes, function(i, item) {
        if(item.id!=0){
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
            }
        }
    });
    if(existe==true){
        console.log("se agrego un incidente al almacenamiento interno: "+id);
       //agregamos el registro
        incidentes.push({idAutomovil:idAutomovil,id:id,incidente_id:incidente_id,incidente:incidente,taller_id:taller_id,taller:taller,factura:factura,monto:monto,kilometraje:kilometraje,status:status,fecha:fecha,fecha_prometida:fecha_prometida,fecha_entrega:fecha_entrega,status_incidente:status_incidente,sincronizable:sincronizable,sincronizableFactura:sincronizableFactura,numero_siniestro:numero_siniestro});
        //guardamos ahora todos los incidentes
        localStorage.setItem("incidentes", JSON.stringify(incidentes));
        
        
        if(sincronizable==1){
            //despues de guardar el incidente, actualizo el kilometraje del carro
            almacenamiento.actualizarKilometrajeAutomovil(idAutomovil,kilometraje);
            
            if(status_incidente=='verde'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,status_incidente);
            }else if(status_incidente=='amarillo'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,status_incidente);
            }else if(status_incidente=='rojo'){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,0,status_incidente);
            }
            /*if(fecha_entrega!=''){
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,'verde');
            }else{
                almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,'amarillo');
            }*/
        }
    }
}

almacenamiento.dameDetallesDelAutomovil=function(idAutomovil){
    var detalles=JSON.parse(localStorage.getItem("detalles"));
    var obtenidas=[];
    if(detalles!=null){
        $.each(detalles, function(i, item){
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,componente_id:item.componente_id,componente:item.componente,detalle_id:item.detalle_id,detalle:item.detalle,fecha_detalle:item.fecha_detalle,observacion:item.observacion,fue_reparado:item.fue_reparado,fecha_reparacion:item.fecha_reparacion,sincronizableDetalle:item.sincronizableDetalle});
            }
        });
        return obtenidas;
    }//if
    return null;
}
almacenamiento.guardarDetalleAutomovil=function(idAutomovil,id,componente_id,componente,detalle_id,detalle,fecha_detalle,observacion,fue_reparado,fecha_reparacion,sincronizableDetalle){
    sincronizableDetalle = (sincronizableDetalle==0)?0:1;
    
    //obtenemos los detalles
    var detalles = JSON.parse(localStorage.getItem("detalles")) || [];
    var existe = true;
    //comprobamos que los incidentes no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(detalles, function(i, item) {
        if(item.id!=0){
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
            }
        }
    });
    if(existe==true){
        console.log("se agrego un detalle al almacenamiento interno: "+id);
       //agregamos el registro
        detalles.push({idAutomovil:idAutomovil,id:id,componente_id:componente_id,componente:componente,detalle_id:detalle_id,detalle:detalle,fecha_detalle:fecha_detalle,observacion:observacion,fue_reparado:fue_reparado,fecha_reparacion:fecha_reparacion,sincronizableDetalle:sincronizableDetalle});
        //guardamos ahora todos los incidentes
        localStorage.setItem("detalles", JSON.stringify(detalles));
    }
}
almacenamiento.actualizarIncidente=function(idAutomovil,id,incidente_id,incidente,taller_id,taller,factura,monto,kilometraje,status,fecha,fecha_prometida,fecha_entrega,status_incidente,sincronizable,sincronizableFactura,numero_siniestro){
    //obtenemos los servicios
     console.log("recibo esto en actualizar");
    console.log(idAutomovil+" : "+id+" : "+incidente_id+" : "+incidente+" : "+taller_id+" : "+taller+" : "+factura+" : "+monto+" : "+kilometraje+" : "+status+" : "+fecha+" : "+fecha_prometida+" : "+fecha_entrega+" : "+status_incidente+" : "+sincronizable+" : "+sincronizableFactura+" : "+numero_siniestro);
    var incidentes = JSON.parse(localStorage.getItem("incidentes")) || [];
    var existe = true;
    var Actuales=[];
    //comprobamos que los servicios no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(incidentes, function(i, item) {
       if(item.id==id && item.idAutomovil==idAutomovil && item.incidente_id==incidente_id){
           //actualizamos el servicio con los nuevos valores
           Actuales.push({idAutomovil:idAutomovil,id:id,incidente_id:incidente_id,incidente:incidente,taller_id:taller_id,taller:taller,factura:factura,monto:monto,kilometraje:kilometraje,status:status,fecha:fecha,fecha_prometida:fecha_prometida,fecha_entrega:fecha_entrega,status_incidente:status_incidente,sincronizable:sincronizable,sincronizableFactura:sincronizableFactura,numero_siniestro:numero_siniestro});
       }else{
           //pasamos intacto el servicio que no nos interesa
           Actuales.push({idAutomovil:item.idAutomovil,id:item.id,incidente_id:item.incidente_id,incidente:item.incidente,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,status_incidente:item.status_incidente,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura,numero_siniestro:item.numero_siniestro});
       }     
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("incidentes", JSON.stringify(Actuales));
    if(sincronizable==1){
        //despues de guardar el incidente, actualizo el kilometraje del carro
        //almacenamiento.actualizarKilometrajeAutomovil(idAutomovil,kilometraje);
        if(status_incidente=='verde'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,status_incidente);
        }else if(status_incidente=='amarillo'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,status_incidente);
        }else if(status_incidente=='rojo'){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,0,status_incidente);
        }
        /*if(fecha_entrega!=''){
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,1,'verde');
        }else{
            almacenamiento.actualizarEstatusAutomovil(idAutomovil,2,'amarillo');
        }*/
    }
    
    
}
almacenamiento.dameIncidentesAutomovil=function(idAutomovil){
    var incidentes=JSON.parse(localStorage.getItem("incidentes"));
    var obtenidas=[];
    if(incidentes!=null){
        $.each(incidentes, function(i, item){
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,incidente_id:item.incidente_id,incidente:item.incidente,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,status_incidente:item.status_incidente,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura,numero_siniestro:item.numero_siniestro});
            }
        });
        return obtenidas;
    }//if
    return null;
}//function
almacenamiento.seleccionarIncidente=function(id,idAutomovil,incidente_id){
    localStorage.setItem("incidenteSeleccionado",JSON.stringify({id:id,idAutomovil:idAutomovil,incidente_id:incidente_id}));
}//function
almacenamiento.seleccionarDetalle=function(id,idAutomovil){
    localStorage.setItem("detalleSeleccionado",JSON.stringify({id:id,idAutomovil:idAutomovil}));
}

almacenamiento.dameIncidenteSeleccionadoCompleto=function(id,idAutomovil,incidente_id){
     //obtenemos los servicios
    var incidentes = JSON.parse(localStorage.getItem("incidentes")) || [];
    var existe = true;
    var incidente = [];
    //reccorremos los servicios tratando de encontrar el mismo servicio seleccionado
    console.log("localmente hay: ");
    $.each(incidentes, function(i, item) {
        console.log(item.idAutomovil+":"+idAutomovil+" "+item.id+":"+id+" "+item.incidente_id+":"+incidente_id);
            if(item.id==id && item.idAutomovil==idAutomovil && item.incidente_id==incidente_id){
                //console.log(item);
               incidente.push({idAutomovil:item.idAutomovil,id:item.id,incidente_id:item.incidente_id,incidente:item.incidente,taller_id:item.taller_id,taller:item.taller,factura:item.factura,monto:item.monto,kilometraje:item.kilometraje,status:item.status,fecha:item.fecha,fecha_prometida:item.fecha_prometida,fecha_entrega:item.fecha_entrega,status_incidente:item.status_incidente,sincronizable:item.sincronizable,sincronizableFactura:item.sincronizableFactura,numero_siniestro:item.numero_siniestro});
            }
        
        
    });
    return incidente[0];
}

almacenamiento.guardarDocumento=function(idAutomovil,id,tipo_documento_id,tipo_documento,fecha,archivo,rutaDescarga,status,sincronizable){
    //obtenemos los documentos
    var documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    var existe = true;
    //comprobamos que los documentos no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(documentos, function(i, item) {
        if(item.id!=0){
            if(item.id==id && idAutomovil == item.idAutomovil){
                existe = false;
            } 
        }
        
    }); 
    if(existe==true){
        console.log("se agrego un documento al almacenamiento interno: "+id);
       //agregamos el registro
        documentos.push({idAutomovil:idAutomovil,id:id,tipo_documento_id:tipo_documento_id,tipo_documento:tipo_documento,fecha:fecha,archivo:archivo,status:status,sincronizable:sincronizable});
        //guardamos ahora todos los documentos
        localStorage.setItem("documentos", JSON.stringify(documentos));
        return true;
    }
}
almacenamiento.dameDocumentosAutomovil=function(idAutomovil){
    
    var documentos=JSON.parse(localStorage.getItem("documentos"));
    var obtenidas=[];
    if(documentos!=null){
        $.each(documentos, function(i, item){
            if(item.idAutomovil==idAutomovil){
                obtenidas.push({idAutomovil:item.idAutomovil,id:item.id,tipo_documento_id:item.tipo_documento_id,tipo_documento:item.tipo_documento,fecha:item.fecha,archivo:item.archivo,status:item.status,sincronizable:item.sincronizable});
            }
        });
        return obtenidas;
    }//if
    return null;
}
almacenamiento.dameDocumento=function(idAutomovil,idDocumento){
    //obtenemos los documentos
    var documentos = JSON.parse(localStorage.getItem("documentos")) || [];
    var existe = true;
    var documento = [];
    //comprobamos que los documentos no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(documentos, function(i, item) {
        if(item.id!=0){
            if(item.id==idDocumento && idAutomovil == item.idAutomovil){
                documento.push({idAutomovil:item.idAutomovil,id:item.id,tipo_documento_id:item.tipo_documento_id,tipo_documento:item.tipo_documento,fecha:item.fecha,archivo:item.archivo,status:item.status,sincronizable:item.sincronizable});
            } 
        }
    }); 
    return documento[0];
}

almacenamiento.guardarTiposDeDocumentosDisponibles=function(id,nombre,status){
    //obtenemos los documentos
    var tiposDeDocumentos = JSON.parse(localStorage.getItem("tiposDeDocumentos")) || [];
    var existe = true;
    //comprobamos que los tipos de documentos no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(tiposDeDocumentos, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
        
    }); 
    if(existe==true){
        console.log("se agrego un tipo de documento al almacenamiento interno: "+id);
       //agregamos el registro
        tiposDeDocumentos.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los tipos de documentos
        localStorage.setItem("tiposDeDocumentos", JSON.stringify(tiposDeDocumentos));
    }

}
almacenamiento.dameTiposDeDocumentosDisponibles=function(){
    
    var tiposDeDocumentos=localStorage.getItem("tiposDeDocumentos");
    if(tiposDeDocumentos!=null){
        eval("tiposDeDocumentos="+tiposDeDocumentos+";");
        return tiposDeDocumentos;
    }//if
    return null;

}

almacenamiento.guardarComponentes=function(id,nombre,status){
    //obtenemos los talleres
    var componentes = JSON.parse(localStorage.getItem("componentesDisponibles")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(componentes, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
        
    }); 
    if(existe==true){
        console.log("se agrego un componente al almacenamiento interno: "+id);
       //agregamos el registro
        componentes.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los componentes de documentos
        localStorage.setItem("componentesDisponibles", JSON.stringify(componentes));
    }
}
almacenamiento.guardarDetallesDisponibles=function(id,nombre,status){
    //obtenemos los talleres
    var detalles = JSON.parse(localStorage.getItem("detallesDisponibles")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(detalles, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
        
    }); 
    if(existe==true){
        console.log("se agrego un detalles al almacenamiento interno: "+id);
       //agregamos el registro
        detalles.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los componentes de documentos
        localStorage.setItem("detallesDisponibles", JSON.stringify(detalles));
    }
}
almacenamiento.guardarTalleresDisponibles=function(id,nombre,status){
    //obtenemos los talleres
    var talleres = JSON.parse(localStorage.getItem("talleres")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(talleres, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
        
    }); 
    if(existe==true){
        console.log("se agrego un taller al almacenamiento interno: "+id);
       //agregamos el registro
        talleres.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los tipos de documentos
        localStorage.setItem("talleres", JSON.stringify(talleres));
    }

}
almacenamiento.dameTalleresDisponibles=function(){
    
    var talleres=localStorage.getItem("talleres");
    if(talleres!=null){
        eval("talleres="+talleres+";");
        return talleres;
    }//if
    return null;

}
almacenamiento.guardarServiciosDisponibles=function(id,nombre,status){
    //obtenemos los talleres
    var serviciosDisponibles = JSON.parse(localStorage.getItem("serviciosDisponibles")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(serviciosDisponibles, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
    }); 
    if(existe==true){
        console.log("se agrego un servicio al almacenamiento interno: "+id);
       //agregamos el registro
        serviciosDisponibles.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los tipos de documentos
        localStorage.setItem("serviciosDisponibles", JSON.stringify(serviciosDisponibles));
    }

}
almacenamiento.dameServiciosDisponibles=function(){
    
    var serviciosDisponibles=localStorage.getItem("serviciosDisponibles");
    if(serviciosDisponibles!=null){
        eval("serviciosDisponibles="+serviciosDisponibles+";");
        return serviciosDisponibles;
    }//if
    return null;

}

almacenamiento.guardarIncidentesDisponibles=function(id,nombre,status){
    //obtenemos los talleres
    var incidentesDisponibles = JSON.parse(localStorage.getItem("incidentesDisponibles")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(incidentesDisponibles, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
    }); 
    if(existe==true){
        console.log("se agrego un inciente al almacenamiento interno: "+id);
       //agregamos el registro
        incidentesDisponibles.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los tipos de documentos
        localStorage.setItem("incidentesDisponibles", JSON.stringify(incidentesDisponibles));
    }

}
almacenamiento.dameIncidentesDisponibles=function(){
    
    var incidentesDisponibles=localStorage.getItem("incidentesDisponibles");
    if(incidentesDisponibles!=null){
        eval("incidentesDisponibles="+incidentesDisponibles+";");
        return incidentesDisponibles;
    }//if
    return null;

}
almacenamiento.dameComponentesDisponibles=function(){
    
    var componentesDisponibles=localStorage.getItem("componentesDisponibles");
    if(componentesDisponibles!=null){
        eval("componentesDisponibles="+componentesDisponibles+";");
        return componentesDisponibles;
    }//if
    return null;

}
almacenamiento.dameDetallesDisponibles=function(){
    
    var detallesDisponibles=localStorage.getItem("detallesDisponibles");
    if(detallesDisponibles!=null){
        eval("detallesDisponibles="+detallesDisponibles+";");
        return detallesDisponibles;
    }//if
    return null;

}
almacenamiento.guardarSistemasDisponibles=function(id,nombre,status){
    //obtenemos los talleres
    var sistemasDisponibles = JSON.parse(localStorage.getItem("sistemasDisponibles")) || [];
    var existe = true;
    //comprobamos que los talleres no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(sistemasDisponibles, function(i, item) {
        if(item.id!=0){
            if(item.id==id){
                existe = false;
            } 
        }
    }); 
    if(existe==true){
        console.log("se agrego un sistema al almacenamiento interno: "+id);
       //agregamos el registro
        sistemasDisponibles.push({id:id,nombre:nombre,status:status});
        //guardamos ahora todos los tipos de documentos
        localStorage.setItem("sistemasDisponibles", JSON.stringify(sistemasDisponibles));
    }

}
almacenamiento.dameSistemasDisponibles=function(){
    
    var sistemasDisponibles=localStorage.getItem("sistemasDisponibles");
    if(sistemasDisponibles!=null){
        eval("sistemasDisponibles="+sistemasDisponibles+";");
        return sistemasDisponibles;
    }//if
    return null;

}

almacenamiento.dameTodoParaSincronizar=function(){
    var sincronizacion={};
    sincronizacion.automoviles=[];
    myApp.showPreloader('Espere un momento por favor...');    
    var autos=JSON.parse(localStorage.getItem("autos"));
    if(autos!=null){
        var ciclo = autos.length;
        var contador =0; 
        
        $.each(autos, function(auto_i, auto_item){
            sincronizacion.automoviles.push({id:auto_item.id,conductor:auto_item.conductor,placas:auto_item.placas,numero_serie:auto_item.numero_serie,numero_economico:auto_item.numero_economico,id_gps:auto_item.id_gps,kilometraje:auto_item.kilometraje,modelo_id:auto_item.modelo_id,modelo:auto_item.modelo,marca_id:auto_item.marca_id,marca:auto_item.marca,ruta_id:auto_item.ruta_id,ruta:auto_item.ruta,region_id:auto_item.region_id,region:auto_item.region,fecha_actualizacion:auto_item.fecha_actualizacion,status:auto_item.status,semaforo:auto_item.semaforo,sincronizable:auto_item.sincronizable,notificacion_servicio:auto_item.notificacion_servicio,proximo_servicio:auto_item.proximo_servicio,frecuencia_servicio:auto_item.frecuencia_servicio,usuario_jcr_id:auto_item.usuario_jcr_id,usuario_jcr2_id:auto_item.usuario_jcr2_id,usuario_director_id:auto_item.usuario_director_id,caracteristicas:[],mediciones:[],cambios:[],servicios:[],incidentes:[],detalles:[],usuario:[]});
            //obtenemos las caracteristicas del automovil
            var caracteristicas_autos=JSON.parse(localStorage.getItem("caracteristicas_autos"));
            if(caracteristicas_autos!=null){
                   $.each(caracteristicas_autos, function(caracteristica_i, caracteristica_item){
                       if(auto_item.id==caracteristica_item.automovil_id){
                          // console.log(sincronizacion.automoviles[auto_i].caracteristicas);
                            sincronizacion.automoviles[auto_i].caracteristicas.push({automovil_id:caracteristica_item.automovil_id, caracteristica_id:caracteristica_item.caracteristica_id,caracteristica:caracteristica_item.caracteristica,disponible:caracteristica_item.disponible,seleccionada:caracteristica_item.seleccionada});
                       }
                    });
             }
            
            var cambios_llantas=JSON.parse(localStorage.getItem("cambioDeLlantasRegistradas"));
            if(cambios_llantas!=null){
                   $.each(cambios_llantas, function(cambio_i, cambio_item){
                       if(auto_item.id==cambio_item.idAutomovil){
                            sincronizacion.automoviles[auto_i].cambios.push({automovil_id:cambio_item.idAutomovil,idCambio:cambio_item.idCambio,fecha_cambio:cambio_item.fecha_cambio,numero_llantas:cambio_item.numero_llantas,sincronizable:cambio_item.sincronizable});
                       }
                    });
             }
            
            var mediciones_autos=JSON.parse(localStorage.getItem("medicionesRegistradas"));
            if(mediciones_autos!=null){
                   $.each(mediciones_autos, function(medicion_i, medicion_item){
                       if(auto_item.id==medicion_item.idAutomovil){  sincronizacion.automoviles[auto_i].mediciones.push({automovil_id:medicion_item.idAutomovil,id:medicion_item.id,fecha:medicion_item.fecha,delantera_izquierda:medicion_item.delantera_izquierda,delantera_derecha:medicion_item.delantera_derecha,trasera_izquierda:medicion_item.trasera_izquierda,trasera_derecha:medicion_item.trasera_derecha,status_delantera_izquierda:medicion_item.status_delantera_izquierda,status_delantera_derecha:medicion_item.status_delantera_derecha,status_trasera_izquierda:medicion_item.status_trasera_izquierda,status_trasera_derecha:medicion_item.status_trasera_derecha,sincronizable:medicion_item.sincronizable});
                       }
                    });
             }
            
            var servicios_autos=JSON.parse(localStorage.getItem("servicios"));
            if(servicios_autos!=null){
                   $.each(servicios_autos, function(servicios_i, servicios_item){
                       if(auto_item.id==servicios_item.idAutomovil){
                            sincronizacion.automoviles[auto_i].servicios.push({automovil_id:servicios_item.idAutomovil,id:servicios_item.id,servicio_id:servicios_item.servicio_id,servicio:servicios_item.servicio,taller_id:servicios_item.taller_id,taller:servicios_item.taller,factura:servicios_item.factura,monto:servicios_item.monto,kilometraje:servicios_item.kilometraje,status:servicios_item.status,fecha:servicios_item.fecha,fecha_prometida:servicios_item.fecha_prometida,fecha_entrega:servicios_item.fecha_entrega,tipo_servicio_id:servicios_item.tipo_servicio_id,tipo_servicio:servicios_item.tipo_servicio,status_servicio:servicios_item.status_servicio,sistema_id:servicios_item.sistema_id,sistema:servicios_item.sistema,sincronizable:servicios_item.sincronizable,sincronizableFactura:servicios_item.sincronizableFactura});
                       }
                    });
             }
            var incidentes_autos=JSON.parse(localStorage.getItem("incidentes"));
            if(incidentes_autos!=null){
                   $.each(incidentes_autos, function(incidente_i, incidente_item){
                       if(auto_item.id==incidente_item.idAutomovil){
                            sincronizacion.automoviles[auto_i].incidentes.push({automovil_id:incidente_item.idAutomovil,id:incidente_item.id,incidente_id:incidente_item.incidente_id,incidente:incidente_item.incidente,taller_id:incidente_item.taller_id,taller:incidente_item.taller,factura:incidente_item.factura,monto:incidente_item.monto,kilometraje:incidente_item.kilometraje,status:incidente_item.status,fecha:incidente_item.fecha,fecha_prometida:incidente_item.fecha_prometida,fecha_entrega:incidente_item.fecha_entrega,status_incidente:incidente_item.status_incidente,sincronizable:incidente_item.sincronizable,sincronizableFactura:incidente_item.sincronizableFactura,numero_siniestro:incidente_item.numero_siniestro});
                       }
                    });
             }
            
            var detalles_autos=JSON.parse(localStorage.getItem("detalles"));
            if(detalles_autos!=null){
                   $.each(detalles_autos, function(detalle_i, detalle_item){
                       if(auto_item.id==detalle_item.idAutomovil){
                            sincronizacion.automoviles[auto_i].detalles.push({automovil_id:detalle_item.idAutomovil,id:detalle_item.id,componente_id:detalle_item.componente_id,componente:detalle_item.componente,detalle_id:detalle_item.detalle_id,detalle:detalle_item.detalle,fecha_detalle:detalle_item.fecha_detalle,observacion:detalle_item.observacion,fue_reparado:detalle_item.fue_reparado,fecha_reparacion:detalle_item.fecha_reparacion,sincronizableDetalle:detalle_item.sincronizableDetalle});
                       }
                    });
             }
            var usuario = JSON.parse(localStorage.getItem("usuario"));
            sincronizacion.automoviles[auto_i].usuario.push({id:usuario.id});
            
            if(contador == ciclo-1){
                myApp.hidePreloader();
            }
            contador++;
        });
        return sincronizacion;
    }//if
    
    return null;

}

almacenamiento.guardarArticulo=function(categoriaArticulo, costo, existencia, idInventario, idRegion, nombreArticulo, stock_maximo, stock_minimo){    
    //obtenemos los autos almacenados
    var articulos = JSON.parse(localStorage.getItem("articulos")) || [];
    var existe = true;
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(articulos, function(i, item) {
        if(item.idInventario==idInventario){ 
            existe = false;
        }
    });
    if(existe==true){
        console.log("se agrego un articulo al almacenamiento interno: "+idInventario+" ->"+nombreArticulo);
       //agregamos el nuevo auto
        articulos.push({categoriaArticulo:categoriaArticulo, costo:costo, existencia:existencia, idInventario:idInventario, idRegion:idRegion, nombreArticulo:nombreArticulo, stock_maximo:stock_maximo, stock_minimo:stock_minimo});
        //guardamos ahora todos los automoviles
        localStorage.setItem("articulos", JSON.stringify(articulos));
    }
    
}

almacenamiento.dameArticulos=function(){
    var articulos=localStorage.getItem("articulos");
    if(articulos!=null){
        eval("articulos="+articulos+";");
        return articulos;
    }
    return null;
}

almacenamiento.seleccionaArticulo=function(articulo){
    localStorage.setItem("articuloSeleccionado",JSON.stringify(articulo));
}

almacenamiento.dameArticuloSeleccionado=function(){
    var articuloSeleccionado=localStorage.getItem("articuloSeleccionado");
    if(articuloSeleccionado!=null){
        eval("articuloSeleccionado="+articuloSeleccionado+";");
        return articuloSeleccionado;
    }//if
    return null;
}

almacenamiento.dameArticulo=function(idArticulo){
    var articulo=[];
    var articulos=JSON.parse(localStorage.getItem("articulos"));
    if(articulos!=null){
        $.each(articulos, function(i, item) {
            if(item.idInventario==idArticulo){
                articulo.push({categoriaArticulo:item.categoriaArticulo, costo:item.costo, existencia:item.existencia, idInventario:item.idInventario, idRegion:item.idRegion, nombreArticulo:item.nombreArticulo, stock_maximo:item.stock_maximo, stock_minimo:item.stock_minimo});
            }
        });
        return articulo[0];
    }else{
        return null;
    }
}

almacenamiento.guardarGestor=function(gestor){
    localStorage.setItem("gestor",gestor);
}

almacenamiento.dameGestor=function(){
    return localStorage.getItem("gestor");
}

almacenamiento.guardarDia=function(dia){
     localStorage.setItem("dia",dia);
}

almacenamiento.dameDia=function(){
    return localStorage.getItem("dia");
}

almacenamiento.actualizarDatosVehiculo=function(id,status,kilometraje,idDirector,idJcr,idJcr2, idRuta, ruta, conductor){
    console.log("actualizar vehículo***" )
    //obtenemos los autos almacenados
    var autos = JSON.parse(localStorage.getItem("autos")) || [];
    var Actualizar=[];
    var verificarNotificacion = 0;
    //comprobamos que el auto no este ya almacenado, si no esta lo agrega, y si ya esta no hacemos nada
    $.each(autos, function(i, item) {
        if(item.id==id){
            if(kilometraje!=item.kilometraje){
                console.log("hubo cambios en el kilometraje");
                //verificarNotificacion = 1;
                //el cron se debe encargar de ajustar los estatus de la otificacion
                if(parseInt(kilometraje)>parseInt(item.proximo_servicio)){
                    console.log("entra en servicio retrasado");
                    item.notificacion_servicio = 4;//si se modifico el kilometraje y sobrepasa el proximo servicio entonces lo pasamos a servicio rechazado
                }
            }
            Actualizar.push({id:item.id,conductor:conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:idRuta,ruta:ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:idJcr,usuario_jcr2_id:idJcr2,usuario_director_id:idDirector});
        }else{
            Actualizar.push({id:item.id,conductor:item.conductor,placas:item.placas,numero_serie:item.numero_serie,numero_economico:item.numero_economico,id_gps:item.id_gps,kilometraje:item.kilometraje,modelo_id:item.modelo_id,modelo:item.modelo,marca_id:item.marca_id,marca:item.marca,ruta_id:item.ruta_id,ruta:item.ruta,region_id:item.region_id,region:item.region,fecha_actualizacion:item.fecha_actualizacion,status:item.status,semaforo:item.semaforo,notificacion_servicio:item.notificacion_servicio,proximo_servicio:item.proximo_servicio,frecuencia_servicio:item.frecuencia_servicio,usuario_jcr_id:item.usuario_jcr_id,usuario_jcr2_id:item.usuario_jcr2_id,usuario_director_id:item.usuario_director_id});
        }
    });
    
    //guardamos ahora todos los automoviles
    localStorage.setItem("autos", JSON.stringify(Actualizar));
    
    //verificamos en base al nuevo kilometraje (si es que se modifico) si es necesario actualizar su notificacion
    if(verificarNotificacion == 1){
        //verificarProximoServicio(id)
        //verificarNotificacion(id); 
    }
    
    
}