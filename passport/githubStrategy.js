const passport      = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User          = require('../models/User');
// const bcrypt = require('bcrypt');


passport.use(new GithubStrategy({
clientID: process.env.GITHUB_CLIENT_ID,
clientSecret: process.env.GITHUB_SECRET_ID,

  // clientID : "9c257a741d1fa71641a4",
  // clientSecret: "8939b9ff7c743d1d764d893f97c68666826a3b99",
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ githubId: profile.id })
  .then(foundUser => {
    if (foundUser !== null) {
      done(null, foundUser);
    } else {
      return User.create({ githubId: profile.id}).then(User=> {
        done(null, User);
      });
    }
  })
  .catch(err => {
    done(err);
  });
}
)
);