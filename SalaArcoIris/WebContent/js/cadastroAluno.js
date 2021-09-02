function verificarSelectResponsavel(){
	var input = document.getElementById('validaResponsavel').value;

	console.log(input);

	if(input == "ativo" ){ 
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
	
			if (document.frmAluno.statusResp.value == 'inativo'){
				aluno.nomeResp = document.frmAluno.nomeResp.value = "null";
				aluno.dataNascResp = document.frmAluno.dataNascResp.value = "0000-00-00";
			}
			
			if (validarCampos()){	
				$.ajax({
					type: "POST",
					url: SALAARCOIRIS.PATH + "aluno/inserirA",
					data:JSON.stringify(aluno),
					success:function(retorno){
						if(retorno === "true"){
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
			//document.frmAluno.nomeAluno.focus();
			
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
					                .append($('<td>'+'<a class="btn btn-warning" onclick=\'SALAARCOIRIS.aluno.exibirEditA("'+listaDeAlunos[i].idAluno+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">'+
					                		  '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>'+ 
				                			  '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>'+
				                			  '</svg></a>' +'</td>').append())
					                .append($('<td>'+'<a class="btn btn-danger" onclick=\'SALAARCOIRIS.aluno.deletarA("'+listaDeAlunos[i].idAluno+'")\'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">'+
					                		  '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>'+
				                			  '<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>'+
				                			'</svg></a>' +'</td>').append())
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
			tabela +="</tbody" +
					"</table>";
			
			
			return tabela;

			$("#listaAlunos").html(tabela);
		}	
				
	}
	SALAARCOIRIS.aluno.buscarAluno();

	
		
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
//				document.frmEditaAluno.senha.value = aluno.senha;
				
				document.frmEditaAluno.statusResp.value = aluno.statusResp;
				document.frmEditaAluno.nomeResp.value = aluno.nomeResp;
				document.frmEditaAluno.dataNascResp.value = aluno.dataNascResp;
				
				verificarSelectResponsavel();
				
			},
			error: function(info){
				console.log("Erro ao buscar cadastro para responsável: "+info.status+" - "+info.statusText);
			}
			
		});	
		
	}
	
	SALAARCOIRIS.aluno.deletarA = function(idAluno){
			
			$.ajax({
				type:"DELETE",
				url: SALAARCOIRIS.PATH +"aluno/excluir/"+idAluno,
				success: function(msg){
					console.log(msg);
					if (msg === '"Erro ao excluir Aluno!"'){
						alertError('Não é possível remover este aluno!')
					}else{
						msgSuccessSimple('Aluno removido')
						SALAARCOIRIS.aluno.buscarAluno();
					}
				},
				error: function(info){
					console.log("Erro ao excluir livro: " + info.status + " - " + info.statusText);
					alertError('Não é possível remover este aluno!')
				}
			});
		}
	
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
					exibirMsgSuccessRedirecionar();
				},
				error: function(info){
					console.log("Erro ao editar cadastro: "+ info.status+" - "+info.statusText);
				}
			});
		}
	}
});