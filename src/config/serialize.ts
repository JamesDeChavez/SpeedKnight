import passport = require("passport")

passport.serializeUser((user: any, done: any) => {
  done(null, user)
})
passport.deserializeUser((obj: any, done: any) => {
  done(null, obj)
})