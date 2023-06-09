import express from 'express'
import passport from 'passport'
import session from 'express-session'
import routes from './routes'
import cors from 'cors'
import './config/serialize'
import './config/twitter'
import './config/facebook'
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
app.use(session({ 
  secret: process.env.SESSION_SECRET || 'SESSION_SECRET', 
  resave: false, 
  saveUninitialized: true 
}))

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.BASE_URL}`)
})