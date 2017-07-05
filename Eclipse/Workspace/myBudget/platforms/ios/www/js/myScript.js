var incomeList;
var spentList;

function reset() {
	localStorage.clear();
	incomeList = [];
	spentList = [];
	localStorage.incomeList = incomeList;
	localStorage.spentList = spentList;
}

function calculate() {
	saveSettings();
	countIncomePeriod();
	countSpentPeriod();
	remainingDays();
	//calculateFactor();
	
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
	document.getElementById("budget").innerHTML = budget - +localStorage.spentPeriod + +localStorage.incomePeriod + incomeToday - spentToday;
	document.getElementById("todayBudget").innerHTML = ((budget - +localStorage.spentPeriod + +localStorage.incomePeriod) / +localStorage.remainingDays) + incomeToday - spentToday;
	document.getElementById("spentYesterday").innerHTML = spentYesterday;
	document.getElementById("tomorowBudget").innerHTML = (budget - +localStorage.spentPeriod + +localStorage.incomePeriod + incomeToday - spentToday) / (+localStorage.remainingDays - 1);
}

function remainingDays() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	
	if(currentDay > localStorage.interval) {
		localStorage.totDays = currentDaysOfMonth;
		localStorage.remainingDays = currentDaysOfMonth - (currentDaysOfMonth - currentDay);
	} else {
		localStorage.totDays = prevDaysOfMonth;
		localStorage.remainingDays = prevDaysOfMonth - currentDay - (prevDaysOfMonth - localStorage.interval)
	}
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function saveSettings() {
	if (typeof (Storage) !== "undefined") {
		localStorage.fixIncome = document.getElementById("fixIncome").value;
		localStorage.fixCost = document.getElementById("fixCost").value;
		localStorage.fixSaving = document.getElementById("fixSaving").value;
		localStorage.interval = document.getElementById("interval").value;
	} else {
		alert("Ihr Browser unterstützt LocalStage nicht!!!");
	}
}

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

function saveIncome(incomeType) {
	var currentDate = new Date();
	initIncome();
	
	if (localStorage.incomeList != "") {
		incomeList = Array(localStorage.incomeList);
	}	
	if (typeof (Storage) !== "undefined") {
		var timestamp = new Date();
		var incomeObject;
		if (incomeType === "Geschenk") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(JSON.stringify(incomeObject));
		} else if (incomeType === "Investition") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(JSON.stringify(incomeObject));
		} else if (incomeType === "Verkauf") {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(JSON.stringify(incomeObject));
		} else {
			incomeObject = {type:incomeType, timestamp:timestamp, value: +document.getElementById("income").value};
			incomeList.push(JSON.stringify(incomeObject));
		}

		document.getElementById("income").value = 0;
		localStorage.incomeList = incomeList;
	} else {
		alert("Ihr Browser unterstützt LocalStorage nicht!!!");
	}
}

function countIncomePeriod() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1;
	var currentYear = currentDate.getFullYear();
	var incomeObj;
	
	localStorage.incomePeriod = 0;
	if(currentDay < localStorage.interval) {
		var startDate = new Date(currentYear, currentMonth - 1, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth, localStorage.interval);
		for (x in incomeList) {
			var incomeObj = JSON.parse(incomeList[x]);
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
		var startDate = new Date(currentYear, currentMonth, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth + 1, localStorage.interval);
		for (x in incomeList) {
			var incomeObj = JSON.parse(incomeList[x]);
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
}

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

function saveSpent(spentType) {
	var currentDate = new Date();
	initSpent();
	
	if (localStorage.spentList != "") {
		spentList = Array(localStorage.spentList);
	}	
	if (typeof (Storage) !== "undefined") {
		var timestamp = new Date();
		var spentObject;
		if (spentType === "Verpflegung") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		} else if (spentType === "Einkaufen") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		} else if (spentType === "Auto") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		} else if (spentType === "Wohnung") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		} else if (spentType === "Shopping") {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		} else {
			spentObject = {type:spentType, timestamp:timestamp, value: +document.getElementById("spent").value};
			spentList.push(JSON.stringify(spentObject));
		}

		document.getElementById("spent").value = 0;
		localStorage.spentList = spentList;
	} else {
		alert("Ihr Browser unterstützt LocalStage nicht!!!");
	}
}

