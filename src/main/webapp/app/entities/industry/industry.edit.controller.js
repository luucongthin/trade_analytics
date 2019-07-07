(function() {
    'use strict';

    angular
        .module('atSolApp')
        .controller('IndustryEditController', IndustryEditController);

    IndustryEditController.$inject = ['$scope', '$uibModalInstance', 'dataItem', 'APP_CONSTANTS', 'IndustryServices', 'AtsAlertService'];

    function IndustryEditController ($scope, $uibModalInstance, dataItem, APP_CONSTANTS, IndustryServices, AtsAlertService) {
        var vm = this;

        vm.showAddNew = false;
        
        vm.cancel = cancel;
        vm.update = update; 
        vm.addNew = addNew;
        vm.dataItem = angular.copy(dataItem);
        
        vm.lstStatus = [];
        vm.lstIndustryGroup = [];
        vm.lstIndustryType = [];
        vm.deviceInfo = {}
        

        init();

        function init(){
            //console.log('init industry.edit.controller');

            if(vm.dataItem == null){
                vm.showAddNew = true;
            }else{
                vm.showAddNew = false;
            }
        }

        function update(){

            IndustryServices.update({
                    pathMethod: 'update'
                }, {
                    id: vm.dataItem.ID,
                    name: vm.dataItem.Name != '' ? vm.dataItem.Name : null,
                    title: vm.dataItem.Title != '' ? vm.dataItem.Title : null,
                    code: vm.dataItem.Code != '' ? vm.dataItem.Code : null,
                }, function (data) {
                    //$state.go('industry', {}, { reload: true });
                    $uibModalInstance.close();
                });
        }

        function addNew(){
            try{
                IndustryServices.update({
                    pathMethod: 'create'
                }, {
                    name: vm.dataItem.Name != '' ? vm.dataItem.Name : null,
                    title: vm.dataItem.Title != '' ? vm.dataItem.Title : null,
                    code: vm.dataItem.Code != '' ? vm.dataItem.Code : null,
                }, function (data) {
                    $uibModalInstance.close();
                    AtsAlertService.success('Industry is created');
                }, function (error){
                    AtsAlertService.error('Industry create fail');
                    $uibModalInstance.close();
                });
            }
            catch(error){
                AtsAlertService.error(error);
            }
            finally{
                $uibModalInstance.close();
            }
            
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }

        $(function () {
            angular.element('#kt_form_type, #kt_form_status, #kt_form_group').selectpicker();
        });
    }
})();
