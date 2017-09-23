$.get(chrome.extension.getURL('/injected.js'), 
	function(data) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.innerHTML = data;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
);
$.get(chrome.extension.getURL('/injected.css'),
	function(data) {
		document.getElementsByTagName("html")[0].childNodes[0].innerHTML = data;
	}
);