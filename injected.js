
var serhtItem = "★ Huntsman Knife | Crimson Web (Well-Worn),M4A1-S | Master Piece (Factory New),AWP | BOOM (Factory New),M4A4 | Poseidon (Field-Tested),★ Bowie Knife | Ultraviolet (Minimal Wear),StatTrak™ P2000 | Fire Elemental (Factory New),★ Butterfly Knife | Marble Fade (Factory New),★ Gut Knife | Bright Water (Minimal Wear),★ StatTrak™ Huntsman Knife | Urban Masked (Field-Tested),★ Butterfly Knife | Damascus Steel (Factory New),★ StatTrak™ M9 Bayonet | Boreal Forest (Field-Tested),★ StatTrak™ Flip Knife | Night (Field-Tested),★ Bowie Knife | Rust Coat (Battle-Scarred),★ Huntsman Knife | Ultraviolet (Field-Tested),★ Huntsman Knife | Tiger Tooth (Factory New),M4A4 | Poseidon (Minimal Wear),★ Bowie Knife | Marble Fade (Factory New),★ Bayonet | Autotronic (Minimal Wear),★ Karambit | Case Hardened (Well-Worn),★ Karambit | Autotronic (Field-Tested),M4A1-S | Knight (Factory New),★ Falchion Knife | Tiger Tooth (Factory New),AWP | Dragon Lore (Battle-Scarred),★ M9 Bayonet | Autotronic (Minimal Wear),★ Bayonet | Autotronic (Field-Tested),★ Karambit | Lore (Field-Tested),★ Bowie Knife | Crimson Web (Minimal Wear),★ Karambit | Slaughter (Field-Tested),★ Sport Gloves | Hedge Maze (Well-Worn),★ Karambit | Black Laminate (Minimal Wear),★ Karambit | Freehand (Field-Tested),StatTrak™ AWP | Oni Taiji (Minimal Wear),★ Huntsman Knife | Damascus Steel (Field-Tested),★ Bloodhound Gloves | Snakebite (Field-Tested),StatTrak™ AK-47 | Fuel Injector (Field-Tested),★ Butterfly Knife | Tiger Tooth (Factory New),★ Karambit | Lore (Factory New)";

var idInterval1 = 0;
var idInterval2 =0;
//Выполняеться после загрузки страницы
function injected_main() {
	idInterval1 = setInterval(al, 3000);
	idInterval2 = setInterval(refresh, 120000);
 	//document.getElementById('auto_select').click()
	//document.getElementById('trade-btn').click()
}

var serchItems = serhtItem.split(',');
//Поиск необходимого скина
function al(){

	//Если инвентарь прогрузился 
	if(document.getElementById('inventory_user').childNodes.length > 1){
			//Поиск всех итемов
	var items = document.getElementById('inventory_bot').childNodes;

	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < serchItems.length; j++) {
			//Если тем совподает с одним из необходимых
			if(items[i].getAttribute('hash')==serchItems[j]){
				var id = items[i].getAttribute('id');
				var cost = items[i].getAttribute('cost');
				clearInterval(idInterval1);
				clearInterval(idInterval2);
				pickItem(id);
			}
		}
	}
	}
}
//Проверка автоподбора
function checkAut(idItem){

	var count = idItem.split('|').length;
	if(idItem.split('|').length>1){
		var temp = idItem.split('|')[0]
		idItem = temp;
	};	
	var isThisItem = 'Нет';
	var itemsToTrade = document.getElementById('offer_inventory_bot').childNodes;
	for (var i = 0; i < itemsToTrade.length; i++) {
		if(itemsToTrade[i].getAttribute('id')==idItem) {
			isThisItem = 'Да';
			break;
		};
	};
	var nameItem = document.getElementById(idItem).getAttribute('hash');
	var costItem = document.getElementById(idItem).getAttribute('cost');
	var costIm = document.getElementById('currency_user').innerHTML;
	var costOwerPay = costIm - costItem;

	var responseStr = isThisItem+' , стоит: '+costItem+'$ Переплата: '+costOwerPay.toFixed(3)+'$'+' Кол-во: '+ count;

	var responseDiv = document.getElementById('trade-popup');
	responseDiv.getElementsByClassName('modal__title')[0].innerHTML = responseStr;
	responseDiv.getElementsByClassName('modal__subtitle')[0].innerHTML = nameItem;
	setTimeout(function(){alert('Фокус')},1000);
}

//Выполняеться если скин найден
function pickItem(idItem){
		document.getElementById(idItem).click();
		document.getElementById('auto_select').click();
		document.getElementById('trade-btn').click();
		checkAut(idItem);
		//setTimeout(refresh,10000);
}

//Выполнить после того как забрал скин
function refresh(){
	//document.getElementsByClassName("modal__close")[0].click();
	//document.getElementById("refresh_user_inventory").click();
	document.getElementById("refresh_bot_inventory").click();
}
