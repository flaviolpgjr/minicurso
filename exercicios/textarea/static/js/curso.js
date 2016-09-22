$(document).ready(function(){
    $("#limpar").click(function(){
        $('#texto').val('');//Limpa o formulario
        $('#contagem').html('0');
        $('#contagem').css('color' , '#00e676');
        $("#imagem").fadeOut(2000);
        $('nav').css('background-color' , '#ee6e73');
    });

    $("#texto").keyup(function(tecla){
        var valor = $(this).val().length;
        if (tecla.keyCode != 13){
            $('#contagem').html(valor);//Atualizando o contador

            if(valor <= 20){
                $('#contagem').css('color' , '#00e676');
            }else if(valor >20 && valor <=39){
                $('#contagem').css('color' , '#ffd600');
            }else if(valor >= 40){
                $('#contagem').css('color' , '#dd2c00');
            }
        }else{
            if(valor <= 20){
                $('nav').css('background-color' , '#00e676');
            }else if(valor >20 && valor <=39){
                $('nav').css('background-color' , '#ffd600');
            }else if(valor >= 40){
                $('nav').css('background-color' , '#dd2c00');
            }
            var texto = $("#texto").val().toUpperCase().replace(/\n/g,"");
            
            if(texto == 'PYTHON E FODA'){
                $("#imagem").fadeIn(2000);
                $("#imagem").removeClass('oculta');
            }
        }
    });
});
