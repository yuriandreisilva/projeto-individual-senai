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
				console.log(msg);
				window.location.href = "editar.html";
			},
			error:function(info){
				console.log("Erro ao cadastrar um novo livro: "+ info.status + " - "+ info.statusText);	
			}
		});	
	}
});