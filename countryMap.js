const constants = require('./constants');

/**
 * Takes a country name and gives back the standardized name, if a change is needed
 */
function standardizeCountryName(countryName) {
    const possibleMapping = constants.countryMapping.filter(mapping => mapping.possibleNames.indexOf(countryName) >= 0);
    return (possibleMapping.length == 1 ? possibleMapping[0].standardizedName : countryName.toLowerCase());
}

module.exports = {
    standardizeCountryName
}