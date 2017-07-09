// Author:  				Parthiapn Nagulanandan
// Projectname: 			myBudget
// Date: 				09.07.2017
// Version:				V1.2

// Variables which is used in different function and need to be initialized at the beginning.
var incomeList;
var spentList;

// Function which clears the Local Storage und sets all HTML Elements to Default Value.
function reset() {
	localStorage.clear();
	incomeList = [];
	spentList = [];
	localStorage.incomeList = JSON.stringify(incomeList);
	localStorage.spentList = JSON.stringify(spentList);
	document.getElementById("spentYesterday").innerHTML = 0;
	document.getElementById("budget").innerHTML = 0;
	document.getElementById("todayBudget").innerHTML = 0;
	document.getElementById("tomorowBudget").innerHTML = 0;
	document.getElementById("spent").value = 0;
	document.getElementById("income").value = 0;
	document.getElementById("fixIncome").value = 0;
	document.getElementById("fixCost").value = 0;
	document.getElementById("fixSaving").value = 0;
	document.getElementById("facMonday").value = 1;
	document.getElementById("facTuesday").value = 1;
	document.getElementById("facWednessday").value = 1;
	document.getElementById("facThursday").value = 1;
	document.getElementById("facFriday").value = 1;
	document.getElementById("facSaturday").value = 1;
	document.getElementById("facSunday").value = 1;
	
	alert("myBudget wurde erfolgreich zurückgesetzt!");
}

// Function which will be called before Resetting the Application. A Confirm Dialog will Pop Up to confirm the Reset Command.
function confirmReset() {
    var txt;
    var r = confirm("Wollen Sie wirklich myBudget zurücksetzen?");
    if (r == true) {
    	reset();
    }
}

// Function which calls several functions which is used to calculate the Budget.
function calculate() {
	incomeList = [];
	spentList = [];
	countIncomePeriod();
	countSpentPeriod();
	remainingDays();
	
	var currentDate = new Date();
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth();
	var currentYear = currentDate.getFullYear();
	var yesterdayDate = new Date(currentYear, currentMonth, currentDay - 1);
	var todayDate = new Date(currentYear, currentMonth, currentDay);
	var spentYesterday = countSpentDay(yesterdayDate);
	var spentToday = countSpentDay(todayDate);
	var incomeToday = countIncomeDay(todayDate);
	var budget = localStorage.fixIncome - localStorage.fixCost - localStorage.fixSaving;
	document.getElementById("budget").innerHTML = parseInt(budget - +localStorage.spentPeriod + +localStorage.incomePeriod + incomeToday - spentToday);
	document.getElementById("todayBudget").innerHTML = parseInt(((budget - +localStorage.spentPeriod + +localStorage.incomePeriod) / +localStorage.remainingDays) + incomeToday - spentToday);
	document.getElementById("spentYesterday").innerHTML = parseInt(spentYesterday);
	document.getElementById("tomorowBudget").innerHTML = parseInt((budget - +localStorage.spentPeriod + +localStorage.incomePeriod + incomeToday - spentToday) / (+localStorage.remainingDays - 1));
}

// Function which calculate the remaining Days of the current Budget Calculation Period.
function remainingDays() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	
	if(currentDay > localStorage.interval) {
		localStorage.totDays = currentDaysOfMonth;
		localStorage.remainingDays = +localStorage.interval + +(currentDaysOfMonth - currentDay);
	} else {
		localStorage.totDays = prevDaysOfMonth;
		localStorage.remainingDays = +localStorage.interval - +currentDay;
	}
}

// Function which returns the value of the Day of the specified Month.
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
// Function which recovers all the settings from Local Storage to App (GUI).
function recoverSettings() {
	if (typeof (Storage) !== "undefined") {
		document.getElementById("fixIncome").value = localStorage.fixIncome;
		document.getElementById("fixCost").value = localStorage.fixCost;
		document.getElementById("fixSaving").value = localStorage.fixSaving;
		document.getElementById("interval").selectedIndex = localStorage.interval - 1;
	} else {
		alert("Ihr Browser unterstützt LocalStage nicht!!!");
	}
}

