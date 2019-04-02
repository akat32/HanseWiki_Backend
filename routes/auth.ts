import * as express from 'express'
import * as randomString from 'randomstring'
import { Users } from '../mongo/index'

const auth = {
    signup: async (req: express.Request, res: express.Response)=> {
        console.log(req.body)
        let user = new Users({
            id: req.body.id,
            passwd: req.body.passwd,
            name: req.body.name,
            token: randomString.generate(22),
            isAdmin: req.body.isAdmin
        })
        try {
            let result = await user.save()
        }
        catch ( e ) {
            if ( e.name === "ValidationError") return res.status(400).json({message : e.message})
            else if( e.code === 11000 ) return res.status(409).json({message : e.errmsg})
        }
        return res.status(200).json({user : user});
    },
    signin: async (req: express.Request, res:express.Response)=> {
        let result = await Users.findOne({id: req.body.id, passwd: req.body.passwd})
        if(!result) return res.status(404).json({message : "Sign in Failed!"})
        else return res.status(200).json({user : result})
    },
    passportSingin: async (req: express.Request, res:express.Response, next: express.NextFunction)=> {
        
    }
}

export { auth }