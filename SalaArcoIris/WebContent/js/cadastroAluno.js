function verificarSelectResponsavel(){
	var input = document.getElementById('validaResponsavel').value;

	console.log(input);

	if(input == "2" ){ 
		document.querySelectorAll('.input-responsaveis').forEach(fieldset => fieldset.disabled = false);
	}else{
		document.querySelectorAll('.input-responsaveis').forEach(fieldset => fieldset.disabled = true);
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
		
		aluno.nomeAluno = document.frmAluno.nomeAluno.value;
		aluno.cpfAluno = document.frmAluno.cpfAluno.value;
		aluno.email = document.frmAluno.email.value;
		aluno.nascAluno = document.frmAluno.nascAluno.value;
		
		// Converte Nome para primeira letra maiúscula
		aluno.nomeAluno = aluno.nomeAluno.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
		
		if (document.frmAluno.validaResponsavel.value == 2){
			codigoResp = Math.floor(Math.random() * 1000000);
			document.getElementById("codigoResp").value=codigoResp;
		}

		aluno.idResp = codigoResp;		
		
		if (validarCampos() === true){	
		$.ajax({
			type: "POST",
			url: SALAARCOIRIS.PATH + "aluno/inserirA",
			data:JSON.stringify(aluno),
			success:function(msg){
				console.log(msg);
				SALAARCOIRIS.aluno.cadastrarResponsavel();
				location.href="editar.html";				
			},
			error:function(info){
				alert('erro');
				console.log("Erro ao cadastrar um novo aluno: "+ info.status + " - "+ info.statusText);	
			}
			
		});
		}
	}
	
	validarCpf = function(){
		
		var cpf = document.frmAluno.cpfAluno.value;
		
		cpf = cpf.replace(/\D/g, '');
		   
		if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
	    
	    var result = true;
	    
	    [9,10].forEach(function(j){
	        var soma = 0, r;
	        cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
	            soma += parseInt(e) * ((j+2)-(i+1));
	        });
	        r = soma % 11;
	        r = (r <2)?0:11-r;
	        if(r != cpf.substring(j, j+1)) result = false;
	    });
	    return result;
	}
	
	
	 validarCampos = function(){
		var validacao = true;
		
		var aluno = new Object();
			
		aluno.nomeAluno = document.frmAluno.nomeAluno.value;
		aluno.cpfAluno = document.frmAluno.cpfAluno.value;
		aluno.email = document.frmAluno.email.value;
		aluno.nascAluno = document.frmAluno.nascAluno.value;
			
		var nomeResp = document.frmAluno.nomeResponsavel.value;
		var nascResp = document.frmAluno.nascResponsavel.value;
		var selectResp = document.getElementById('validaResponsavel').value; 
		var expRegNome = new RegExp(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/);
		var expRegEmail = new RegExp(/^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i);
		
		validarCpf();
		
//		if (aluno.cpfAluno==""||aluno.email==""||aluno.nascAluno=="")
//		{
//			alert('Você não pode editar um campo e deixá-lo em branco!!!')
//			validacao = false;
//		}else if (!expRegNome.test(aluno.nomeAluno)){
//			alert('Nome inválido!!!')
//			document.frmAluno.nomeAluno.focus();
//			validacao = false;
//	
//		}else if (validarCpf() === false){
//			alert('CPF inválido!!!')
//			document.frmAluno.cpfAluno.focus();
//			validacao = false;
			console.log(aluno.email)
		/*}else*/ if (!expRegEmail.test(aluno.email)){
			alert('E-mail inválido!!!')
			document.frmAluno.email.focus();
			validacao = false;
		}
//		else if (aluno.nascAluno=="x"){
//			
//		}else if (selectResp == 2 && nomeResp == "" || 
//			selectResp == 2 && nascResp == "")
//		{		
//			alert('Se você selecionou que possui responsável, precisa preencher todos os campos!!!')
//			validacao = false;
//		}else if (selectResp == 2 && selectResp =="x"/* e menor de idade */)
//		{
//			
//		}else if (selectResp == 1)
//		{
//			alert('Selecione uma opção para responsável!!!')
//			validacao = false;
//		}
		
		return validacao;
	}
	

	// INSERT - resp

	SALAARCOIRIS.aluno.cadastrarResponsavel = function(){

		if (document.frmAluno.validaResponsavel.value == 2){
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
					console.log("Erro ao cadastrar um novo aluno com responsável: "+ info.status + " - "+ info.statusText);	
				}
			});
		}
	}


	// READ --

	SALAARCOIRIS.aluno.buscarAluno = function(){
		var valorBusca = $("#buscaAluno").val();
		
		$.ajax({
			type: "GET",
			url: SALAARCOIRIS.PATH + "aluno/buscarA",
			data: "valorBusca="+valorBusca,
			success: function(dados){
				dados = JSON.parse(dados);
				$("#listaAlunos").html(SALAARCOIRIS.aluno.exibir(dados));
				
			},
			error: function(info){
				var a="Erro ao consultar os cadastros de aluno: "+info.status+" - "+info.statusText;
				var b = a.replace(/'/g, '');				
			}
		});

		SALAARCOIRIS.aluno.exibir = function(listaDeAlunos){
			var tabela = 
				"<br>"+
				"<table class='table'>"+
					"<thead>"+
						"<tr>"+	
							"<th scope='col'> Nome</th>"+
							"<th scope='col'> CPF</th>"+
							"<th scope='col'>Editar</th>"+
							"<th scope='col'>Apagar</th>"+
						"</tr>"+
					"</thead>"+
					"<tbody>";

			if(listaDeAlunos != undefined && listaDeAlunos.length >0){

				
				for(var i=0; i<listaDeAlunos.length; i++){
					tabela+="<tr>"+
						"<th scope='row'>"+listaDeAlunos[i].nomeAluno+"</th>"+
						"<td>"+listaDeAlunos[i].cpfAluno+"</td>"+					
						"<td>"+"<a class='btn btn-warning' onclick=\"SALAARCOIRIS.aluno.exibirEditA('"+listaDeAlunos[i].idAluno+"')\">Editar</a>" +"</td>"+
						"<td>"+"<a class='btn btn-danger' onclick=\"SALAARCOIRIS.aluno.deletarA('"+listaDeAlunos[i].idAluno+"')\">Apagar</a>" +"</td>"+
					"</tr>";

				}

			}else if (listaDeAlunos == ""){
				tabela += "<tr scope='row'><td colspan='6'>Nenhum registro encontrado</td></tr>";
			}
			tabela +="</tbody" +
					"</table>";
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
			},
			error: function(info){
				console.log("Erro ao excluir livro: " + info.status + " - " + info.statusText);
			}
		});
	}
	
	SALAARCOIRIS.aluno.exibirEditA = function(idAluno){
		
		document.getElementById('id01').style.display='block';
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"aluno/checkIdA",
			data: "idAluno="+idAluno,
			success: function(aluno){
				document.frmEditaAluno.idAluno.value = aluno.idAluno;
				document.frmEditaAluno.idResponsavel.value = aluno.idResp;
				document.frmEditaAluno.nomeAluno.value = aluno.nomeAluno;
				document.frmEditaAluno.cpfAluno.value = aluno.cpfAluno;
				document.frmEditaAluno.email.value = aluno.email;
				document.frmEditaAluno.nascAluno.value = aluno.nascAluno;
				
				$.ajax({
					type:"GET",
					url: SALAARCOIRIS.PATH +"responsavel/checkIdR",
					data: "idResponsavel="+aluno.idResp,
					success: function(responsavel){
						document.frmEditaAluno.nomeResponsavel.value = "";
						document.frmEditaAluno.nascResponsavel.value = "";
					},
					error: function(info){
						console.log("erro");
					}

				});	
				
				if (aluno.idResp>0){
					var id = aluno.idResp;
					SALAARCOIRIS.aluno.exibirEditResp(id);
				}else{
					document.frmEditaAluno.validaResponsavel.value = 3;
				}
				
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}
			
		});	
		
	}
	SALAARCOIRIS.aluno.exibirEditResp = function(id){
		
		$.ajax({
			type:"GET",
			url: SALAARCOIRIS.PATH +"responsavel/checkIdR",
			data: "idResponsavel="+id,
			success: function(responsavel){
//				document.frmEditaAluno.idResponsavel.value = responsavel.idResponsavel;
				document.frmEditaAluno.validaResponsavel.value = 2;
				verificarSelectResponsavel();
				document.frmEditaAluno.nomeResponsavel.value = responsavel.nomeResp;
				document.frmEditaAluno.nascResponsavel.value = responsavel.nascResp;
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}

		});	
	}
	SALAARCOIRIS.aluno.alterarA= function(){
		
		var aluno = new Object();
		aluno.idAluno = document.frmEditaAluno.idAluno.value;
		aluno.idResponsavel = document.frmEditaAluno.idResponsavel.value;
		aluno.nomeAluno = document.frmEditaAluno.nomeAluno.value;
		aluno.cpfAluno = document.frmEditaAluno.cpfAluno.value;
		aluno.email = document.frmEditaAluno.email.value;
		aluno.nascAluno = document.frmEditaAluno.nascAluno.value;
		
		var nomeResp = document.frmEditaAluno.nomeResponsavel.value;
		var nascResp = document.frmEditaAluno.nascResponsavel.value;
		var selectResp = document.getElementById('validaResponsavel').value;
		
		if (aluno.nomeAluno==""||aluno.cpfAluno==""||aluno.email==""||aluno.nascAluno=="")
		{
			alert('Você não pode editar um campo e deixá-lo em branco!!!')
		}
		else if (selectResp == 2 && nomeResp == "" || 
			selectResp == 2 && nascResp == "")
		{		
			alert('Se você selecionou que possui responsável, precisa preencher todos os campos!!!')
		}
		else if (selectResp == 1)
		{
			alert('Selecione uma opção para responsável!!!')	
		}
		else{
		
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "aluno/alterarA",
				data:JSON.stringify(aluno),
				success: function(msg){
					SALAARCOIRIS.aluno.buscarAluno();
					
					console.log("Aluno alterado com sucesso!")
					console.log(aluno.idResponsavel)
					
					if (aluno.idResponsavel>0){
						var id = aluno.idResponsavel;
						
						SALAARCOIRIS.aluno.alterarResp(id);
					}
					window.location.href="editar.html";
					
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
		}
	}
	
	SALAARCOIRIS.aluno.alterarResp= function(id){
		
		var responsavel = new Object();
		
		responsavel.idResponsavel = document.frmEditaAluno.idResponsavel.value;
		responsavel.nomeResp = document.frmEditaAluno.nomeResponsavel.value;
		responsavel.nascResp = document.frmEditaAluno.nascResponsavel.value;
		
		$.ajax({
			type:"PUT",
			url: SALAARCOIRIS.PATH + "responsavel/alterarR",
			data:JSON.stringify(responsavel),
			success: function(msg){
				SALAARCOIRIS.aluno.buscarAluno();
				
				console.log("Responsável alterado com sucesso!")
				
			},
			error: function(info){
				console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
			}
		});
	}
	
	
});