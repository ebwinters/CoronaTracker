#!/usr/bin/env node
const table = require('cli-table');
const asciichart = require ('asciichart')
var colors = require('colors');
const constants = require('./constants');
const apiCalls = require('./apiCalls');
const helpers = require('./helpers');

let options = constants.options, countries = constants.countries, charFormatting = constants.charFormatting, statesMap = constants.statesMap; 

function graphData(allHistoricalData, arg, place=null) {
	const specifier = {"c": "cases", "d": "deaths", "r": "recovered"}[arg];
	// initialize array of 0s based on how much data API is giving, country will not be arr so keep that in mind with cond
	var chartData = allHistoricalData.length > 0 ? (Object.keys(allHistoricalData[0].timeline[specifier]).length < 60 ?
		new Array(Object.keys(allHistoricalData[0].timeline[specifier]).length-1).fill(0) :
		new Array(60).fill(0)) : (Object.keys(allHistoricalData.timeline[specifier]).length < 60 ?
			new Array(Object.keys(allHistoricalData.timeline[specifier]).length-1).fill(0) :
			new Array(60).fill(0));

	// state given
	if (statesMap.filter(element => element.name.toLowerCase() == place).length > 0) {
		const stateData = allHistoricalData.filter(element => {
			if (element.province) {
				return element.province.toLowerCase() == place;
			}
		});
		Object.keys(stateData[0].timeline[specifier]).slice(Object.keys(stateData[0].timeline[specifier]).length - chartData.length, chartData.length).forEach((date, index) => {
			chartData[index] += parseInt(stateData[0].timeline[specifier][date]);
		});
	}
	// country given
	else if (countries.indexOf(place) >= 0 || place == "us") {
		Object.keys(allHistoricalData.timeline[specifier]).slice(allHistoricalData.timeline[specifier].length - chartData.length, chartData.length).forEach((date, index) => {
			chartData[index] += parseInt(allHistoricalData.timeline[specifier][date]);
		})
	}
	// no place arg, overall
	else {
		for (var i = 0; i < allHistoricalData.length; i++) {
			// loop as many dates as 60 and add the specifier numbers to date
			Object.keys(allHistoricalData[i].timeline[specifier]).slice(allHistoricalData[i].timeline[specifier].length - chartData.length, chartData.length).forEach((date, index) => {
				chartData[index] += parseInt(allHistoricalData[i].timeline[specifier][date]);
			});
		}
	}
	console.log(asciichart.plot(chartData, {height: 22}))
	console.log(`            Data on ${specifier} in ${place != null ? place : ""} the last 60 days`);
}

async function main() {
	// one arg; either country or option
	if (process.argv.length == 3) {
		let arg = process.argv[2].toLowerCase()
		// overall country
		if (countries.indexOf(arg) >= 0) {
			const data = await apiCalls.processCountryData(arg);
			formatTable(data, null);
		}
		// overall state
		else if (helpers.isValidState(arg)) {
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name.toLocaleLowerCase();
			const data = await apiCalls.processAllStates();
			const stateData = helpers.getStateData(data, stateName);
			formatTable(stateData, null)
		}
		// overall option
		else if (options.indexOf(arg) >= 0) {
			helpers.checkArg(arg);
			if (arg == "-t") {
				//go through all countries and tally new cases/deaths
				const data0 = await apiCalls.processAllCountries();
				const data = helpers.calculateGlobalToday(data0);
				formatTable(data, arg)
			}
			if (arg[0] == "-" && arg[1] == "g") {
				const allHistoricalData = await apiCalls.processAllHistoricalData();
				graphData(allHistoricalData.slice(1), arg[2])	
			}
			if (arg == "--help") {
				outputHelpMenu()
			}
		}
		else console.log("Invalid argument. For help type coronatrack --help");
	}
	// two args; country and option or state
	else if (process.argv.length == 4) {
		let arg = process.argv[2].toLowerCase()
		// country with option
		if (countries.indexOf(arg) >= 0){
			const data = await apiCalls.processCountryData(arg);
			let arg2 = process.argv[3].toLowerCase();
			// make sure arg2 valid
			helpers.checkArg(arg2);
			// -g
			if (arg2[0] == "-" && arg2[1] == "g") {
				const allHistoricalData = await apiCalls.processCountryHistoricalData(arg == "usa" ? "us" : arg);
				console.log(allHistoricalData);
				graphData(allHistoricalData, arg2[2], arg == "usa" ? "us" : arg)
			}
			// other options
			else {
				formatTable(data, arg2);
			}
		}
		// state with option
		else if (helpers.isValidState(arg)) {
			let arg2 = process.argv[3].toLowerCase();
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name.toLocaleLowerCase();
			// -g
			if (arg2[0] == "-" && arg2[1] == "g") {
				const allHistoricalData = await apiCalls.processAllHistoricalData();
				graphData(allHistoricalData.slice(1), arg2[2], stateName.toLowerCase())
			}
			// other options
			else {
				const data = await apiCalls.processAllStates();
				const stateData = helpers.getStateData(data, stateName);
				formatTable(stateData, arg2)
			}
			
		}
		else console.log("invalid argument try coronacheck --help")
	}
	else {
		const data = await apiCalls.processAllData();
		formatTable(data, null)
	}
}

async function formatTable(data, option) {
	// today cases, today deaths
	if (option == "-t") {
		var t = new table({
			head: [colors.red('Today\'s new Cases'), colors.red('Today\'s Deaths')],
			colWidths: [22, 20],
			chars: charFormatting
		});
		t.push(
			[colors.white(data.todayCases), colors.white(data.todayDeaths)],
		);
		console.log("");
		console.log("Here is the latest data for Corona Virus today in " + (data.country || data.state) +  ", courtesy of Worldometers:");
		console.log(t.toString());
	}
	// cases, deaths, recovered, critical
	else {
		var t = new table({
			head: [colors.red('Cases'), colors.red('Deaths'), colors.red('Death Rate'), colors.green('Recovered')],
			colWidths: [13, 13, 15, 15],
			chars: charFormatting
		});
		t.push(
			[colors.white(data.cases), colors.white(data.deaths), colors.white((data.deaths*100/data.cases).toFixed(2).toString() + "%"), colors.white(data.recovered)],
		);
		console.log("");
		console.log("Here are the latest Corona Virus stats in " + (data.country || data.state) + ", courtesy of Worldometers:");
		console.log(t.toString());
	}
}

main();


