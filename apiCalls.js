const fetch = require("node-fetch");

async function processAllData() {
    const response = await fetch(`https://disease.sh/v2/all`);
    const data = await response.json();
    data.country = "general";
    return data;
}

async function processCountryData(arg) {
	const response = await fetch(`https://disease.sh/v2/countries/${arg}`);
	const data = await response.json();
	return data;
}

async function processAllCountries() {
	const response = await fetch(`https://disease.sh/v2/countries`);
	const data = await response.json();
	return data;
}

async function processAllStates() {
	const response = await fetch(`https://disease.sh/v2/states`);
	const data = await response.json();
	return data;
}

async function processAllHistoricalData() {
	const response = await fetch(`https://disease.sh/v2/v2/historical`);
	const data = await response.json();
	return data;
}

async function processCountryHistoricalData(arg) {
	const response = await fetch(`https://disease.sh/v2/v2/historical/${arg}`);
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