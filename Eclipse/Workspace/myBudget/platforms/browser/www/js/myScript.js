function clickCounter() {
	if (typeof (Storage) !== "undefined") {
		if (localStorage.clickcount) {
			localStorage.clickcount = Number(localStorage.clickcount) + 1;
		} else {
			localStorage.clickcount = 1;
		}
		document.getElementById("result").innerHTML = "You have clicked the button "
				+ localStorage.clickcount + " time(s).";
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
	}
}

$ ("a").on("tap", function() {$(this).hide});

function callAlert() {
	alert("Hello! I am an alert box!!");
}

function addIncome() {
	var income = document.getElementById("income").value;
	console.log(income);
	//var todayBudget = document.getElementById("todayBudget").value;
	//console.log(todayBudget);
	document.getElementById("todayBudget").innerHTML = income;
	console.log(document.getElementById("todayBudget"));
}

function onLoad() {
	alert("onload gestartet");
	document.addEventListener(deviceready, onDeviceReady, false);
}

function onDeviceReady() {
	alert("onDeviceReady gestartet");
}

$('#test').click(function() {
	  alert('Handler for .click() called.');
	});

$( "#test" ).click(function() {
	var income = document.getElementById("income").value;
	console.log(income);
	//var todayBudget = document.getElementById("todayBudget").value;
	//console.log(todayBudget);
	document.getElementById("todayBudget").innerHTML = income;
	console.log(document.getElementById("todayBudget"));
	});

function addSpent() {
	var spent = document.getElementById("spent").value;
	var todayBudget = document.getElementById("todayBudget").value;
	document.getElementById("todayBudget").innerHTML = spent;
}

function setDailyIncome() {
	var fixIncome = document.getElementById("fixIncome").value;
	var todayBudget = document.getElementById("todayBudget").value;
	document.getElementById("todayBudget").innerHTML = fixIncome;
}

function setDailyCost() {
	var fixCost = document.getElementById("fixCost").value;
	var todayBudget = document.getElementById("todayBudget").value;
	document.getElementById("todayBudget").innerHTML = fixCost;
}

function setSavingTarget() {
	var fixSave = document.getElementById("fixSave").value;
	var todayBudget = document.getElementById("todayBudget").value;
	document.getElementById("todayBudget").innerHTML = fixSave;
}

function setInterval() {
	var interval = document.getElementById("interval").value;
	var todayBudget = document.getElementById("todayBudget").value;
	document.getElementById("todayBudget").innerHTML = interval;
}

function setReminder() {
	var reminderHour = document.getElementById("reminderHour").value;
	var reminderMin = document.getElementById("reminderMin").value;
	var reminderSec = document.getElementById("reminderSec").value;
	var todayBudget = document.getElementById("todayBudget").value;
}

function setFactor() {
}

function saveChanges() {

}