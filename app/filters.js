var App = require('positron');
var Route = App.router;
var jwT = require('./helper/jwtToken');
const BaseController = require('./controllers/BaseController');

/*
 |--------------------------------------------------------------------------
 | Application & Route Filters
 |--------------------------------------------------------------------------
 |
 | Below you will find the "before" event for the application
 | which may be used to do any work before a request into your
 | application. Here you may also register your custom route filters.
 |
 */
App.before(function (request, result, next) {
    next();
});

/*
 |--------------------------------------------------------------------------
 | Authentication Filters
 |--------------------------------------------------------------------------
 |
 | The following filters are used to verify that the user of the current
 | session is logged into this application. The "basic" filter easily
 | integrates HTTP Basic authentication for quick, simple checking.
 |
 */

Route.filter('auth', function (request, response, next) {
    request.auth.guest(function (result) {
        if (result) {
            if (request.xhr) {
                response.abort(401);
            } else {
                response.redirect('/login');
            }
        } else {
            next();
        }
    });
});

Route.filter('auth.basic', function (request, response, next) {
    req.auth.basic(function (result) {
        if (result) {
            next();
        } else {
            var error = new Error('Invalid credentials');

            error.status = 401;
            response.setHeader('WWW-Authenticate', 'Basic');
            response.abort(error);
        }
    });
});

/*
 |--------------------------------------------------------------------------
 | Guest Filter
 |--------------------------------------------------------------------------
 |
 | The "guest" filter is the counterpart of the authentication filters as
 | it simply checks that the current user is not logged in. A redirect
 | response will be issued if they are, which you may freely change.
 |
 */

Route.filter('guest', function (request, response, next) {
    request.auth.check(function (result) {
        if (result) {
            response.redirect('/');
        } else {
            next();
        }
    })
});

/*
 |--------------------------------------------------------------------------
 | CSRF Protection Filter
 |--------------------------------------------------------------------------
 |
 | The CSRF filter is responsible for protecting your application against
 | cross-site request forgery attacks. If this special token in a user
 | session does not match the one given in this request, we'll bail.
 |
 */

Route.filter('csrf', function (request, response, next) {
    if (request.session.getToken() !== request.input.get('_token')) {
        throw new Error('Token mismatch');
    } else {
        next();
    }
});


Route.filter('not-logged-in', function (req, res, next) {
    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') === 0
        || contype.indexOf('application/x-www-form-urlencoded') === 0) {
        App.locals.global = { messages: require('./lang/en.json') };
        next();
    } else {
        let response = {
            "status": 0,
            "message": "Request must be in json format or url-encoded."
        };
        return res.send(response);
    }
})

Route.filter('user-auth', function (req, res, next) {

    App.locals.global = { messages: require('./lang/en.json') };
    let token = req.headers.token;
    let message = App.locals.global.messages;
    let default_user_error_status = App.config.get('settings').invalidToken;
    let contype = req.headers['content-type'];

    if (!contype || contype.indexOf('multipart/form-data') === 0 || contype.indexOf('application/json') === 0
        || contype.indexOf('application/x-www-form-urlencoded') === 0) {
        if (token && token != "" && token != undefined) {
            let checkAuth = jwT.verifyApi(token);
            if (checkAuth.name) {
                let response = {
                    "status_code": 401,
                    "message": message.sessionExpire
                }
                return res.send(response);
            } else {
                User.findOne({ id: checkAuth.id, active_status: 1 }).then((userData) => {
                    if (userData) {
                        App.locals.global.userId = userData.id;
                        App.locals.global.userToken = token
                        next();
                    } else BaseController.errorResponseData(message.userNotFound, res);
                });
            }
        } else {
            BaseController.errorResponseData(message.tokenRequired, res, 401);
        }
    }

})