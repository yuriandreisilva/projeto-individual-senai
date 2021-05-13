function ValidaDados(){

    var senhaembase64 = btoa(document.frmLogin.senhaUsuario.value);
    document.frmLogin.senhaUsuario.value = senhaembase64;
    
    var dados = document.getElementById("email").value;
    sessionStorage.setItem('email', dados );
        
    return true;

}

function displayNone(){
	document.getElementById("exampleModal").style.display = "none";
}

