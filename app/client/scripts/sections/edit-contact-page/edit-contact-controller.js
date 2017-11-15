'use strict';

angular.module('uvicApp').controller('edit-contact-controller', function ($scope, $state, $stateParams, $timeout, emergencyContactsFactory) {

    // variables
    var i;
    var offset;

    $scope.contactId = $stateParams.contactId;

    $scope.phonePattern = '[0-9]{3}[- ][0-9]{3}[- ][0-9]{4}';

    $scope.saved = false;
    $scope.rightnow = moment();
    $scope.selections = {
        selectedStudent: null
    };

    // load info when page loads
    emergencyContactsFactory.getContactInfo($scope.contactId).then(function(data) {

        $scope.contact = data.rows[0];

    }, function() {
        console.log('error loading contact');
    });

    // save contact info
    $scope.saveContact = function() {

        emergencyContactsFactory.updateContactInfo($scope.contact).then(function(data) {

            $scope.contact = data.rows[0];

            $scope.saved = true;

            // show saved for 3 seconds
            $timeout(function () {
                $scope.saved = false;
            }, 2000);
        }, function() {
            console.log('error updating contact');
        });
    };

    // delete the contact
    $scope.deleteContact = function() {

        emergencyContactsFactory.deleteContact($scope.contact.ID).then(function(data) {
            $state.go('emergencycontacts');
        }, function() {
            console.log('error deleting contact');
        });
    };

});
