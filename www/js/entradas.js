var entradas={};
var articulos=[];
var usuario='';
    $(document).ready(function(){
         usuario = almacenamiento.dameUsuario();
        entradas.ObtenerInventario();
    });

entradas.ObtenerInventario=function(){
       $.ajax({
            url:      dominio+"obtener-inventario",
            type:     'POST',
            dataType: "json",
            data:	{
                id: usuario.id
		    },
            processData:true,
            success:	function(re){                
            console.log("Inventario: ");
            console.log(re);
            $("#gridArticulos").html('');
            if(re.length>0){
                //recorremos los artiwculos
                var cuantos = re.length;
                var z =0;
                $.each(re, function(i, item) {
                    console.log(item);
                    articulos.push({categoriaArticulo:item.categoriaArticulo, costo:item.costo, existencia:item.existencia, idInventario:item.idInventario, idRegion:item.idRegion, nombreArticulo:item.nombreArticulo, stock_maximo:item.stock_maximo, stock_minimo:item.stock_minimo});
                    
                    if(z==(cuantos-1)){
                        entradas.cargaLocales();
                    }
                    z++;
                });

            }else{
                console.log(re);
                _mensaje("Atención","No hay inventario ligado al gestor de servicios firmado","Entendido");
            }//if
            },
            error: function(re){             
               console.log(re);                
            }
        });
}

entradas.cargaLocales = function(){   
    $("#gridArticulos").html('');
    $.each(articulos, function(i, item){
        entradas.insertaArticulo(item);
    });
}

entradas.insertaArticulo=function(item){
    var articulo='';
    var tipoArticulo='';
    
    if(item.tipo == 1){
        tipoArticulo = 'Refacciones';
    } else {
        tipoArticulo = 'Herramientas y accesorios';
    }
    
        articulo+='<tr class="col-xs-12 sinPadding" onclick="entradas.dameArticulo(\''+item.idInventario+'\')">'+
                    '<td class="col-xs-12">'+
                        '<div class="col-xs-6">'+
                            '<div class="col-xs-12 bold text-22">'+item.nombreArticulo+'</div>'+
                            '<div class="col-xs-12 text-center text-16">Tipo:' +tipoArticulo+'</div>'+
                            '<div class="col-xs-12 text-center italic color-gris">Existencia: '+ item.existencia +'</div>'+
                           ' </div>'+
                   '</td>'+
                '</tr>';
    $("#gridArticulos").append(articulo);
}

entradas.dameArticulo=function(idInventario){
    $.each(articulos, function(i, item) {
            if(item.idInventario==idInventario){
                almacenamiento.seleccionaArticulo(item)
                irA('edicionEntradas')
            }
        });
}