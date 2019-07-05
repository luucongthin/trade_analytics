(function() {
    'use strict';

    angular
        .module('atSolApp')
        .factory('LegislationServices', LegislationServices);

    LegislationServices.$inject = ['$resource'];

    function LegislationServices ($resource) {
        var service = $resource('api/legislation', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });

        return service;
    }
})();
