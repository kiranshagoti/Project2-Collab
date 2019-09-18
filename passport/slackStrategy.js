const passport      = require('passport');
const User          = require('../models/User');
// const bcrypt = require('bcrypt');
const SlackStrategy = require('passport-slack').Strategy;

passport.use(new SlackStrategy({
  clientID: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_SECRET_ID,
  callbackURL: "http://localhost:3000/auth/slack/callback",
  scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ slackID: profile.id })
  .then(foundUser => {
    if (foundUser !== null) {
      done(null, foundUser);
    } else {
      return User.create({ slackID: profile.id}).then(User=> {
        done(null, User);
      });
    }
  })
  .catch(err => {
    done(err);
  });
}));