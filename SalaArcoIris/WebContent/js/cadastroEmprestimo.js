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
		text: text,
	  })
}

var livros = [];

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
			console.log(emprestimo)
			
			if(validarCampos()){
				$.ajax({
					type: "POST",
					url: SALAARCOIRIS.PATH + "emprestimo/inserirE",
					data:JSON.stringify(emprestimo),
					success:function(retorno){
						if(retorno === "true"){
							SALAARCOIRIS.emprestimo.buscarUltimoId();
						}else {
							alertError('Houve algum erro! Tente novamente')
						}
					},
					error:function(info){
						alertError('Erro ao cadastrar!')
						console.log("Erro ao cadastrar um novo emprestimo: "+ info.status + " - "+ info.statusText);	
					}
				});
			}
			

			/*
			* inserir no bd o emprestimo
			* buscar o id do emprestimo para inserir no bd associativo
			*/

			SALAARCOIRIS.emprestimo.buscarUltimoId = function(){
			
				$.ajax({
					type: "GET",
					url: SALAARCOIRIS.PATH + "emprestimo/buscarUltimoId",
					success: function(dados){
						dados = JSON.parse(dados);
						var idEmprestimo = dados;
						console.log("idEmprestimo: " + idEmprestimo);
				    	sessionStorage.setItem('idEmprestimo', idEmprestimo );
					},
					error: function(info){
						var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
						var b = a.replace(/'/g, '');				
					}
				});
		
			}

			// Inserir livro na tabela associativa
			
			
			qtdLivrosListados = sessionStorage.getItem('linhasLivros')
			idEmprestimo = sessionStorage.getItem('idEmprestimo')
			// Há um atraso, por isso essa soma
			idEmprestimo = parseInt(idEmprestimo) + 1;
			
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
						'idEmprestimo': idEmprestimo,
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
			
		}
		
		function validarCampos(){
			validacao = true;
			
			
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
		
//		console.log(livros.length)
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
    });
	
	function removerCampos(value){
		var node1 = document.getElementById(value.id);
		livros = livros.filter((item) => {
			return item.id != value.id;
		})
		node1.remove();

	}
	


