if(bowser && (bowser.msie && bowser.version < 9.0)) {
	var url = document.URL;
	if (url.indexOf('preencherFormularioPublico') != -1) {
		var hash = url.substring(url.lastIndexOf("/"));
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","public/trafego" + hash + "/negado",true);
		xmlhttp.send();
	}
	window.location.href = 'view/browser';
}