SALAARCOIRIS = new Object();

SALAARCOIRIS.emprestimo = new Object();

// SALAARCOIRIS.aluno.buscarAluno();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		// INSERT - emprestimo
		SALAARCOIRIS.emprestimo.cadastrarEmprestimo = function(){
            console.log('entrando');
//            location.href="cadastrar.html";
            // var emprestimo = new Object();
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
				$("#listaAlunos").html(SALAARCOIRIS.emprestimo.exibir(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.emprestimo.exibir = function(listaDeAlunos){
			var tabela = 
				"<br>"+
				"<table class='table'>"+
					"<thead>"+
						"<tr>"+	
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
							"<label><input type='radio' id='regular' name='optradio' value='"+listaDeAlunos[i].idAluno+"'></label>"+
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
				                .append($('<td>').append(listaDeAlunos[i].nomeAluno))
				                .append($('<td>').append(listaDeAlunos[i].cpfAluno))
				                .append($('<td><div class="radio text-center"><label><input type="radio" id="regular" name="optradio" value="'+listaDeAlunos[i].idAluno+'"></label>').append())
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
			
			
			
			return tabela;

			$("#listaAlunos").html(tabela);
		}	
		
		
		
		
	}
	SALAARCOIRIS.emprestimo.buscarAluno();
    });

