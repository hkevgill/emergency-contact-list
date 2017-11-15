'use strict';

angular.module('uvicApp').controller('emergency-contacts-controller', function ($scope, emergencyContactsFactory) {

    var i;
    var offset;
    $scope.propertyName = 'Employee_Name';
    $scope.reverse = true;

    // get all contacts on page load
    emergencyContactsFactory.getEmergencyContacts().then(function(data) {
        $scope.emergencyContacts = data.rows;
    }, function() {
        console.log('error getting contacts');
    });

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
});
