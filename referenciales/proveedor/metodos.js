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
                title:'Listado de Proveedores'
            },
            {
                extend:'excel',
                text:'EXCEL',
                className:'btn btn-success waves-effect',
                title:'Listado de Proveedores'
            },
            {
                extend:'pdf',
                text:'PDF',
                className:'btn btn-danger waves-effect',
                title:'Listado de Proveedores'
            },
            {
                extend:'print',
                text:'IMPRIMIR',
                className:'btn btn-warning waves-effect',
                title:'Listado de Proveedores'
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
    $("#prov_razonsocial").removeAttr("disabled");
    $("#prov_ruc").removeAttr("disabled");
    $("#prov_telefono").removeAttr("disabled");
    $("#prov_direccion").removeAttr("disabled");
    $("#prov_correo").removeAttr("disabled");
    $("#ciudades_descripcion").removeAttr("disabled");
    $("#nacion_descri").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");

    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");

    $(".form-line").attr("class","form-line focused");
}

function editar(){
    $("#txtOperacion").val(2);
    $("#prov_razonsocial").removeAttr("disabled");
    $("#prov_ruc").removeAttr("disabled");
    $("#prov_telefono").removeAttr("disabled");
    $("#prov_direccion").removeAttr("disabled");
    $("#prov_correo").removeAttr("disabled");
    $("#ciudades_descripcion").removeAttr("disabled");
    $("#nacion_descri").removeAttr("disabled");

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
        url:"http://127.0.0.1:8000/api_proyecto/proveedores/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            lista = lista + "<tr class=\"item-list\" onclick=\"seleccionProveedor(" + rs.id + "," + rs.ciudad_id + "," + rs.nacionalidad_id + ",'" + rs.prov_razonsocial + "','" + rs.prov_ruc + "','" + rs.prov_telefono + "','" + rs.prov_direccion + "','" + rs.prov_correo + "','" + rs.ciudades_descripcion + "','" + rs.nacion_descri + "');\">";
                lista = lista + "<td>",
                lista = lista + rs.id;
                lista = lista + "<td>" + rs.prov_razonsocial + "</td>";
                lista = lista + "<td>" + rs.prov_ruc + "</td>";
                lista = lista + "<td>" + rs.prov_telefono + "</td>";
                lista = lista + "<td>" + rs.prov_direccion + "</td>";
                lista = lista + "<td>" + rs.prov_correo + "</td>";
                lista = lista + "<td>" + rs.ciudades_descripcion + "</td>";
                lista = lista + "<td>" + rs.nacion_descri + "</td>";
            lista = lista + "</tr>";

                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prov_razonsocial;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prov_ruc;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prov_telefono;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prov_direccion;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.prov_correo;
                lista = lista + "</td>";
                lista = lista + "<td>";
                lista = lista + rs.ciudades_descripcion;
                lista = lista +"</td>";
                lista = lista + "</td>";
                lista = lista + rs.nacion_descri;
                lista = lista + "</tr>";
                
        }
        $("#tableBody").html(lista);
        formatoTabla();
    })
    .fail(function(a,b,c){
        alert(c);
    });
}

function seleccionProveedor(id, ciudad_id, nacionalidad_id, prov_razonsocial, prov_ruc, prov_telefono, prov_direccion, prov_correo, ciudades_descripcion, nacion_descri) {
    // Asignar los valores a los campos correspondientes
    $("#id").val(id);
    $("#prov_razonsocial").val(prov_razonsocial);
    $("#prov_ruc").val(prov_ruc);
    $("#prov_telefono").val(prov_telefono);
    $("#prov_direccion").val(prov_direccion);
    $("#prov_correo").val(prov_correo);
    
    // Aquí estás asignando ciudad y nacionalidad correctamente
    $("#ciudades_descripcion").val(ciudades_descripcion); // Campo visible de la ciudad
    $("#nacion_descri").val(nacion_descri); // Campo visible de la nacionalidad
    $("#ciudad_id").val(ciudad_id); // Campo oculto de ciudad_id
    $("#nacionalidad_id").val(nacionalidad_id); // Campo oculto de nacionalidad_id


    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled");
    $("#btnGrabar").attr("disabled","true");
    $("#btnCancelar").attr("disabled","true");
    $("#btnEliminar").attr("disabled");
    
    $("#btnCancelar").removeAttr("disabled");

    // Esto debería asegurarse de que los labels se muestren de forma correcta
    $(".form-line").addClass("focused");
}


function buscarCiudades(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/ciudades/read",
        method: "GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for (rs of resultado) {
            lista += "<li class=\"list-group-item\" onclick=\"seleccionCiudad("+rs.id+",'"+rs.ciudades_descripcion+"')\">"+rs.ciudades_descripcion+"</li>";   
        }
        lista += "</ul>";
        $("#listaCiudades").html(lista);
        $("#listaCiudades").attr("style","display:block; position: absolute; z-index: 2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    });
}

// Rellena el campo de producto seleccionado.
function seleccionCiudad(id, ciudades_descripcion) {
    $("#ciudad_id").val(id);  // Asegúrate de que el campo hidden exista
    $("#ciudades_descripcion").val(ciudades_descripcion);

    $("#listaCiudades").html("");
    $("#listaCiudades").attr("style", "display:none;");
}

function buscarNacionalidades(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/nacionalidad/read",
        method:"GET",
        dataType: "json"
    })
    .done(function(resultado){
        var lista = "<ul class=\"list-group\">";
        for(rs of resultado){
            lista += "<li class=\"list-group-item\" onclick=\"seleccionNacionalidad("+rs.id+",'"+rs.nacion_descri+"');\">"+rs.nacion_descri+"</li>";
        }
        lista += "</ul>";
        $("#listaNacionalidades").html(lista);
        $("#listaNacionalidades").attr("style","display:block; position:absolute; z-index:2000;");
    })
    .fail(function(a,b,c){
        alert(c);
        console.log(a.responseText);
    })
}

function seleccionNacionalidad(id,nacion_descri){
    $("#nacionalidad_id").val(id);
    $("#nacion_descri").val(nacion_descri);

    $("#listaNacionalidades").html("");
    $("#listaNacionalidades").attr("style","display:none;");
}

function grabar(){
    var endpoint = "proveedores/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
        endpoint = "proveedores/update/"+$("#id").val();
        metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpoint = "proveedores/delete/"+$("#id").val();
        metodo = "DELETE";
    }
    $.ajax({
        url:"http://127.0.0.1:8000/api_proyecto/"+endpoint,
        method:metodo,
        dataType: "json",
        data: { 
            'id': $("#id").val(), 
            'prov_razonsocial': $("#prov_razonsocial").val(), 
            'prov_ruc': $("#prov_ruc").val(),
            'prov_telefono': $("#prov_telefono").val(),
            'prov_direccion': $("#prov_direccion").val(),
            'prov_correo': $("#prov_correo").val(),
            'ciudad_id': $("#ciudad_id").val(),
            'nacionalidad_id': $("#nacionalidad_id").val()
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