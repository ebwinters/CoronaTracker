const fetch = require("node-fetch");

async function processAllData() {
    const response = await fetch(`https://corona.lmao.ninja/all`);
    const data = await response.json();
    data.country = "general";
    return data;
}

async function processCountryData(arg) {
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

async function processCountryHistoricalData(arg) {
	const response = await fetch(`https://corona.lmao.ninja/historical/${arg}`);
	const data = await response.json();
	return data;
}

module.exports = {
    processAllData,
    processCountryData,
    processAllCountries,
    processAllStates,
    processAllHistoricalData,
    processCountryHistoricalData
}