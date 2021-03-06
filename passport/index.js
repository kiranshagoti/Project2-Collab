const passport = require('passport');

require('./serializers');
require('./localStrategy');
require('./githubStrategy');
require('./slackStrategy');

module.exports = (app)  => {
  app.use(passport.initialize());
  app.use(passport.session());
}
