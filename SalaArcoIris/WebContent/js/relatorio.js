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

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataHoje = dia + '/' + mes + '/' + ano;

SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		
		SALAARCOIRIS.emprestimo.buscarE = function(){
		
		var dataInicio = $("#date-start").val();
		
		var dataFinal = $("#date-end").val();
		
		 
		
		if (!dataInicio){
//			var d = new Date();
//			d.setDate(d.getDate()-90);
//			converterData(d);
//			dataInicio = converterData(d);
			dataInicio = '2000-01-01';
			// Buscar todos
		}
		
		if (!dataFinal){
			var d = new Date();
			dataFinal = converterData(d);
		}
		
		var emissao = "";
		
		if (!$("#date-start").val() && !$("#date-end").val()){
			emissao = "completa";
		}else{
			emissao = "de: " + converterDataFront(dataInicio) + " até " + converterDataFront(dataFinal);
		}
		
		function converterData(d){
			var day = d.getDate();
			var month = d.getMonth()+1;
			var year = d.getFullYear();
			
			var date = year + '-' +
			(month<10 ? '0' : '') + month + '-' +
			(day<10 ? '0' : '') + day;
			
			return date;
		}
		
		function converterDataFront(d){
			
			const date = d.split('-').reverse().join('/');
			
			return date;
		}
		
		
		var valorBusca = $("#buscaEmprestimo").val();
		    
			$.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarEmprestimoAtrasadoFiltrando",
				data:{'dataInicio': dataInicio, 'dataFinal':dataFinal},
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
				
				if (listaDeEmprestimos.length){
					console.log(listaDeEmprestimos)
					var tabela = "";
						tabela =
						"<div class='alert alert-dark text-center mt-4' role='alert'>Listagem "+emissao+"</div>"+
	
							"<table class='table table-responsive-sm table-bordered'>"+
								"<thead>"+
									"<tr class='text-center'>"+	
										"<th scope='col-lg-3'> Nome</th>"+
										"<th scope='col-lg-2'> CPF</th>"+
										"<th scope='col-lg-2'> Data Devolução</th>"+
										"<th scope='col-lg-2'> Dias Atrasado</th>"+
									"</tr>"+
								"</thead>"+
								"<tbody>";
				
						if(listaDeEmprestimos != undefined && listaDeEmprestimos.length >0){
				
							for (var i=0; i<listaDeEmprestimos.length; i++){
								
								tabela+="<tr>"+
								"<th scope='row'>"+listaDeEmprestimos[i].nomeAluno+"</th>"+
								"<td>"+listaDeEmprestimos[i].cpfAluno+"</td>"+
								"<td>"+listaDeEmprestimos[i].dataDevolucao+"</td>"+
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
									const data = listaDeEmprestimos[i].dataDevolucao.split('-').reverse().join('/');
									
									var  dataAtual = new Date();
									var dataDevolucao = new Date(listaDeEmprestimos[i].dataDevolucao);
									
									dataAtual.setDate(dataAtual.getDate() - 1);
									
									var diff = moment(dataAtual,"DD/MM/YYYY HH:mm:ss").diff(moment(dataDevolucao
											,"DD/MM/YYYY HH:mm:ss"));
									var dias = moment.duration(diff).asDays();
									colunaDiasAtraso = Math.trunc(moment.duration(diff).asDays());
									
									if (dias < 1){											
										colunaDiasAtraso = 1;
									}
									
									tbody.append(
											$('<tr>')
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].nomeAluno+'">').append(listaDeEmprestimos[i].nomeAluno))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].cpfAluno+'">').append(listaDeEmprestimos[i].cpfAluno))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].dataDevolucao+'">').append(data))
												.append($('<td class="text-center" id="nome'+listaDeEmprestimos[i].idEmprestimo+'">').append(colunaDiasAtraso))
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
					}else{
						var aviso = "";
						
						aviso = 
							
							'<div class="alert alert-primary mt-4" role="alert">'+
						  		'Não foram encontrados empréstimos atrasados!'+
						  	'</div>';
						
						$("#listaEmprestimos").html(aviso);
					}
				}
			
			SALAARCOIRIS.emprestimo.imprimir = function(tabela){
				
				if ($("#date-start").val() && $("#date-end").val()){	
					var paginaImprimir = window.open('', 'Impressão');
			        paginaImprimir.document.write('<html><head><title>Impressão</title>');
			        paginaImprimir.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">');
			        paginaImprimir.document.write('<input type="hidden" onkeyup="exibirWaiting()">');
			        paginaImprimir.document.write();
		
			        setTimeout(function(){
				        paginaImprimir.document.write('</head><body >');
						paginaImprimir.document.write('<div class="container-fluid border p-4">')
						paginaImprimir.document.write('<div class="row">')
						paginaImprimir.document.write('<div class="col-sm justify-content-center">')
						paginaImprimir.document.write('<img src="../../imgs/logo2.png" width="100" height="80" class="rounded mr-5" alt="">')
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write('<div class="col-sm d-flex align-items-center  justify-content-center">')
						paginaImprimir.document.write('<h5>EMPRÉSTIMOS ATRASADOS</h5>')
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write('<div class="col-sm d-flex align-items-center  justify-content-end">')
						paginaImprimir.document.write('Emissão: ' + dataHoje)
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write('</div>')
						paginaImprimir.document.write($("#listaEmprestimos").html());		        
						paginaImprimir.document.write('<div class="container-fluid border p-4 text-center my-auto">')
						paginaImprimir.document.write('<p>Desenvolvedor - Yuri Andrei da Silva</p>')
						paginaImprimir.document.write('</div>')
				        paginaImprimir.document.write('</body></html>');
				
				        paginaImprimir.print();
				        paginaImprimir.close();
		
				        return true;	            
			        },500);
		        
				}else{
					alertError('Preencha as duas datas, inicial e final!')
				}
			}
		}
	SALAARCOIRIS.emprestimo.buscarFiltrando = function(){
	
		var dataInicio = $("#date-start").val();
	
		var dataFim = $("#date-end").val();
	
		console.log("dataIncio: " + dataInicio);
	
		console.log("dataFim: " + dataFim);
		
	}
	
		SALAARCOIRIS.emprestimo.buscarE();
});