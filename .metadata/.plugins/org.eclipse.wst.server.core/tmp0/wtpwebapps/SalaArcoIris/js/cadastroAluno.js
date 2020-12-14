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
			url: SALAARCOIRIS.PATH + "aluno/inserir",
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
	
	SALAARCOIRIS.aluno.cadastrarResponsavel = function(){
		
		if (document.frmAluno.selecao.value == 2){
			var responsavel = new Object();
			
			responsavel.idResp = document.getElementById("codigoResp").value;
			responsavel.nomeResp = document.frmAluno.nomeResponsavel.value;
			responsavel.nascResp = document.frmAluno.nascResponsavel.value;
			
					
			$.ajax({
				type: "POST",
				url: SALAARCOIRIS.PATH + "responsavel/inserir",
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
	
	
});
