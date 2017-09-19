
//Список для cs.money
var serhtItem = "★ Falchion Knife | Ultraviolet (Minimal Wear),★ Bowie Knife | Ultraviolet (Minimal Wear),M4A4 | Poseidon (Field-Tested),M4A4 | Poseidon (Minimal Wear),M4A4 | Poseidon (Minimal Wear),StatTrak™ AK-47 | Neon Revolution (Factory New),★ Flip Knife | Crimson Web (Minimal Wear),★ Bowie Knife | Tiger Tooth (Factory New),★ Gut Knife | Lore (Minimal Wear),★ Bowie Knife | Marble Fade (Factory New),StatTrak™ AK-47 | Case Hardened (Factory New),★ Bowie Knife | Night (Minimal Wear),★ Bayonet | Lore (Minimal Wear),★ M9 Bayonet | Crimson Web (Minimal Wear),AK-47 | Fire Serpent (Battle-Scarred),★ Flip Knife | Lore (Factory New),AK-47 | Fire Serpent (Well-Worn),★ Flip Knife | Slaughter (Field-Tested),★ StatTrak™ M9 Bayonet | Ultraviolet (Field-Tested),★ Bayonet | Autotronic (Battle-Scarred),★ Huntsman Knife | Tiger Tooth (Factory New),★ Falchion Knife | Tiger Tooth (Factory New),★ M9 Bayonet | Black Laminate (Field-Tested),★ Bayonet | Freehand (Minimal Wear)";
//Предметы для raffle
var raffleDoplers = "";
//Предметы для TSF
var tradeskinsfastITEMS="Desert Eagle | Urban DDPAT (Battle-Scarred)";
var filterMin = 0;
var filtefMax = 1;

var idInterval1 = 0;
var idInterval2 =0;

var idIntervalFromSteam = 0;

var steamWindow;

	if(location.href.indexOf("tryskins")>-1){
		if(window.name.indexOf("CheckItem")>-1){
			setTimeout(function(){soundPlay()},1);
			checkOnTrySkins();
		}
	}

	if(location.href.indexOf("raffletrades")>-1){
		console.log("Is Work");
		raffl();
	}

	if(location.href.indexOf("http://steamcommunity.com")>-1 ){
		if(window.name == "SteamTradeOffers"){
				var reLoad = true;
				var offers = document.getElementsByClassName('tradeoffer');
				if(offers.length>0){
					for (var i = 0; i < offers.length; i++) {
						var nameBot = offers[i].getElementsByClassName('tradeoffer_header')[0].innerHTML;
						var countMyItems;
						try{
							countMyItems = offers[i].childNodes[7].childNodes[7].childNodes[5].getElementsByClassName("trade_item ").length;
						}catch(err){
							countMyItems = 0
						}
						if((nameBot.indexOf("CS.MONEY")>-1) || (countMyItems==0)){
							try {
								reLoad = false;
								var offerID = offers[i].getElementsByClassName('link_overlay')[0].getAttribute("onClick").split("'")[1];
								window.open("https://steamcommunity.com/tradeoffer/"+offerID+"/",'SteamTrade',"location,width=10,height=10,top=0");
								window.close();
								break;
							} catch (err) {
								reLoad = true;
							}
						}
						else {
								reLoad = true;
						}
					}
				}
				else{
					setTimeout(function(){location.reload();},1500);
				}
				if(reLoad){
					setTimeout(function(){location.reload();},1500);
				}
		}
	}


	if(location.href.indexOf("tradeoffer")>-1 ){
		if(window.name.indexOf('SteamTrade')>-1){
			ToggleReady( true );

			try{
				document.getElementsByClassName('btn_green_white_innerfade btn_medium')[0].click();
			}catch(err){}

			ConfirmTradeOffer();
			setTimeout(function(){
				window.close();
			},1500);
		}
	}

	if(location.href.indexOf("tradeskinsfast")>=0){
		tradeskinsfast();
	}

