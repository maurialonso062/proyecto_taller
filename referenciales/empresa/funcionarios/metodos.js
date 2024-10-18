formatoTabla();
function formatoTabla(){
    //Exportable table
    $('.js-exportable').DataTable({
dom: 'Bfrtip',
responsive: true,
buttons: [
   {
    extend: 'copy',
    text: 'COPIAR',
    className:'btn btn-primary waves-effect',
    title:'Listado de Funcionarios'
   },
   {
    extend: 'excel',
    text: 'EXCEL',
    className:'btn btn-success waves-effect',
    title:'Listado de Funcionarios'
   },
   {
    extend: 'pdf',
    text: 'PDF',
    className:'btn btn-danger waves-effect',
    title:'Listado de Funcionarios'
   },
   {
    extend: 'print',
    text: 'IMPRIMIR',

    
    className:'btn btn-warning waves-effect',
    title:'Listado de Funcionarios'
   },

],
iDisplayLength:3,
language:{
    sSearch: 'Buscar:',
    sInfo: 'Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros',
    sInfoFiltered:'(filtrado de entre _MAX_ registros)',
    sZeroRecords: 'No se encontraron resultados',
    sInfoEmpty: 'Mostrando resultado del 0 al 0 de un total de 7 registros',
    oPaginate: {
        sNext: 'Siguiente',
        sPrevious: 'Anterior',
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
    $("#fun_nombres").removeAttr("disabled");
    $("#fun_apellidos").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabled");


    $(".form-line").attr("class","form-line focused");

}
function editar(){
    $("#txtOperacion").val(2);
    $("#fun_nombres").removeAttr("disabled");
    $("#fun_apellidos").removeAttr("disabled");

    $("#btnAgregar").attr("disabled","true");
    $("#btnEditar").attr("disabled","true");
    $("#btnEliminar").attr("disabled","true");
    
    $("#btnGrabar").removeAttr("disabled");
    $("#btnCancelar").removeAttr("disabSled");


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
        pregunta="¿DESEA EDITAR EL REGISTRO SELECCIONADO?";
    }
    if(oper===3){
        titulo = "ELIMINAR";
        pregunta="¿DESEA ELIMINAR EL REGISTRO SELECCIONADO?";
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


function mensajeOperacion(titulo, mensaje, tipo) {
    swal(titulo, mensaje, tipo);
}

function listar(){
    $.ajax({
        url:"http://127.0.0.1:8000/api_examen_final/funcionario/read",
        method:"POST",
        dataType:"json",
        

    })
    .done(function(resultado){
        var lista = "";
        for(rs of resultado){
            
            lista = lista + "<tr   class=\"item-list\" onclick=\"seleccionFuncionarios("+rs.id+",'"+rs.fun_nombres+"','"+rs.fun_apellidos+"');\">";
                lista = lista + "<td>";
                lista = lista + rs.id;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_nombres;
                lista = lista +"</td>";
                lista = lista + "<td>";
                lista = lista + rs.fun_apellidos;
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

function seleccionFuncionarios(id,fun_nombres , fun_apellidos){
    $("#id").val(id);
    $("#fun_nombres").val(fun_nombres);
    $("#fun_apellidos").val(fun_apellidos);

    $(".form-line").attr("class","form-line focused");
}
 function grabar(){
    var endpointn = "funcionario/create";
    var metodo = "POST";
    if($("#txtOperacion").val()==2){
         endpointn = "funcionario/update/"+$("#id").val();
         metodo = "PUT";
    }
    if($("#txtOperacion").val()==3){
        endpointn = "funcionario/delete/"+$("#id").val();
        metodo = "DELETE";
   }
   $.ajax({
    url:"http://127.0.0.1:8000/api_examen_final/"+endpoint
    ,
    method:metodo,
    dataType: "json",
    data: {
       'id': $("#id").val(),
       'fun_nombres': $("#fun_nombres").val(),
       'fun_apellidos': $("#fun_apellidos").val(),

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





