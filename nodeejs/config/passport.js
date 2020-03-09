var connection  = require('../config/db');
var knexConfig = require('../config/knex');
const knex = require('knex')(knexConfig);
var bcrypt = require('bcryptjs');
//console.log(knex)

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
        process.nextTick(function() {

            knex.from('cms_users').select('*')
            .where('email', email)
            .first()
            .then((rows) => {
                console.log(rows)
                bcrypt.compare(password, rows.password, function (err, result) {
                    if (result == true) {
                        return done(null, rows);   
                    } else {
                     return done(null, false, { message: 'Invalid username or password'}); 
                    }
                });
                //if(!rows){
                // if(bcrypt.compareSync(password, rows.password)){
                //     return done(null, rows);         
                // }else{
                //     return done(null, false, { message: 'Invalid username or password'}); 
                // }
            }).catch((err) => { 
                console.log( err); throw err 
                return done(err);
                //console.log( err); throw err 
            })
            // .finally(() => {
            //     knex.destroy();
            // });
        });
    }));

};