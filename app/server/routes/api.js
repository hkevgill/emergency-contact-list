var databaseService = require('../services/database-service');

module.exports = function(app, express) {

    var apiRouter = express.Router();

    // get all emergency contacts
    apiRouter.get('/emergencycontacts', function(req, res) {
        databaseService.getEmergencyContacts(req, res)
    });

    // get specific contact
    apiRouter.get('/emergencycontacts/:contactId', function(req, res) {
        databaseService.getEditContactInfo(req, res);
    });

    // update contact information
    apiRouter.put('/emergencycontacts', function(req, res) {
        databaseService.updateContact(req, res)
    });

    // delete contact
    apiRouter.delete('/emergencycontacts/:contactId', function(req, res) {
        databaseService.deleteContact(req, res);
    });

    // add student to course
    apiRouter.post('/emergencycontacts', function(req, res) {
        databaseService.addContact(req, res)
    });

    return apiRouter;
};
