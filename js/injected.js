function injected_main() {

	 setInterval(al, 3000);

 	//document.getElementById('auto_select').click()
	//document.getElementById('trade-btn').click()
}

var serhtItem = "★ Gut Knife | Fade (Minimal Wear)";
function al(){
	var items = document.getElementById('inventory_bot').childNodes;
	
	alert(items.length);

	/*for (var i = 0; i < items.length; i++) {
		if(items[i].getAttribute('hash')==serhtItem){
			var id = items[i].getAttribute('id');
			document.getElementById(id).click();
			document.getElementById('auto_select').click()
			document.getElementById('trade-btn').click()
		}
	}*/
}