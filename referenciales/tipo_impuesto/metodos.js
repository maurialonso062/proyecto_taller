listar();
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
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Tipo de impuestos'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Tipo de impuestos'
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
    $("#txtCodigo").val(0);
    $("#tipimo_descri").removeAttr("disabled");
    $("#tasa").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#tipimo_descri").removeAttr("disabled");
    $("#tasa").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function eliminar(){
    $("#txtOperacion").val(3);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

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
        titulo = "ELIMINAR";
        pregunta = "¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
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


function buscarProductos(){
    $.ajax({
        url: getUrl()+"items/buscar",
        method: "POST",
        dataType: "json",
        data:{
            "item_decripcion":$("#item_decripcion").val(),
            "tipo_descripcion":"PRODUCTO"
        }
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionProducto("+rs.item_id+",'"+rs.item_decripcion+"')\">"+rs.item_decripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaProductos").html(lista);
        $("#listaProductos").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionProducto(item_id, item_decripcion){
    $("#item_id").val(item_id);
    $("#item_decripcion").val(item_decripcion);

    $("#listaProductos").html("");
    $("#listaProductos").attr("style","display:none;");

    $(".form-line").attr("class","form-line focused");
}

function seleccionPais(codigo, descripcion, gentilicio, siglas){
    $("#txtCodigo").val(codigo);
    $("#txtDescripcion").val(descripcion);
    $("#txtGentilicio").val(gentilicio);
    $("#txtSiglas").val(siglas);

    $(".form-line").attr("class","form-line focused");
}

function listar(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/tipo-impuesto/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionTipoImpuestos("+rs.id+",'"+rs.tipimo_descri+"','"+rs.tasa+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tipimo_descri;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.tasa;
                lista = lista +"</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    })
}
function seleccionTipoImpuestos(codigo, tipimo_descri,tasa){
    $("#txtCodigo").val(codigo);
    $("#tipimo_descri").val(tipimo_descri);
    $("#tasa").val(tasa);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "tipo-impuesto/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "tipo-impuesto/update/"+$("#txtCodigo").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "tipo-impuesto/delete/"+$("#txtCodigo").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_taller/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#txtCodigo").val(), 
            'tipimo_descri': $("#tipimo_descri").val(),
            'tasa': $("#tasa").val()
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
                location.reload(true);
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}