const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ufa_resto'
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

passport.use(new LocalStrategy(
    function(username, password, done) {
      con.query('SELECT * FROM ufa_user_api WHERE username = ? and password = ?', 
      [username, password], function(err, rows, fields) {
        if(err) return done(err);
          
        // if user not found
        if (rows.length <= 0) {
          return done('Incorrect username or password.');
        } 
        return done(null, rows[0]);
      });
    }
));
  
passport.serializeUser(function(user, done) {
    // console.log(user);
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    con.query('SELECT * FROM ufa_user_api WHERE username = ?', [username], function(err, user) {
        if(err) return done(err);
        done(null, user);
    });
});

app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')(
        { secret: 'keyboard cat', resave: false, saveUninitialized: false }
    )
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

app.get('/', isAuthenticated, function(req, res) {
    res.send('User Authorized');
});

app.get('/logout',
    function(req, res){
        req.logout();
        res.redirect('/');
    }
);

app.get('/login',
    function(req, res){
        res.send('User Unathorized');
    }
);

app.post('/login', 
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login' }
    ),
    function(req, res) {
        res.redirect('/');
    }
);

const appRouteCategory = require('./src/routes/ufa_category');
app.use('/', isAuthenticated, appRouteCategory);

const appRoutePaymentType = require('./src/routes/ufa_payment_type');
app.use('/', isAuthenticated, appRoutePaymentType);

app.listen(8080, ()=>{
    console.log('Server Berjalan di Port : 8080');
});