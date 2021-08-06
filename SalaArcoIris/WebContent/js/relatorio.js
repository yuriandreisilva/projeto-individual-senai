function exibirWaiting(){
	let timerInterval
	Swal.fire({
	  title: 'Auto close alert!',
	  html: 'I will close in <b></b> milliseconds.',
	  timer: 2000,
	  timerProgressBar: true,
	  didOpen: () => {
	    Swal.showLoading()
	    const b = Swal.getHtmlContainer().querySelector('b')
	    timerInterval = setInterval(() => {
	      b.textContent = Swal.getTimerLeft()
	    }, 100)
	  },
	  willClose: () => {
	    clearInterval(timerInterval)
	  }
	}).then((result) => {
	  /* Read more about handling dismissals below */
	  if (result.dismiss === Swal.DismissReason.timer) {
	    console.log('I was closed by the timer')
	  }
	})
}

SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		
		SALAARCOIRIS.emprestimo.buscarE = function(){
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
					var a="Erro ao consultar: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
			});
			SALAARCOIRIS.emprestimo.exibirEmprestimo = function(listaDeEmprestimos){
				var data = new Date();
				var dia = String(data.getDate()).padStart(2, '0');
				var mes = String(data.getMonth() + 1).padStart(2, '0');
				var ano = data.getFullYear();
				dataAtual = dia + '/' + mes + '/' + ano;
				
				var tabela = "";
					tabela = "<br>"+
					"<div class='alert alert-dark' role='alert'>"+
						dataAtual+
					"</div>"+

						"<table class='table table-responsive-sm table-bordered'>"+
							"<thead>"+
								"<tr class='text-center'>"+	
									"<th scope='col-lg-3'> Nome</th>"+
									"<th scope='col-lg-2'> CPF</th>"+
									"<th scope='col-lg-2'> Dias Atrasado</th>"+
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
					console.log(tabela)
					SALAARCOIRIS.emprestimo.imprimir($(tabela).html());
				}
			SALAARCOIRIS.emprestimo.imprimir = function(tabela){
				console.log('imprimindo');
				var teste = $("#listaEmprestimos").html(tabela);
				console.log(teste[0]);
				
			var paginaImprimir = window.open('', 'Impressão');
	        paginaImprimir.document.write('<html><head><title>Impressão</title>');
	        paginaImprimir.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">');
	        paginaImprimir.document.write('<input type="hidden" onkeyup="exibirWaiting()">');
	        paginaImprimir.document.write();
//	        exibirWaiting();
	        setTimeout(function(){
		        paginaImprimir.document.write('</head><body >');
		        paginaImprimir.document.write($("#listaEmprestimos").html());
		        paginaImprimir.document.write('</body></html>');
		
		        paginaImprimir.print();
		        paginaImprimir.close();

		        return true;	            
	        },500);
	        
			}
		}
	SALAARCOIRIS.emprestimo.buscarE();
});