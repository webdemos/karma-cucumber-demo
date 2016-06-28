'use strict';

angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope, DataService) {

    var todosInStore = DataService.getTODOs('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
        DataService.addTODOs('todos', $scope.todos);
    }, true);

    // Uncomment if you are disabling persistence
    // $scope.todos = [];

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

  });
