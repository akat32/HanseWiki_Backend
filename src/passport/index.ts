import * as passport from 'passport'

import { Request, Response, NextFunction } from "express";
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

passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'passwd'
  }, async (id, passwd, done) =>{
    let user = await Users.findOne({
      id: id,
      passwd: passwd
    })
    if(user) return done(undefined, user)
    else return done(undefined, false, { message: "Invalid email or password." });
  }
))

export let isAuthenticated = (req:Request, res:Response, next: NextFunction)=> {
  if (req.isAuthenticated()) {
    return next()
  }
  else res.status(401).json({message : "Users Not Authenticated"})
}