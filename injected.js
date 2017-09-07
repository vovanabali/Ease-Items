//Выполняеться после загрузки страницы
function injected_main() {
	setInterval(al, 3000);
	setInterval(refresh, 120000);
 	//document.getElementById('auto_select').click()
	//document.getElementById('trade-btn').click()
}

var serhtItem = "M4A4 | Poseidon (Field-Tested),★ StatTrak™ Huntsman Knife | Urban Masked (Field-Tested),★ Butterfly Knife | Marble Fade (Factory New),★ Karambit | Autotronic (Battle-Scarred),StatTrak™ AK-47 | Bloodsport (Field-Tested),★ Karambit | Autotronic (Field-Tested),StatTrak™ AK-47 | Fuel Injector (Minimal Wear),★ Huntsman Knife | Slaughter (Field-Tested),★ Falchion Knife | Tiger Tooth (Factory New),★ M9 Bayonet | Bright Water (Factory New),★ M9 Bayonet | Scorched (Battle-Scarred),StatTrak™ AWP | Lightning Strike (Factory New),★ Falchion Knife | Slaughter (Field-Tested),★ Bayonet | Autotronic (Battle-Scarred),★ M9 Bayonet | Crimson Web (Battle-Scarred),★ Bayonet | Lore (Field-Tested),★ Karambit | Freehand (Field-Tested),★ Karambit | Lore (Field-Tested),AWP | Dragon Lore (Battle-Scarred),StatTrak™ AK-47 | Bloodsport (Minimal Wear),★ Shadow Daggers | Crimson Web (Minimal Wear),★ M9 Bayonet | Black Laminate (Minimal Wear),★ Karambit | Slaughter (Field-Tested),★ Karambit | Freehand (Factory New),★ Huntsman Knife | Marble Fade (Factory New),★ Moto Gloves | Boom! (Minimal Wear),★ Bayonet | Slaughter (Field-Tested),★ Karambit | Lore (Factory New),★ Bayonet | Autotronic (Field-Tested),★ M9 Bayonet | Freehand (Minimal Wear),M4A4 | Howl (Field-Tested)";
var serchItems = serhtItem.split(',');
//Поиск необходимого скина
function al(){

	//Поиск всех итемов
	var items = document.getElementById('inventory_bot').childNodes;

	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < serchItems.length; j++) {
			//Если тем совподает с одним из необходимых
			if(items[i].getAttribute('hash')==serchItems[j]){
			var id = items[i].getAttribute('id');
			var cost = items[i].getAttribute('cost');
			pickItem(id);
		}
		}
	}
}
//Проверка автоподбора
function checkAut(currentItem){
	var go = false;
	var currentBot = document.getElementById("currency_bot").innerHTML;
	var currentMy = document.getElementById("currency_user").innerHTML;
	if(currentBot-currentItem < 30) go = true;
	return go;
}

//Выполняеться если скин найден
function pickItem(idItem){
		document.getElementById(idItem).click();
		document.getElementById('auto_select').click();
		document.getElementById('trade-btn').click();

		//setTimeout(refresh,10000);
}

//Выполнить после того как забрал скин
function refresh(){
	//document.getElementsByClassName("modal__close")[0].click();
	//document.getElementById("refresh_user_inventory").click();
	document.getElementById("refresh_bot_inventory").click();
}
