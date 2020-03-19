# CoronaTracker
An application to track corona virus's effects at-a-glance in your terminal
## Installation
1. `npm install -g coronatrack`
## Usage
There are different ways to view data with coronatrack. You can view by country, by day, and/or by overall global. 
### Overall
`coronatrack` gives you information on global deaths, death rate, cases, and recovered,
### By country
`coronatrack countryName` gives you death, death rate, cases, and recovered information for a specific country.
ex: `coronatrack usa` `coronatrack china`
### By state
`coronatrack countryName` gives you death, death rate, cases, and recovered information for a specific state.
ex: `coronatrack il` `coronatrack nj`
### By today
`coronatrack countryName -t`gives you new cases and new deaths for a specific country, state, or overall.
ex: `coronatrack china -t` `coronatrack -t` `coronatrack ny -t`
### Help
`coronatrack --help` gives you a full list of commands.

