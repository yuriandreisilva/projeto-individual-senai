function ValidaDados(){

    var senhaembase64 = btoa(document.frmLogin.senhaUsuario.value);
    document.frmLogin.senha.value = senhaembase64;

    return true;
}

function exibirMsgSuccessRedirecionar(){
	// Um tipo de alert estilzado, importado para ficar mais interativo
	Swal.fire({
		  icon: 'success',
		  title: 'Processo concluído com sucesso',
		  showConfirmButton: false,
		  timer: 1500
		})
	// Função para atrasar o window.location (redirecionamento para listagem de cadastros)		
	setTimeout(func, 1500);
	function func() {
		location.href="editar.html";
	}
}

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
	
	
	//if (validarCampos()){
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
	//	}
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
				"<table class='table'>"+
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
						"<td>"+"<a class='btn btn-danger' onclick=\"SALAARCOIRIS.usuario.deletarU('"+listaDeUsuarios[i].idUsuario+"')\">Apagar</a>" +"</td>"+
					"</tr>";

				}

			}else if (listaDeUsuarios == ""){
				tabela += "<tr scope='row'><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</tbody" +
					"</table>";
			return tabela;

			$("#listaUsuarios").html(tabela);
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
				document.frmEditaUsuario.senhaUsuario.value = usuario.senhaUsuario;
				
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
        usuario.senhaUsuario  = document.frmEditaUsuario.senhaUsuario.value;
        usuario.status  = document.frmEditaUsuario.status.value;
        usuario.permissao  = document.frmEditaUsuario.permissao.value;
		
        
		//if (validarCampos()){
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "usuario/alterarU",
				data:JSON.stringify(usuario),
				success: function(retorno){
					if(retorno === "true"){
						exibirMsgSuccessRedirecionar()
					}else {
						alertError('Provavelmente este código já foi usado em outro cadastrado!')
					}
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
	//	}
	}
	
});