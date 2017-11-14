var pg = require('pg');
var moment = require('moment');

// database settings
var config = {
    user: 'gvxoyyltmnilwc',
    database: 'd57vqjr3judh0i',
    password: '4861da946d3dccf3f46cd79bae4dbd9e5a96670fbaaaf2e771f454989c1cddb4',
    host: 'ec2-23-21-101-174.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432,
    ssl: true,
    max: 15, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// use a connection pool
var pool = new pg.Pool(config);

// create the database table
module.exports.create = function(req, res) {
    pool.connect(function(err, client, done) {

        client.query('CREATE TABLE Emergency_Contacts(ID SERIAL PRIMARY KEY, Employee_Name VARCHAR(300), Employee_Phone VARCHAR(20), Emergency_Contact_Name VARCHAR(300), Emergency_Contact_Phone VARCHAR(20));', function(err, results) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

        });

    });
}

// get a list of all emergency contacts
module.exports.getEmergencyContacts = function(req, res) {
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('SELECT * FROM "Emergency_Contacts"', function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// get everything needed for the edit contact page
module.exports.getEditContactInfo = function(req, res) {

    var data = {};

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('SELECT * FROM "Emergency_Contacts" e WHERE "ID" = $1::int', [req.params.contactId], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);

        });
    });
}

// save new contact information
module.exports.updateContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        req.body.When = moment(req.body.When).utc().unix();;

        client.query('UPDATE "Emergency_Contacts" SET "Employee_Name" = $1::text, "Employee_Phone" = $2::text, "Emergency_Contact_Name" = $3::text, "Emergency_Contact_Phone" = $4::text WHERE "ID" = $5::int RETURNING *', [req.body.Employee_Name, req.body.Employee_Phone, req.body.Emergency_Contact_Name, req.body.Emergency_Contact_Phone, req.body.ID], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// delete contact
module.exports.deleteContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('DELETE FROM "Emergency_Contacts" WHERE "ID" = $1::int', [req.params.contactId], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}

// delete contact
module.exports.addContact = function(req, res) {

    pool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        var query = client.query('INSERT INTO "Emergency_Contacts"("Employee_Name", "Employee_Phone", "Emergency_Contact_Name", "Emergency_Contact_Phone") VALUES($1::text, $2::text, $3::text, $4::text) RETURNING *', [req.body.Employee_Name, req.body.Employee_Phone, req.body.Emergency_Contact_Name, req.body.Emergency_Contact_Phone], function(err, result) {

            //call `done()` to release the client back to the pool
            done();

            if(err) {
                return console.error('error running query', err);
            }

            res.json(result);
        });
    });
}
