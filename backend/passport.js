const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();



passport.use(new GoogleStrategy({
    clientID: "685361393368-7ripfhifg71foqjbmvn4daksofs1eo9r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
     function (request,accessToken, refreshToken, profile, cb,done) {
        
            return (done(null, profile) );
        
    }
));


passport.serializeUser((user, done) => {
    done(null, user)
    
})

passport.deserializeUser((user, done) => {
    done(null, user)
})