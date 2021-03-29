function ValidaDados(){

    var senhaembase64 = btoa(document.frmLogin.senhaUsuario.value);
    document.frmLogin.senhaUsuario.value = senhaembase64;

    
    
    return true;


}

function displayNone(){
	document.getElementById("exampleModal").style.display = "none";
}

