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
    $("#empresa_descri").removeAttr(empresa_descri);
    $("#empresa_ruc").removeAttr(empresa_ruc);
    $("#empresa_direccion").removeAttr(empresa_direccion);
    $("#empresa_telefono").removeAttr(empresa_telefono);
    $("#empresa_email").removeAttr(empresa_email);

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#empresa_descri").removeAttr(empresa_descri);
    $("#empresa_ruc").removeAttr(empresa_ruc);
    $("#empresa_direccion").removeAttr(empresa_direccion);
    $("#empresa_telef").removeAttr(empresa_telefono);
    $("#empresa_email").removeAttr(empresa_email);

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
        url:"http://127.0.0.1:8000/api_proyecto/empresa/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCliente("+rs.id+",'"+rs.empresa_descri+"','"+rs.empresa_ruc+"','"+rs.empresa_direccion+"','"+rs.empresa_telef+"','"+rs.empresa_email+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_descri;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_direccion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_telef;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.empresa_email;
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

function seleccionEmpresa(id, empresa_descri, empresa_ruc, empresa_direccion, empresa_telef, empresa_email){
    $("#id").val(id);
    $("#empresa_descri").val(empresa_descri);
    $("#empresa_ruc").val(empresa_ruc);
    $("#empresa_direccion").val(empresa_direccion);
    $("#empresa_telef").val(empresa_telef);
    $("#empresa_email").val(empresa_email);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "clientes/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "clientes/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "clientes/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'empresa_descri': $("#empresa_descri").val(), 
            'empresa_ruc': $("#empresa_ruc").val(), 
            'empresa_direccion': $("#empresa_direccion").val(), 
            'empresa_telef': $("#empresa_telef").val(), 
            'empresa_email': $("#empresa_email").val()
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