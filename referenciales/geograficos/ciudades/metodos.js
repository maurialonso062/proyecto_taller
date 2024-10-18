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
    $("#ciudades_descripcion").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#ciudades_descripcion").removeAttr("disabled");
    $("#pais_descripcion").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/api_proyecto/ciudades/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciudades_descripcion+"',"+rs.pais_id+",'"+rs.pais_descripcion+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudades_descripcion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.pais_descripcion;
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

function seleccionCiudad(id_ciudad, ciudades_descripcion, id_pais, pais_descripcion){
    $("#id").val(id_ciudad);
    $("#ciudades_descripcion").val(ciudades_descripcion);
    $("#pais_id").val(id_pais);
    $("#pais_descripcion").val(pais_descripcion);

    $(".form-line").attr("class","form-line focused");
}

function grabar(){
    var endpoint = "ciudades/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "ciudades/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "ciudades/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url: "http://127.0.0.1:8000/api_proyecto/" + endpoint,
        method: metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'ciudades_descripcion': $("#ciudades_descripcion").val(), 
            'pais_descripcion': $("#pais_descripcion").val(), 
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
                location.reload(true);
            }
        });
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function buscar() {
    $.ajax({
        url: "http://127.0.0.1:8000/api_proyecto/paises/buscar",
        method: "POST",
        dataType: "json",
        data: {
            'descripcion': $("#pais_descripcion").val() // Aquí asegúrate de usar el valor correcto
        }
    })
    .done(function(resultado) {
        var lista = "<ul class=\"list-group\">";
        for (var i = 0; i < resultado.length; i++) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionPais(" + resultado[i].id + ",'" + resultado[i].pais_descripcion + "');\">" + resultado[i].pais_descripcion + "</li>";
        }
        lista += "</ul>";
        $("#listaPaises").html(lista);
        $("#listaPaises").attr("style", "display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a, b, c) {
        alert(c);
        console.log(a.responseText);
    });
}

function buscarPais() {
    const descripcion = $("#pais_descripcion").val(); // Obtener el valor ingresado

    $.ajax({
        url: "http://127.0.0.1:8000/api_proyecto/paises/buscar",
        method: "POST",
        dataType: "json",
        data: {
            descripcion: descripcion // Asegúrate de enviar esto
        }
    })
    .done(function (resultado) {
        let lista = "<ul class='list-group'>";
        for (const pais of resultado) {
            lista += `<li class='list-group-item' onclick='seleccionPais(${pais.id}, "${pais.pais_descripcion}");'>${pais.pais_descripcion}</li>`;
        }
        lista += "</ul>";
        $("#listaPaises").html(lista).css("display", "block");
    })
    .fail(function (a, b, c) {
        alert(c);
        console.log(a.responseText);
    });
}


function seleccionPais(id, descripcion) {
    $("#pais_id").val(id);
    $("#pais_descripcion").val(descripcion);
    
    $("#listaPaises").html("").hide();
}


