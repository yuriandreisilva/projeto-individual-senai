function exibirMsgSuccessRedirecionar(msg){
	// Um tipo de alert estilzado, importado para ficar mais interativo
	Swal.fire({
		  icon: 'success',
		  title: 'Processo realizado com sucesso!',
		  showConfirmButton: false,
		  timer: 1500
		})
	// Função para atrasar o window.location (redirecionamento para listagem de cadastros)		
	setTimeout(func, 1500);
	function func() {
		location.href="editar.html";
	}
}

function msgSuccessSimple(msg){
	// Um tipo de alert estilzado, importado para ficar mais interativo
	Swal.fire({
		  icon: 'success',
		  title: 'Processo realizado com sucesso!',
		  text: msg,
		  showConfirmButton: false,
		  timer: 1500
		})
}

alertError = function(text){
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: text
	  })
}


var livros = [];
var pagina = 0;
var colunaDiasAtrasoParam;

SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();


$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		SALAARCOIRIS.emprestimo.buscarUsuario = function(){
			var email = sessionStorage.getItem('email');

		    var valorBusca = email;
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "usuario/buscarU",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					var id = dados[0].idUsuario;
				    sessionStorage.setItem('idUsuario', id );
				},
				error: function(info){
					var a="Erro ao consultar: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
			
		}
		// INSERT - emprestimo
		SALAARCOIRIS.emprestimo.buscarUsuario()


		SALAARCOIRIS.emprestimo.cadastrarEmprestimo = function(){
					
			idUsuario = parseInt(sessionStorage.getItem('idUsuario'))
			idAluno = parseInt($('#idAluno').val())

			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			var year = d.getFullYear();
			
			var dataAtual = year + '/' +
			(month<10 ? '0' : '') + month + '/' +
			(day<10 ? '0' : '') + day;
		
			
			var  dataDevolucao = new Date(); 
			dataDevolucao.setDate(dataDevolucao.getDate() + 7);
			var month = dataDevolucao.getMonth()+1;
			var day = dataDevolucao.getDate();

			var devolucao = dataDevolucao.getFullYear() + '/' +
			(month<10 ? '0' : '') + month + '/' +
			(day<10 ? '0' : '') + day;
			
			var emprestimo = {
					'dataEmprestimo': dataAtual,
					'dataDevolucao': devolucao,
					'status': 1,
					'valorMulta': 0,
					'idAluno': idAluno,
					'idUsuario': idUsuario
			}	

			
			if(validarCampos()){
				$.ajax({
					type: "POST",
					url: SALAARCOIRIS.PATH + "emprestimo/inserirE",
					data:JSON.stringify(emprestimo),
					success:function(retorno){
						if(retorno === "true"){
							
							/*
							* inserir no bd o emprestimo
							* buscar o id do emprestimo para inserir no bd associativo
							*/

							var idEmprestimo = (SALAARCOIRIS.emprestimo.buscarUltimoId = function(){
								var id;
								
								$.ajax({
									type: "GET",
									url: SALAARCOIRIS.PATH + "emprestimo/buscarUltimoId",
							        async: false,
									success: function(dados){
										dados = JSON.parse(dados);
										id = parseInt(dados);
										console.log("idEmprestimo: " + id);
//										return id;		
//											sessionStorage.setItem('idEmprestimo', idEmprestimo );
									},
									error: function(info){
										var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
										var b = a.replace(/'/g, '');				
									}
								});
								return id;
							})();

							// Inserir livro na tabela associativa
							
							qtdLivrosListados = sessionStorage.getItem('linhasLivros')
						
							let arrayIds = [];
							let arrayQtds = [];
								$('input[name="idLivro"]').each(function(){
									arrayIds.push($(this).val())
								})	
								

								$('select[name="qtdLivro"]').each(function(){
									arrayQtds.push($(this).val()	)
								})
								

								let livrosSelecionados = [];
								for (i = 0; i < qtdLivrosListados; i++ ) {
									livrosSelecionados.push({
										'idEmprestimo': parseInt(idEmprestimo),
										'id':  arrayIds[i],
										'qtd':  arrayQtds[i]
									})
								}
								
								$.ajax({
									type: "POST",
									url: SALAARCOIRIS.PATH + "livroEmprestado/inserirLE",
									data:JSON.stringify(livrosSelecionados),
									success:function(retorno){
										if(retorno === "true"){
											exibirMsgSuccessRedirecionar();
										}else {
											alertError('Houve algum erro! Tente novamente!!!')
										}
									},
									error:function(info){
										alertError('Erro ao cadastrar!')
										console.log("Erro ao cadastrar um novo livroEmprestado: "+ info.status + " - "+ info.statusText);	
									}
								});
							
						}else {
							alertError('Houve algum erro! Tente novamente')
						}
					},
					error:function(info){
						alertError('Erro ao cadastrar!')
						console.log("Erro ao cadastrar um novo emprestimo: "+ info.status + " - "+ info.statusText);	
					}
				});
			}else{
				alertError('É necessário preencher com um aluno e no mínimo um livro!!!')
			}
		}
		
		function validarCampos(){
			validacao = false;

			nomeAluno = document.getElementById('campoAluno').value;			
			jQuery.fn.exists = function(){ return this.length > 0; }

			if (($('input[name="nomeLivro"]').exists()) && (nomeAluno !== "")) {
				validacao = true;
			}
			
			return validacao;
		}
	
	// READ --

	SALAARCOIRIS.emprestimo.buscarAluno = function(){

		var valorBusca = $("#buscaAluno").val();
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "aluno/buscarA",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaAlunos").html(SALAARCOIRIS.emprestimo.exibirAluno(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.emprestimo.exibirAluno = function(listaDeAlunos){
			var tabela = 
				"<br>"+
				"<table class='table table-responsive-sm table-bordered'>"+
					"<thead>"+
						"<tr class='text-center'>"+	
							"<th scope='col'> Nome</th>"+
							"<th scope='col'> CPF</th>"+
							"<th scope='col'> Escolher</th>"+
						"</tr>"+
					"</thead>"+
					"<tbody>";

			if(listaDeAlunos != undefined && listaDeAlunos.length >0){

				for (var i=0; i<listaDeAlunos.length; i++){
			    	tabela+="<tr>"+
					"<th scope='row'>"+listaDeAlunos[i].nomeAluno+"</th>"+
					"<td>"+listaDeAlunos[i].cpfAluno+"</td>"+
					"<td>" +
						"<div class='radio text-center'>"+
							"<label><input type='radio' name='optradio' value='"+listaDeAlunos[i].idAluno+"'></label>"+
						"</div>" +
                    "</td>"+
				"</tr>";
				}

			}else if (listaDeAlunos == ""){
				tabela += "<tr scope='row'><td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</tbody" +
					"</table>";
			
			var tamanhoPagina = 5;
			var pagina = 0;
				
				function paginar() {
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
					for (var i = pagina * tamanhoPagina; i < listaDeAlunos.length && i < (pagina + 1) *  tamanhoPagina; i++){
						tbody.append(
					            $('<tr>')
					                .append($('<td id="nome'+listaDeAlunos[i].idAluno+'">').append(listaDeAlunos[i].nomeAluno))
					                .append($('<td id="cpf'+listaDeAlunos[i].idAluno+'">').append(listaDeAlunos[i].cpfAluno))
					                .append($('<td><div class="radio text-center"><label><input type="radio" name="escolheAluno" value="'+listaDeAlunos[i].idAluno+'" required></label>').append())
					        )
				    }
				    $('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeAlunos.length / tamanhoPagina));
				    
				}
				
				$(function() {
				    $('#proximo').click(function() {
				        if (pagina < listaDeAlunos.length / tamanhoPagina - 1) {
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
				    $('#proximo').prop('disabled', listaDeAlunos.length <= tamanhoPagina || pagina > listaDeAlunos.length / tamanhoPagina - 1);
				    $('#anterior').prop('disabled', listaDeAlunos.length <= tamanhoPagina || pagina == 0);
				}
			tabela +="</tbody" +
					"</table>";
			
			
//			return tabela;

			$("#listaAlunos").html(tabela);
		}	
		
	}
	SALAARCOIRIS.emprestimo.buscarAluno();
	
	SALAARCOIRIS.emprestimo.preencherAluno = function(){
		
		if (document.querySelector('input[name="escolheAluno"]:checked')){
			idAluno = document.querySelector('input[name="escolheAluno"]:checked').value;
			nomeAluno = $("#nome"+idAluno).text();
			cpfAluno = $("#cpf"+idAluno).text();
				$('#idAluno').val(idAluno);
				$('#campoAluno').val(nomeAluno);
				$('#cpfAluno').val(cpfAluno);
		}else{
			alertError('Selecione um aluno!!!')
		}
	}
	
	/* *************************************************************** */
	
	SALAARCOIRIS.emprestimo.buscarLivro = function(){
		
		var valorBuscaLivro = $("#buscaLivro").val();
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "livro/buscarL",
			data: "valorBuscaLivro="+valorBuscaLivro,
			success: function(dadosLivro){
				dadosLivro = JSON.parse(dadosLivro);
				$("#listaLivros").html(SALAARCOIRIS.emprestimo.exibirLivro(dadosLivro));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de livro: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});
		

		SALAARCOIRIS.emprestimo.exibirLivro = function(listaDeLivros){
			
			var tabelaLivro = 
				"<br>"+
				"<table class='table table-responsive-sm table-bordered'>"+
					"<thead>"+
						"<tr>"+	
							"<th scope='col-xs-5 col-sm-5 col-md-5 col-lg-5'> Livro</th>"+
							"<th scope='col-xs-4 col-sm-2 col-md-4 col-lg-4'> Código</th>"+
							"<th scope='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Disponibilidade</th>"+
							"<th scope='col-xs-2 col-sm-2 col-md-2 col-lg-2'> Escolher</th>"+
						"</tr>"+
					"</thead>"+
					"<tbody>";
			
			if(listaDeLivros != undefined && listaDeLivros.length >0){
					
				for (var i=0; i<listaDeLivros.length; i++){
			    	tabelaLivro+="<tr>"+
					"<th scope='row'>"+listaDeLivros[i].nomeLivro+"</th>"+
					"<td>"+listaDeLivros[i].codigoLivro+"</td>"+
					"<td>"+listaDeLivros[i].qtdEstoque+"</td>"+
					"<td>" +
						"<div class='radio text-center'>"+
							"<label><input type='checkbox' name='optradio' value='"+listaDeLivros[i].idLivro+"'></label>"+
						"</div>" +
                    "</td>"+
				"</tr>";
				}

			}else if (listaDeLivros == ""){
				tabelaLivro += "<tr scope='row'><td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
			}
			tabelaLivro +="</tbody" +
					"</table>";
			
			var tamanhoPagina = 5;
			var pagina = 0;
			
				function paginarLivro() {
				    $('table > tbody > tr').remove();
				    var tbody = $('table > tbody');
					for (var i = pagina * tamanhoPagina; i < listaDeLivros.length && i < (pagina + 1) *  tamanhoPagina; i++){
						tbody.append(
					            $('<tr>')
					                .append($('<td class="col-xs-5 col-sm-5 col-md-5 col-lg-5" id="nome'+listaDeLivros[i].idLivro+'">').append(listaDeLivros[i].nomeLivro))
					                .append($('<td class="col-xs-4 col-sm-2 col-md-4 col-lg-4" id="codigo'+listaDeLivros[i].idLivro+'">').append(listaDeLivros[i].codigoLivro))
					                .append($('<td class="col-xs-2 col-sm-2 col-md-2 col-lg-2 text-center">').append(listaDeLivros[i].qtdEstoque))
					                .append(listaDeLivros[i].qtdEstoque>=1?$('<td class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><div class="radio text-center"><label><input type="checkbox" name="escolheLivro" value="'+listaDeLivros[i].idLivro+'" data-qtd="'+listaDeLivros[i].qtdEstoque+'" data-livro="'+listaDeLivros[i].nomeLivro+'" data-codigo="'+listaDeLivros[i].codigoLivro+'""></label>').append()
				                	:$('<td class="col-xs-2 col-sm-2 col-md-2 col-lg-2"><div class="radio text-center"><label><input type="checkbox" name="escolheLivro" value="'+listaDeLivros[i].idLivro+'" disabled></label>').append())
					               
					        )
				    }
				    $('#numeracaoLivro').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeLivros.length / tamanhoPagina));
				}
				
				$(function() {
				    $('#proximoLivro').click(function() {
				        if (pagina < listaDeLivros.length / tamanhoPagina - 1) {
				            pagina++;
				            paginarLivro();
				            ajustarBotoes();
				        }
				    });
				    $('#anteriorLivro').click(function() {
				        if (pagina > 0) {
				            pagina--;
				            paginarLivro();
				            ajustarBotoes();
				        }
				    });
				    paginarLivro();
				    ajustarBotoes();
				});
				
				function ajustarBotoes() {
				    $('#proximoLivro').prop('disabled', listaDeLivros.length <= tamanhoPagina || pagina > listaDeLivros.length / tamanhoPagina - 1);
				    $('#anteriorLivro').prop('disabled', listaDeLivros.length <= tamanhoPagina || pagina == 0);
				}
			tabelaLivro +="</tbody" +
					"</table>";
			
			
			
			return tabelaLivro;

			$("#listaLivros").html(tabelaLivro);
		}	
				
	}
	SALAARCOIRIS.emprestimo.buscarLivro();

	SALAARCOIRIS.emprestimo.preencherLivros = function(){		
		
		$('input[name="escolheLivro"]:checked').each(function(){
			if (livros.length>=1){
				let exists = false;
				let self = $(this);
				livros.forEach(function (val){
					if (val.id == self.val()){
						exists = true;
						return false;
					}
				})		
				
				if (!exists){
					livros.push({
						'id': $(this).val(),
						'livro': $(this).attr('data-livro'),
						'codigo': $(this).attr('data-codigo'),
						'qtd': $(this).attr('data-qtd')
					})
				}
			}else {
				livros.push({
					'id': $(this).val(),
					'livro': $(this).attr('data-livro'),
					'codigo': $(this).attr('data-codigo'),
					'qtd': $(this).attr('data-qtd')
				})
			}
			
		})
		
		var qtdLivros = livros.length;
		sessionStorage.setItem('linhasLivros', qtdLivros );
		var livrosEscolhidos =
		'<label for="formGroupExampleInput2">Livro(s)</label>';
			for (var i=0; i<livros.length; i++){
			livrosEscolhidos+=
			  '<div class="input-group mb-2 inputsLivros" id="'+livros[i].id+'">'+
			  	  '<input name="idLivro" type="hidden" value="'+livros[i].id+'">'+
				  '<input name="nomeLivro" type="text" class="form-control col-7 mr-2" value="'+livros[i].livro+'" placeholder="Livro" disabled>'+
			      '<input name="codigoLivro" type="text" class="form-control col-3 mr-2" value="'+livros[i].codigo+'" placeholder="Código Livro" disabled>'+
			      '<select name="qtdLivro" type="number" class="form-control col-2 mr-2" placeholder="QTD">';
					total = livros[i].qtd;
					qtd = 1;
				      for (var j=0; j<total; j++){
				    	  livrosEscolhidos+='<option value="'+qtd+'">'+qtd+'</option>';
				    	  qtd += 1;
				      }
				
				      
				      livrosEscolhidos+='</select>'+	
			      
			      '<button type="button" class="btn btn-danger" id="'+livros[i].id+'" data-id="'+livros[i].id+'" onclick="removerCampos(this)">'+
			          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 20">'+
			            '<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'+
			            '<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>'+
			          '</svg>'+
			        '</button>'+
			 
		      '</div>';
			}
		
		$("#adicionarLivros").html(livrosEscolhidos);
		} 
    
	/* 
	
	- Criar lista empréstimo 
	
	 */
	
	SALAARCOIRIS.emprestimo.buscarE = function(){
		
		
		var valorBusca = $("#buscaEmprestimo").val();
		
		if (!isNaN(parseFloat(valorBusca)) && isFinite(valorBusca) ) {
			$('#buscaEmprestimo').mask('999.999.999-99');
		}else if ((valorBusca == "") || (valorBusca == "..-")){
			$('#buscaEmprestimo').unmask();
		}
		
//		$.ajax({
//			type: "GET",
//			url: SALAARCOIRIS.PATH + "emprestimo/buscarE",
//			data: "valorBusca="+valorBusca,
//			success: function(dados){
//				dados = JSON.parse(dados);
//				SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
//			},
//			error: function(info){
//				var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
//				var b = a.replace(/'/g, '');				
//			}
//		});
		
		// 1: Em andamento
		// 2: Finalizado
		// 0: Atrasado
		
		if ((($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == true)) ||
			(($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == false)))
		{ 
			console.log('Mostra TODOS os empréstimos') 
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarE",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == false)){ 
			console.log('Mostra empréstimos EM ANDAMENTO(1) e FINALIZADOS(2)')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamentoFinalizado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == true)){ 
			console.log('Mostra empréstimos EM ANDAMENTO(1) e ATRASADOS(0)')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamentoAtrasado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == false)){ 
			console.log('Mostra empréstimos EM ANDAMENTO(1) apenas!')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamento",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == true)){ 
			console.log('Mostra empréstimos FINALIZADOS(2) e ATRASADOS(0)')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasadoFinalizado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == false)){ 
			console.log('Mostra empréstimos FINALIZADOS(2) apenas!')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoFinalizado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == true)){ 
			console.log('Mostra empréstimos ATRASDOS(0) apenas!')
			// Busca todos
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado(dados)
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
		};
		
		
		
	
		SALAARCOIRIS.emprestimo.alterarStatusParaAtrasado = function(listaDeEmprestimos){
			/* 
			 * UPDATE Status
			 * Verifica se empréstimo está atrasado e atualiza no BD
			 */
			
			for (var i=0; i<listaDeEmprestimos.length; i++){
				var  dataAtual = new Date();
				var dataDevolucao = new Date(listaDeEmprestimos[i].dataDevolucao);
				
				if ((listaDeEmprestimos[i].status == 1) && (dataAtual>dataDevolucao)){
										
					var emprestimo = new Object();
					emprestimo.status = 0;
					emprestimo.idEmprestimo = listaDeEmprestimos[i].idEmprestimo;
					
					$.ajax({
						type: "PUT",
						url: SALAARCOIRIS.PATH + "emprestimo/alterarStatus",
						data:JSON.stringify(emprestimo),
						success: function(retorno){
//							console.log("Status atrasado: " + retorno)	
							
						},
						error: function(info){
							var a="Erro ao atualizar status de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
					
				}
			}
			
			
			// ******************************************************
			
			SALAARCOIRIS.emprestimo.buscarListaEmpAtualizada = function(listaDeEmprestimos){
				
				
				var valorBusca = $("#buscaEmprestimo").val();
				
				if (!isNaN(parseFloat(valorBusca)) && isFinite(valorBusca) ) {
					$('#buscaEmprestimo').mask('999.999.999-99');
				}else if ((valorBusca == "") || (valorBusca == "..-")){
					$('#buscaEmprestimo').unmask();
				}
				
				// 1: Em andamento
				// 2: Finalizado
				// 0: Atrasado
				
				if ((($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == true)) ||
					(($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == false)))
				{ 
					console.log('Mostra TODOS os empréstimos') 
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarE",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == false)){ 
					console.log('Mostra empréstimos EM ANDAMENTO(1) e FINALIZADOS(2)')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamentoFinalizado",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == true)){ 
					console.log('Mostra empréstimos EM ANDAMENTO(1) e ATRASADOS(0)')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamentoAtrasado",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == true) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == false)){ 
					console.log('Mostra empréstimos EM ANDAMENTO(1) apenas!')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAndamento",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == true)){ 
					console.log('Mostra empréstimos FINALIZADOS(2) e ATRASADOS(0)')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasadoFinalizado",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == true) && ($("#status0").is( ":checked" ) == false)){ 
					console.log('Mostra empréstimos FINALIZADOS(2) apenas!')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoFinalizado",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				}else if (($("#status1").is( ":checked" ) == false) && ($("#status2").is( ":checked" ) == false) && ($("#status0").is( ":checked" ) == true)){ 
					console.log('Mostra empréstimos ATRASDOS(0) apenas!')
					// Busca todos
					$.ajax({
						type: "GET",
						url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasado",
						data: "valorBusca="+valorBusca,
						success: function(dados){
							dados = JSON.parse(dados);
							console.log(dados)
							$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
						},
						error: function(info){
							var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
							var b = a.replace(/'/g, '');				
						}
					});
				};
				
//				var valorBusca = $("#buscaEmprestimo").val();
//				
//				if (!isNaN(parseFloat(valorBusca)) && isFinite(valorBusca) ) {
//					$('#buscaEmprestimo').mask('999.999.999-99');
//				}else if ((valorBusca == "") || (valorBusca == "..-")){
//					$('#buscaEmprestimo').unmask();
//				}
//								
//				$.ajax({
//					type: "GET",
//					url: SALAARCOIRIS.PATH + "emprestimo/buscarE",
//					data: "valorBusca="+valorBusca,
//					success: function(dados){
//						dados = JSON.parse(dados);
//						$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
//						
//					},
//					error: function(info){
//						var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
//						var b = a.replace(/'/g, '');				
//					}
//				});
//				
				SALAARCOIRIS.emprestimo.exibirEmprestimo = function(listaDeEmprestimos){
					
						var tabela = "<br>"+
							"<table class='table table-responsive-sm table-bordered'>"+
								"<thead>"+
									"<tr class='text-center'>"+	
										"<th scope='col-lg-3'> Nome</th>"+
										"<th scope='col-lg-2'> CPF</th>"+
										"<th scope='col-lg-2'> Data Emp.</th>"+
										"<th scope='col-lg-2'> Status</th>"+
										"<th scope='col-lg-1'> Dias Atraso</th>"+
										"<th scope='col-lg-1'> Finalizar</th>"+
									"</tr>"+
								"</thead>"+
								"<tbody>";
				
						if(listaDeEmprestimos != undefined && listaDeEmprestimos.length >0){
				
							for (var i=0; i<listaDeEmprestimos.length; i++){
								
								tabela+="<tr>"+
								"<th scope='row'>"+listaDeEmprestimos[i].nomeAluno+"</th>"+
								"<td>"+listaDeEmprestimos[i].cpfAluno+"</td>"+
								"<td>"+listaDeEmprestimos[i].dataEmprestimo+"</td>"+
								"<td>"+listaDeEmprestimos[i].status+"</td>"+
								
								"<td>"+"<a class='btn btn-danger' onclick=\"SALAARCOIRIS.emprestimo.deletarE('"+listaDeEmprestimos[i].idEmprestimo+"')\"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='20' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>"+
									"<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>"+
										"<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>"+
										"</svg></a>" +
								"</td>"+
							"</tr>";
							}
				
						}else if (listaDeEmprestimos == ""){
							tabela += "<tr scope='row'><td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
						}
						tabela +="</tbody" +
								"</table>";
												
						var tamanhoPagina = 5;
						
						
							function paginar() {
								$('table > tbody > tr').remove();
								var tbody = $('table > tbody');
								for (var i = pagina * tamanhoPagina; i < listaDeEmprestimos.length && i < (pagina + 1) *  tamanhoPagina; i++){
									const data = listaDeEmprestimos[i].dataEmprestimo.split('-').reverse().join('/');
	
									colunaDiasAtraso = 
										'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar2-event" viewBox="0 0 16 16">'
										+'<path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>'
										+'<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>'
										+'<path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"/>'
										+'</svg>';
									var  dataAtual = new Date();
									var dataDevolucao = new Date(listaDeEmprestimos[i].dataDevolucao);
									
									var diffDays = 0;
									
									const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	
									// a and b are javascript Date objects
									function dateDiffInDays(a, b) {
									  // Discard the time and time-zone information.
									  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
									  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	
									  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
									}
								    
									colunaDiasAtrasoParam = 0;
									if ((dataAtual>dataDevolucao) && (listaDeEmprestimos[i].status != 2)){
									
										colunaDiasAtraso = (dateDiffInDays(dataAtual, dataDevolucao)+2)* (-1);
										colunaDiasAtrasoParam = colunaDiasAtraso;
										
									}else if (listaDeEmprestimos[i].status == 2) {
										colunaDiasAtraso = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">'
											+'<path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>'
											+'</svg>';
										
										
									}
									
									if (listaDeEmprestimos[i].status != 2) {
										onclickEspecifico = 'onclick=\'SALAARCOIRIS.emprestimo.exibirEditE("'+listaDeEmprestimos[i].idEmprestimo+'")\'';
									}else {
										onclickEspecifico = 'onclick=\'SALAARCOIRIS.emprestimo.exibirDetalhesE("'+listaDeEmprestimos[i].idEmprestimo+'")\'';
									}
									
									switch (listaDeEmprestimos[i].status){
										case 1:status =
											'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">'
										    +'<title>Empréstimo em Andamento!</title>'
											  +'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'
											  +'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>'
										  +'</svg>'
										  break;
										case 2:status = 
											'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">'
											+'<title>Empréstimo Finalizado!</title>'
										+'<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>'
										+'</svg>';
											break;
										case 0: status = 
											'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">'
											+'<title>Empréstimo em Atraso!</title>'
										  +'<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>'
										  +'</svg>'
										  break;
										default:
											status =
												'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-info-circle-fill" viewBox="0 0 16 16">'
												+'<title>Erro!</title>'
										  +'<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>'
										  +'</svg>';
									}
									
								
									tbody.append(
											$('<tr>')
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].nomeAluno+'">').append(listaDeEmprestimos[i].nomeAluno))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].cpfAluno+'">').append(listaDeEmprestimos[i].cpfAluno))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].dataEmprestimo+'">').append(data))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].status+'">').append(status))/* listaDeEmprestimos[i].status */ 
												.append($('<td class="text-center"><input type="hidden" id="nomeDiasAtraso'+listaDeEmprestimos[i].idEmprestimo+'"></input>').append(colunaDiasAtraso))
												
								                .append($('<td class="text-center">'+'<button class="btn btn-danger" id="button-quit-'+listaDeEmprestimos[i].idEmprestimo+'" data-bs-toggle="modal" data-bs-target="#exampleModal"'
								                		+'onclick=\'SALAARCOIRIS.emprestimo.quitarE("'+listaDeEmprestimos[i].idEmprestimo +'", "'+colunaDiasAtrasoParam+'")\'>'
								                		+'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
								                		  '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
								                			  '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
								                			'</svg></button>' +'</td>').append())
								                		
	
										)
										if (listaDeEmprestimos[i].status == 2){		
				                			$('#button-quit-'+listaDeEmprestimos[i].idEmprestimo+'').attr('disabled', 'true');
				                			$('#button-quit-'+listaDeEmprestimos[i].idEmprestimo+'').removeClass( "btn-danger" ).addClass('btn-secondary');
	
				                		}
								}								
								$('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeEmprestimos.length / tamanhoPagina));
	//							console.log("identificando página " + pagina)
	
							}
							
							$(function() {
								$('#proximo').click(function() {
									if (pagina < listaDeEmprestimos.length / tamanhoPagina - 1) {
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
								$('#proximo').prop('disabled', listaDeEmprestimos.length <= tamanhoPagina || pagina > listaDeEmprestimos.length / tamanhoPagina - 1);
								$('#anterior').prop('disabled', listaDeEmprestimos.length <= tamanhoPagina || pagina == 0);
							}
						tabela +="</tbody" +
								"</table>";
						
							return tabela;
				
						$("#listaEmprestimos").html(tabela);
					}
					
				
			}
			SALAARCOIRIS.emprestimo.buscarListaEmpAtualizada(); 
		}
		
	}
		SALAARCOIRIS.emprestimo.buscarE();
		
		SALAARCOIRIS.emprestimo.quitarE = function(idEmprestimo, colunaDiasAtrasoParam){
			valorBusca = idEmprestimo;
//			console.log("1º dias atraso = " + colunaDiasAtrasoParam)
//			console.log("idEmprestimo = " + valorBusca)
			colunaDiasAtrasoParam = colunaDiasAtrasoParam
				$.ajax({
					type:"GET",
					url: SALAARCOIRIS.PATH +"emprestimo/buscarEmprestimoEspecifico",
					data: "valorBusca="+valorBusca,
					success: function(emprestimo){
						emprestimoDetalhado = JSON.parse(emprestimo);
						console.log(emprestimoDetalhado)
						$("#emprestimoEspecifico").html(SALAARCOIRIS.emprestimo.exibirEmprestimoEspecifico(emprestimoDetalhado, colunaDiasAtrasoParam));
						//						document.frmEditaAluno.idAluno.value = aluno.idAluno;
					},
					error: function(info){
						console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
					}
					
				});	
				SALAARCOIRIS.emprestimo.exibirEmprestimoEspecifico = function (emprestimo, colunaDiasAtrasoParam){

					const idEmprestimo = emprestimo[0].emprestimo_livro_idEmprestimo;
					const dataEmprestimo = emprestimo[0].dataEmprestimo.split('-').reverse().join('/');
					const dataDevolucao = emprestimo[0].dataDevolucao.split('-').reverse().join('/');
					idModal = "id02";
					var emprestimoEspecifico =
						"<br>"
						+"<form id='emprestimoEspecifico' class='row g-3 mt-2'>"
							+"<div class='col-md-6'>"
								+"<label for='labelNome' class='form-label'>Nome Aluno</label>"
								+"<input type='text' class='form-control' id='nomeAluno' value='"+emprestimo[0].nomeAluno+"' disabled>"
							+"</div>"
							+"<div class='col-md-6'>"
								 +"<label for='cpfAluno' class='form-label'>CPF</label>"
								 +"<input type='text' class='form-control' id='cpfAluno' value='"+emprestimo[0].cpfAluno+"' disabled>"
							+"</div>"
					  	
							+"<div class='col-md-6 mt-2'>"
								+"<label for='dataEmprestimo' class='form-label'>Data Empréstimo</label>"
								+"<input type='text' class='form-control' id='dataEmprestimo' value='"+dataEmprestimo+"' disabled>"
							+"</div>"
							+"<div class='col-md-6 mt-2'>"
								 +"<label for='dataDevolucao' class='form-label'>Data Devolução</label>"
								 +"<input type='text' class='form-control' id='dataDevolucao' value='"+dataDevolucao+"' disabled>"
							+"</div>"
						+"</form>"
						
						+"<div class='table-responsive'>"
							+"<table class='table mt-3 table-bordered table-responsive-sm rounded-3'>"
							+"<thead>"
								+"<tr>"	
									+"<th scope='col'> Nome Livro</th>"
									+"<th scope='col'> Código (SKU)</th>"
									+"<th scope='col'> Estoque</th>"
								+"</tr>"
							+"</thead>"
							+"<tbody>";
								for (var i=0; i<emprestimo.length; i++){
								emprestimoEspecifico+=
									"<tr>"
									+"<th scope='row'>"+emprestimo[i].nomeLivro+"</th>"
									+"<td>"+emprestimo[i].codigoLivro+"</td>"
									+"<td>"+emprestimo[i].qtdLivro+"</td>";
								}
								emprestimoEspecifico +=
								"</tbody>"
								+"</table>"
						+"</div>"
						+"<div class='row g-3 justify-content-center'>"
							+"<div class='col-3 mb-4'>"
								+"<button class='btn btn-secondary btn-block' onclick='fecharModal(idModal)'>Cancelar</button>"
							+"</div>"
							+"<div class='col-3 mb-4'>"
								+"<button class='btn btn-primary btn-block' "
								+"onclick=\"SALAARCOIRIS.emprestimo.prorrogar('"+idEmprestimo+"' , '"+emprestimo[0].dataDevolucao+"' , '"+emprestimo[0].prorrogacoes+"' , '"+colunaDiasAtrasoParam+"')\">Prorrogar</button>"
							+"</div>"
							+"<div class='col-3 mb-4'>"
								+"<button class='btn btn-success btn-block' "
								+"onclick=\"SALAARCOIRIS.emprestimo.verificarMulta('"+idEmprestimo+"' , '"+colunaDiasAtrasoParam+"')\">Finalizar</button>"
							+"</div>"
						+"</div>";
							
							
						return emprestimoEspecifico;
						$("#emprestimoEspecifico").html(emprestimoEspecifico);
						
				}
				id = 'id02';
				abrirModal(id);
				
				

		}
		SALAARCOIRIS.emprestimo.prorrogar = function (idEmprestimo, dataDevolucao, prorrogacoes, colunaDiasAtrasoParam){
			
			switch (parseInt(prorrogacoes)){
				// Pode prorrogar até 3x
				case 0: prorrogar = 1;
					break;
				case 1: prorrogar = 2;
					break;
				case 2: prorrogar = 3;
					break;
				default: prorrogar = false;
			}
//			console.log(prorrogar)
				if (colunaDiasAtrasoParam != 0){
					alertError('Seu empréstimo está atrasado! Por favor, cancele a operação ou finalize seu empréstimo.')
		        }else if (!prorrogar){
					alertError('Seu empréstimo já foi prorrogado 3x! Por favor, cancele a operação ou finalize seu empréstimo.')
				}else{
					
					var novaData = new Date(dataDevolucao)

			           novaData.setDate(novaData.getDate() + 7);
						var month = novaData.getMonth()+1;
						var day = novaData.getDate();
			
						var devolucao = novaData.getFullYear() + '/' +
						(month<10 ? '0' : '') + month + '/' +
						(day<10 ? '0' : '') + day;
			           	
			           
			           var emprestimo = new Object();
						emprestimo.idEmprestimo = idEmprestimo;
						emprestimo.dataDevolucao = devolucao;
						emprestimo.prorrogacoes = prorrogar;
						
						$.ajax({
							type:"PUT",
							url: SALAARCOIRIS.PATH + "emprestimo/prorrogarE",
							data:JSON.stringify(emprestimo),
							success: function(msg){
								SALAARCOIRIS.emprestimo.buscarListaEmpAtualizada();
								document.getElementById('id02').style.display='none';
								msgSuccessSimple('Agora você já pode ler por mais um tempo')
							},
							error: function(info){
								console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
							}
						});
				}
		}
		
		SALAARCOIRIS.emprestimo.verificarMulta = function(idEmprestimo, colunaDiasAtrasoParam){
			console.log('entrando e : '+ colunaDiasAtrasoParam)
			idEmprestimo = idEmprestimo;
			let valorMulta = 0;
			if (colunaDiasAtrasoParam > 0){
				idModal = 'id03';				
				valorMulta = colunaDiasAtrasoParam * 0.50;
				valorMultaMensagem = valorMulta.toString().replace(".", ",")
				
				let modalMulta = 
//				+"<form id='modalMulta' class='row g-3 mt-2'>"
					+"<div class='col-md-12 col-lg-12'>"
						+"<label for='labelNome' class='form-label'>Valor multa:</label>"
						+"<input type='text' class='form-control' id='nomeAluno' value='R$ "+valorMultaMensagem+"' disabled>"
						+"<label for='labelNome' class='form-label'>Deseja quitar a multa?</label>"
					+"</div>"
					+"<div class='row g-3 justify-content-center'>"
					+"<div class='col-3 mb-4'>"
						+"<button class='btn btn-secondary btn-block' onclick=\"document.getElementById('id03').style.display='none'\">Cancelar</button>"
					+"</div>"
					+"<div class='col-3 mb-4'>"
						+"<button type='submit' class='btn btn-success btn-block'" 
						+"onclick=\"SALAARCOIRIS.emprestimo.quitarEmprestimoConfirmado('"+idEmprestimo+"' , '"+valorMulta+"')\">Finalizar</button>"
					+"</div>"
					+"</div>";
//				+"</form>";
				
//				return modalMulta;
				$("#modalMulta").html(modalMulta);
				abrirModal(idModal);
//				
//				document.frmQuitarEmprestimo.valorMulta.value = "R$ "+ valorMulta;
//				
//				console.log(idEmprestimo +" / " + colunaDiasAtrasoParam)
			}else {
				SALAARCOIRIS.emprestimo.quitarEmprestimoConfirmado(idEmprestimo, valorMulta)
			}
			
			
		}
		
		SALAARCOIRIS.emprestimo.quitarEmprestimoConfirmado = function(idEmprestimo, valorMulta){
			

			// Update Livros:
			SALAARCOIRIS.emprestimo.buscarEstoqueLivros(idEmprestimo);
			

			// Update Status Empréstimo
			var emprestimo = new Object();
			emprestimo.idEmprestimo = idEmprestimo;
			emprestimo.valorMulta = valorMulta;
			console.log('quitarEmprestimoConfirmado()' + idEmprestimo + ' / ' + valorMulta)
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "emprestimo/quitarE",
				data:JSON.stringify(emprestimo),
				success: function(msg){
					SALAARCOIRIS.emprestimo.buscarListaEmpAtualizada();
					document.getElementById('id02').style.display='none';
					document.getElementById('id03').style.display='none';
					msgSuccessSimple('Empréstimo finalizado.')
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
			
		}
		SALAARCOIRIS.emprestimo.buscarEstoqueLivros = function(idEmprestimo){
						
			$.ajax({
				type:"GET",
				url: SALAARCOIRIS.PATH +"livroEmprestado/buscarLE",
				data: "valorBusca="+idEmprestimo,
				success: function(qtdLivroDevolvida){
					qtd = JSON.parse(qtdLivroDevolvida);
					SALAARCOIRIS.emprestimo.atualizarEstoqueLivros(qtd)
				},
				error: function(info){
					console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
				}
				
			});
			SALAARCOIRIS.emprestimo.atualizarEstoqueLivros = function(qtdEstoqueLivros){
				
				let livros = [];
				qtdEstoqueLivros.map(item => {
					  livros.push({
					    'idLivro': item.livro_idLivro,
					    'qtdEstoque': item.qtdLivro
					  });
					});

				$.ajax({
					type:"PUT",
					url: SALAARCOIRIS.PATH + "livro/alterarEstoque",
					data:JSON.stringify(livros),
					success: function(msg){
						console.log('alterado estoque')
					},
					error: function(info){
						console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
					}
				});
			}
			
		}

});
	
	function removerCampos(value){
		var node1 = document.getElementById(value.id);
		livros = livros.filter((item) => {
			return item.id != value.id;
		})
		node1.remove();

	}
	
	function abrirModal(id){
		document.getElementById(id).style.display='block';
	}
	function fecharModal(){
		document.getElementById(id).style.display='none';
	}
	

	
	



