
var serhtItem = "★ Bowie Knife | Ultraviolet (Minimal Wear),★ Flip Knife | Crimson Web (Minimal Wear),★ Bayonet | Lore (Minimal Wear),M4A4 | Poseidon (Minimal Wear),★ Karambit | Autotronic (Minimal Wear),★ Bowie Knife | Marble Fade (Factory New),★ Shadow Daggers | Marble Fade (Factory New),★ Specialist Gloves | Foundation (Battle-Scarred),★ Shadow Daggers | Tiger Tooth (Factory New),★ Karambit | Blue Steel (Well-Worn),★ Flip Knife | Lore (Factory New),★ Butterfly Knife | Crimson Web (Minimal Wear),★ Sport Gloves | Hedge Maze (Battle-Scarred),★ Karambit | Slaughter (Field-Tested),★ M9 Bayonet | Slaughter (Field-Tested),★ Huntsman Knife | Tiger Tooth (Factory New),★ Karambit | Damascus Steel (Factory New),★ Gut Knife | Bright Water (Minimal Wear),★ Falchion Knife | Ultraviolet (Minimal Wear),★ Shadow Daggers | Damascus Steel (Minimal Wear),AK-47 | Jet Set (Minimal Wear),M4A4 | Poseidon (Field-Tested),★ Huntsman Knife | Crimson Web (Well-Worn),★ Gut Knife | Safari Mesh (Well-Worn),★ Gut Knife | Boreal Forest (Well-Worn),Five-SeveN | Hyper Beast (Factory New),★ Gut Knife | Boreal Forest (Battle-Scarred),StatTrak™ Desert Eagle | Golden Koi (Factory New),StatTrak™ M4A4 | Desolate Space (Factory New),StatTrak™ M4A4 | Desolate Space (Factory New),★ Shadow Daggers | Boreal Forest (Well-Worn),★ Huntsman Knife | Safari Mesh (Well-Worn),★ Gut Knife | Safari Mesh (Battle-Scarred),AK-47 | Fuel Injector (Factory New),AUG | Akihabara Accept (Field-Tested),★ Butterfly Knife | Night (Well-Worn),★ Falchion Knife | Rust Coat (Battle-Scarred),★ Gut Knife | Ultraviolet (Battle-Scarred),★ Flip Knife | Scorched (Well-Worn),M4A1-S | Icarus Fell (Minimal Wear),★ Gut Knife | Urban Masked (Well-Worn),★ Bayonet | Bright Water (Minimal Wear)";

var raffleDoplers = "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_9mkgL-OlvD4NoTSmXlD58F0hNbN_Iv9nBrhrRc5YTqgJdWcIA48M1iF81m8wurrgMW76s_LmydguSRwtn3VmUThn1gSOZyN_0a1 -9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJkIWKg__nO77QklRc7cF4n-SP94qsjVfi80VoN2CnJIOdcFM8ZA3X_gDqk-7n0ce46JvNmiMwsnYg4mGdwUL-I5iXGg";

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

	setTimeout(function(){ steamWindow = window.open("http://steamcommunity.com/profiles/76561198086632933/tradeoffers/",'SteamTradeOffers',"location,width=10,height=10,top=0");},1);

	var responseStr = isThisItem+' , стоит: '+costItem+'$ Переплата: '+costOwerPay.toFixed(3)+'$'+' Кол-во: '+ count;

	var responseDiv = document.getElementById('trade-popup');
	responseDiv.getElementsByClassName('modal__title')[0].innerHTML = responseStr;
	responseDiv.getElementsByClassName('modal__subtitle')[0].innerHTML = nameItem;
	setTimeout(function(){steamWindow.close();},25000);
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
var checkTradeConfirmInterval;
function raffl() {
	timerRaffle = setInterval(rafflePick,1000);
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
			if(raffleDoplers.indexOf(src)>-1){
				k= false;
				clearInterval(timerRaffle);
				botsInventory[i].click();
				console.log(src);
				//document.getElementsByClassName("auto-select-button")[0].click();
				document.getElementsByClassName("trade-button")[0].click();
				setTimeout(function(){ steamWindow = window.open("http://steamcommunity.com/profiles/76561198086632933/tradeoffers/",'SteamTradeOffers',"location,width=10,height=10,top=0");},1);
				checkTradeConfirmInterval = setInterval(checkTradeConfirm,1000);
			}
		}
		if(k) document.getElementsByClassName("refresh")[1].click();
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

	