var dados = [];

SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		SALAARCOIRIS.emprestimo.buscarEmprestimos = function(){
		    var valorBusca = ''; // Todos
		    $.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarQtdEmprestimoFinalizado",
				success: function(dados){
					dados = JSON.parse(dados);
					graficoLine(dados);
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
		    });
		}
		SALAARCOIRIS.emprestimo.buscarEmprestimosGeral = function(){
		    var valorBusca = ''; // Todos
		    $.ajax({
				type: "GET",
				url: SALAARCOIRIS.PATH + "emprestimo/buscarQtdEmprestimoGeral",
				success: function(dadosGerais){
					dadosGerais = JSON.parse(dadosGerais);
					graficoDoughnut(dadosGerais);
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
		    });
		}
	SALAARCOIRIS.emprestimo.buscarEmprestimos(dados);
	SALAARCOIRIS.emprestimo.buscarEmprestimosGeral(dados);
});

function graficoLine(dados){
	qtd = [];
	
	for (var i=0; i<dados.length; i++){
		qtd[i] = dados[i].qtd;
	}
	
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto','Setembro',
	        	'Outubro','Novembro','Dezembro'],
	        datasets: [{
	            label: 'Empréstimos no mês',
	            data: qtd,
	            backgroundColor: '#007bff',
	            borderColor: '#007bff',
	            color: '#007bff',
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            y: {
	                beginAtZero: true
	            }
	        }
	    }
	});
}
function graficoDoughnut(dadosGerais){
	console.log(dadosGerais)
	
	qtd = [];
	
	for (var i=0; i<dadosGerais.length; i++){
		qtd[i] = dadosGerais[i].qtd;
	}

	const data = {
			labels: ['Finalizados', 'Em Andamento', 'Atrasados'],
			datasets: [
				{
					label: 'Dataset 1',
					data: qtd,
					backgroundColor: ['green', 'orange', 'red'],
				}
				]
	};
	var ctx2 = document.getElementById('myChart2');
	
	const config = new Chart(ctx2, {
			  type: 'doughnut',
			  data: data,
			  options: {
			    responsive: true,
			    plugins: {
			      legend: {
			        position: 'top',
			      },
			      title: {
			        display: true,
			        text: 'Empréstimos de todos os tempos'
			      }
			    }
			  },
	});
}
