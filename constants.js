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
	"--help",	// help
];

module.exports = {
    statesMap,
    charFormatting,
    countries,
    options
}