// Function which saves all the settings in the Local Storage.
function saveSettings() {
	if (typeof (Storage) !== "undefined") {
		localStorage.fixIncome = document.getElementById("fixIncome").value;
		localStorage.fixCost = document.getElementById("fixCost").value;
		localStorage.fixSaving = document.getElementById("fixSaving").value;
		localStorage.interval = document.getElementById("interval").selectedIndex + 1;
	} else {
		alert("Ihr Browser unterstützt LocalStage nicht!!!");
	}
}

// Function which initializes the income variables in Local Storage(deprecated: need to remove soon).
function initIncome() {
	if (localStorage.incomeGeschenk === undefined) {
		localStorage.incomeGeschenk = Number(0);
		}
	if (localStorage.incomeInvestition === undefined) {
		localStorage.incomeInvestition = Number(0);
		}
	if (localStorage.incomeVerkauf === undefined) {
		localStorage.incomeVerkauf = Number(0);
		}
	if (localStorage.spentAndere === undefined) {
		localStorage.spentAndere = Number(0);
		}
}

// Function which saves Incomes.
function saveIncome(incomeType) {
	var currentDate = new Date();
	initIncome();
	
	if (localStorage.incomeList != "") {
		incomeList = JSON.parse(localStorage.incomeList);
	}	
	if (typeof (Storage) !== "undefined") {
		var timestamp = new Date();
		var incomeObject;
		if (incomeType === "Geschenk") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(incomeObject);
		} else if (incomeType === "Investition") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(incomeObject);
		} else if (incomeType === "Verkauf") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(incomeObject);
		} else {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(incomeObject);
		}

		document.getElementById("income").value = 0;
		localStorage.incomeList = JSON.stringify(incomeList);
		incomeList = [];
	} else {
		alert("Ihr Browser unterstützt LocalStorage nicht!!!");
	}
}

// Function which calculates all the incomes from the set period.
function countIncomePeriod() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1;
	var currentYear = currentDate.getFullYear();
	var incomeObj;
	if (localStorage.incomeList != "") {
		incomeList = JSON.parse(localStorage.incomeList);
	}	
	
	localStorage.incomePeriod = 0;
	if(currentDay < localStorage.interval) {
		var startDate = new Date(currentYear, currentMonth - 2, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth - 1, currentDay - 1);
		for (x in incomeList) {
			var incomeObj = incomeList[x];
			var timestampAsDate = incomeObj.timestamp;
			timestampAsDate = new Date(timestampAsDate);
			if(timestampAsDate > startDate && timestampAsDate < endDate) {
				if(localStorage.incomePeriod == null || localStorage.incomePeriod == undefined) {
					localStorage.incomePeriod = +incomeObj.value;
				} else {
					localStorage.incomePeriod = +localStorage.incomePeriod ++ +incomeObj.value;
				}
			}
		}
	} else {
		var startDate = new Date(currentYear, currentMonth - 1, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth, currentDay - 1);
		for (x in incomeList) {
			var incomeObj = incomeList[x];
			var timestampAsDate = incomeObj.timestamp;
			timestampAsDate = new Date(timestampAsDate);
			if(timestampAsDate > startDate && timestampAsDate < endDate) {
				if(localStorage.incomePeriod == null || localStorage.incomePeriod == undefined) {
					localStorage.incomePeriod = +incomeObj.value;
				} else {
					localStorage.incomePeriod = +localStorage.incomePeriod ++ +incomeObj.value;
				}
			}
		}
	}
	localStorage.incomeList = JSON.stringify(incomeList);
	incomeList = [];
}

//Function which initializes the spent variables in Local Storage(deprecated: need to remove soon).
function initSpent() {
	if (localStorage.spentVerpflegung === undefined) {
		localStorage.spentVerpflegung = Number(0);
		}
	if (localStorage.spentEinkaufen === undefined) {
		localStorage.spentEinkaufen = Number(0);
		}
	if (localStorage.spentAuto === undefined) {
		localStorage.spentAuto = Number(0);
		}
	if (localStorage.spentWohnung === undefined) {
		localStorage.spentWohnung = Number(0);
		}
	if (localStorage.spentShopping === undefined) {
		localStorage.spentShopping = Number(0);
		}
	if (localStorage.spentAndere === undefined) {
		localStorage.spentAndere = Number(0);
		}
}

