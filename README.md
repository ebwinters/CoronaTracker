# CoronaTracker
An application to track corona virus's effects at-a-glance in your terminal
## Installation
1. `npm install coronatrack`
2. `cd node_modules/coronatrack && npm install && npm link coronatrack`
## Usage
There are different ways to view data with coronatrack. You can view by country, by day, and/or by overall global. 
### By country (default USA if no argument)
`coronatrack countryName`
ex: `coronatrack usa` `coronatrack china`
### By today
`coronatrack countryName -t`
ex: `coronatrack China -t` `coronatrack Russia -t`
### Overall global
`coronatrack -o`