//Выполняеться после загрузки страницы
function injected_main() {
	if(location.href == "https://cs.money/ru") {
		var nick = document.getElementsByClassName("profile__name")[0].innerHTML;
		if(nick.indexOf("cs.money")<0){
			alert("Отсутствует ник");
		}
		idInterval1 = setInterval(al, 500);
		//idInterval2 = setInterval(refresh, 4500);
	}
}

var ref = true;
var serchItems = serhtItem.split(',');
//Поиск необходимого скина
function al(){

	//Если инвентарь прогрузился 
	if(document.getElementById('inventory_user').childNodes.length > 0){
	//Поиск всех итемов
	var items = document.getElementById('inventory_bot').childNodes;

	//alert(items.length);

	for (var i = 0; i < items.length; i++) {
		for (var j = 0; j < serchItems.length; j++) {
			//Если тем совподает с одним из необходимых
			if(items[i].getAttribute('hash')==serchItems[j]){
				var id = items[i].getAttribute('id');
				var cost = items[i].getAttribute('cost');
				clearInterval(idInterval1);
				clearInterval(idInterval2);
				pickItem(id);
				ref = false;
			}
		}
	}
	/*var name = items[items.length-2].getAttribute('hash');
	var cost = items[items.length-2].getAttribute('cost');
	console.log("Проверены все предметы последний предмет: name = "+name+"| |Стоит = "+cost);*/
	if(ref)refresh();
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

	var overPayFloat;
	var item = document.getElementById(idItem);
		if(item.getAttribute("ar") == 1){
			overPayFloat = "1";
		}else{
			overPayFloat = "0"
		}
		
	var nameWindow = "CheckItem+"+nameItem+"+"+costItem+"+"+costOwerPay+"+"+overPayFloat;
	setTimeout(function(){window.open("http://tryskins.ru/site/skin-search",nameWindow)},1) ;

	//setTimeout(function(){ steamWindow = window.open("http://steamcommunity.com/profiles/76561198086632933/tradeoffers/",'SteamTradeOffers',"location,width=10,height=10,top=0");},1);

	var responseStr = isThisItem+' , стоит: '+costItem+'$ Переплата: '+costOwerPay.toFixed(3)+'$'+' Кол-во: '+ count;

	var responseDiv = document.getElementById('trade-popup');
	responseDiv.getElementsByClassName('modal__title')[0].innerHTML = responseStr;
	responseDiv.getElementsByClassName('modal__subtitle')[0].innerHTML = nameItem;
	//setTimeout(function(){steamWindow.close();},25000);
}

//Выполняеться если скин найден
function pickItem(idItem){

		document.getElementById(idItem).click();
		document.getElementById("price-input-min").value = 0;
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

function soundPlay(){
	var src = 'https://psv4.userapi.com/c815522/u155818115/audios/45a72ad5c658.mp3?extra=Nr3E8Fhyvy2FpJ-UqywFn5oDpAMle6qVpa8mL2RlJW54qb-2Qx8tXAVvZscsuiDV3cA985iU4wa-3vAKWtbYFnxhx3Nr5idKrEKquJxOK74ZzGBYyUiRIz5dIhpcZAu1-0g0pG8iWP0hqeQ';
	var audio = new Audio(); 
	audio.src = src; 
	audio.autoplay = true; 

	//setTimeout(function(){myWin.close();},4000);
}

function checkOnTrySkins(){

	var itemName = window.name.split('+')[1];
	var countItem = window.name.split('+')[2];
	var overPay =  window.name.split('+')[3]*1;
	var floatOverPay = window.name.split('+')[4]*1;
	var luseMoney = overPay- overPay*0.97;

	document.getElementsByClassName("btn btn-success")[0].innerHTML = "Переплата = "+overPay.toFixed(2)+"$. Потеря =  "+luseMoney.toFixed(2)+"$";

	if(overPay<=10){
		document.getElementById("page-wrapper").style.backgroundColor = "green";
	}else{
		if(overPay<=30){
			document.getElementById("page-wrapper").style.backgroundColor = "yellow";
		}else{
			document.getElementById("page-wrapper").style.backgroundColor = "red";
		}
	}

	if(floatOverPay===1){
		document.getElementById("page-wrapper").style.backgroundColor = "sienna";
	}

	var input = document.getElementById('w0');
	input.value = itemName;

	document.getElementsByName('minutes')[0].value = 5000;
	document.getElementsByTagName('button')[0].click();
	//alert('Название: '+ itemName +' Стоит: '+countItem);
}
var timerRaffle;
var refreshInventory;
var checkTradeConfirmInterval;

function raffl() {
	timerRaffle = setInterval(rafflePick,1000);
	refreshInventory = setInterval(function(){
		document.getElementsByClassName("refresh")[1].click();
	},5000);
}


function rafflePick() {
	var myInventory = document.getElementsByClassName("inventoryContent")[0].getElementsByClassName("inventoryItemContainer");
	var botsInventory = document.getElementsByClassName("inventoryContent")[1].getElementsByClassName("inventoryItemContainer");

	if(botsInventory.length>10){
		/*var loadAllItemsBots = document.getElementsByClassName("box-content maximize")[1];
		loadAllItemsBots.scrollTop = loadAllItemsBots.scrollHeight;*/// -- Скролит Div до конца

		console.log(botsInventory.length);
		var k = true;
		for(var i = 0; i<botsInventory.length;i++){
			var src = botsInventory[i].getElementsByClassName("inventoryItem")[0].getElementsByClassName("inventoryItemContent")[0].childNodes[1].getAttribute("src").split("image/")[1].split("/")[0];
			var itemName = botsInventory[i].childNodes[3].innerText.split("$")[0].split("\n\n")[1].replace("\n");
			console.log(itemName)
			if(raffleDoplers.indexOf(src)>-1){
				k= false;
				clearInterval(timerRaffle);
				clearInterval(refreshInventory);
				botsInventory[i].click();
				console.log(src);
				//document.getElementsByClassName("auto-select-button")[0].click();
				document.getElementsByClassName("trade-button")[0].click();
				//setTimeout(function(){ steamWindow = window.open("http://steamcommunity.com/profiles/76561198086632933/tradeoffers/",'SteamTradeOffers',"location,width=10,height=10,top=0");},1);
				checkTradeConfirmInterval = setInterval(checkTradeConfirm,1000);
			}
		}
		//document.getElementsByClassName("inventoryContent")[1].getElementsByClassName("inventoryItemContainer")[0].getElementsByClassName("inventoryItem")[0].getElementsByClassName("inventoryItemContent")[0].childNodes[1].getAttribute("src")
	}
}

function checkTradeConfirm(){
	var modalWindow = document.getElementsByTagName("ngb-modal-window")[0];
	var textInModalWindow = modalWindow.getElementsByClassName("panel-body")[0].getElementsByClassName("text-center")[0].childNodes[1].innerHTML;
	if(textInModalWindow == "YOU HAVE NO PENDING TRADES."){
		location.reload();
		/*document.getElementsByClassName("btn btn-default")[0].click();
		document.getElementsByClassName("refresh")[1].click();
		setTimeout(function(){
			clearInterval(checkTradeConfirmInterval);
			raffl();
		},2000);*/
	}
}

var tradeskinsfastInterval ; 
var setInt;
var price;
var loadAllItemsBots;

function tradeskinsfast(){
	//tradeskinsfastInterval = setInterval(tradeskinsfastCheck,100);
	setInt = setInterval(loadAllSkins,300);

}

var startPosition = 0;
var lengthSkins = 50;
var reloadSite = true;
var isFirst = true;
function loadAllSkins(){
	loadAllItemsBots = document.getElementById("botinventory");
	if(loadAllItemsBots.childNodes.length>1){
		if(isFirst) {botitems.FilterByPrice(filterMin,filtefMax); isFirst = false;}
		var price = document.getElementById("userbalance").innerHTML*1;

		if(price<1) {
			clearInterval(setInt);
			alert("Баланс закончился! =)");
		};

		loadAllItemsBots.scrollTop = loadAllItemsBots.scrollHeight;
		price = loadAllItemsBots.childNodes[loadAllItemsBots.childNodes.length-1].getElementsByClassName("price")[0].innerHTML.split("$")[1]*1;
		lengthSkins = loadAllItemsBots.childNodes.length;
		tradeskinsfastCheck();
		startPosition = loadAllItemsBots.childNodes.length;
		//console.log(price)
		var ok = price - filterMin;
		if(ok < 1){
			//alert(price+"   "+ok);
			clearInterval(setInt);
			console.log(loadAllItemsBots.childNodes.length);
			//reloadInventari()
		}
	}
	//console.log(loadAllItemsBots.childNodes.length);
}

function tradeskinsfastCheck(){
	//clearInterval(tradeskinsfastInterval);
		//loadAllItemsBots.scrollTop = loadAllItemsBots.scrollHeight;
	price = loadAllItemsBots.childNodes[loadAllItemsBots.childNodes.length-1].getElementsByClassName("price")[0].innerHTML.split("$")[1]*1;
	console.time('test');
	var items = loadAllItemsBots.getElementsByClassName("item");
	var itemsCheckTSF = tradeskinsfastITEMS.split(",");
	for(var i = startPosition; i<lengthSkins;i++){
		for(var j = 0; j<itemsCheckTSF.length;j++){
			var price = items[i].getElementsByClassName("price")[0].innerHTML.split("$")[1]*1;
			var name = items[i].getElementsByClassName("pic")[0].childNodes[0].getAttribute("alt");
			var priceItem = document.getElementById("userbalance").innerHTML*1;
			//alert(priceItem);
			if(itemsCheckTSF[j]==name && price<priceItem){
				console.log("Цена = "+price+" Баланс = "+priceItem);
				clearInterval(setInt);
				pickItemTSF(items[i]);
				reloadSite = false;
				return;
			}
		}
	}
	console.log("Инвентарь проверен");
	console.timeEnd('test');
}	
var timerConfitmTSF;
var confirmINT;

function pickItemTSF(item){
	confirmINT = setInterval(checkConfirm,100);
	item.click();
	console.log("click");
	var tradeButton = document.getElementById("tradebtn");
	tradeButton.click();
	setTimeout(function(){
		timerConfitmTSF = setInterval(checkConfirmTradeTSF,1000);
	},1500);
}

function checkConfirmTradeTSF(){
	try{
		var span = document.getElementById("offerlist").childNodes[0].getElementsByTagName("span")[0].getAttribute("class");
		var closeBTN = document.getElementById("trade").getElementsByClassName("close")[0];
		if(span == "offerstatus greentxt"){
			clearInterval(timerConfitmTSF);
		}
	console.log(span);
	}catch(err){}
}

function checkConfirm(){
	// выбираем нужный элемент
	try{
		var k = document.getElementsByClassName("notifyjs-corner");
		if(k.length>0){
			console.log("Остановленно  и успешно принято!!!");
			var messages = k[0].getElementsByClassName("notifyjs-wrapper notifyjs-hidable")[0].getElementsByClassName("notifyjs-container")[0].childNodes[0].childNodes[1].innerHTML;
			console.log(messages);
			/*if(messages == "Trade completed"){
				reloadInventari();
			}else 
			if(messages == "You declined the offer"){
				reloadInventari();
			}else 
			if(messages == "Не удалось отправить предложение. Ваш инвентарь будет обновлен") location.reload();
			else location.reload();*/
			 location.reload();
			clearInterval(confirmINT);
		}
	}catch(err){
		console.log(err);
	}
}

function reloadInventari(){
	document.getElementById("botrefresh").click();
	isFirst = true;
	setTimeout(tradeskinsfast,500);
}