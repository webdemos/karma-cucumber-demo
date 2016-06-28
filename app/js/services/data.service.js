'use strict';

angular.module('mytodoApp')
    .service('DataService', function ($rootScope, localStorageService) {

        function getTODOs(key) {
            return localStorageService.get(key);
        }

        function addTODOs(key, value) {
            localStorageService.add(key, value);
        }

        return {
            getTODOs: getTODOs,
            addTODOs: addTODOs
        };
    });

