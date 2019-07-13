
var Route = App.router;
let Auth = require("./controllers/AuthController");
let User = require("./controllers/UserController");


Route.group({ prefix: 'api/' }, () => {

    Route.group({ before: 'not-logged-in' }, () => {
        //Before Login
        Route.post('/sign-up', { uses: Auth.signUp });
        Route.post('/login', { uses: Auth.login });
    });

    Route.group({ before: 'user-auth' }, function () {
        Route.put('/edit-profile', { uses: User.editProfile });
    });
});