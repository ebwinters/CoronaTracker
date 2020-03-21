#!/usr/bin/env node
const fetch = require("node-fetch");
const table = require('cli-table');
const asciichart = require ('asciichart')
var colors = require('colors');
const constants = require('./constants');

let options = constants.options, countries = constants.countries, charFormatting = constants.charFormatting, statesMap = constants.statesMap; 

function outputHelpMenu() {
	console.log("");
	console.log(colors.green("coronatrack:"), colors.white("information on global deaths, death rate, cases, and recovered"));
	console.log(colors.green("coronatrack {countryName}:"), colors.white("death, death rate, cases, and recovered information for a specific country"));
	console.log(colors.green("coronatrack {stateName}:"), colors.white("death, death rate, cases, and recovered information for a specific state"));
	console.log(colors.green("coronatrack -t:"), colors.white("new cases and new deaths. Can be added after countryname/statename arg as well"));
}

async function processCountryArgument(arg) {
	const response = await fetch(`https://corona.lmao.ninja/countries/${arg}`);
	const data = await response.json();
	return data;
}

async function processAllCountries() {
	const response = await fetch(`https://corona.lmao.ninja/countries`);
	const data = await response.json();
	return data;
}

async function processAllStates() {
	const response = await fetch(`https://corona.lmao.ninja/states`);
	const data = await response.json();
	return data;
}

async function processAllHistoricalData() {
	const response = await fetch(`https://corona.lmao.ninja/historical`);
	const data = await response.json();
	return data;
}

function getStateData(allData, arg) {
	const stateData = allData.filter(element => {
		return element.state.toLowerCase() == arg
	});
	if (stateData.length !== 1) {
		throw("incorrect state argument. Make sure to spell correctly.")
	}
	else return stateData[0];
}

function graphData(allHistoricalData, arg, place=null) {
	const specifier = {"c": "cases", "d": "deaths", "r": "recovered"}[arg];
	// initialize array of 0s based on how much data API is giving
	var chartData = allHistoricalData[0].timeline[specifier].length < 60 ?
		new Array(allHistoricalData[0].timeline[specifier].length-1).fill(0) :
		new Array(59).fill(0);

	// state given
	if (statesMap.filter(element => element.name == place).length > 0) {
		const stateData = allHistoricalData.filter(element => {
			if (element.province) {
				return element.province.toLowerCase() == place;
			}
		});
		Object.keys(stateData[0].timeline[specifier]).slice(stateData[0].timeline[specifier].length - chartData.length, chartData.length).forEach((date, index) => {
			chartData[index] += parseInt(stateData[0].timeline[specifier][date]);
		});
	}
	// country given
	else if (countries.indexOf(arg) >= 0) {

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
	console.log(`            Data on ${specifier} the last 60 days`);
}

async function main() {
	// one arg; either country or option
	if (process.argv.length == 3) {
		let arg = process.argv[2].toLowerCase()
		// overall country
		if (countries.indexOf(arg) >= 0) {
			const data = await processCountryArgument(arg);
			formatTable(data, null);
		}
		// overall state
		else if (statesMap.filter(element => element.abbreviation == arg).length > 0) {
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name;
			const data = await processAllStates();
			const stateData = getStateData(data, stateName);
			formatTable(stateData, null)
		}
		// overall option
		else if (options.indexOf(arg) >= 0) {
			if (arg == "-t") {
				//go thru all countries and tally new cases
				const data0 = await processAllCountries();
				var todayCases = 0, todayDeaths = 0, country = "all countries";
				data0.map(element => {
					todayCases += parseInt(element.todayCases);
					todayDeaths += parseInt(element.todayDeaths);
				});
				let data = {
					todayCases,
					todayDeaths,
					country
				};
				formatTable(data, arg)
			}
			if (arg[0] == "-" && arg[1] == "g") {
				const allHistoricalData = await processAllHistoricalData();
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
			const data = await processCountryArgument(arg);
			// TODO -G
			let arg2 = process.argv[3].toLowerCase();
			formatTable(data, arg2);
		}
		// state with option
		else if (statesMap.filter(element => element.abbreviation == arg).length > 0) {
			let arg2 = process.argv[3].toLowerCase();
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name;
			// -g
			if (arg2[0] == "-" && arg2[1] == "g") {
				// processAllHistoricalDat
				const allHistoricalData = await processAllHistoricalData();
				graphData(allHistoricalData.slice(1), arg2[2], stateName)
			}
			// other options
			else {
				const data = await processAllStates();
				const stateData = getStateData(data, stateName);
				formatTable(stateData, arg2)
			}
			
		}
		else console.log("Invalid argument")
	}
	else {
		const response = await fetch(`https://corona.lmao.ninja/all`);
		const data = await response.json();
		data.country = "general";
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


