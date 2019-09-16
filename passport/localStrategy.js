const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt = require('bcrypt');
const SlackStrategy = require('passport-slack').Strategy;
const GithubStrategy = require('passport-github').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  (username, password, done) => {
    User.findOne({ username })
    .then(foundUser => {
      if (!foundUser) {
        done(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        done(null, false, { message: 'Incorrect password' });
        return;
      }

      done(null, foundUser);
    })
    .catch(err => done(err));
  }
));

passport.use(new SlackStrategy({
  clientID: "2432150752.761335549712",
  clientSecret: "bcb27df28ae3e64f36c4a11e356ba23f"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ slackID: profile.id })
  .then(user => {
    if (user) {
      done(null, user);
      return;
    }

    const newUser = new User({
      slackID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    done(error)
  })
}));


passport.use(new GithubStrategy({
  clientID: "aae8172be14bfdfb5d8c",
  clientSecret: "4fdc2d86436c2f7ff687f7d9fd315b62fa232b73"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ gitHubID: profile.id })
  .then(user => {
    if (user) {
      done(null, user);
      return;
    }

    const newUser = new User({
      slackID: profile.id
    });

    newUser.save()
    .then(user => {
      done(null, newUser);
    })
  })
  .catch(error => {
    done(error)
  })
}));