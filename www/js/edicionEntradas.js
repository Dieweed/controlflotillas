var edicionEntradas={};
var articuloSeleccionado='';
var fechaCambio='';
var usuario='';
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
        articuloSeleccionado = almacenamiento.dameArticuloSeleccionado();
        console.log(articuloSeleccionado);
        
        $.ajax({
            url:      dominio+"obtener-tipos-articulos",
            type:     'POST',
            dataType: "json",
            processData:true,
            data: { client : 1 },
            success:	function(re){ 
                console.log(re);
                $("#tipo").html(re);
                 //cargamos la informacion en pantalla
                edicionEntradas.cargarFormulario();
            },
            error: function(re){             
               console.log(re);                
            }
        });
    });

edicionEntradas.cargarFormulario=function(){
    
    $("#nombre").val(articuloSeleccionado.nombreArticulo);
    $("#existencia").val(articuloSeleccionado.existencia);
       
}

edicionEntradas.actualizarExistencia=function(){

    if($("#agr_existencia").val()==""){
        _mensaje("Atención","Debe ingresar las existencias nuevas","Entendido");
        return null;
    }else if(isNaN(parseFloat($("#agr_existencia").val()))){
        _mensaje("Atención","Las existencias deben numericas","Entendido");
        return null;
    }else if(parseFloat($("#agr_existencia").val())<= 0){
         _mensaje("Atención","Las existencias deben ser mayores a 0","Entendido");
        return null;
    }else if( (parseFloat($("#agr_existencia").val()) + parseFloat(articuloSeleccionado.existencia)) > parseFloat(articuloSeleccionado.stock_maximo)){
         _mensaje("Atención","Las existencias sobrepasan el límite permitido","Entendido");
        return null;
    }else if($("#no_fact").val()==""){
         _mensaje("Atención","Debe ingresar el número de la factura","Entendido");
        return null;
    }else if($("#costo").val()==""){
         _mensaje("Atención","Debe ingresar el costo del producto","Entendido");
        return null;
    }else if(isNaN(parseFloat($("#costo").val()))){
        _mensaje("Atención","El costo debe tener un valor numérico","Entendido");
        return null;
    }else if($("#fecha_cambio").val()==""){
         _mensaje("Atención","Debe ingresar la fecha","Entendido");
        return null;
    }else{
        
        $.ajax({
            url:      dominio+"actualizar-existencias-producto",
            type:     'POST',
            dataType: "json",
            data:	{
                idInventario: articuloSeleccionado.idInventario,
                existencias: parseFloat($("#agr_existencia").val()) + parseFloat(articuloSeleccionado.existencia),
                fecha: $("#fecha_cambio").val(),
                noFactura: $("#no_fact").val(),
                costo: $("#costo").val(),
                cantidad_entradas: parseFloat($("#agr_existencia").val()),
                cantidad_salidas: 0,
                tipo: $("#tipo").val()
		    },
            processData:true,
            success:	function(re){ 
                console.log(re);
                _mensajeCallback("Atención","Las entradas se han actualizado correctamente","Entendido", edicionEntradas.salir);
            },
            error: function(re){             
               console.log(re);                
            }
        });
    }
    
}

edicionEntradas.salir=function(){
    irA('Entradas')
}