function countSpentPeriod() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1;
	var currentYear = currentDate.getFullYear();
	var spentObj;
	
	localStorage.spentPeriod = 0;
	if(currentDay < localStorage.interval) {
		var startDate = new Date(currentYear, currentMonth - 1, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth, localStorage.interval);
		for (x in spentList) {
			var spentObj = JSON.parse(spentList[x]);
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
		var startDate = new Date(currentYear, currentMonth, localStorage.interval);
		var endDate = new Date(currentYear, currentMonth + 1, localStorage.interval);
		for (x in incomeList) {
			var spentObj = JSON.parse(spentList[x]);
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
}

function countSpentDay(date) {
	var selectedDate = date;
	var selectedDay = selectedDate.getDate();
	var selectedMonth = selectedDate.getMonth();
	var selectedYear = selectedDate.getFullYear();
	var spentObj = 0;
	var spentAmount = 0;
	for (x in spentList) {
		var spentObj = JSON.parse(spentList[x]);
		var timestampAsDate = spentObj.timestamp;
		timestampAsDate = new Date(timestampAsDate);
		var timestampAsDay = timestampAsDate.getDate();
		var timestampAsMonth = timestampAsDate.getMonth();
		var timestampAsYear = timestampAsDate.getFullYear();
		if(timestampAsDay == selectedDay && timestampAsMonth == selectedMonth && timestampAsYear == selectedYear) {
			spentAmount += spentObj.value;
		}
	}
	return spentAmount;
}

function countIncomeDay(date) {
	var selectedDate = date;
	var selectedDay = selectedDate.getDate();
	var selectedMonth = selectedDate.getMonth();
	var selectedYear = selectedDate.getFullYear();
	var incomeObj = 0;
	var incomeAmount = 0;
	for (x in incomeList) {
		var incomeObj = JSON.parse(incomeList[x]);
		var timestampAsDate = incomeObj.timestamp;
		timestampAsDate = new Date(timestampAsDate);
		var timestampAsDay = timestampAsDate.getDate();
		var timestampAsMonth = timestampAsDate.getMonth();
		var timestampAsYear = timestampAsDate.getFullYear();
		if(timestampAsDay == selectedDay && timestampAsMonth == selectedMonth && timestampAsYear == selectedYear) {
			incomeAmount += incomeObj.value;
		}
	}
	return incomeAmount;
}

// Additional Functions which is planned after MLZ
// --------------------------------------------------------------------------------------------------------------------------------

function calculateFactor() {
	var currentDate = new Date();
	var currentDaysOfMonth = daysInMonth(currentDate.getMonth() + 1, currentDate.getYear());
	var prevDaysOfMonth = daysInMonth(currentDate.getMonth(), currentDate.getYear());
	var nextDaysOfMonth = daysInMonth(currentDate.getMonth() + 2, currentDate.getYear());
	var currentDay = currentDate.getDate();
	var currentMonth = currentDate.getMonth() + 1;
	var currentYear = currentDate.getFullYear();
	var spentObj;
	var startDate;
	var endDate;
	var weekday;
	var dayCounter;
	
	if(currentDay < localStorage.interval) {
		startDate = new Date(currentYear, currentMonth - 1, localStorage.interval);
		endDate = new Date(currentYear, currentMonth, localStorage.interval);
		for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
			weekday = d.getDay();
			dayCounter = 0;
			switch(weekday) {
			case 0:
				dayCounter += +document.getElementById("facMonday").value;
				break;
			case 1:
				dayCounter += +document.getElementById("facTuesday").value;
				break;
			case 2:
				dayCounter += +document.getElementById("facWednessday").value;
				break;
			case 3:
				dayCounter += +document.getElementById("facThursday").value;
				break;
			case 4:
				dayCounter += +document.getElementById("facFriday").value;
				break;
			case 5:
				dayCounter += +document.getElementById("facSaturday").value;
				break;
			case 6:
				dayCounter += +document.getElementById("facSunday").value;
				break;
			default:
				dayCounter += 1;
			}
		}
		localStorage.totDays = prevDaysOfMonth;
		localStorage.remainingDays = dayCounter;
		
	} else {
		startDate = new Date(currentYear, currentMonth, localStorage.interval);
		endDate = new Date(currentYear, currentMonth + 1, localStorage.interval);
		for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
			weekday = d.getDay();
			dayCounter = 0;
			switch(weekday) {
			case 0:
				dayCounter += +document.getElementById("facMonday").value;
				break;
			case 1:
				dayCounter += +document.getElementById("facTuesday").value;
				break;
			case 2:
				dayCounter += +document.getElementById("facWednessday").value;
				break;
			case 3:
				dayCounter += +document.getElementById("facThursday").value;
				break;
			case 4:
				dayCounter += +document.getElementById("facFriday").value;
				break;
			case 5:
				dayCounter += +document.getElementById("facSaturday").value;
				break;
			case 6:
				dayCounter += +document.getElementById("facSunday").value;
				break;
			default:
				dayCounter += 1;
			}
		}
		localStorage.totDays = currentDaysOfMonth;
		localStorage.remainingDays = dayCounter;
	}
}