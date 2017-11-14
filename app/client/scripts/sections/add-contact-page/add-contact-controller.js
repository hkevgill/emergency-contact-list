'use strict';

angular.module('uvicApp').controller('add-contact-controller', function ($scope, $state, emergencyContactsFactory) {

    $scope.contact = {
        Employee_Name: '',
        Employee_Phone: '',
        Emergency_Contact_Name: '',
        Emergency_Contact_Phone: ''
    };

    $scope.disabled = false;

    $scope.phonePattern = '[0-9]{3}[- ][0-9]{3}[- ][0-9]{4}';

    $scope.addContact = function() {

        emergencyContactsFactory.addContact($scope.contact).then(function(data) {
            $state.go('emergencycontacts');
        }, function() {
            console.log('error adding contact');
        });
    };

});
