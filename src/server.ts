import express from 'express'
import passport from 'passport'
import session from 'express-session'
import routes from './routes'
import cors from 'cors'
import './config/twitter'
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(passport.initialize())
app.use(session({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: true 
}))

app.use(routes)

app.listen(3000, () => {
  console.log(`Listening on ${process.env.BASE_URL}`)
})