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
							"<th scope='col-lg-2'> Data Empréstimo</th>"+
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
									.append($('<td id="nome'+listaDeEmprestimos[i].nomeAluno+'">').append(listaDeEmprestimos[i].nomeAluno))
									.append($('<td id="nome'+listaDeEmprestimos[i].cpfAluno+'">').append(listaDeEmprestimos[i].cpfAluno))
									.append($('<td id="nome'+listaDeEmprestimos[i].dataEmprestimo+'">').append(listaDeEmprestimos[i].dataEmprestimo))
									.append($('<td id="nome'+listaDeEmprestimos[i].status+'">').append(listaDeEmprestimos[i].status))
									.append($('<td id="nomeDiasAtraso">').append('Fazer cálculo!!!'))
									.append($('<td>'+'<a class="btn btn-warning" onclick=\'SALAARCOIRIS.emprestimo.exibirEditE("'+listaDeEmprestimos[i].idEmprestimo+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">'+
					                		  '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>'+ 
					                			  '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>'+
					                			  '</svg></a>' +'</td>').append())
					                .append($('<td>'+'<a class="btn btn-danger" onclick=\'SALAARCOIRIS.emprestimo.deletarE("'+listaDeEmprestimos[i].idEmprestimo+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
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
		SALAARCOIRIS.emprestimo.buscarE();