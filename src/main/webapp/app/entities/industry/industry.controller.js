
(function() {
    'use strict';

    angular
        .module('atSolApp')
        .controller('IndustryController', IndustryController);

    IndustryController.$inject = ['$scope', '$uibModal', '$state', 'IndustryServices', 'AtsAlertService'];

    function IndustryController ($scope, $uibModal, $state, IndustryServices, AtsAlertService) {
        var vm = this;

        vm.checkedAllItem = false;
        vm.deleteManyItem = false;

        vm.totalItems = 175;
        
        vm.lstData = [];

        vm.changeCheckAllItem = changeCheckAllItem;
        vm.changeCheckedItem = changeCheckedItem;
        vm.editItem = editItem;
        vm.deleteItem = deleteItem;
        vm.addNewItem = addNewItem;
        vm.searchIndustry = searchIndustry;
        vm.clearSearch = clearSearch;


        init()

        function init(){
            console.log('init device controller');

            vm.searchData = {
                currentPage: 1
            }

            searchIndustry();
        }

        function searchIndustry(){
            IndustryServices.get(
            {
                page: vm.searchData.page,
                name: vm.searchData.name ? vm.searchData.name : null   
            },
            function(response){
                var lstData = response.Data;
                vm.lstData = angular.copy(lstData);
            }, function(error){
                console.log('get deivce group', error);
            });
        }

        function clearSearch(){
            init();
        }

        function editItem(item){
            $uibModal.open({
                animation: true,
                templateUrl: 'app/entities/industry/industry.edit.html',
                controller: 'IndustryEditController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                  dataItem: function () {
                    return item;
                  }
                }
            });
        }

        function addNewItem(){
            var addNewModal = $uibModal.open({
                animation: true,
                templateUrl: 'app/entities/industry/industry.edit.html',
                controller: 'IndustryEditController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                  dataItem: function () {
                    return null;
                  }
                }
            });

            addNewModal.result.then(function (data) {
                init();
            }, function (error) {
                console.log('error', error);
            });
        }

        function deleteItem(item){
            var deleteModel = $uibModal.open({
                animation: true,
                templateUrl: 'app/entities/industry/industry.delete.html',
                controller: 'IndustryDeleteController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                  dataItem: function () {
                    return item;
                  }
                }
            });

            deleteModel.result.then(function (data) {
                init();
            }, function (error) {
                console.log('error', error);
            });
        }

        function changeCheckAllItem(){
            angular.forEach(vm.lstData, function(element){
                element.checked = vm.checkedAllItem
            });

            vm.deleteManyItem = vm.checkedAllItem;
        }

        function changeCheckedItem(){
            var count = 0;
            
            angular.forEach(vm.lstData, function(element){
                if(element.checked ){
                    count ++
                }
            });

            if (count == vm.lstData.length){
                vm.checkedAllItem = true;
            }else{
                vm.checkedAllItem = false;
            }

            vm.deleteManyItem = count > 0 ? true : false;
        }

        $(function () {
            angular.element('#kt_form_status,#kt_form_type').selectpicker();

            const ps = new PerfectScrollbar('#perfectScrollTable');
        });
        
    }
})();
