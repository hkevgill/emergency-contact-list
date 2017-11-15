'use strict';

angular.module('uvicApp').factory('emergencyContactsFactory', function(utilsFactory) {
    var factory = {};

    // get request for all contacts
    factory.getEmergencyContacts = function(){
        var url = 'api/emergencycontacts';

        return utilsFactory.getRequest(url);
    };

    // get request for all info for the edit page
    factory.getContactInfo = function(contactId) {
        var url = 'api/emergencycontacts/' + contactId;

        return utilsFactory.getRequest(url);
    };

    // save new contact info
    factory.updateContactInfo = function(body) {
        var url = 'api//emergencycontacts';

        return utilsFactory.putRequest(url, body);
    };

    // delete contact
    factory.deleteContact = function(contactId) {
        var url = 'api/emergencycontacts/' + contactId;

        return utilsFactory.deleteRequest(url);
    };

    // add student to registrations table
    factory.addContact = function(body) {
        var url = 'api/emergencycontacts/';

        return utilsFactory.postRequest(url, body);
    };

    return factory;
});
