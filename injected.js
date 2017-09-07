//Выполняеться после загрузки страницы

var form = "<textarea id = 'tx' style='background-color:black; color:white; height: 156px; width: 100%'></textarea><br><select id='sel' style='font-size: 30px;font-weight: bold;'><option><h1>Старт</h1></option><option><h1>Стоп</h1></option></select>";

function injected_main() {
	setInterval(al, 3000);
	setInterval(refresh, 120000);
	var div = document.createElement('div');
	div.style="position: absolute; z-index: 1000000; width:20%;";
	div.innerHTML = form;
	document.getElementsByClassName('main')[0].appendChild(div);
 	//document.getElementById('auto_select').click()
	//document.getElementById('trade-btn').click()
}

var serhtItems;
//Поиск необходимого скина
function al(){
	//Если необходимо парсить
	if(check()){
		serchItems = loadListItems();
		//Поиск всех итемов
		var items = document.getElementById('inventory_bot').childNodes;

		var length = 200;
		if(items.length<200) length = items.length;
		for (var i = 0; i < items.length; i++) {
				//Если айтем совподает с одним из необходимых
				if(serchItems.indexOf(items[i].getAttribute("hash"))>=0){
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

//Проверяет необходимо ли парсить
function check(){
	var ch = false;
	var el = document.getElementById('sel');
	if(el.value == "Старт") ch = true;
	return ch;
}

//Загружает список всех итемов из tx
function loadListItems(){
	return document.getElementById('tx').value;
}