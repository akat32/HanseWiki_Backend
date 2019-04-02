import * as express from "express";
import { auth } from '../routes/auth'

import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { Users } from '../mongo/index'
import * as session from 'express-session'
import passport from 'passport'

import * as passportConfig from '../passport/index'

class App {
  public app: express.Application;
  /**
   * @ class App
   * @ method bootstrap
   * @ static
   * 
   */
  public static bootstrap (): App {
    return new App();
  }
  constructor () {
    this.app = express();
    this.app.use(session({
      secret: 'qwldhcosahdfeshdfiudshfiudshfioudshfoiuashdviuhrsdsadcoiuhdsoiufhoiwusdhfoiuwedshfoiwesudhfocwiesaudhfvokalsudbvkjdscxbvkildshvpwosidzhvpbiu', 
      resave: true, 
      saveUninitialized: false
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(cors())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({limit: '1gb', extended: false }));

    this.app.post('/signup', auth.signup)
    this.app.post('/signin', auth.signin)
  }
}

export default App;