function mostrarData(){
	var data = document.getElementById('validaPublicacao').value; // pega o valor do input
	console.log(data);
}

SALAARCOIRIS = new Object();

SALAARCOIRIS.usuario = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

	SALAARCOIRIS.usuario.cadastrarUsuario = function(){

	var usuario = new Object();
	
	usuario.emailUsuario = document.frmUsuario.emailUsuario.value;	
	
	var senhaembase64 = btoa(document.frmUsuario.senhaUsuario.value);
    usuario.senhaUsuario = senhaembase64;
	
	usuario.status = document.frmUsuario.status.value;
	usuario.permissao = document.frmUsuario.permissao.value;
	
	
	if (validarCampos()){
			$.ajax({
				type: "POST",
				url: SALAARCOIRIS.PATH + "usuario/inserirU",
				data:JSON.stringify(usuario),
				success:function(retorno){
					if(retorno === "true"){
						exibirMsgSuccessRedirecionar()
					}else {
						alertError('Provavelmente este código já foi usado em outro cadastrado!')
					}
				},
				error:function(info){
					alertError('Erro ao cadastrar novo usuario: ' + info.status + " - "+ info.statusText)
					console.log("Erro ao cadastrar um novo usuario: "+ info.status + " - "+ info.statusText);	
				}
			});	
		}
	}
	alertError = function(text) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: text,
		})
	}

	validarCampos = function (){
		var validacao = true;
		
		var expRegEmail = new RegExp(/^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i);
		
		email = document.getElementById('validaEmail').value;
		
		if (!expRegEmail.test(email)){
			alertError('Email inválido!')
			document.frmUsuario.emailUsuario.focus();
			validacao = false;
		}
//		else if (document.querySelectorAll(status,permissao)=='9'){
//			console.log('validacao retornando '+ validacao);
//			validacao = false;
//		}
		
		return validacao;	

	}

	// READ --

	SALAARCOIRIS.usuario.buscarUsuario = function(){
		var valorBusca = $("#buscaUsuario").val();
		
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "usuario/buscarU",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaUsuarios").html(SALAARCOIRIS.usuario.exibir(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de usuario: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.usuario.exibir = function(listaDeUsuarios){
			var tabela = 
				"<br>"+
				"<table class='table table-responsive'>"+
					"<thead>"+
						"<tr>"+	
							"<th scope='col'> E-mail</th>"+
							"<th scope='col'> Status</th>"+
                            "<th scope='col'> Tipo de Usuário</th>"+
							"<th scope='col'>Editar</th>"+
							"<th scope='col'>Apagar</th>"+
						"</tr>"+
					"</thead>"+
					"<tbody>";

			if(listaDeUsuarios != undefined && listaDeUsuarios.length >0){

				
				for(var i=0; i<listaDeUsuarios.length; i++){
					
					if (listaDeUsuarios[i].status == true){
						status = "Ativo"
					}else{
						status = "Inativo"
					}
					
					if (listaDeUsuarios[i].permissao == 1){
						permissao = "Administrador"
					}else{
						permissao = "Operador"
					}
					
						
					tabela+="<tr>"+
						"<th scope='row'>"+listaDeUsuarios[i].emailUsuario+"</th>"+
						"<td>"+status+"</td>"+
                        "<td>"+permissao+"</td>"+					
						"<td>"+"<a class='btn btn-warning' onclick=\"SALAARCOIRIS.usuario.exibirEditU('"+listaDeUsuarios[i].idUsuario+"')\">Editar</a>" +"</td>"+
						"<td>"+"<a class='btn btn-secondary' onclick=\"SALAARCOIRIS.usuario.deletarU('"+listaDeUsuarios[i].idUsuario+"')\" disabled>Apagar</a>" +"</td>"+
					"</tr>";

				}

			}else if (listaDeUsuarios == ""){
				tabela += "<tr scope='row'><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			var tamanhoPagina = 5;
			var pagina = 0;
				
				function paginar() {
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
					for (var i = pagina * tamanhoPagina; i < listaDeUsuarios.length && i < (pagina + 1) *  tamanhoPagina; i++){
						tbody.append(
					            $('<tr>')
					                .append($('<td>').append(listaDeUsuarios[i].emailUsuario))
					                .append($('<td>').append(status))
					                .append($('<td>').append(permissao))
					                .append($('<td>'+'<a class="btn btn-warning" onclick=\'SALAARCOIRIS.livro.exibirEditU("'+listaDeUsuarios[i].idUsuario+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">'+
					                		  '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>'+ 
				                			  '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>'+
				                			  '</svg></a>' +'</td>').append())
					                .append($('<td><button class="btn btn-secondary" disabled>'+
					                		// '<a class="btn btn-secondary" onclick=\'SALAARCOIRIS.livro.deletarU("'+listaDeUsuarios[i].idUsuario+'")\' disabled>
					                		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
					                		  '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
				                			  '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
				                			'</svg></button>'
				                			 // '</a>' 
					                +'</td>').append())
					        )
				    }
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeUsuarios.length / tamanhoPagina));
				}
				
				$(function() {
				    $('#proximo').click(function() {
				        if (pagina < listaDeUsuarios.length / tamanhoPagina - 1) {
				            pagina++;
				            paginar();
				            ajustarBotoes();
				        }
				    });
				    $('#anterior').click(function() {
				        if (pagina > 0) {
				            pagina--;
				            paginar();
				            ajustarBotoes();
				        }
				    });
				    paginar();
				    ajustarBotoes();
				});
				
				function ajustarBotoes() {
				    $('#proximo').prop('disabled', listaDeUsuarios.length <= tamanhoPagina || pagina > listaDeUsuarios.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', listaDeUsuarios.length <= tamanhoPagina || pagina == 0);
				}
			tabela +="</tbody" +
					"</table>";
			
			
			return tabela;

			$("#listaAlunos").html(tabela);
		}	
				
	}
	SALAARCOIRIS.usuario.buscarUsuario();

	SALAARCOIRIS.usuario.deletarU = function(idUsuario){
		
		$.ajax({
			type:"DELETE",
			url: SALAARCOIRIS.PATH +"usuario/excluir/"+idUsuario,
			success: function(msg){
				SALAARCOIRIS.usuario.buscarUsuario();
			},
			error: function(info){
				console.log("Erro ao excluir usuario: " + info.status + " - " + info.statusText);
			}
		});
	}
	
	SALAARCOIRIS.usuario.exibirEditU = function(idUsuario){
		
		document.getElementById('id01').style.display='block';
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"usuario/checkIdU",
			data: "idUsuario="+idUsuario,
			success: function(usuario){
				document.frmEditaUsuario.idUsuario.value = usuario.idUsuario;	
				document.frmEditaUsuario.emailUsuario.value = usuario.emailUsuario;
//				document.frmEditaUsuario.senhaUsuario.value = usuario.senhaUsuario;
				
				if (usuario.status == 0){
					document.frmEditaUsuario.status.value = "0";
				}else{
					document.frmEditaUsuario.status.value = "1";
				}
				
				console.log(usuario.status);
				
				if (usuario.permissao == 0){
					document.frmEditaUsuario.permissao.value = "0";
				}else {
					document.frmEditaUsuario.permissao.value = "1";
				}
				
			
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para usuario: "+info.status+" - "+info.statusText);
			}
			
		});	
		
	}
	
	SALAARCOIRIS.usuario.alterarU = function(){
		
		var usuario = new Object();

        usuario.idUsuario  = document.frmEditaUsuario.idUsuario.value	
        usuario.emailUsuario  = document.frmEditaUsuario.emailUsuario.value;
//        usuario.senhaUsuario  = document.frmEditaUsuario.senhaUsuario.value;
        usuario.status  = document.frmEditaUsuario.status.value;
        usuario.permissao  = document.frmEditaUsuario.permissao.value;
		
        
		if (validarCampos()){
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "usuario/alterarU",
				data:JSON.stringify(usuario),
				success: function(retorno){
					if(retorno === "true"){
						exibirMsgSuccessRedirecionar()
					}else {
						alertError('Ops!!! Houve algum erro ao salvar.')
					}
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
		}
	}
	
});