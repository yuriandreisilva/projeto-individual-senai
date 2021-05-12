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

alertError = function(text) {
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: text,
		// footer: 'Tente novamente'
	})
}
function mostrarData(){
	var data = document.getElementById('validaPublicacao').value; // pega o valor do input
	console.log(data);
}

SALAARCOIRIS = new Object();

SALAARCOIRIS.livro = new Object();

$(document).ready (function(){
	// ESTRUTURA PADRÃO PROJETO, DEFINIDA NO WEB.XML + CAMINHO ESPECÍFICO REST
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

	// INSERT - Livro
	SALAARCOIRIS.livro.cadastrarLivro = function(){
		
	// CRIA OBJETO
	var livro = new Object();
	
	//OBJETO.CAMPO RECEBE VALOR DO CAMPO NO INPUT
	livro.nomeLivro = document.frmLivro.nomeLivro.value;
	livro.codigoLivro = document.frmLivro.codigoLivro.value;
	livro.publicacao = document.frmLivro.publicacao.value;
	livro.qtdEstoque = document.frmLivro.qtdEstoque.value;
	livro.statusLivro = document.frmLivro.statusLivro.value;
	
	//if (validarCampos()){
			//REQUISIÇÃO AJAX
			$.ajax({
				// TYPE POST, MODO QUE SERÃO ENVIADOS PARA O SERVIDOR 
				type: "POST",
				// CAMINHO DEFINIDO NO WEB.XML
				// CHAMA A PATH ESPECÍFICA CRIADA NO ARQUIVO REST
				url: SALAARCOIRIS.PATH + "livro/inserirL",
				// PEGA OS DADOS EM OBJETO NO FORMATO JSON, PARA MANDAR PARA O SERVIDOR
				// CONVERTE EM FORMATO STRING JSON, PADRONIZAÇÃO
				data:JSON.stringify(livro),
				// SÓ VOLTA PARA O SUCCESS, APÓS PASSAR TODOS OS PASSOS DO SERVIDOR SEM ERROS
				success:function(retorno){
					if(retorno === "true"){
						exibirMsgSuccessRedirecionar()
					}else {
						alertError('Provavelmente este código já foi usado em outro cadastrado!')
					}
				},
				error:function(info){
					// alertError('Erro ao cadastrar novo livro: ' + info.status + " - "+ info.statusText)
					alertError(info.status + " - "+ info.statusText)
					console.log("Erro ao cadastrar um novo livro: "+ info.status + " - "+ info.statusText);	
				}
			});	
	//	}
	}

	
	function validarData(){
		var validacao = true; 
		publicacao = document.getElementById('validaPublicacao').value;
		
		var data = new Date(publicacao);
		var dataAtual = new Date();
		
		if (data > dataAtual || publicacao == ""){
			validacao = false;
		}
		
		return validacao;
	}

	validarCampos = function (){
		var validacao = true;
		
		nomeLivro = document.getElementById('validaNome').value;
		codigoLivro = document.getElementById('validaCodigo').value;
		publicacao = document.getElementById('validaPublicacao').value;
		qtdEstoque = document.getElementById('validaEstoqueInicial').value;
		statusLivro = document.getElementById('validaStatus').value;

		var expRegNome = new RegExp(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/);

		if (!expRegNome.test(nomeLivro)){
			alertError('Nome inválido!')
		 	document.frmLivro.nomeLivro.focus();

		  	validacao = false;
		}else if (codigoLivro == ""){
			alertError('Código inválido!')
			document.frmLivro.codigoLivro.focus();

			validacao = false;
		}else if (publicacao == "" || !validarData()){
			alertError('Data de publicação inválida!')
			document.frmLivro.publicacao.focus();

			validacao = false;
		}else if (qtdEstoque <0 || qtdEstoque == ""){
			alertError('Quantidade inicial de estoque inválida!')
			document.frmLivro.qtdEstoque.focus();

			validacao = false;
		}else if (statusLivro == 0){
			alertError('Status do livro inválido!')
			document.frmLivro.statusLivro.focus();

			validacao = false;
		}

		return validacao;	

	}

	// READ --

	SALAARCOIRIS.livro.buscarLivro = function(){
		var valorBusca = $("#buscaLivro").val();
		
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "livro/buscarL",
			data: "valorBuscaLivro="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaLivros").html(SALAARCOIRIS.livro.exibir(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de livro: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.livro.exibir = function(listaDeLivros){
			var tabela = 
				"<br>"+
				"<table class='table'>"+
					"<thead>"+
						"<tr>"+	
							"<th scope='col'> Nome</th>"+
							"<th scope='col'> Código (SKU)</th>"+
							"<th scope='col'>Editar</th>"+
							"<th scope='col'>Apagar</th>"+
						"</tr>"+
					"</thead>"+
					"<tbody>";

			if(listaDeLivros != undefined && listaDeLivros.length >0){

				
				for(var i=0; i<listaDeLivros.length; i++){
					tabela+="<tr>"+
						"<th scope='row'>"+listaDeLivros[i].nomeLivro+"</th>"+
						"<td>"+listaDeLivros[i].codigoLivro+"</td>"+					
						"<td>"+"<a class='btn btn-warning' onclick=\"SALAARCOIRIS.livro.exibirEditL('"+listaDeLivros[i].idLivro+"')\">Editar</a>" +"</td>"+
						"<td>"+"<a class='btn btn-danger' onclick=\"SALAARCOIRIS.livro.deletarL('"+listaDeLivros[i].idLivro+"')\">Apagar</a>" +"</td>"+
					"</tr>";

				}

			}else if (listaDeLivros == ""){
				tabela += "<tr scope='row'><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</tbody" +
					"</table>";
			var tamanhoPagina = 5;
			var pagina = 0;
				
				function paginar() {
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
					for (var i = pagina * tamanhoPagina; i < listaDeLivros.length && i < (pagina + 1) *  tamanhoPagina; i++){
						tbody.append(
					            $('<tr>')
					                .append($('<td>').append(listaDeLivros[i].nomeLivro))
					                .append($('<td>').append(listaDeLivros[i].codigoLivro))
					                .append($('<td>'+'<a class="btn btn-warning" onclick=\'SALAARCOIRIS.livro.exibirEditL("'+listaDeLivros[i].idLivro+'")\'>Editar</a>' +'</td>').append())
					                .append($('<td>'+'<a class="btn btn-danger" onclick=\'SALAARCOIRIS.livro.deletarL("'+listaDeLivros[i].idLivro+'")\'>Apagar</a>' +'</td>').append())
					        )
				    }
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeLivros.length / tamanhoPagina));
				}
				
				$(function() {
				    $('#proximo').click(function() {
				        if (pagina < listaDeLivros.length / tamanhoPagina - 1) {
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
				    $('#proximo').prop('disabled', listaDeLivros.length <= tamanhoPagina || pagina > listaDeLivros.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', listaDeLivros.length <= tamanhoPagina || pagina == 0);
				}
			tabela +="</tbody" +
					"</table>";
			
			
			return tabela;

			$("#listaAlunos").html(tabela);
		}	
				
	}
	SALAARCOIRIS.livro.buscarLivro();

	SALAARCOIRIS.livro.deletarL = function(idLivro){
		
		$.ajax({
			type:"DELETE",
			url: SALAARCOIRIS.PATH +"livro/excluir/"+idLivro,
			success: function(msg){
				SALAARCOIRIS.livro.buscarLivro();
			},
			error: function(info){
				console.log("Erro ao excluir livro: " + info.status + " - " + info.statusText);
			}
		});
	}
	
	SALAARCOIRIS.livro.exibirEditL = function(idLivro){
		
		document.getElementById('id01').style.display='block';
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"livro/checkIdL",
			data: "idLivro="+idLivro,
			success: function(livro){
				document.frmEditaLivro.idLivro.value = livro.idLivro;	
				document.frmEditaLivro.nomeLivro.value = livro.nomeLivro;
				document.frmEditaLivro.codigoLivro.value = livro.codigoLivro;
				document.frmEditaLivro.publicacao.value = livro.publicacao;
				document.frmEditaLivro.qtdEstoque.value = livro.qtdEstoque;
				document.frmEditaLivro.statusLivro.value = livro.statusLivro;				
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para livro: "+info.status+" - "+info.statusText);
			}
			
		});	
		
	}
	
	SALAARCOIRIS.livro.alterarL = function(){
		
		var livro = new Object();
		
		livro.idLivro = document.frmEditaLivro.idLivro.value;
		livro.nomeLivro = document.frmEditaLivro.nomeLivro.value;
		livro.codigoLivro = document.frmEditaLivro.codigoLivro.value;
		livro.publicacao = document.frmEditaLivro.publicacao.value;
		livro.qtdEstoque = document.frmEditaLivro.qtdEstoque.value;
		livro.statusLivro = document.frmEditaLivro.statusLivro.value;
		
		if (validarCampos()){
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "livro/alterarL",
				data:JSON.stringify(livro),
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
		}
	}
	
});