import passport from 'passport'
import passportLocal from 'passport-local'

import { Users } from '../mongo/index'
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((user, done)=>{
    done(undefined, user.id)
})

passport.deserializeUser((id, done)=>{
    Users.findById(id, (err, user)=>{
        done(err, user);
    })
})

passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'passwd',
        session: true,
        passReqToCallback: false 
    }, async (id, passwd, done)=>{
        const user = await Users.findOne({
            id: id,
            passwd: passwd
        })
        if(user) return done(null, user)
        else return done(null, false, {message: "아이디나 비밀번호가 틀렸습니다!"})
    })
)

// req.isAuthenticated() 로그인 확인 함수