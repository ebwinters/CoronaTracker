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
	"-n"	//new cases
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
			if (arg == "-n") {
				// sort endpoint new cases
			}
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
		const response = await fetch(`https://corona.lmao.ninja/all`);
		const data = await response.json();
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
		console.log("Here is the latest data for Corona Virus today in " + data.country +  ", courtesy of Worldometers:");
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
		console.log("Here are the latest Corona Virus stats, courtesy of Worldometers:");
		console.log(t.toString());
	}
}

main();