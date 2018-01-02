
       /* overlay */
    var usua=almacenamiento.dameUsuario();
    
    document.writeln('<div class="panel-overlay"></div>');
    document.writeln('<div class="panel panel-right panel-cover">');
        document.writeln('<div class="page-content contacts-content">');
            document.writeln('<div class="list-block contacts-block">');
                document.writeln('<h1 class="text-center menuTitle">Menu</h1>');
                document.writeln('<div class="list-group">');
                    document.writeln('<ul>');
                        document.writeln('<li onclick="irA(\'inicio\')">');
                          document.writeln('<div class="item-content">');
                            document.writeln('<div class="item-inner">');
                              document.writeln('<div class="item-title"><i class="fa fa-home fa-2x">&nbsp;</i>Inicio </div>');
                            document.writeln('</div>');
                          document.writeln('</div>');
                        document.writeln('</li>');
    if(!(usua["tipo"]=='2'||usua["tipo"]=='3')){
                        document.writeln('<li onclick="irA(\'sincronizacion\')">');  
                          document.writeln('<div class="item-content">');
                            document.writeln('<div class="item-inner">');
                              document.writeln('<div class="item-title"><i class="fa fa-refresh fa-2x">&nbsp;</i>Sincronización </div>');
                            document.writeln('</div>');
                          document.writeln('</div>');
                        document.writeln('</li>');
    }//if
                        document.writeln('<li onclick="irA(\'acercaDe\')">');
                          document.writeln('<div class="item-content">');
                            document.writeln('<div class="item-inner">');
                              document.writeln('<div class="item-title"><i class="fa fa-info-circle fa-2x">&nbsp;</i>Acerca de esta app</div>');
                            document.writeln('</div>');
                          document.writeln('</div>');
                        document.writeln('</li>');
                        document.writeln('<li onclick="exitAppFromBackground()">');
                          document.writeln('<div class="item-content">');
                            document.writeln('<div class="item-inner">');
                              document.writeln('<div class="item-title"><i class="fa fa-sign-out fa-2x">&nbsp;</i>Salir</div>');
                            document.writeln('</div>');
                          document.writeln('</div>');
                        document.writeln('</li>');
                    document.writeln('</ul>');
                document.writeln('</div>');
            document.writeln('</div>');
        document.writeln('</div>');
    document.writeln('</div>');
    /* Menu */


