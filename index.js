#!/usr/bin/env node
const fetch = require("node-fetch");
const table = require('cli-table');
console.log("Here are the latest Corona Virus stats, courtesy of Worldometers:");
console.log(process.argv);
fetch('https://corona.lmao.ninja/countries/USA')
	.then((response) => {
    	return response.json();
  	})
  	.then((data) => {
    	console.log(data.country + " data:");
		var t = new table({
		    head: ['Cases', 'Deaths'],
			colWidths: [100, 200]
		});
		t.push(
			[data.cases, data.deaths],
		);
		console.log(t.toString());
  	});
