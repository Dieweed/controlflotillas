var detalless={};
var automovilSeleccionado='';
var usuario='';
var tipoServicioSeleccionado = 1;
var editar = false;
var sincronizableDetalle = false;
var campoFechaDetalle;
var campoFechaReparacion;

    $(document).ready(function(){
        //obtenemos el usuario firmado
        usuario = almacenamiento.dameUsuario();
        //obtenemos los datos del automovil seleccionado de localstorage
        automovil = almacenamiento.dameAutomovilSeleccionado();
        automovilSeleccionado = almacenamiento.dameAutomovil(automovil.id);
        detalless.cargaGrid();
    });

detalless.cargaGrid=function(){
        $("#gridDetalles").html('');
        var fecha_detalle='';
        var fecha_reparacion='';
        
        var registros = almacenamiento.dameDetallesDelAutomovil(automovilSeleccionado.id);
        var estatus ='';
        var deta='';
        //regs = burbujaDetalle(registros);
        regs = registros;
    console.log("obteniendo los registros");
    console.log(registros);
        $.each(regs, function(i, item){

            if(item.fecha_detalle!=undefined && item.fecha_detalle!=null && item.fecha_detalle!='' ){
                fd = item.fecha_detalle.split("T");
                fecha_detalle = fd[0];
            }else{
                fecha_detalle = '';
            }

            if(item.fecha_reparacion!=undefined && item.fecha_reparacion!=null && item.fecha_reparacion!='' ){
                fr = item.fecha_reparacion.split("T");
                fecha_reparacion = fr[0];
            }else{
                fecha_reparacion = '';
            }

            if(item.fue_reparado ==1){
                estatus = "Reparado";
            }else{
                estatus = "Sin Reparar";
            }
            
            // col-xs-12 
            deta='<tr class="sinPadding" style="width:100%;" onclick="irA(\'edicion-detalle\',0,'+item.id+','+item.idAutomovil+',0,0)">'+
                        '<td class="col-xs-3 text-12">'+fecha_detalle+'</td>'+
                        '<td class="col-xs-5 text-12">'+item.componente+" <br/> "+item.detalle+'</td>'+
                        '<td class="col-xs-2 text-12">'+fecha_reparacion+'</td>'+
                        '<td class="col-xs-2 text-12">'+estatus+'</td>'+
                    '</tr>';

            $("#gridDetalles").append(deta);
        });

}