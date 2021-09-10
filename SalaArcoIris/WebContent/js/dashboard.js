var dados = [];

SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		SALAARCOIRIS.emprestimo.buscarEmprestimos = function(){
		    
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
	SALAARCOIRIS.emprestimo.buscarEmprestimos();
	SALAARCOIRIS.emprestimo.buscarEmprestimosGeral();
});

function graficoLine(dados){

	qtd = [];
	mes = []
	
	for (var i=0; i<dados.length; i++){
		qtd[i] = dados[i].qtd;
		switch(dados[i].mes){
		case 'January':
			mes[i] =  'Janeiro'
			break;
		case 'February':
            mes[i] =  'Fevereiro'
            break;
		case 'March':
            mes[i] =  'Março'
            break;
		case 'April':
            mes[i] =  'Abril'
            break;
		case 'May':
            mes[i] =  'Maio'
            break;
		case 'June':
            mes[i] =  'Junho'
            break;
		case 'July':
            mes[i] =  'Julho'
            break;
		case 'August':
            mes[i] =  'Agosto'
            break;
		case 'September':
            mes[i] =  'Setembro'
            break;
		case 'October':
            mes[i] =  'Outubro'
            break;
		case 'November':
            mes[i] =  'Novembro'
            break;
		case 'December':
            mes[i] =  'Dezembro'
            break;
		}
	}
	
	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: mes,
	        datasets: [{
	            label: 'Empréstimos finalizados por mês',
	            data:  qtd,
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
	labels = []
	colors = []
	
	for (var i=0; i<dadosGerais.length; i++){
		qtd[i] = dadosGerais[i].qtd;
		switch(dadosGerais[i].status){
		case 2:
			labels[i] =  'Finalizados'
			colors[i] =  'Green'
			break;
		case 1:
			labels[i] =  'Em Andamento'
			colors[i] =  'Orange'
			break;
		case 0:
			labels[i] =  'Atrasados'
			colors[i] =  'Red'
			break;
		}
	}
	
	

	const data = {
			labels: labels,
			datasets: [
				{
					label: 'Dataset 1',
					data: qtd,
					backgroundColor: colors,
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
			        text: 'Histórico de empréstimos na atualidade'
			      }
			    }
			  },
	});
}
