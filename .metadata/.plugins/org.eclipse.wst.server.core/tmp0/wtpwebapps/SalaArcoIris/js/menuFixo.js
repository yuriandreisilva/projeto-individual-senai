$(document).ready(function(){
	$("header").load("/SalaArcoIris/pages/fix/menuFixo.html", function() {
		$("#check").change(function() {
			if(this.checked) {
			   $(".corpo").addClass("corpo-menor");
			}else{
			   $(".corpo").removeClass("corpo-menor");
			}
		});
	});
});



	
				