// Function which saves the set Spents.
function saveSpent(spentType) {
	var currentDate = new Date();
	initSpent();
	
	if (localStorage.spentList != "") {
		spentList = JSON.parse(localStorage.spentList);
	}	
	if (typeof (Storage) !== "undefined") {
		var timestamp = new Date();
		var spentObject;
		if (spentType === "Verpflegung") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		} else if (spentType === "Einkaufen") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		} else if (spentType === "Auto") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		} else if (spentType === "Wohnung") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		} else if (spentType === "Shopping") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		} else {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(spentObject);
		}

		document.getElementById("spent").value = 0;
		localStorage.spentList = JSON.stringify(spentList);
		spentList = [];
	} else {
		alert("Ihr Browser unterstützt LocalStage nicht!!!");
	}
}

// Function which calculates the spent money in the specified period.
function countSpentPeriod() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1;
	var currentYear = currentDate.getFullYear();
	var spentObj;
	if (localStorage.spentList != "") {
		spentList = JSON.parse(localStorage.spentList);
	}	
	
	localStorage.spentPeriod = 0;
	if(currentDay < localStorage.interval) {
		var startDate = new Date(currentYear, currentMonth - 2, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth - 1, currentDay - 1);
		for (x in spentList) {
			var spentObj = spentList[x];
			var timestampAsDate = spentObj.timestamp;
			timestampAsDate = new Date(timestampAsDate);
			if(timestampAsDate > startDate && timestampAsDate < endDate) {
				if(localStorage.spentPeriod == null || localStorage.spentPeriod == undefined) {
					localStorage.spentPeriod = +spentObj.value;
				} else {
					localStorage.spentPeriod = +localStorage.spentPeriod ++ +spentObj.value;
				}
			}
		}
	} else {
		var startDate = new Date(currentYear, currentMonth - 1, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth - 1, currentDay - 1);
		for (x in spentList) {
			var spentObj = spentList[x];
			var timestampAsDate = spentObj.timestamp;
			timestampAsDate = new Date(timestampAsDate);
			if(timestampAsDate > startDate && timestampAsDate < endDate) {
				if(localStorage.spentPeriod == null || localStorage.spentPeriod == undefined) {
					localStorage.spentPeriod = +spentObj.value;
				} else {
					localStorage.spentPeriod = +localStorage.spentPeriod ++ +spentObj.value;
				}
			}
		}
	}
	localStorage.spentList = JSON.stringify(spentList);
	spentList = [];
}

// Function which calculates the spent money of the specified date.
function countSpentDay(date) {
	var selectedDate = date;
	var selectedDay = selectedDate.getDate();
	var selectedMonth = selectedDate.getMonth();
	var selectedYear = selectedDate.getFullYear();
	var spentObj = 0;
	var spentAmount = 0;
	if (localStorage.spentList != "") {
		spentList = JSON.parse(localStorage.spentList);
	}	
	
	for (x in spentList) {
		var spentObj = spentList[x];
		var timestampAsDate = spentObj.timestamp;
		timestampAsDate = new Date(timestampAsDate);
		var timestampAsDay = timestampAsDate.getDate();
		var timestampAsMonth = timestampAsDate.getMonth();
		var timestampAsYear = timestampAsDate.getFullYear();
		if(timestampAsDay == selectedDay && timestampAsMonth == selectedMonth && timestampAsYear == selectedYear) {
			spentAmount += spentObj.value;
		}
	}
	localStorage.spentList = JSON.stringify(spentList);
	spentList = [];
	return spentAmount;
}

//Function which calculates the incomes of the specified date.
function countIncomeDay(date) {
	var selectedDate = date;
	var selectedDay = selectedDate.getDate();
	var selectedMonth = selectedDate.getMonth();
	var selectedYear = selectedDate.getFullYear();
	var incomeObj = 0;
	var incomeAmount = 0;
	if (localStorage.incomeList != "") {
		incomeList = JSON.parse(localStorage.incomeList);
	}	
	
	for (x in incomeList) {
		var incomeObj = incomeList[x];
		var timestampAsDate = incomeObj.timestamp;
		timestampAsDate = new Date(timestampAsDate);
		var timestampAsDay = timestampAsDate.getDate();
		var timestampAsMonth = timestampAsDate.getMonth();
		var timestampAsYear = timestampAsDate.getFullYear();
		if(timestampAsDay == selectedDay && timestampAsMonth == selectedMonth && timestampAsYear == selectedYear) {
			incomeAmount += incomeObj.value;
		}
	}
	localStorage.incomeList = JSON.stringify(incomeList);
	incomeList = [];
	return incomeAmount;
}
