SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		SALAARCOIRIS.emprestimo.buscarE = function(){
		var valorBusca = $("#buscaEmprestimo").val();
//		var valorBusca = '';
		console.log('entrando');
		    
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasado",
				data: "valorBusca="+valorBusca,
				success: function(dados){
					dados = JSON.parse(dados);
					$("#listaEmprestimos").html(SALAARCOIRIS.emprestimo.exibirEmprestimo(dados));
					console.log(dados);
				},
				error: function(info){
					var a="Erro ao consultar: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
			SALAARCOIRIS.emprestimo.exibirEmprestimo = function(listaDeEmprestimos){
				var tabela = "";
					tabela = "<br>"+
						"<table class='table table-responsive-sm table-bordered'>"+
							"<thead>"+
								"<tr class='text-center'>"+	
									"<th scope='col-lg-3'> Nome</th>"+
									"<th scope='col-lg-2'> CPF</th>"+
									"<th scope='col-lg-2'> Data Devolvido</th>"+
									"<th scope='col-lg-2'> Valor Multa</th>"+
								"</tr>"+
							"</thead>"+
							"<tbody>";
			
					if(listaDeEmprestimos != undefined && listaDeEmprestimos.length >0){
			
						for (var i=0; i<listaDeEmprestimos.length; i++){
							
							tabela+="<tr>"+
							"<th scope='row'>"+listaDeEmprestimos[i].nomeAluno+"</th>"+
							"<td>"+listaDeEmprestimos[i].cpfAluno+"</td>"+
							"<td>"+listaDeEmprestimos[i].dataDevolvido+"</td>"+
							"<td>"+listaDeEmprestimos[i].valorMulta+"</td>"+
						"</tr>";
						}
			
					}else if (listaDeEmprestimos == ""){
						tabela += "<tr scope='row'><td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
					}
					tabela +="</tbody" +
							"</table>";
											
					var tamanhoPagina = 10;
					var pagina = 0;
					var tbody = "";
						function paginar() {
							$('table > tbody > tr').remove();
							tbody = $('table > tbody');
							for (var i = pagina * tamanhoPagina; i < listaDeEmprestimos.length && i < (pagina + 1) *  tamanhoPagina; i++){
								const data = listaDeEmprestimos[i].dataDevolvido.split('-').reverse().join('/');
								valorMultaMensagem = listaDeEmprestimos[i].valorMulta.toString().replace(".", ",");
								
								tbody.append(
										$('<tr>')
											.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].nomeAluno+'">').append(listaDeEmprestimos[i].nomeAluno))
											.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].cpfAluno+'">').append(listaDeEmprestimos[i].cpfAluno))
											.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].dataDevolvido+'">').append(data))
											.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].valorMulta+'">').append('R$ ' + valorMultaMensagem))
									)
									if (listaDeEmprestimos[i].status == 2){		
			                			$('#button-quit-'+listaDeEmprestimos[i].idEmprestimo+'').attr('disabled', 'true');
			                			$('#button-quit-'+listaDeEmprestimos[i].idEmprestimo+'').removeClass( "btn-danger" ).addClass('btn-secondary');

			                		}
							}								
							$('#numeracao2').text('Página ' + (pagina + 1) + ' de ' + Math.ceil(listaDeEmprestimos.length / tamanhoPagina));
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
							$('#proximo').addClass('btn btn-outline-secondary').prop('disabled', listaDeEmprestimos.length <= tamanhoPagina || pagina > listaDeEmprestimos.length / tamanhoPagina - 1);
							$('#anterior').addClass('btn btn-outline-secondary').prop('disabled', listaDeEmprestimos.length <= tamanhoPagina || pagina == 0);
						}
					tabela +="</tbody" +
							"</table>";
					
						return tabela;
			
					$("#listaEmprestimos").html(tabela);
					listaDeEmprestimo = "";
				}
		}
	SALAARCOIRIS.emprestimo.buscarE();
});