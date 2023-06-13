import passport from 'passport'
import { Strategy } from 'passport-facebook'
require('dotenv').config()

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: "/auth/facebook/callback"
},
function(accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log('Success!', { accessToken, refreshToken, profile })
    return done(null, profile)
}))