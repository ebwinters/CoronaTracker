var colors = require('colors');
const constants = require('./constants');
let options = constants.options, statesMap = constants.statesMap;

/**
 * Filters data for a specific state
 */
function getStateData(allData, arg) {
	const stateData = allData.filter(element => {
		return element.state.toLowerCase() == arg
	});
	if (stateData.length !== 1) {
		throw("invalid argument try coronatrack --help")
	}
	else {
		stateData[0].recovered = stateData[0].cases - stateData[0].deaths - stateData[0].active;
		return stateData[0];
	} 
}

/**
 * Checks is option is valid
 */
function checkArg(arg) {
	if (options.indexOf(arg) < 0) {
		console.log("invalid argument try coronatrack --help");
		process.exit(1)
	}
}

/**
 * Outputs help menu for --help option
 */
function outputHelpMenu() {
	console.log("");
	console.log(colors.green("coronatrack:"), colors.white("information on global deaths, death rate, cases, and recovered"));
	console.log(colors.green("coronatrack {countryName}:"), colors.white("death, death rate, cases, and recovered information for a specific country"));
	console.log(colors.green("coronatrack {stateName}:"), colors.white("death, death rate, cases, and recovered information for a specific state"));
    console.log(colors.green("coronatrack -t:"), colors.white("new cases and new deaths. Can be added after countryname/statename arg as well"));
    console.log(colors.green("coronatrack -gd/-gc:"), colors.white("graphs for deaths/cases. Can be added after countryname arg as well"));
}

/**
 * Checks if a state argument is valid
 * @param {*} arg 
 */
function isValidState(arg) {
    return statesMap.filter(element => element.abbreviation == arg).length > 0 ? true : false;
}

/**
 * 
 * @param {*} data0 
 */
function calculateGlobalToday(data0) {
    var todayCases = 0, todayDeaths = 0, country = "all countries";
    data0.map(element => {
    	todayCases += parseInt(element.todayCases);
    	todayDeaths += parseInt(element.todayDeaths);
    });
    return {
    	todayCases,
    	todayDeaths,
    	country
    };
};

/**
 * Takes a country name and gives back the standardized name, if a change is needed
 */
function standardizeCountryName(countryName) {
    const possibleMapping = constants.countryMapping.filter(mapping => mapping.possibleNames.indexOf(countryName) >= 0);
    return (possibleMapping.length == 1 ? possibleMapping[0].standardizedName : countryName.toLowerCase());
}

module.exports = {
    getStateData,
    checkArg,
    outputHelpMenu,
    isValidState,
	calculateGlobalToday,
	standardizeCountryName
}