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
		
		var aluno = new Object();
		aluno.nomeAluno = document.frmAluno.nome.value;
		aluno.cpfAluno = document.frmAluno.cpf.value;
		aluno.email = document.frmAluno.email.value;
		aluno.senha = document.frmAluno.senha.value;
		aluno.nascAluno = document.frmAluno.datepicker.value;
		//console.log(aluno);
		
		$.ajax({
			type: "POST",
			url: SALAARCOIRIS.PATH + "aluno/inserir",
			data:JSON.stringify(aluno),
			success:function(msg){
				console.log(msg);
			},
			error:function(info){
				Swal.fire("Erro ao cadastrar um novo aluno: "+ info.status + " - "+ info.statusText);	
			}
		});	
	}
	
	
});