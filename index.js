const express = require('express');
const app = express();
const port = 1000;
const db = require('./config/mongoose');


const session = require('express-session');
// const passportGoogle = require('./config/passport-google-oauth-strategy');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
// const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
// const sassMiddleware = require('node-sass-middleware');




app.use(express.urlencoded());

// app.use(cookieParser());








// mongo store is used to store the session cookie in the db
// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore(
//         {
//             mongooseConnection: db,
//             autoRemove: 'disabled'
//         },
//         function(err) {
//             console.log(err || 'connect-mongodb setup ok');
//         }
//     )
// }));


// app.use(passport.initialize());
// app.use(passport.session());

// app.use(passport.setAuthenticatedUser);



// use express router
app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) console.log(`Error in running the server: ${err}`);
    console.log(`Server is running on port: ${port}`);
});