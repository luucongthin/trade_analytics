(function() {
    'use strict';

    angular
        .module('atSolApp')
        .factory('IndustryServices', IndustryServices);

    IndustryServices.$inject = ['$resource'];

    function IndustryServices ($resource) {
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
