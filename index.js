#!/usr/bin/env node
const fetch = require("node-fetch");
const table = require('cli-table');
var colors = require('colors');

const charFormatting = { 
	'top': colors.white('='), 'top-mid': colors.white('╤') , 'top-left': colors.white('╔') , 'top-right': colors.white('╗'),
	'bottom': colors.white('═') , 'bottom-mid': colors.white('╧') , 'bottom-left': colors.white('╚') , 'bottom-right': colors.white('╝'),
	'left': colors.white('║') , 'left-mid': colors.white('╟') , 'mid': colors.white('─') , 'mid-mid': colors.white('┼'),
	'right': colors.white('║') , 'right-mid': colors.white('╢') , 'middle': colors.white('│')
};
const countries = [
	"china", "italy", "iran", "spain", "germany", "s. korea", "france", "usa", "switzerland", "uk",
	"netherlands", "norway", "austria", "belgium", "sweden", "denmark", "japan", "diamond princess",
	"malaysia", "canada", "australia", "portugal", "qatar", "czechia", "greece", "israel", "finland",
	"brazil", "ireland", "slovenia", "singapore", "pakistan", "bahrain", "iceland", "poland", "estonia",
	"romania", "chile", "egypt", "philippines", "thailand", "indonesia", "saudi arabia", "hong kong", "iraq",
	"india", "luxembourg", "kuwait", "lebanon", "san marino", "peru", "russia", "ecuador", "uae", "slovakia", "mexico",
	"bulgaria", "armenia", "taiwan", "serbia", "panama", "croatia", "argentina", "vietnam", "colombia", "south africa",
	"algeria", "latvia", "brunei", "albania", "hungary", "cyprus", "faeroe islands", "turkey", "morocco", "sri lanka",
	"costa rica", "palestine", "jordan", "andorra", "malta", "belarus", "azerbaijan", "georgia", "cambodia", "kazakhstan",
	"venezuela", "north macedonia", "moldova", "uruguay", "senegal", "bosnia and herzegovina", "lithuania", "oman", "tunisia",
	"afghanistan", "dominican republic", "liechtenstein", "martinique", "burkina faso", "ukraine", "macao", "maldives",
	"new zealand", "jamaica", "bolivia", "french guiana", "uzbekistan", "bangladesh", "cameroon", "monaco",
	"paraguay", "réunion", "guatemala", "honduras", "guyana", "ghana", "rwanda", "channel islands", "ethiopia",
	"guadeloupe", "cuba", "guam", "mongolia", "puerto rico", "trinidad and tobago", "ivory coast", "kenya", "seychelles",
	"nigeria", "aruba", "curaçao", "drc", "french polynesia", "gibraltar", "st. barth", "barbados", "liberia", "montenegro",
	"namibia", "saint lucia", "saint martin", "u.s. virgin islands", "cayman islands", "sudan", "nepal", "antigua and barbuda",
	"bahamas", "benin", "bhutan", "car", "congo", "equatorial guinea", "gabon", "greenland", "guinea", "vatican city",
	"mauritania", "mayotte", "st. vincent grenadines", "somalia", "suriname", "eswatini", "tanzania", "togo"
];
const options = [
	"-t",	// today
];

async function main() {
	// one arg; either country or option
	if (process.argv.length == 3) {
		let arg = process.argv[2].toLowerCase()
		// country
		if (countries.indexOf(arg) >= 0) {
			const data = await processCountryArgument(arg);
			formatTable(data, null);
		}
		// overall
		else if (arg == "-o") {
			const response = await fetch(`https://corona.lmao.ninja/countries`);
			const data = await response.json();
			formatTable(data, arg)
		}
		// option
		else if (options.indexOf(arg) >= 0) {
			const data = await processCountryArgument("usa");
			formatTable(data, arg);
		}
		else console.log("Invalid argument");
	}
	// two args; country and option
	else if (process.argv.length == 4) {
		let arg = process.argv[2].toLowerCase()
		if (countries.indexOf(arg) >= 0){
			const data = await processCountryArgument(arg);
			let arg2 = process.argv[3].toLowerCase();
			formatTable(data, arg2);
		}
		else console.log("Invalid argument")
	}
	else {
		console.log("Add a country or an option. Check https://github.com/ebwinters/CoronaTracker for instructions.")
	}
}

async function processCountryArgument(arg) {
	const response = await fetch(`https://corona.lmao.ninja/countries/${arg}`);
	const data = await response.json();
	return data;
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
		console.log("Here are the latest data for Corona Virus today in " + data.country +  ", courtesy of Worldometers:");
		console.log(t.toString());
	}
	// cases, deaths, recovered, critical
	else if (option == "-o") {
		var totalCases = 0, totallDeaths = 0, totalRecovered = 0, totalCritical = 0;
		data.map(element => {
			totalCases += parseInt(element.cases);
			totallDeaths += parseInt(element.deaths);
			totalRecovered += parseInt(element.recovered);
			totalCritical += parseInt(element.critical);
		});
		var t = new table({
			head: [colors.red('Cases'), colors.red('Deaths'), colors.red('Death Rate'), colors.green('Recovered'), colors.yellow('Critical')],
			colWidths: [13, 13, 15, 15, 15],
			chars: charFormatting
		});
		t.push(
			[colors.white(totalCases), colors.white(totallDeaths), colors.white((totallDeaths*100/totalCases).toFixed(2).toString() + "%"), colors.white(totalRecovered), colors.white(totalCritical)],
		);
		process.stdout.write('\033c');
		console.log("Here are the latest Corona Virus stats for " + data.country +  ", courtesy of Worldometers:");
		console.log(t.toString());
	}
	// cases, deaths, recovered, critical
	else {
		var t = new table({
			head: [colors.red('Cases'), colors.red('Deaths'), colors.red('Death Rate'), colors.green('Recovered'), colors.yellow('Critical')],
			colWidths: [13, 13, 15, 15, 15],
			chars: charFormatting
		});
		t.push(
			[colors.white(data.cases), colors.white(data.deaths), colors.white((data.deaths*100/data.cases).toFixed(2).toString() + "%"), colors.white(data.recovered), colors.white(data.critical)],
		);
		process.stdout.write('\033c');
		console.log("Here are the latest Corona Virus stats for " + data.country +  ", courtesy of Worldometers:");
		console.log(t.toString());
	}
}

main();