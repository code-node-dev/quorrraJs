const BaseController = require('./BaseController');
const { status, valid } = require('../helper/helper');

class UserController extends BaseController {

    static editProfile(req, res) {

        let message = App.locals.global.messages;
        let userId = App.locals.global.userId;

        let inputs = req.input.only('first_name', 'last_name', 'age');
        valid.editProfile(inputs, res, async function (data) {
            if (data) {
                // Update given data
                User.update({ id: userId }, inputs).then((updated) => {
                    BaseController.successResponseData(null, message.updatedProfile, status('Success'), res);
                }, err => {
                    BaseController.errorResponseData(message.internalServer, res);
                });
            }
        })
    }

}

module.exports = UserController;