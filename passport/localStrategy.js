const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt = require('bcrypt');



// const flash = require("connect-flash");



passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (foundUser === null) {
        done(null, false, { message: 'No user with such username' });
      } else if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
      } else { 
        done(null, foundUser);
      }
    })
    .catch(err => { 
      done(err, false);
  });
  })
);

