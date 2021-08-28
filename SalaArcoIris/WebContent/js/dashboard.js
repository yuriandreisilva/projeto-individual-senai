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
					grafico(dados);
				},
				error: function(info){
					var a="Erro ao consultar os cadastros de emprestimo: "+info.status+" - "+info.statusText;
					var b = a.replace(/'/g, '');				
				}
		    });
		}
	SALAARCOIRIS.emprestimo.buscarEmprestimos(dados);
});

function grafico(dados){
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


var relatorio = 
	
'<div class="progress" style="height:2rem;">'
	+'<div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">Finalizados</div>'
+'</div>'
+'<div class="progress mt-2" style="height:2rem;">'
	+'<div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">Em Andamento</div>'
+'</div>'
+'<div class="progress mt-2" style="height:2rem;">'
	+'<div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Atrasados</div>'
+'</div>'
	
$(".report").html(relatorio);
}
