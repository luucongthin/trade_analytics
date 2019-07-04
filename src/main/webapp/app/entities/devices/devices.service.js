(function() {
    'use strict';

    angular
        .module('atSolApp')
        .factory('DeviceServices', DeviceServices);

    DeviceServices.$inject = ['$resource'];

    function DeviceServices ($resource) {
        var service = $resource('api/categories/:pathMethod', {}, {
            'get': {
                method: 'GET',
            },
            'update': {
                method: 'POST',
            },
            'save': {
                method: 'POST',
            }
        });

        return service;
    }
})();
