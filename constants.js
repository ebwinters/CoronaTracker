var colors = require('colors');

const statesMap = [
    {
        "name": "alabama",
        "abbreviation": "al"
    },
    {
        "name": "alaska",
        "abbreviation": "ak"
    },
    {
        "name": "american samoa",
        "abbreviation": "as"
    },
    {
        "name": "arizona",
        "abbreviation": "az"
    },
    {
        "name": "arkansas",
        "abbreviation": "ar"
    },
    {
        "name": "california",
        "abbreviation": "ca"
    },
    {
        "name": "colorado",
        "abbreviation": "co"
    },
    {
        "name": "connecticut",
        "abbreviation": "ct"
    },
    {
        "name": "delaware",
        "abbreviation": "de"
    },
    {
        "name": "district Of Columbia",
        "abbreviation": "dc"
    },
    {
        "name": "federated States Of Micronesia",
        "abbreviation": "fm"
    },
    {
        "name": "florida",
        "abbreviation": "fl"
    },
    {
        "name": "georgia",
        "abbreviation": "ga"
    },
    {
        "name": "guam",
        "abbreviation": "gu"
    },
    {
        "name": "hawaii",
        "abbreviation": "hi"
    },
    {
        "name": "idaho",
        "abbreviation": "id"
    },
    {
        "name": "illinois",
        "abbreviation": "il"
    },
    {
        "name": "indiana",
        "abbreviation": "in"
    },
    {
        "name": "iowa",
        "abbreviation": "ia"
    },
    {
        "name": "kansas",
        "abbreviation": "ks"
    },
    {
        "name": "kentucky",
        "abbreviation": "ky"
    },
    {
        "name": "louisiana",
        "abbreviation": "la"
    },
    {
        "name": "maine",
        "abbreviation": "me"
    },
    {
        "name": "marshall Islands",
        "abbreviation": "mh"
    },
    {
        "name": "maryland",
        "abbreviation": "md"
    },
    {
        "name": "massachusetts",
        "abbreviation": "ma"
    },
    {
        "name": "michigan",
        "abbreviation": "mi"
    },
    {
        "name": "minnesota",
        "abbreviation": "mn"
    },
    {
        "name": "mississippi",
        "abbreviation": "ms"
    },
    {
        "name": "missouri",
        "abbreviation": "mo"
    },
    {
        "name": "montana",
        "abbreviation": "mt"
    },
    {
        "name": "nebraska",
        "abbreviation": "ne"
    },
    {
        "name": "nevada",
        "abbreviation": "nv"
    },
    {
        "name": "new Hampshire",
        "abbreviation": "nh"
    },
    {
        "name": "new Jersey",
        "abbreviation": "nj"
    },
    {
        "name": "new Mexico",
        "abbreviation": "nm"
    },
    {
        "name": "new York",
        "abbreviation": "ny"
    },
    {
        "name": "north Carolina",
        "abbreviation": "nc"
    },
    {
        "name": "north Dakota",
        "abbreviation": "nd"
    },
    {
        "name": "northern Mariana Islands",
        "abbreviation": "mp"
    },
    {
        "name": "ohio",
        "abbreviation": "oh"
    },
    {
        "name": "oklahoma",
        "abbreviation": "ok"
    },
    {
        "name": "oregon",
        "abbreviation": "or"
    },
    {
        "name": "palau",
        "abbreviation": "pw"
    },
    {
        "name": "pennsylvania",
        "abbreviation": "pa"
    },
    {
        "name": "puerto Rico",
        "abbreviation": "pr"
    },
    {
        "name": "rhode Island",
        "abbreviation": "ri"
    },
    {
        "name": "south Carolina",
        "abbreviation": "sc"
    },
    {
        "name": "south Dakota",
        "abbreviation": "sd"
    },
    {
        "name": "tennessee",
        "abbreviation": "tn"
    },
    {
        "name": "texas",
        "abbreviation": "tx"
    },
    {
        "name": "utah",
        "abbreviation": "ut"
    },
    {
        "name": "vermont",
        "abbreviation": "vt"
    },
    {
        "name": "virgin Islands",
        "abbreviation": "vi"
    },
    {
        "name": "virginia",
        "abbreviation": "va"
    },
    {
        "name": "washington",
        "abbreviation": "wa"
    },
    {
        "name": "west Virginia",
        "abbreviation": "wv"
    },
    {
        "name": "wisconsin",
        "abbreviation": "wi"
    },
    {
        "name": "wyoming",
        "abbreviation": "wy"
    }
];

