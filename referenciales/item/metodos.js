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
                title:'Listado de Items'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Items'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Items'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Items'
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
    $("#item_descripcion").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled");
    $("#item_precio").removeAttr("disabled");
    $("#tipo_descripcion").removeAttr("disabled");
    $("#marca_nombre").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#item_descripcion").removeAttr("disabled");
    $("#item_costo").removeAttr("disabled");
    $("#item_precio").removeAttr("disabled");
    $("#tipo_descripcion").removeAttr("disabled");
    $("#marca_nombre").removeAttr("disabled");

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


function listar(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/items/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
    $("#item_descripcion").removeAttr("disabled");
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionItem(" + rs.id + "," + rs.tipo_impuesto_id + "," + rs.tipo_id + "," + rs.marca_id + ",'" + rs.item_descripcion + "','" + rs.item_costo + "','" + rs.item_precio + "','" + rs.tipo_descripcion + "','" + rs.marca_nombre + "');\">";
                lista = lista + "<td>" + rs.id + "</td>";
                lista = lista + "<td>" + rs.item_descripcion + "</td>";
                lista = lista + "<td>" + rs.item_costo + "</td>";
                lista = lista + "<td>" + rs.item_precio + "</td>";
                lista = lista + "<td>" + rs.tipo_descripcion + "</td>";
                lista = lista + "<td>" + rs.marca_nombre + "</td>";
            lista = lista + "</tr>";
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionItem(id, marca_id, tipo_impuesto_id,tipo_id, item_descripcion, item_costo, item_precio, tipo_descripcion, marca_nombre,tipo_imp_descrip) {
    // Asignar los valores a los campos correspondientes
    $("#id").val(id);
    $("#item_descripcion").val(item_descripcion);
    $("#item_costo").val(item_costo);
    $("#item_precio").val(item_precio);
    
    $("#marca_nombre").val(marca_nombre); // Campo visible de la marca_nombre
    $("#marca_id").val(marca_id); // Campo oculto de marca_id
    $("#tipo_descripcion").val(tipo_descripcion); // Campo visible de la tipo_descripcion
    $("#tipo_id").val(tipo_id); // Campo visible de la tipo_id


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    // Esto debería asegurarse de que los labels se muestren de forma correcta
    $(".form-line").addClass("focused");
}


function buscarTipoItems(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/tipos/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionTipoItems("+rs.id+",'"+rs.tipo_descripcion+"','"+rs.tipo_objeto+"')\">"+rs.tipo_descripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaTipoItems").html(lista);
        $("#listaTipoItems").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionTipoItems(id, tipo_descripcion,tipo_objeto) {
    $("#tipo_id").val(id);  // Asegúrate de que el campo hidden exista
    $("#tipo_descripcion").val(tipo_descripcion);
    $("#tipo_objeto").val(tipo_objeto);

    $("#listaTipoItems").html("");
    $("#listaTipoItems").attr("style", "display:none;");
}


function buscarMarca(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/marca/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionMarca("+rs.id+",'"+rs.marca_nombre+"');\">"+rs.marca_nombre+"</li>";
        }
        lista += "</ul>";
        $("#listaMarcas").html(lista);
        $("#listaMarcas").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}  
function seleccionMarca(id,marca_nombre){
    $("#marca_id").val(id);
    $("#marca_nombre").val(marca_nombre);

    $("#listaMarcas").html("");
    $("#listaMarcas").attr("style","display:none;");
}


function grabar(){
    var endpoint = "items/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "items/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "items/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'item_descripcion': $("#item_descripcion").val(), 
            'item_costo': $("#item_costo").val(),
            'item_precio': $("#item_precio").val(),
            'tipo_id': $("#tipo_id").val(),
            'marca_id': $("#marca_id").val()
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