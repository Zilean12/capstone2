const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || 375956903024-bcs683urro6q9enqfq858n3r7r57djql.apps.googleusercontent.com,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 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,
  callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ 
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value
    }).save();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));
