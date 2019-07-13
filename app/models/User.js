const App = require('positron');
const helper = require('../helper/helper');

var User = {

    globalId: 'User',
    tableName: 'user',
    attributes: {

        first_name: {
            required: true,
            type: 'string'
        },
        last_name: {
            required: true,
            type: 'string'
        },
        email: {
            required: true,
            type: 'email'
        },
        password: {
            required: true,
            type: 'string'
        },
        age: {
            required: true,
            type: 'integer'
        },
        active_status: {
            required: true,
            type: 'integer',
            enum: [helper.status('Active'), helper.status('Inactive'), helper.status('Delete')]
        }
    }
};

module.exports = User;