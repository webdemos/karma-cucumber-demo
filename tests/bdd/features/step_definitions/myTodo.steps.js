(function (adapter) {
    adapter.addStepDefinitions(function (scenario) {
    
        window.Cucumber.callback(scenario);

        scenario.World = function () {};
        var proto = scenario.World.prototype;

        var $rootScope,
            $scope,
            $controller,
            $httpBackend,
            $location,
            $route,
            $templateCache,
            $compile,
            localStorageService;

        var elm,
            input,
            ngModel,
            expected = {},
            taskList,
            originalTasks,
            tasksAfter;
    
        function goto(route) {
        
            if (route) {
                var rootRoute = $route.routes[route];
                expected.controller = rootRoute.controller;
                expected.templateUrl = rootRoute.templateUrl;
            
                $location.path(route);
                $rootScope.$digest();
            
                expect($route.current.templateUrl).to.equal(expected.templateUrl);
                expect($route.current.controller).to.equal(expected.controller);
            } else {
                expected.path = $route.routes[route].redirectTo;
            
                $location.path(route);
                $rootScope.$digest();
            
                expect($location.path()).to.equal(expected.path);
            }
        }
    
        function compileElement() {
            elm = $compile(angular.element(elm))($scope);
            $scope.$digest();
        }
    
        function add() {
            elm.find('input[type=submit]').click();
            $scope.$digest();
        }
    
        function remove() {
            taskList = elm.find('div[ng-model=todos]');
            var xbtns = taskList.find('button');
            xbtns.eq(0).click();
        
            $scope.$digest();
        }
    
        function getAllTasks() {
            taskList = elm.find('div[ng-model=todos]');
            return taskList.find('input[ng-model=todo]');
        }
    
        function inputText(text) {
            input = elm.find('input[ng-model=todo]');
            ngModel = input.eq(0).controller('ngModel');
            ngModel.$setViewValue(text);
        }

        proto.Before = function () {

            module('mytodoApp');
            module('cacheTemplates');

            inject(function (
                _$rootScope_
                ,_$controller_
                ,_$httpBackend_
                ,_$location_
                ,_$route_
                ,_$templateCache_
                ,_$compile_
                ,_localStorageService_
            ) {
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();
                $controller = _$controller_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
                $route = _$route_;
                $templateCache = _$templateCache_;
                $compile = _$compile_;
                localStorageService = _localStorageService_;
            });

        };

        proto.After = function () {
            
            localStorageService.clearAll();

            input = null;
            taskList = null;
            originalTasks = null;
            tasksAfter = null;
        };

        scenario.Given(/^Go to MyToDo Page$/, function (callback) {

            this.Before();
            
            goto('/');

            $controller($route.current.controller, {$scope: $scope});

            elm = $route.current.locals.$template;
            compileElement();

            // get all tasks
            originalTasks = getAllTasks();

            // goto(null);
            callback();
        });
        scenario.Given(/^Input what I want to do in the textbox$/, function (callback) {
            inputText('Wash hands');
            callback();
        });

        scenario.When(/^I click \[add\] button$/, function (callback) {
            add();
            tasksAfter = getAllTasks();
            callback();
        });

        scenario.Then(/^one task record is generated\.$/, function (callback) {
            expect(tasksAfter.length - originalTasks.length).to.equal(1);

            this.After();
            callback();
        });



        scenario.Given(/^I add one task$/, function (callback) {
            
            goto('/');

            $controller($route.current.controller, {$scope: $scope});

            elm = $route.current.locals.$template;
            compileElement();

            inputText('Wash hands');

            add();

            // get originalTasks tasks
            originalTasks = getAllTasks();

            callback();
        });

        scenario.Given(/^At least one record exists in MyToDo Page$/, function (callback) {
            expect(originalTasks).to.have.length.of.at.least(1);
            callback();
        });

        scenario.When(/^I press \[X\] button of one record$/, function (callback) {
            remove();
            callback();
        });

        scenario.Then(/^The task record is removed\.$/, function (callback) {
            tasksAfter = getAllTasks();
            expect(originalTasks.length - tasksAfter.length).to.equal(1);
            callback();
        });
    });
})(__adapter__);
var myStepDefinitionsWrapper = function () {
    
    this.Given(/^Go to MyToDo Page$/, function (callback) {
        callback.pending();
    });
};
module.exports = myStepDefinitionsWrapper;