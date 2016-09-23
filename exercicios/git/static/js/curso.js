$(document).ready(function(){
    $("#buscar").click(function(){
        var usuario = $("#user").val();
        var segs;
        var repos;
        var html = '';
        var endPoint = "?client_id=3dfe1fc0b9700029ec01&client_secret=7ebe56462235a3efd241641baacf5ae681924c6c";
        if(usuario != ""){
            if(usuario.toUpperCase() == 'PALMEIRAS'){
                var html = "<img src=\"static/img/palmeiras.jpg\" alt=\"\" class=\"circle responsive-img\">";
                $("#imagem").html(html);
                $(".oculta").css({display:"none"});
                $(".carregando").css({display:"block"});
                $("#mundial").css({display:"block"});
                $("#mundial").html("<strong>AGUARDANDO MUNDIAL</strong>");
            }else{
                $("#mundial").html("");
                $.ajax({
                    url: "https://api.github.com/users/" + usuario  + endPoint,
                    type: "GET",
                    // Para tratar algum tipo de erro
                    /*statusCode: {
                        404: function() {
                            $("#erro").html("<p>Usuario "+usuario+" não existe</p>");
                            $(".oculta").css({display:"none"});
                        }
                    },*/
                    dataType: "json",
                    success: function(result) {
                        resultado = result;
                        url_img = result.avatar_url;
                        // Iremos passar o numero total de seguidores(result.followers) para ser exibido, pois a api por padrão só traz 30 por pagina
                        segs = obterSeguidores(usuario,result.followers,endPoint);
                        // Iremos passar o numero total de repositorios(result.public_repos) para ser exibido, pois a api por padrão só traz 30 por pagina
                        repos = obterRepositorios(usuario,result.public_repos,endPoint)
                        // Chamando uma função modelo JQuery
                        //repos = $(this).obterRepositorios(usuario,result.public_repos,endPoint);
                        html = "<img src=\""+ url_img +"\" alt=\"\" class=\"circle responsive-img\">";

                        $("#imagem").html(html);
                        $("#nome").html(result.name);
                        $("#quantidade_seguidores").html(result.followers);
                        $("#quantidade_seguindo").html(result.following);
                        
                        // Obtendo e linkando os seguidores
                        html = '';
                        $.each(segs,function(i){
                            html +="<div class=\"col s4\">"
                            html +="    <div class=\"content\"><img src=\""+ segs[i].avatar_url +"\" alt=\"\" class=\"circle responsive-img img\"><a href=\"" + segs[i].html_url + "\" target=\"_blank\">" + segs[i].login + "</div></a>"
                            html +="</div>"
                        });
                        $("#seguidores").html(html);
                        
                        html = '';
                        $.each(repos,function(i){
                            html +="<div class=\"col s4\">"
                            html +=" <div class=\"content\"><a href=\"" + repos[i].html_url + "\" target=\"_blank\" class=\"waves-effect waves-light btn\">" + repos[i].name + "</div></a>";
                            html +="</div>";
                        });
                        $("#repositorios").html(html);
                        $(".oculta").css({display:"block"});
                    },
                    beforeSend: function(){
                        $(".oculta").css({display:"none"});
                        $('.carregando').css({display:"block"});
                    },
                    complete: function(){
                        $(".oculta").css({display:"block"});
                        $('.carregando').css({display:"none"});
                    }
                });
            }
        }
    });
    
    $("#user").keyup(function(tecla){
        if(tecla.keyCode == 13){
            $("#buscar").click();
        }
    })
    
    $("#limpar").click(function(){
        var html = "<img src=\"static/img/índice.png\" alt=\"\" class=\"circle responsive-img\">";
        $("#imagem").html(html);
        $("#user").val("").blur();
        $(".oculta").css({display:"none"});
        $("#mundial").html("<strong>AGUARDANDO MUNDIAL</strong>");
        $(".carregando").css({display:"none"});
    });
    
    $('body').keyup(function(tecla){
        if(tecla.keyCode == 27){
            $("#limpar").click();
        }
    });
});

function obterSeguidores(usuario,num_seguidores,endPoint){
    var seguidores;
    $.ajax({
            /*  Consultando a api trazendo a quantidade de seguidores que o usuário possui, uma vez que por padrão, 
                o git só traz 30 por pagina, começando da página '0(page=0) que indica que quer pegar desde o começo', 
                e indo até o numero de seguidores do usuario 'per_page=num_seguidores', com isso poderíamos por exemplo, fazer uma paginação.
            */ 
            url: "https://api.github.com/users/" + usuario + '/followers?page=0&per_page=' + num_seguidores + '&' + endPoint,
            type: "GET",
            dataType: "json",
            async:false,
            success: function(result) {
                seguidores = result;
            }
    });
    return seguidores;
}

// Criando uma função modelo JS
function obterRepositorios(usuario,num_repositorios,endPoint){
    var repositorios;
    $.ajax({
            /*  Consultando a api trazendo a quantidade de repositórios que o usuário possui, uma vez que por padrão, 
                o git só traz 30 por pagina, começando da página '0(page=0) indica que quer pegar desde o começo', 
                e indo até o numero de repositórios do usuario 'per_page=num_repositorios', com isso poderíamos por exemplo, fazer uma paginação.
            */ 
            url: "https://api.github.com/users/" + usuario + '/repos?page=0&per_page='+ num_repositorios + '&' + endPoint,
            type: "GET",
            dataType: "json",
            async:false,
            success: function(result) {
                repositorios = result;
            }
    });
    return repositorios;
}

//Criando uma função modelo JQuery
/*$.fn.obterRepositorios = function(usuario,num_repositorios,endPoint) {
  var repositorios;
    $.ajax({
            /*  Consultando a api trazendo a quantidade de repositórios que o usuário possui, uma vez que por padrão, 
                o git só traz 30 por pagina, começando da página '0(page=0) indica que quer pegar desde o começo', 
                e indo até o numero de repositórios do usuario 'per_page=num_repositorios', com isso poderíamos por exemplo, fazer uma paginação.
            *//*
            url: "https://api.github.com/users/" + usuario + '/repos?page=0&per_page='+ num_repositorios + '&' + endPoint,
            type: "GET",
            dataType: "json",
            async:false,
            success: function(result) {
                repositorios = result;
            }
    });
    return repositorios;
};*/
