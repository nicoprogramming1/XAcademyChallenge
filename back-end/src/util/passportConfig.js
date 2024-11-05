const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../models');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const strategy = new Strategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findByPk(jwtPayload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});

// registra la estrategia
passport.use(strategy);

module.exports = passport;
