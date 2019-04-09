import * as express from "express";
import { auth } from './routes/auth'
import { content } from './routes/Content'
import { history } from './routes/History'
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

// auth 회원 
app.post('/signup', auth.signup)
.post('/signin', auth.signin)
.post('/passportin', passport.authenticate('local'), auth.passportSingin)
.post('/chk', auth.chk)

// people 학생 + 선생님

// Content 대문에 뜰 리스트.
app.post('/addContent', passportConfig.isAuthenticated, content.addContent)
.post('/contentHistory', content.contentHistory)
.post('/loadContent', content.loadContent)
.post('/newContent', passportConfig.isAuthenticated, content.newContent)
.post('/CChk', content.chk)

// 편집 기록
app.post('/findHistory', history.findHistory)
.post('/allHistory', history.all)

app.post('/userTest', (req,res)=>{
  res.json(req.user)
})
// app.post('/newPeople', );

export default app;