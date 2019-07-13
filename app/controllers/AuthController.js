const BaseController = require('./BaseController');
const { status, valid, jwt } = require('../helper/helper');

class AuthController extends BaseController {

    // User Sign up
    static async signUp(req, res) {
        let message = App.locals.global.messages;
        let inputs = req.input.only('first_name', 'last_name', 'email', 'password', 'age');
        valid.signUp(inputs, res, async function (data) {
            if (data) {
                // Check if email already exists
                await User.findOne({ email: inputs.email, active_status: status('Active') }).then(async (exists) => {
                    if (exists)
                        BaseController.errorResponseData(message.emailExists, res);
                    else {
                        await App.hash.make(inputs.password, function (err, hash) {
                            // Use hashed password
                            inputs.password = hash;
                            inputs.active_status = status('Active');
                            User.create(inputs).then((inserted) => {
                                if (inserted)
                                    BaseController.successResponseData(null, message.signedUp, status('Success'), res);
                                else
                                    BaseController.errorResponseData(message.signedUpFail, res);
                            }, err => {
                                BaseController.errorResponseData(message.internalServer, res);
                            });
                        });
                    }
                });
            }
        })
    }

    // User login
    static login(req, res) {

        let message = App.locals.global.messages;
        let inputs = req.input.only('email', 'password');
        valid.login(inputs, res, function (data) {
            if (data) {
                // Check if user exists
                User.findOne({ email: inputs.email, active_status: status('Active') })
                    .then(async (user) => {
                        if (user) {
                            App.hash.check(inputs.password, user.password, async function (err, result) {
                                if (result) {
                                    // The passwords match...
                                    let token = await jwt.issueApi(user.id);
                                    BaseController.successResponseData({ token: token }, message.loginSuccessfully, status('Success'), res);
                                }
                                else BaseController.successResponseData(null, message.wrongPassword, status('Fail'), res);
                            });
                        }
                        else BaseController.errorResponseData(message.userNotFound, res);
                    })
            }
        })
    }

}
module.exports = AuthController;