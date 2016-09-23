$(document).ready(function(){
    $("#buscar").click(function(){
        var cep = $("#cep").val();
        $.ajax({
            url: "//viacep.com.br/ws/" + cep + "/json/",
            type: "GET",
            dataType: "json",
            success: function(result) {
                resultado = result;
                $("#rua").val(result.logradouro).focus();
                $("#bairro").val(result.bairro).focus();
                $("#cidade").val(result.localidade).focus();
                $("#estado").val(result.uf).focus();
                $("#complemento").val(result.complemento).focus();
                Materialize.updateTextFields();

            },
            beforeSend: function(){
                $('.carregando').css({display:"block"});
            },
            complete: function(){
                $('.carregando').css({display:"none"});
            }
        });
    });
    
    $("#limpar").click(function(tecla){
        $("#cep").val("").blur();
        $("#rua").val("").blur();
        $("#bairro").val("").blur();
        $("#cidade").val("").blur();
        $("#estado").val("").blur();
        $("#complemento").val("").blur();
        
    });
    
    $("#cep").keyup(function(tecla){
        if(tecla.keyCode == 13){
            $("#buscar").click();
        }
    })
    
});
