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

alertError = function(text){
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: text
	  })
}

var livros = [];
//var idEmprestimo = 0;

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
			
			
			var dataAtual = d.getFullYear() + '/' +
			(month<10 ? '0' : '') + month + '/' +
			(day<10 ? '0' : '') + day;
		
			
			let dateDev = new Date(); 
			dateDev.setDate(dateDev.getDate() + 7);
			var month = dateDev.getMonth()+1;
			day = dateDev.getDate();
			
			var devolucao = dateDev.getFullYear() + '/' +
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
				"<table class='table table-bordered'>"+
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
				"<table class='table table-bordered'>"+
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
		console.log('entrando')
		var valorBusca = $("#buscaEmprestimo").val();
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "emprestimo/buscarE",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});
	
		SALAARCOIRIS.emprestimo.exibirEmprestimo = function(listaDeEmprestimos){
			var tabela = 
				"<br>"+
				"<table class='table table-bordered'>"+
					"<thead>"+
						"<tr class='text-center'>"+	
							"<th scope='col-lg-3'> Nome</th>"+
							"<th scope='col-lg-2'> CPF</th>"+
							"<th scope='col-lg-2'> Data Emp.</th>"+
							"<th scope='col-lg-2'> Status</th>"+
							"<th scope='col-lg-1'> Dias Atraso</th>"+
							"<th scope='col-lg-1'> Editar</th>"+
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
					// listaDeEmprestimos[i].dataEmprestimo - dataAtual;
					"<td>Fazer cálculo</td>"+
					"<td>"+"<a class='btn btn-warning' onclick=\"SALAARCOIRIS.emprestimo.exibirEditE('"+listaDeEmprestimos[i].idEmprestimo+"')\"><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>"+
							"<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>"+
							"<path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/>"+
						"</svg></a>" +
					"</td>"+
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
			var pagina = 0;
				
				function paginar() {
					$('table > tbody > tr').remove();
					var tbody = $('table > tbody');
					for (var i = pagina * tamanhoPagina; i < listaDeEmprestimos.length && i < (pagina + 1) *  tamanhoPagina; i++){
						tbody.append(
								$('<tr>')
									.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].nomeAluno+'">').append(listaDeEmprestimos[i].nomeAluno))
									.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].cpfAluno+'">').append(listaDeEmprestimos[i].cpfAluno))
									.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].dataEmprestimo+'">').append(listaDeEmprestimos[i].dataEmprestimo))
									.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].status+'">').append(listaDeEmprestimos[i].status))
									.append($('<td class="text-center" id="nomeDiasAtraso">').append('Fazer cálculo!!!'))
									.append($('<td class="text-center">'+'<a class="btn btn-warning" onclick=\'SALAARCOIRIS.emprestimo.exibirEditE("'+listaDeEmprestimos[i].idEmprestimo+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">'+
					                		  '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>'+ 
					                			  '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>'+
					                			  '</svg></a>' +'</td>').append())
					                .append($('<td class="text-center">'+'<a class="btn btn-danger" onclick=\'SALAARCOIRIS.emprestimo.deletarE("'+listaDeEmprestimos[i].idEmprestimo+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
					                		  '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
					                			  '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
					                			'</svg></a>' +'</td>').append())
							)
					}
					$('#numeracao').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeEmprestimos.length / tamanhoPagina));
					
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
		SALAARCOIRIS.emprestimo.buscarE();

});
	
	function removerCampos(value){
		var node1 = document.getElementById(value.id);
		livros = livros.filter((item) => {
			return item.id != value.id;
		})
		node1.remove();

	}

	
	



