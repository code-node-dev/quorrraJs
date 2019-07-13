const Joi = require('@hapi/joi');
const BaseController = require('../controllers/BaseController');

module.exports = {

    signUp: function (inputs, res, callback) {

        let message = App.locals.global.messages;
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            age: Joi.number().required()
        });

        const { error, value } = schema.validate(
            {
                first_name: inputs.first_name, last_name: inputs.last_name,
                email: inputs.email, password: inputs.password,
                age: inputs.age
            });
        if (error !== null) {
            let validMsg = this.validationMessage(error, 'signUp');
            BaseController.validationErrorResponseData(message[validMsg], res);
        }
        else
            return callback(true);
    },

    login: function (inputs, res, callback) {

        let message = App.locals.global.messages;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const { error, value } = schema.validate(
            {
                email: inputs.email, password: inputs.password
            });
        if (error !== null) {
            let validMsg = this.validationMessage(error, 'signUp');
            BaseController.validationErrorResponseData(message[validMsg], res);
        }
        else
            return callback(true);
    },


    editProfile: function (inputs, res, callback) {

        let message = App.locals.global.messages;
        const schema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            age: Joi.number().required()
        });

        const { error, value } = schema.validate(
            {
                first_name: inputs.first_name, last_name: inputs.last_name,
                age: inputs.age
            });
        if (error !== null) {
            let validMsg = this.validationMessage(error, 'signUp');
            BaseController.validationErrorResponseData(message[validMsg], res);
        }
        else
            return callback(true);
    },

    validationMessage(error, msg) {
        let key = error.details[0].context.key;
        key = key.charAt(0).toUpperCase() + key.slice(1);  // Convert 1st letter to upper case
        let message = error.details[0].type.split('.');
        message = message[1].charAt(0).toUpperCase() + message[1].slice(1); // Convert 1st letter to upper case
        let validation = key + message;
        return msg + validation;
    }
};