const charFormatting = { 
	'top': colors.white('='), 'top-mid': colors.white('╤') , 'top-left': colors.white('╔') , 'top-right': colors.white('╗'),
	'bottom': colors.white('═') , 'bottom-mid': colors.white('╧') , 'bottom-left': colors.white('╚') , 'bottom-right': colors.white('╝'),
	'left': colors.white('║') , 'left-mid': colors.white('╟') , 'mid': colors.white('─') , 'mid-mid': colors.white('┼'),
	'right': colors.white('║') , 'right-mid': colors.white('╢') , 'middle': colors.white('│')
};

const countries = [
    "china", "italy", "usa", "spain", "germany", "iran", "france", "s. korea", "switzerland", "uk", "netherlands", 
    "belgium", "austria", "norway", "sweden", "portugal", "denmark", "canada", "australia", "malaysia", "brazil", 
    "japan", "czech republic", "turkey", "israel", "luxembourg", "ecuador", "ireland", "diamond princess", "pakistan", 
    "chile", "finland", "greece", "thailand", "iceland", "poland", "indonesia", "saudi arabia", "qatar", "singapore", 
    "romania", "slovenia", "india", "philippines", "russia", "bahrain", "estonia", "peru", "hong kong", "egypt", "croatia", 
    "mexico", "lebanon", "panama", "south africa", "iraq", "colombia", "argentina", "serbia", "dominican republic",
    "algeria", "armenia", "kuwait", "bulgaria", "slovakia", "san marino", "taiwan", "uae", "latvia", "uruguay", "hungary", 
    "lithuania", "costa rica", "north macedonia", "faeroe islands", "andorra", "vietnam", "morocco", "jordan", "cyprus",
    "bosnia", "moldova", "malta", "albania", "brunei", "cambodia", "sri lanka", "belarus", "burkina faso", 
    "tunisia", "venezuela", "new zealand", "azerbaijan", "kazakhstan", "palestine", "guadeloupe", "senegal", "oman", "georgia", 
    "trinidad and tobago", "ukraine", "réunion", "uzbekistan", "cameroon", "martinique", "liechtenstein", "afghanistan", 
    "channel islands", "drc", "bangladesh", "guam", "nigeria", "honduras", "mauritius", "bolivia", "puerto rico", "paraguay",
    "macao", "cuba", "ghana", "jamaica", "guyana", "monaco", "french guiana", "guatemala", "rwanda", "montenegro", "togo", 
    "french polynesia", "gibraltar", "kenya", "barbados", "ivory coast", "kyrgyzstan", "maldives", "tanzania", "ethiopia", 
    "mayotte", "mongolia", "aruba", "seychelles", "equatorial guinea", "u.s. virgin islands", "gabon", "isle of man", 
    "saint martin", "suriname", "bahamas", "new caledonia", "eswatini", "cayman islands", "curaçao", "cabo verde", "car", 
    "congo", "el salvador", "liberia", "madagascar", "namibia", "st. barth", "zambia", "zimbabwe", "sudan", "angola", "benin", 
    "bermuda", "bhutan", "fiji", "greenland", "guinea", "haiti", "mauritania", "nicaragua", "niger", "saint lucia", "nepal", 
    "antigua and barbuda", "chad", "djibouti", "eritrea", "gambia", "vatican city", "montserrat", "mozambique", 
    "papua new guinea", "st. vincent grenadines", "sint maarten", "somalia", "timor-leste", "uganda",
];

const options = [
    "-t",	// today
    "-gd",    // historical graphs deaths
    "-gc",    // historical graphs cases
    "-gr",    // historical graphs recovered
	"--help",	// help
];

const countryMapping = [
    {possibleNames: ["us", "united states of america", "america", "united states"], standardizedName: "usa"},
    {possibleNames: ["south korea"], standardizedName: "s. korea"},
    {possibleNames: ["united kingdom", "england"], standardizedName: "uk"},
    {possibleNames: ["dr"], standardizedName: "dominican republic"},
    {possibleNames: ["united arab emirates"], standardizedName: "uae"},
    {possibleNames: ["bosnia and herzegovina"], standardizedName: "bosnia"},
    {possibleNames: ["virgin islands"], standardizedName: "u.s. virgin islands"},
    {possibleNames: ["czechia"], standardizedName: "czech republic"},
    {possibleNames: ["méxico"], standardizedName: "mexico"},
    {possibleNames: ["brasil"], standardizedName: "brazil"},
    {possibleNames: ["panamá"], standardizedName: "panama"},
];

module.exports = {
    statesMap,
    charFormatting,
    countries,
    options,
    countryMapping
}