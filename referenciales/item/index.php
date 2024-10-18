﻿<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>GUI ITEMS</title>
    <!-- Favicon-->
    <link rel="icon" href="../../favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="../../plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="../../plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="../../plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Sweetalert Css -->
    <link href="../../plugins/sweetalert/sweetalert.css" rel="stylesheet" />

    <!-- JQuery DataTable Css -->
    <link href="../../plugins/jquery-datatable/skin/bootstrap/css/dataTables.bootstrap.css" rel="stylesheet">

    <!-- Custom Css -->
    <link href="../../css/style.css" rel="stylesheet">

    <!-- AdminBSB Themes. You can choose a theme from css/themes instead of get all themes -->
    <link href="../../css/themes/all-themes.css" rel="stylesheet" />
</head>

<body class="theme-red">

    <?php require_once('../../opciones.php'); ?>

    <section class="content">
        <div class="container-fluid">
            <div class="block-header">
                <h2>MANTENER ITEMS</h2>
            </div>

            <div class="row clearfix">

                <div class="col-md-12">
                    
                    <div class="card">
                        <div class="header">
                            <h2>Mantener datos de Items <small>CRUD de Items</small> </h2>
                        </div>
                        <div class="body">
                            <div class="row clearfix">
                                <input type="hidden" value="0" id="txtOperacion"/>
                                <!-- CAMPO PARA CODIGO CON 4 COLUMNAS -->
                                <div class="col-sm-1">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="id" class="form-control" disabled>
                                            <label class="form-label">Código</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DESCRIPCION CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="item_descripcion" class="form-control" disabled>
                                            <label class="form-label">Descripcion</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA GENTILICIO CON 6 COLUMNAS -->
                                <div class="col-sm-3">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="item_costo" class="form-control" disabled>
                                            <label class="form-label">Costo</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DESCRIPCION CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="item_precio" class="form-control" disabled>
                                            <label class="form-label">Precio</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DESCRIPCION CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tipo_descripcion" class="form-control" disabled onkeyup="buscarTipoItems();">
                                            <label class="form-label">Tipo Items</label>
                                        </div>
                                        <!-- Campo oculto para almacenar el ID de la nacionalidad -->
                                        <input type="hidden" id="tipo_id" name="tipo_id">
                                    
                                        <!-- Contenedor para mostrar las nacionalidades -->
                                        <div id="listaTipoItems" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA DESCRIPCION CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="tipimo_descri" class="form-control" disabled onkeyup="buscarTipoImpuestos();">
                                            <label class="form-label">Tipo Impuesto</label>
                                        </div>
                                        <!-- Campo oculto para almacenar el ID de la nacionalidad -->
                                        <input type="hidden" id="tipo_impuestos_id" name="tipo_impuestos_id">
                                            
                                        <!-- Contenedor para mostrar las nacionalidades -->
                                        <div id="listaTipoImpuestos" style="display:none;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <!-- Campo de texto para la ciudad, habilitado -->
                                            <input type="text" id="mar_descri" class="form-control" disabled onkeyup="buscarMarca();">
                                            <label class="form-label">Marca</label>
                                        </div>

                                        <!-- Campo oculto para almacenar el ID de la marca -->
                                        <input type="hidden" id="marca_id" name="marca_id">

                                        <!-- Contenedor para la lista de ciudades -->
                                        <div id="listaMarcas" style="display:none;"></div>
                                    </div>
                                </div>
                                <!-- CAMPO PARA GENTILICIO CON 4 COLUMNAS -->
                                <div class="col-sm-4">
                                    <div class="form-group form-float">
                                        <div class="form-line">
                                            <input type="text" id="mod_descri" class="form-control" disabled onkeyup="buscarModelos();">
                                            <label class="form-label">Modelo</label>
                                        </div>
                                        <!-- Campo oculto para almacenar el ID del modelo -->
                                        <input type="hidden" id="modelo_id" name="modelo_id">
                                            
                                        <!-- Contenedor para mostrar los modelo -->
                                        <div id="listaModelo" style="display:none;"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="button-demo">
                                <button type="button" id="btnAgregar" class="btn btn-success waves-effect" onclick="agregar();">AGREGAR</button>
                                <button type="button" id="btnEditar" class="btn btn-primary waves-effect" onclick="editar();">EDITAR</button>
                                <button type="button" id="btnEliminar" class="btn btn-danger waves-effect" onclick="eliminar();">ELIMINAR</button>
                                <button type="button" id="btnGrabar" class="btn btn-default waves-effect" disabled onclick="confirmarOperacion();">GRABAR</button>
                                <button type="button" id="btnCancelar" class="btn btn-warning waves-effect" onclick="cancelar();" disabled>CANCELAR</button> 
                            </div>
                            </div>
                    </div>

                    <div class="card">
                        <div class="header">
                            <h2>Registros de Proveedores</h2>
                        </div>
                        <div class="body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Descripcion</th>
                                            <th>Costo</th>
                                            <th>Precio</th>
                                            <th>Tipo items</th>
                                            <th>Tipo Impuesto</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                        <th>Código</th>
                                            <th>Descripcion</th>
                                            <th>Costo</th>
                                            <th>Precio</th>
                                            <th>Tipo items</th>
                                            <th>Tipo Impuesto</th>
                                            <th>Marca</th>
                                            <th>Modelo</th>
                                        </tr>
                                    </tfoot>    
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    </section>

    <!-- Jquery Core Js -->
    <script src="../../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Select Plugin Js -->
    <script src="../../plugins/bootstrap-select/js/bootstrap-select.js"></script>

    <!-- Slimscroll Plugin Js -->
    <script src="../../plugins/jquery-slimscroll/jquery.slimscroll.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../../plugins/node-waves/waves.js"></script>

    <!-- SweetAlert Plugin Js -->
    <script src="../../plugins/sweetalert/sweetalert.min.js"></script>

    <!-- Jquery DataTable Plugin Js -->
    <script src="../../plugins/jquery-datatable/jquery.dataTables.js"></script>
    <script src="../../plugins/jquery-datatable/skin/bootstrap/js/dataTables.bootstrap.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/dataTables.buttons.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.flash.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/jszip.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/pdfmake.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/vfs_fonts.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.html5.min.js"></script>
    <script src="../../plugins/jquery-datatable/extensions/export/buttons.print.min.js"></script>

    <!-- Custom Js -->
    <script src="../../js/admin.js"></script>

    <!-- Demo Js -->
    <script src="../../js/demo.js"></script>

    <script src="metodos.js"></script>
</body>

</html>
