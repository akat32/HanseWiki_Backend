import * as express from "express";
import { auth } from './routes/auth'

import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { Users } from './mongo/index'
import * as session from 'express-session'
import * as passport from 'passport'

import * as passportConfig from './passport/index'

const app = express()
let router = express.Router()

app.use(session({
  secret: 'qwldhcosahdfeshdfiudshfiudshfioudshfoiuashdviuhrsdsadcoiuhdsoiufhoiwusdhfoiuwedshfoiwesudhfocwiesaudhfvokalsudbvkjdscxbvkildshvpwosidzhvpbiu', 
  resave: true, 
  saveUninitialized: true
}))

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.post('/signup', auth.signup)
.post('/signin', auth.signin)
.post('/passportin', passport.authenticate('local'), auth.passportSingin)
.post('/chk', auth.chk)
.get('/', (req,res)=>{
  res.send('asd')
})
  
export default app;