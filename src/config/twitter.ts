import passport from 'passport'
import { Strategy } from '@superfaceai/passport-twitter-oauth2'
require('dotenv').config()


passport.serializeUser((user: any, done: any) => {
    done(null, user)
  })
passport.deserializeUser((obj: any, done: any) => {
    done(null, obj)
})

passport.use(
    new Strategy(
      {
        clientID: process.env.TWITTER_CLIENT_ID || '',
        clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
        clientType: 'confidential',
        callbackURL: `/auth/twitter/callback`,
      },
      (accessToken: any, refreshToken: any, profile: any, done: any) => {
        console.log('Success!', { accessToken, refreshToken, profile })
        return done(null, profile)
      }
    )
)