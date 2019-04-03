import * as passport from 'passport'

import passportLocal from "passport-local";
import { Users } from '../mongo/index'

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});  
passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
      done(err, user);
    });
});
  