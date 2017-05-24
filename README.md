# Karmar Cucumber Demo


## Generate Step Definitions

Copy you feature file to step_factories folder(please note generate one feature's steps once), and then run below npm command:

`$ npm run ut:cucumber:create-steps`

After run this command, a .temp folder will generated under step_factories folder. And there will be a file 
with suffix `.steps.js` under .temp folder, you can change it's content by modify `javascript_syntax.js`.


## Start UT

Before starting it's better for you to take a look at [angular-midway](https://www.npmjs.com/package/angular-midway) first.

`$ npm run ut:cucumber`


## Report

1. Code coverage report.
1. [BDD feature report](https://www.npmjs.com/package/cucumber-html-reporter).
1. [Jasmine style report](https://github.com/dtabuenc/karma-html-reporter).
1. [A beautiful angular style report](https://github.com/jcdalton2201/karma-hy-html-reporter).


## TODO:

1. Enhance angular midway.
1. Add E2E testing with Cucumber.
1. Add unit testing with karma-jasmine-feature


## Issues

Any issues defected please submit [here](https://github.com/angular-midway/angular-midway/issues)



