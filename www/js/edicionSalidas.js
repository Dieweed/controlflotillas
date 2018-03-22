var edicionSalidas={};
var articuloSeleccionado='';
var usuario='';
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
                edicionSalidas.cargarFormulario();
            },
            error: function(re){             
               console.log(re);                
            }
        });
    });

edicionSalidas.cargarFormulario=function(){
    
    $("#nombre").val(articuloSeleccionado.nombreArticulo);
    $("#existencia").val(articuloSeleccionado.existencia);
       
}

edicionSalidas.actualizarExistencia=function(){

    if($("#agr_existencia").val()==""){
        _mensaje("Atención","Debe ingresar las existencias que saldrán","Entendido");
        return null;
    }else if(isNaN(parseFloat($("#agr_existencia").val()))){
        _mensaje("Atención","Las existencias deben numericas","Entendido");
        return null;
    }else if(parseFloat($("#agr_existencia").val())<= 0){
         _mensaje("Atención","Las existencias extraidas deben ser mayores a 0","Entendido");
        return null;
    }else if( (parseFloat(articuloSeleccionado.existencia) - parseFloat($("#agr_existencia").val())) < parseFloat(articuloSeleccionado.stock_minimo)){
         _mensaje("Atención","No se puede tener un número de articulos menor al permitido","Entendido");
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
                existencias: parseFloat(articuloSeleccionado.existencia)- parseFloat($("#agr_existencia").val()),
                fecha: $("#fecha_cambio").val(),
                noFactura: 0,
                costo: articuloSeleccionado.costo,
                cantidad_entradas: 0,
                cantidad_salidas: parseFloat($("#agr_existencia").val()),
                tipo: $("#tipo").val()
		    },
            processData:true,
            success:	function(re){ 
                console.log(re);
                _mensajeCallback("Atención","Las salidas se actualizaron corectamente","Entendido", edicionSalidas.salir);
            },
            error: function(re){             
               console.log(re);                
            }
        });
    }
    
}


edicionSalidas.salir=function(){
    irA('Salidas')
}
