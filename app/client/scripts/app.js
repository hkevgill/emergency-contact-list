'use strict'

var uvicApp = angular.module('uvicApp', ['ui.router', 'moment-picker']);

uvicApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('emergencycontacts', {
            url: '/',
            controller: 'emergency-contacts-controller',
            templateUrl: 'scripts/sections/emergency-contacts-page/emergency-contacts.html'
        })
        .state('edit', {
            url: '/edit/:contactId',
            controller: 'edit-contact-controller',
            templateUrl: 'scripts/sections/edit-contact-page/edit-contact.html'
        })
        .state('add', {
            url: '/add',
            controller: 'add-contact-controller',
            templateUrl: 'scripts/sections/add-contact-page/add-contact.html'
        });

    $locationProvider.html5Mode(true);
});
