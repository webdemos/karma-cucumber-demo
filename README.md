# Karmar Cucumber Demo


## Generate Step Definitions

Copy you feature file to step_factories folder(please note generate one feature's steps once), and then run below npm command:

`$ npm run ut:cucumber-steps`

After run this command, a .temp folder will generated under step_factories folder. And there will be a file 
with suffix `.steps.js` under .temp folder, you can change it's content by modify `javascript_syntax.js`.


## Start UT

Before starting it's better for you to take a look at [angular-midway](https://www.npmjs.com/package/angular-midway) first.

`$ npm run ut:cucumber`


## Report

1. Code coverage report.
1. BDD feature report.
1. Jasmine style report.
1. A beautiful angular style report.


## TODO:

1. Enhance angular midway.
1. Fix issue of karma-cucumber-js.
1. Add E2E testing with Cucumber.
1. Add unit testing with karma-jasmine-feature


## Issues



