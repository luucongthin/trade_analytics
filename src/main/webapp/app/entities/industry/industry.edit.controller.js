(function() {
    'use strict';

    angular
        .module('atSolApp')
        .controller('IndustryEditController', IndustryEditController);

    IndustryEditController.$inject = ['$scope', '$uibModalInstance', 'dataItem', 'APP_CONSTANTS'];

    function IndustryEditController ($scope, $uibModalInstance, dataItem, APP_CONSTANTS) {
        var vm = this;

        vm.showAddNew = false;
        
        vm.cancel = cancel;
        vm.update = update; 
        vm.dataItem = angular.copy(dataItem);
        
        vm.lstStatus = [];
        vm.lstIndustryGroup = [];
        vm.lstIndustryType = [];
        vm.deviceInfo = {}
        

        init();

        function init(){
            console.log('init industry.edit.controller');

            if(vm.dataItem == null){
                vm.showAddNew = true;
            }else{
                vm.showAddNew = false;
            }
        }

        function update(){
            $uibModalInstance.close();
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        $(function () {
            angular.element('#kt_form_type, #kt_form_status, #kt_form_group').selectpicker();
        });
    }
})();
