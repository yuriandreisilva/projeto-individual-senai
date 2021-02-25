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
	livro.anoLivro = document.frmLivro.anoLivro.value;
	livro.qtdEstoque = document.frmLivro.qtdEstoque.value;
	livro.statusLivro = document.frmLivro.statusLivro.value;
	
		if (livro.nomeLivro == "" || livro.codigoLivro == "" || livro.anoLivro == "" ||
				livro.qtdEstoque == "" || livro.statusLivro == "")
		{
			alert('Preencha todos os campos!!!')
		}else{
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
				success:function(msg){
					window.location.href = "editar.html";
				},
				error:function(info){
					console.log("Erro ao cadastrar um novo livro: "+ info.status + " - "+ info.statusText);	
				}
			});	
		}
	}
	// READ --

	SALAARCOIRIS.livro.buscarLivro = function(){
		var valorBusca = $("#buscaLivro").val();
		
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "livro/buscarL",
			data: "valorBusca="+valorBusca,
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
			return tabela;

			$("#listaLivros").html(tabela);
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
				console.log()
				document.frmEditaLivro.idLivro.value = livro.idLivro;	
				document.frmEditaLivro.nomeLivro.value = livro.nomeLivro;
				document.frmEditaLivro.codigoLivro.value = livro.codigoLivro;
				document.frmEditaLivro.anoLivro.value = livro.anoLivro;
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
		livro.anoLivro = document.frmEditaLivro.anoLivro.value;
		livro.qtdEstoque = document.frmEditaLivro.qtdEstoque.value;
		livro.statusLivro = document.frmEditaLivro.statusLivro.value;
		
		
		if (livro.nomeLivro == "" || livro.codigoLivro == "" || livro.anoLivro == "" ||
				livro.qtdEstoque == "" || livro.statusLivro == "")
		{
			alert('Preencha todos os campos!!!')
		}else{
		
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "livro/alterarL",
				data:JSON.stringify(livro),
				success: function(msg){
					SALAARCOIRIS.livro.buscarLivro();
					console.log("Livro alterado com sucesso!")	
					window.location.href = "editar.html";
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
		}
	}
	
});