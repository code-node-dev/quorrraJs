/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken 
 * & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken');
let tokenSecretAdmin = ("secretadminkey".toUpperCase());
let tokenSecretUser = ("secretapikey".toUpperCase());

// Generates a token from supplied payload for Admin
module.exports.issueAdmin = function (payload) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        id: payload
    }, tokenSecretAdmin);
};

module.exports.issueResetTokenAdmin = function (payload) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        id: payload
    }, tokenSecretAdmin);
};

// Verifies token on a request For Admin
module.exports.verifyAdmin = function (token, callback) {
    try {
        return jwt.verify(token, tokenSecretAdmin, {}, callback);
    } catch (err) {
        return err
    }
};

// Generates a token from supplied payload for API
module.exports.issueApi = function (payload) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30),
        id: payload
    }, tokenSecretUser);
};


// Generates a token from supplied payload for API
module.exports.issueResetTokenApi = function (payload) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 10),
        id: payload
    }, tokenSecretUser);
};

// Verifies token on a request for API
module.exports.verifyApi = function (token, callback) {
    try {
        return jwt.verify(token, tokenSecretUser, {}, callback);
    } catch (err) {
        return err
    }
};
