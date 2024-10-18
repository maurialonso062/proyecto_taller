listar();
campoFecha();
function formatoTabla(){
    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons: [
            {
                extend:'copy',
                text:'COPIAR',
                className:'btn btn-primary waves-effect',
                title:'Listado de Ciudades'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Ciudades'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Ciudades'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Ciudades'
            }
        ],
        iDisplayLength:3,
        language:{
            sSearch: 'Buscar: ',
            sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoFiltered: '(filtrado de entre _MAX_ registros)',
            sZeroRecords: 'No se encontraron resultados',
            sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 0 registros',
            oPaginate:{
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            }
        }
    });
}
function cancelar(){
    location.reload(true);
}

function agregar(){
    $("#txtOperacion").val(1);
    $("#id").val(0);
    $("#pre_vence").removeAttr("disabled");
    $("#pre_observaciones").removeAttr("disabled");
    $("#prov_razonsocial").removeAttr("disabled");
    $("#pedido").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobado").attr("disabled","true");


    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
    $("#registros").attr("style","display:none;");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#pedido_vence").removeAttr("disabled");
    $("#pedido_observaciones").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmar(){
    $("#txtOperacion").val(4);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function aprobar(){
    $("#txtOperacion").val(6);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");


    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function rechazar(){
    $("#txtOperacion").val(5);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");
}

function confirmarOperacion() {
    var oper = parseInt($("#txtOperacion").val());
    var titulo = "AGREGAR";
    var pregunta = "¿DESEA GRABAR EL NUEVO REGISTRO?";

    if(oper===2){
        titulo = "EDITAR";
        pregunta = "¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ANULAR";
        pregunta = "¿DESEA ANULAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===4){
        titulo = "CONFIRMAR";
        pregunta = "¿DESEA CONFIRMAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===5){
        titulo = "RECHAZAR";
        pregunta = "¿DESEA RECHAZAR EL PRESUPUESTO SELECCIONADO?";
    }
    if(oper===6){
        titulo = "APROBAR";
        pregunta = "¿DESEA APROBAR EL PRESUPUESTO SELECCIONADO?";
    }
    swal({
        title: titulo,
        text: pregunta,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#458E49",
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        closeOnConfirm: false
    }, function () {
        grabar();
    });
}

function mensajeOperacion(titulo,mensaje,tipo) {
    swal(titulo, mensaje, tipo);
}


function listar(){
    $.ajax({
        url:getUrl()+"presupuestos/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionPresupuesto("+rs.id+",'"+rs.pre_vence+"','"+rs.pre_observaciones+"','"+rs.pre_estado+"',"+rs.proveedor_id+",'"+rs.prov_razonsocial+"','"+rs.prov_ruc+"','"+rs.prov_telefono+"','"+rs.prov_correo+"',"+rs.pedido_id+",'"+rs.pedido+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_vence;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_observaciones;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.name;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pre_estado;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.nro_pedido;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionPresupuesto(id,pre_vence, pre_observaciones, pre_estado, proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo, pedido_id, pedido){
    $("#id").val(id);
    $("#pre_vence").val(pre_vence);
    $("#pre_observaciones").val(pre_observaciones);
    $("#pre_estado").val(pre_estado);
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);   
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);
    $("#pedido_id").val(pedido_id);
    $("#pedido").val(pedido);        

    $("#detalles").attr("style","display:block;");
    $("#registros").attr("style","display:none;");
    $("#formDetalles").attr("style","display:none;");
    listarDetalles();   

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    $("#btnConfirmar").attr("disabled","true");
    $("#btnRechazar").attr("disabled","true");
    $("#btnAprobar").attr("disabled","true");

    $("#btnCancelar").removeAttr("disabled");
    
    if (pre_estado === "PENDIENTE"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");

        $("#btnEliminar").removeAttr("disabled");
        $("#btnConfirmar").removeAttr("disabled");
        $("#btnEditar").removeAttr("disabled");
        $("#formDetalles").attr("style","display:block;");
    }

    if (pre_estado === "CONFIRMADO"){   
        $("#btnAgregar").attr("disabled","true");
        $("#btnGrabar").attr("disabled","true");
    
        $("#btnRechazar").removeAttr("disabled");
        $("#btnAprobar").removeAttr("disabled");
        }

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "presupuestos/create";
    var metodo = "POST";
    var estado = "PENDIENTE";
    
    if($("#txtOperacion").val()==2){
        endpoint = "presupuestos/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "presupuestos/anular/"+$("#id").val();
        metodo = "PUT";
        estado = "ANULADO";
    }
    if($("#txtOperacion").val()==4){
        endpoint = "presupuestos/confirmar/"+$("#id").val();
        metodo = "PUT";
        estado = "CONFIRMADO";
    }
    if($("#txtOperacion").val()==5){
        endpoint = "presupuestos/rechazar/"+$("#id").val();
        metodo = "PUT";
        estado = "RECHAZADO";
    }
    if($("#txtOperacion").val()==6){
        endpoint = "presupuestos/aprobar/"+$("#id").val();
        metodo = "PUT";
        estado = "APROBADO";
    }
    $.ajax({
        url:getUrl()+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'pre_vence': $("#pre_vence").val(), 
            'pre_observaciones': $("#pre_observaciones").val(),
            'proveedor_id': $("#proveedor_id").val(), 
            'user_id': $("#user_id").val(),
            'pedido_id': $("#pedido_id").val(),  
            'pre_estado': estado,
            'operacion': $("#txtOperacion").val()
        }

    })
    .done(function(resultado){
        swal({
            title:"Respuesta",
            text: resultado.mensaje,
            type: resultado.tipo
        },
        function(){
            if(resultado.tipo == "success"){
                //location.reload(true);
                $("#id").val(resultado.registro.id);
                $("#detalles").attr("style","display:block;");
                listarDetalles();
                if(resultado.registro.pre_estado!= "PENDIENTE"){
                    location.reload(true);
                }
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function campoFecha(){
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY HH:mm:ss',
        clearButton: true,
        weekStart: 1
    });
}

function agregarDetalle(){
    $("#txtOperacionDetalle").val(1);
    //$("#item_descripcion").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function editarDetalle(){
    $("#txtOperacionDetalle").val(2);
    //$("#item_descripcion").removeAttr("disabled");
    $("#det_costo").removeAttr("disabled");
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function eliminarDetalle(){
    $("#txtOperacionDetalle").val(3);
    $("#btnAgregarDetalle").attr("Style","display:none");
    $("#btnEditarDetalle").attr("Style","display:none");
    $("#btnEliminarDetalle").attr("Style","display:none");
    $("#btnGrabarDetalle").attr("Style","display:inline");
}

function grabarDetalle(){
    var endpoint = "presupuestos-detalles/create";
    var metodo = "POST";
    
    if($("#txtOperacionDetalle").val()==2){
        endpoint = "presupuestos-detalles/update/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "PUT";
    }
    if($("#txtOperacionDetalle").val()==3){
        endpoint = "presupuestos-detalles/delete/"+$("#id").val()+"/"+$("#item_id").val();
        metodo = "DELETE";
    }

    $.ajax({
        url:getUrl()+endpoint,
        method: metodo,
        dataType: "json",
        data: {
            "presupuesto_id":$("#id").val(),
            "item_id":$("#item_id").val(),
            "det_cantidad":$("#det_cantidad").val(),
            "det_costo":$("#det_costo").val()
        }
    })
    .done(function(respuesta) {
        listarDetalles();
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
    
    $("#btnAgregarDetalle").attr("Style","display:inline");
    $("#btnEditarDetalle").attr("Style","display:inline");
    $("#btnEliminarDetalle").attr("Style","display:inline");
    $("#btnGrabarDetalle").attr("Style","display:none");

    $("#txtOperacionDetalle").val(1);
    $("#item_descripcion").val("");
    $("#det_cantidad").val("");
    $("#det_costo").val("");
}

function buscarProductos(){
    $.ajax({
        url:getUrl()+"items/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'item_descripcion': $("#item_descripcion").val(),
            'tipo_descripcion': "PRODUCTO"
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_descripcion+"');\">"+rs.item_descripcion+"</li>";
        }
        lista += "</ul>";
        $("#ListaProductos").html(lista);
        $("#ListaProductos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionProducto(item_id,item_descripcion){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);

    $("#ListaProductos").html("");
    $("#ListaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function listarDetalles() {
    var cantidadDetalle = 0;
    var totalGral = 0;
    $.ajax({
        url:getUrl()+"presupuestos-detalles/read/"+$("#id").val(),
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionDetalle("+rs.item_id+",'"+rs.item_descripcion+"',"+rs.det_cantidad+","+rs.det_costo+");\">";
                lista = lista + "<td>";
                lista = lista + rs.item_id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.item_descripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.det_cantidad;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + rs.det_costo;
                lista = lista +"</td>";
                lista = lista + "<td class='text-right'>";
                lista = lista + (rs.det_cantidad*rs.det_costo);
                lista = lista +"</td>";
            lista = lista + "</tr>";
            cantidadDetalle++;
            totalGral +=(rs.det_cantidad*rs.det_costo);
        }
        $("#tableDetalles").html(lista);
        $("#txtTotalGral").text(totalGral);
        if($("#pre_estado").val() === "PENDIENTE" && cantidadDetalle > 0) {
            $("#btnConfirmar").removeAttr("disabled");
        }else{
            $("#btnConfirmar").attr("disabled","true");
        }
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    })
}

function seleccionDetalle(item_id, item_descripcion, det_cantidad, det_costo){
    $("#item_id").val(item_id);
    $("#item_descripcion").val(item_descripcion);
    $("#det_cantidad").val(det_cantidad);
    $("#det_costo").val(det_costo);
}

function buscarProveedores(){
    $.ajax({
        url:getUrl()+"proveedores/buscar",
        method:"POST",
        dataType: "json",
        data: {
            "prov_razonsocial": $("#prov_razonsocial").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProveedor("+rs.proveedor_id+",'"+rs.prov_razonsocial+"','"+rs.prov_ruc+"','"+rs.prov_telefono+"','"+rs.prov_correo+"');\">"+rs.prov_razonsocial+" - "+rs.prov_ruc+"</li>";
        }
        lista += "</ul>";
        $("#ListaProveedores").html(lista);
        $("#ListaProveedores").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionProveedor(proveedor_id, prov_razonsocial, prov_ruc, prov_telefono, prov_correo){
    $("#proveedor_id").val(proveedor_id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_correo").val(prov_correo);

    $("#ListaProveedores").html("");
    $("#ListaProveedores").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function buscarPedidos(){
    $.ajax({
        url:getUrl()+"pedidos/buscar",
        method:"POST",
        dataType: "json",
        data: {
            'user_id': $("#user_id").val(),
            'name': $("#pedido").val()
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPedido("+rs.pedido_id+",'"+rs.pedido+"')\">"+rs.pedido+"</li>";
        }
        lista += "</ul>";
        $("#ListaPedidos").html(lista);
        $("#ListaPedidos").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(xhr, status, error) {
        alert("Error: " + error);
        console.error(xhr.responseText);
    });
}

function seleccionPedido(pedido_id, pedido){
    $("#pedido_id").val(pedido_id);
    $("#pedido").val(pedido);

    $("#ListaPedidos").html("");
    $("#ListaPedidos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

