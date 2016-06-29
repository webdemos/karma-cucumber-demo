(function (adapter) {
    adapter.addStepDefinitions(function (scenario) {
        
        scenario.Given(/^a variable set to (\d+)$/, function (arg1, callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });
        
        scenario.When(/^I increment the variable by (\d+)$/, function (arg1, callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });
        
        scenario.Then(/^the variable should contain (\d+)$/, function (arg1, callback) {
            // Write code here that turns the phrase above into concrete actions
            callback();
        });

    });
})(__adapter__);
