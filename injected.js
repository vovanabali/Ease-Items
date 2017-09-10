
var serhtItem = "M4A4 | Poseidon (Field-Tested),★ StatTrak™ Karambit | Safari Mesh (Field-Tested),★ Bowie Knife | Ultraviolet (Minimal Wear),★ Shadow Daggers | Damascus Steel (Minimal Wear),★ Huntsman Knife | Crimson Web (Well-Worn),M4A1-S | Master Piece (Factory New),★ StatTrak™ Huntsman Knife | Urban Masked (Field-Tested),★ Butterfly Knife | Marble Fade (Factory New),★ Gut Knife | Bright Water (Minimal Wear),★ StatTrak™ M9 Bayonet | Boreal Forest (Field-Tested),★ Bowie Knife | Tiger Tooth (Factory New),★ Karambit | Autotronic (Minimal Wear),★ M9 Bayonet | Bright Water (Minimal Wear),AUG | Akihabara Accept (Minimal Wear),StatTrak™ M4A4 | Desolate Space (Factory New),★ Bowie Knife | Marble Fade (Factory New),★ StatTrak™ Falchion Knife | Night (Field-Tested),M4A1-S | Knight (Factory New),★ Bowie Knife | Slaughter (Factory New),M4A4 | Poseidon (Minimal Wear),★ M9 Bayonet | Freehand (Factory New),★ Flip Knife | Crimson Web (Minimal Wear),★ Flip Knife | Lore (Factory New),★ Falchion Knife | Tiger Tooth (Factory New),★ Karambit | Autotronic (Field-Tested),★ Bayonet | Autotronic (Field-Tested),★ Bayonet | Autotronic (Minimal Wear),★ Gut Knife | Lore (Minimal Wear),★ Karambit | Black Laminate (Minimal Wear),★ Specialist Gloves | Crimson Kimono (Well-Worn),★ Sport Gloves | Arid (Minimal Wear)";

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

//Выполняеться после загрузки страницы
function injected_main() {

	if(location.href == "https://cs.money/ru") {
		idInterval1 = setInterval(al, 1000);
		idInterval2 = setInterval(refresh, 120000);
	}

	if(location.href.indexOf("http://steamcommunity.com")>-1 ){
		if(window.name == "SteamTradeOffers"){
				var reLoad = true;
				var offers = document.getElementsByClassName('tradeoffer');
				if(offers.length>0){
					for (var i = 0; i < offers.length; i++) {
						var nameBot = offers[i].getElementsByClassName('tradeoffer_header')[0].innerHTML;
						if(nameBot.indexOf("CS.MONEY")>-1) {
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

			document.getElementsByClassName('btn_green_white_innerfade btn_medium')[0].click();

			ConfirmTradeOffer();
			setTimeout(function(){
				window.close();
			},1500);
		}
	}
}

var serchItems = serhtItem.split(',');
//Поиск необходимого скина
function al(){

	//Если инвентарь прогрузился 
	if(document.getElementById('inventory_user').childNodes.length > 1){
			//Поиск всех итемов
	var items = document.getElementById('inventory_bot').childNodes;

	for (var i = 0; i < 100; i++) {
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

	var nameWindow = "CheckItem+"+nameItem+"+"+costItem+"+"+costOwerPay;
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
	var src = 'https://psv4.userapi.com/c815123/u248837725/audios/3723538f7377.mp3?extra=Q2mHop58idk42CaIeyI_-6HbZn4-s3ZeOwZ_ycODmN21dSKJA-3q2zA2lcH_tQWztfaeA3CSPNKtbsDhWmnODP1wgss-1_hbn3c4wXjxDyDPD8xvHXog3_Q_Z5sVL7969ySzQemaPNgPUko';
	var audio = new Audio(); 
	audio.src = src; 
	audio.autoplay = true; 

	//setTimeout(function(){myWin.close();},4000);
}

function checkOnTrySkins(){

	var itemName = window.name.split('+')[1];
	var countItem = window.name.split('+')[2];

	var input = document.getElementById('w0');
	input.value = itemName;

	document.getElementsByName('minutes')[0].value = 5000;
	document.getElementsByTagName('button')[0].click();
	//alert('Название: '+ itemName +' Стоит: '+countItem);
}