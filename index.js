#!/usr/bin/env node
const fetch = require("node-fetch");
const table = require('cli-table');
var colors = require('colors');
const constants = require('./constants');

let options = constants.options, countries = constants.countries, charFormatting = constants.charFormatting, statesMap = constants.statesMap; 



async function main() {
	// one arg; either country or option
	if (process.argv.length == 3) {
		let arg = process.argv[2].toLowerCase()
		// country
		if (countries.indexOf(arg) >= 0) {
			const data = await processCountryArgument(arg);
			formatTable(data, null);
		}
		else if (statesMap.filter(element => element.abbreviation == arg).length > 0) {
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name;
			const data = await processAllStates();
			const stateData = getStateData(data, stateName);
			formatTable(stateData, null)
		}
		// option
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
			if (arg == "--help") {
				process.stdout.write('\033c');
				console.log(colors.white("coronatrack:"), colors.red("information on global deaths, death rate, cases, and recovered"));
				console.log(colors.white("coronatrack {countryName}:"), colors.red("death, death rate, cases, and recovered information for a specific country"));
				console.log(colors.white("coronatrack -t:"), colors.red("new cases and new deaths. Can be added after countryname arg as well"));
			}
		}
		else console.log("Invalid argument");
	}
	// two args; country and option or state
	else if (process.argv.length == 4) {
		let arg = process.argv[2].toLowerCase()
		if (countries.indexOf(arg) >= 0){
			const data = await processCountryArgument(arg);
			let arg2 = process.argv[3].toLowerCase();
			formatTable(data, arg2);
		}
		else if (statesMap.filter(element => element.abbreviation == arg).length > 0) {
			let arg2 = process.argv[3].toLowerCase();
			const stateName = statesMap.filter(element => element.abbreviation == arg)[0].name;
			const data = await processAllStates();
			const stateData = getStateData(data, stateName);
			formatTable(stateData, arg2)
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

function getStateData(allData, arg) {
	const stateData = allData.filter(element => {
		return element.state.toLowerCase() == arg
	});
	if (stateData.length !== 1) {
		throw("incorrect state argument. Make sure to spell correctly.")
	}
	else return stateData[0];
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
		process.stdout.write('\033c');
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
		process.stdout.write('\033c');
		console.log("Here are the latest Corona Virus stats in " + (data.country || data.state) + ", courtesy of Worldometers:");
		console.log(t.toString());
	}
}

main();


