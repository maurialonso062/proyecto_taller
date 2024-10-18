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
                title:'Listado de Clientes'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Clientes'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Clientes'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Clientes'
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
    $("#cliente_nombre").removeAttr("disabled");
    $("#cliente_apellido").removeAttr("disabled");
    $("#cliente_ruc").removeAttr("disabled");
    $("#cliente_telefono").removeAttr("disabled");
    $("#cliente_direc").removeAttr("disabled");
    $("#cliente_email").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#cliente_nombre").removeAttr("disabled");
    $("#cliente_apellido").removeAttr("disabled");
    $("#cliente_ruc").removeAttr("disabled");
    $("#cliente_telefono").removeAttr("disabled");
    $("#cliente_direc").removeAttr("disabled");
    $("#cliente_email").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/api_proyecto/cliente/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCliente("+rs.id+",'"+rs.cliente_nombre+"','"+rs.cliente_apellido+"','"+rs.cliente_ruc+"','"+rs.cliente_telefono+"','"+rs.cliente_direc+"','"+rs.cliente_email+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_nombre;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_apellido;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_telefono;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_direc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.cliente_email;
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

function seleccionCliente(id, cliente_nombre, cliente_apellido, cliente_ruc, cliente_telefono, cliente_direc, cliente_email){
    $("#id").val(id);
    $("#cliente_nombre").val(cliente_nombre);
    $("#cliente_apellido").val(cliente_apellido);
    $("#cliente_ruc").val(cliente_ruc);
    $("#cliente_telefono").val(cliente_telefono);
    $("#cliente_direc").val(cliente_direc);
    $("#cliente_email").val(cliente_email);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "cliente/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "cliente/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "cliente/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'cliente_nombre': $("#cliente_nombre").val(), 
            'cliente_apellido': $("#cliente_apellido").val(),
            'cliente_ruc': $("#cliente_ruc").val(),
            'cliente_direc': $("#cliente_direc").val(),
            'cliente_telefono': $("#cliente_telefono").val(),
            'cliente_email': $("#cliente_email").val()
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