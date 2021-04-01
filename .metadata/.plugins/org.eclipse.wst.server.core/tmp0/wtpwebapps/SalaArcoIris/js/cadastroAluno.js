function verificarSelectResponsavel(){
	var input = document.getElementById('validaResponsavel').value;

	console.log(input);

	if(input == "ativo" ){ 
		document.querySelectorAll('.input-responsaveis').forEach(fieldset => fieldset.disabled = false);
	}else{
		document.querySelectorAll('.input-responsaveis').forEach(fieldset => fieldset.disabled = true);
	}  	
	
};

function exibirMsgSuccessRedirecionar(msg){
	// Um tipo de alert estilzado, importado para ficar mais interativo
	Swal.fire({
		  icon: 'success',
		  title: 'Processo realizado com sucesso!',
		  showConfirmButton: false,
		  timer: 1500
		})
	// Função para atrasar o window.location (redirecionamento para listagem de cadastros)		
	setTimeout(func, 1500);
	function func() {
		location.href="editar.html";
	}
}

alertError = function(text){
	Swal.fire({
		icon: 'error',
		title: 'Oops...',
		text: text,
	  })
}

SALAARCOIRIS = new Object();

SALAARCOIRIS.aluno = new Object();

$(document).ready (function(){
	SALAARCOIRIS.PATH = "/SalaArcoIris/rest/"

		// INSERT - Aluno
		SALAARCOIRIS.aluno.cadastrarAluno = function(){

//		var codigoResp = 0;

		var aluno = new Object();
		
		aluno.nomeAluno = document.frmAluno.nomeAluno.value;
		aluno.cpfAluno = document.frmAluno.cpfAluno.value;
		aluno.email = document.frmAluno.email.value;
		aluno.nascAluno = document.frmAluno.nascAluno.value;
		aluno.senha = document.frmAluno.senha.value;
		
		aluno.statusResp = document.frmAluno.statusResp.value;
		aluno.nomeResp = document.frmAluno.nomeResp.value;
		aluno.dataNascResp = document.frmAluno.dataNascResp.value;
		
		// Converte Nome para primeira letra maiúscula
		aluno.nomeAluno = aluno.nomeAluno.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
		aluno.nomeResp = aluno.nomeResp.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });

		// if (document.frmAluno.validaResponsavel.value == "ativo"){
		// 	codigoResp = Math.floor(Math.random() * 1000000);
		// 	document.getElementById("codigoResp").value=codigoResp;
		// }

		// aluno.idResponsavel = codigoResp;	
				
		if (validarCampos()){	
		$.ajax({
			type: "POST",
			url: SALAARCOIRIS.PATH + "aluno/inserirA",
			data:JSON.stringify(aluno),
			success:function(retorno){
				if(retorno === "true"){
					// SALAARCOIRIS.aluno.cadastrarResponsavel();
					exibirMsgSuccessRedirecionar();
				}else {
					alertError('Provavelmente este e-mail ou CPF já foi cadastrado!')
				}
			},
			error:function(info){
				alertError('Erro ao cadastrar!')
				console.log("Erro ao cadastrar um novo aluno: "+ info.status + " - "+ info.statusText);	
			}
		});
		}
	}
	
	validarCpf = function(){
		
		var cpf = document.getElementById('validaCpf').value;
		
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

	validarIdade = function(){
	   var idadeFinal = true;
	   var selectResp = document.getElementById('validaResponsavel').value;
	   var data = document.getElementById('validaNascimento').value; // pega o valor do input
	   data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
	   var data_array = data.split("-"); // quebra a data em array
	   
	   // para o IE onde será inserido no formato dd/MM/yyyy
	   if(data_array[0].length != 4){
	      data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
	   }
	   
	   // comparo as datas e calculo a idade
	   var hoje = new Date();
	   var nasc  = new Date(data);
	   var idade = hoje.getFullYear() - nasc.getFullYear();
	   var m = hoje.getMonth() - nasc.getMonth();
	   if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
	   
	   if (idade < 18 && selectResp != "ativo"){
		   idadeFinal = false;
	   }
	
	   if(idade >= 18 && idade <= 60){
		   idadeFinal = true;
	   }
	   
	   // se for maior que 60 não vai acontecer nada!
	   return idadeFinal;
	}
	
	validarIdadeResponsavel = function(){
		   var idadeFinalResponsavel = true;
		   var selectResp = document.getElementById('validaResponsavel').value;
		   var data = document.getElementById('validaNascResposnavel').value; // pega o valor do input
		   data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
		   var data_array = data.split("-"); // quebra a data em array
		   
		   // para o IE onde será inserido no formato dd/MM/yyyy
		   if(data_array[0].length != 4){
		      data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
		   }
		   
		   // comparo as datas e calculo a idade
		   var hoje = new Date();
		   var nasc  = new Date(data);
		   var idade = hoje.getFullYear() - nasc.getFullYear();
		   var m = hoje.getMonth() - nasc.getMonth();
		   if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
		   
		   if(idade < 18){
			   idadeFinalResponsavel = false;
		   }
		
		   if(idade >= 18 && idade <= 60){
			   idadeFinalResponsavel = true;
		   }
		   
		   // se for maior que 60 não vai acontecer nada!
		   return idadeFinalResponsavel;
		}		
	
	 validarCampos = function(){
		var validacao = true;
			
		nomeAluno = document.getElementById('validaNome').value;
		cpfAluno = document.getElementById('validaCpf').value;
		email = document.getElementById('validaEmail').value;
		senha = document.getElementById('validaSenha').value;
		nascAluno = document.getElementById('validaNascimento').value;
		nomeResp = document.getElementById('validaNomeResp').value;
		nascResp = document.getElementById('validaNascResposnavel').value;
		
		var selectResp = document.getElementById('validaResponsavel').value; 
		var expRegNome = new RegExp(/^((\b[A-zÀ-ú']{2,40}\b)\s*){2,}$/);
		var expRegEmail = new RegExp(/^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i);	
		var expRegSenha = new RegExp(/^(?=.*\d)[0-9\d]{4}$/);
	
		
		if (!expRegNome.test(nomeAluno)){
			alertError('Nome inválido!')
			document.frmAluno.nomeAluno.focus();
			validacao = false;
	
		}else if (!validarCpf()){
			alertError('CPF inválido!')
			document.frmAluno.cpfAluno.focus();
			validacao = false;
			
		}else if (!expRegEmail.test(email)){
			alertError('E-mail inválido!')
			document.frmAluno.email.focus();
			validacao = false;
		}else if(!expRegSenha.test(senha)){
			alertError('Senha inválida, apenas 4 números!')
			document.frmAluno.senha.focus();
		}
		else if (!validarIdade() || nascAluno == ""){
			alertError('Idade inválida ou menor de idade precisa ter responsável!')
			document.frmAluno.nascAluno.focus();
			validacao = false;			
		}
		else if (selectResp == "ativo" && !expRegNome.test(nomeResp))
		{		
			alertError('Nome do responsável inválido!')
			document.frmAluno.nomeResp.focus();
			validacao = false;
		}else if (!validarIdadeResponsavel() && selectResp == "ativo" || nascResp == "" && selectResp == "ativo" )
		{
			alertError('O responsável precisa ser maior de idade!')
			document.frmAluno.dataNascResp.focus();
			validacao = false;
		}else if (selectResp == 0)
		{
			alertError('Selecione uma opção para responsável!')
			document.frmAluno.select.focus();
			validacao = false;
		}
		return validacao;
	}
	

	// INSERT - resp

	// SALAARCOIRIS.aluno.cadastrarResponsavel = function(){

	// 	if (document.frmAluno.validaResponsavel.value == "ativo"){
	// 		var responsavel = new Object();

	// 		responsavel.idResponsavel = document.getElementById("codigoResp").value;
	// 		responsavel.nomeResp = document.frmAluno.nomeResp.value;
	// 		responsavel.nascResp = document.frmAluno.dataNascResp.value;

	// 		responsavel.nomeResp = responsavel.nomeResp.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });

	// 		$.ajax({
	// 			type: "POST",
	// 			url: SALAARCOIRIS.PATH + "responsavel/inserirR",
	// 			data:JSON.stringify(responsavel),
	// 			success:function(msg){
	// 				console.log(msg);					
	// 			},
	// 			error:function(info){
	// 				console.log("Erro ao cadastrar um novo aluno com responsável: "+ info.status + " - "+ info.statusText);	
	// 			}
	// 		});
	// 	}
	// }


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
				tabela += "<tr scope='row'><td colspan='6' style='text-align: center;'>Nenhum registro encontrado</td></tr>";
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
	
	// SALAARCOIRIS.aluno.deletarR = function(idResponsavel){
		
	// 	$.ajax({
	// 		type:"DELETE",
	// 		url: SALAARCOIRIS.PATH +"responsavel/excluir/"+idResponsavel,
	// 		success: function(msg){
	// 			SALAARCOIRIS.aluno.buscarAluno();
	// 		},
	// 		error: function(info){
	// 			console.log("Erro ao excluir responsável: " + info.status + " - " + info.statusText);
	// 		}
	// 	});
	// }
	
	SALAARCOIRIS.aluno.exibirEditA = function(idAluno){
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
				document.frmEditaAluno.senha.value = aluno.senha;
				
				document.frmEditaAluno.statusResp.value = aluno.statusResp;
				document.frmEditaAluno.nomeResp.value = aluno.nomeResp;
				document.frmEditaAluno.dataNascResp.value = aluno.dataNascResp;
				
				verificarSelectResponsavel();
				// $.ajax({
				// 	type:"GET",
				// 	url: SALAARCOIRIS.PATH +"responsavel/checkIdR",
				// 	data: "idResponsavel="+aluno.idResponsavel,
				// 	success: function(responsavel){
				// 		document.frmEditaAluno.nomeResp.value = "";
				// 		document.frmEditaAluno.dataNascResp.value = "";
				// 	},
				// 	error: function(info){
				// 		console.log("erro");
				// 	}

				// });	
				
				// if (aluno.idResponsavel>0){
				// 	var id = aluno.idResponsavel;
				// 	SALAARCOIRIS.aluno.exibirEditResp(id);
				// }else{
				// 	document.frmEditaAluno.validaResponsavel.value = "inativo";
				// }
				
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}
			
		});	
		
	}
	// SALAARCOIRIS.aluno.exibirEditResp = function(id){
		
	// 	$.ajax({
	// 		type:"GET",
	// 		url: SALAARCOIRIS.PATH +"responsavel/checkIdR",
	// 		data: "idResponsavel="+id,
	// 		success: function(responsavel){
	// 			verificarSelectResponsavel();
	// 			document.frmEditaAluno.nomeResp.value = responsavel.nomeResp;
	// 			document.frmEditaAluno.dataNascResp.value = responsavel.nascResp;
	// 		},
	// 		error: function(info){
	// 			console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
	// 		}

	// 	});	
	// }
	SALAARCOIRIS.aluno.alterarA= function(){
		
		var aluno = new Object();
		aluno.idAluno = document.frmEditaAluno.idAluno.value;
		aluno.nomeAluno = document.frmEditaAluno.nomeAluno.value;
		aluno.cpfAluno = document.frmEditaAluno.cpfAluno.value;
		aluno.email = document.frmEditaAluno.email.value;
		aluno.nascAluno = document.frmEditaAluno.nascAluno.value;

		aluno.statusResp = document.frmEditaAluno.statusResp.value;
		aluno.nomeResp = document.frmEditaAluno.nomeResp.value;
		aluno.dataNascResp = document.frmEditaAluno.dataNascResp.value;
		
		var selectResp = document.getElementById('validaResponsavel').value;
		
		aluno.nomeAluno = aluno.nomeAluno.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
		aluno.nomeResp = aluno.nomeResp.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
		
		if (validarCampos()){
			$.ajax({
				type:"PUT",
				url: SALAARCOIRIS.PATH + "aluno/alterarA",
				data:JSON.stringify(aluno),
				success: function(msg){
					SALAARCOIRIS.aluno.buscarAluno();
					
					// if (aluno.idResponsavel>0){
					// 	var id = aluno.idResponsavel;
					// 	SALAARCOIRIS.aluno.alterarResp(id);
					// }
					exibirMsgSuccessRedirecionar();
					
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
		}
	}
	
	// SALAARCOIRIS.aluno.alterarResp= function(id){
		
	// 	var responsavel = new Object();
		
	// 	responsavel.idResponsavel = id;
	// 	responsavel.nomeResp = document.frmEditaAluno.nomeResp.value;
	// 	responsavel.nascResp = document.frmEditaAluno.dataNascResp.value;
		
	// 	responsavel.nomeResp = responsavel.nomeResp.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
		
	// 	$.ajax({
	// 		type:"PUT",
	// 		url: SALAARCOIRIS.PATH + "responsavel/alterarR",
	// 		data:JSON.stringify(responsavel),
	// 		success: function(msg){
	// 			SALAARCOIRIS.aluno.buscarAluno();
				
	// 			console.log("Responsável alterado com sucesso!")
				
	// 		},
	// 		error: function(info){
	// 			console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
	// 		}
	// 	});
	// }
	
	
});