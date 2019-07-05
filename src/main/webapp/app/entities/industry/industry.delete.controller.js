(function() {
    'use strict';

    angular
        .module('atSolApp')
        .controller('IndustryDeleteController', IndustryDeleteController);

    IndustryDeleteController.$inject = ['$scope', '$uibModalInstance', 'dataItem', 'AtsAlertService'];

    function IndustryDeleteController ($scope, $uibModalInstance, dataItem, AtsAlertService) {
        var vm = this;
        
        vm.dataItem = dataItem;

        vm.cancel = cancel;
        vm.deleteItem = deleteItem;

        init();

        function init(){
            console.log('init delete industry');
        }

        function deleteItem(){
            $uibModalInstance.close();
            AtsAlertService.success('Insdustry is deleted');
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
