(function() {
    'use strict';

    angular
        .module('atSolApp')
        .controller('IndustryDeleteController', IndustryDeleteController);

    IndustryDeleteController.$inject = ['$scope', '$uibModalInstance', 'dataItem', 'AtsAlertService', 'IndustryServices'];

    function IndustryDeleteController ($scope, $uibModalInstance, dataItem, AtsAlertService, IndustryServices) {
        var vm = this;
        
        vm.dataItem = dataItem;

        console.log('dataItem', vm.dataItem)

        vm.cancel = cancel;
        vm.deleteItem = deleteItem;

        init();

        function init(){
            console.log('init delete industry');
        }

        function deleteItem(){

            IndustryServices.update(
                {
                    pathMethod: 'delete',
                    id: vm.dataItem.ID,
                    category_code: vm.dataItem.Code 
                },{} ,function(res){
                    $uibModalInstance.close();
                    if(res.Error == null){
                        AtsAlertService.success('Insdustry is deleted');
                    }else{
                        AtsAlertService.error(res.Error.Message);
                    }
                    
                }, function(error){
                    $uibModalInstance.close();
                    AtsAlertService.error(error);
                }  
            )
            
        }

        function cancel(){
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
