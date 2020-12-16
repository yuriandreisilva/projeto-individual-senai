function verifica(){
	var input = document.getElementById('selecao').value;

	console.log(input);

	if(input == "2" ){ 
		document.querySelectorAll('.input-responsaveis').forEach(input => input.disabled = false);

	}else{
		document.querySelectorAll('.input-responsaveis').forEach(input => input.disabled = true);
	}  	
};



SALAARCOIRIS = new Object();

SALAARCOIRIS.aluno = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		// INSERT - Aluno
		SALAARCOIRIS.aluno.cadastrarAluno = function(){

		var codigoResp = 0;

		var aluno = new Object();
		aluno.nomeAluno = document.frmAluno.nome.value;
		aluno.cpfAluno = document.frmAluno.cpf.value;
		aluno.email = document.frmAluno.email.value;
		aluno.nascAluno = document.frmAluno.datepicker.value;
		//

		if (document.frmAluno.selecao.value == 2){
			codigoResp = Math.floor(Math.random() * 1000000);
			document.getElementById("codigoResp").value=codigoResp;
		}

		aluno.idResp = codigoResp;

		console.log(aluno);

		$.ajax({
			type: "POST",
			url: SALAARCOIRIS.PATH + "aluno/inserirA",
			data:JSON.stringify(aluno),
			success:function(msg){
				console.log(msg);
				SALAARCOIRIS.aluno.cadastrarResponsavel();
			},
			error:function(info){
				console.log("Erro ao cadastrar um novo aluno: "+ info.status + " - "+ info.statusText);	
			}
		});	
	}

	// INSERT - resp

	SALAARCOIRIS.aluno.cadastrarResponsavel = function(){

		if (document.frmAluno.selecao.value == 2){
			var responsavel = new Object();

			responsavel.idResp = document.getElementById("codigoResp").value;
			responsavel.nomeResp = document.frmAluno.nomeResponsavel.value;
			responsavel.nascResp = document.frmAluno.nascResponsavel.value;


			$.ajax({
				type: "POST",
				url: SALAARCOIRIS.PATH + "responsavel/inserirR",
				data:JSON.stringify(responsavel),
				success:function(msg){
					console.log(msg);
				},
				error:function(info){
					console.log("Erro ao cadastrar um novo aluno: "+ info.status + " - "+ info.statusText);	
				}
			});
		}
	}


	// READ --

	SALAARCOIRIS.aluno.buscarAluno = function(){
		var valorBusca = $("#buscaAluno").val();
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "aluno/buscar",
			data: "valorBusca="+valorBusca,
			success: function(dados){

				dados = JSON.parse(dados);
				$("#listaAlunos").html(SALAARCOIRIS.aluno.exibir(dados));
				console.log(dados);


			},
			error: function(info){
				var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.aluno.exibir = function(listaDeAlunos){
			var tabela = 
				"<br>"+
				"<table style='margin:auto;'>"+
				"<tr>"+	
				"<th> Nome</th>"+
				"<th> CPF</th>"+				
				"<th> Data nascimento</th>"+
				"<th> E-mail</th>"+
				"<th class='acoes'>Editar</th>"+
				"<th class='acoes'>Apagar</th>"+
				"</tr>";

			if(listaDeAlunos != undefined && listaDeAlunos.length >0){


				for(var i=0; i<listaDeAlunos.length; i++){
					tabela+="<tr>"+
					"<td>"+listaDeAlunos[i].nomeAluno+"</td>"+
					"<td>"+listaDeAlunos[i].cpfAluno+"</td>"+
					"<td>"+listaDeAlunos[i].dataNasc+"</td>"+
					"<td>"+listaDeAlunos[i].email+"</td>"+					
					"<td>"+
					"<a onclick=\"SALAARCOIRIS.aluno.alterarA('"+listaDeAlunos[i].idAluno+"')\"> <img src='css/img/edit.png' alt='Editar'></a>" +
					"</td>"+
					"<td>"+
					"<a onclick=\"SALAARCOIRIS.aluno.deletarA('"+listaDeAlunos[i].idAluno+"')\"><img src='css/img/delete.png' alt='Apagar'></a>" +
					"</td>"+
					"</tr>";

				}

			}else if (listaDeAlunos == ""){
				tabela += "<tr><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</table>";
			return tabela;

			$("#listaAlunos").html(tabela);
		}	
	}

	SALAARCOIRIS.aluno.buscarAluno();

	SALAARCOIRIS.aluno.deletarA = function(idAluno){
		
		$.ajax({
			type:"DELETE",
			url: SALAARCOIRIS.PATH +"aluno/excluir/"+idAluno,
			success: function(msg){
				SALAARCOIRIS.aluno.buscarAluno();
				console.log(msg);
			},
			error: function(info){
				console.log("Erro ao excluir livro: " + info.status + " - " + info.statusText);
			}
		});
	}
	
	SALAARCOIRIS.aluno.alterarA = function(idAluno){
		document.getElementById('id01').style.display='block';
		
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"aluno/checkIdA",
			data: "idAluno="+idAluno,
			success: function(aluno){
				document.frmEditaAluno.idAluno.value = aluno.idAluno;
				document.frmEditaAluno.nomeAluno.value = aluno.nomeAluno;
				document.frmEditaAluno.cpfAluno.value = aluno.cpfAluno;
				document.frmEditaAluno.email.value = aluno.email;
				document.frmEditaAluno.nascAluno.value = aluno.nascAluno;
				
				if (!aluno.idResp==0){
					var id = aluno.idResp;
					
					SALAARCOIRIS.aluno.alterarResp(id);
				}
				
				
				console.log(aluno);
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}

		});	
	}
	SALAARCOIRIS.aluno.alterarResp = function(id){
		console.log(id);
		
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"responsavel/checkIdR",
			data: "id="+id,
			success: function(responsavel){
				console.log(responsavel);
				
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}

		});	
	}
});
