#!/usr/bin/env node
const fetch = require("node-fetch");
console.log("Here are the latest Corona Virus stats, courtesy of Worldometers:");
console.log(process.argv);
fetch('https://corona.lmao.ninja/countries/USA')
	.then((response) => {
    	return response.json();
  	})
  	.then((data) => {
    	console.log(data);
  	});
