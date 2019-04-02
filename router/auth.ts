import * as express from 'express'

import { Users } from '../mongo/index'

const auth = {
    signup: async (req: express.Request, res: express.Response)=> {
        let user = new Users({
            id: req.body.id,
            passwd: req.body.passwd,
            name: req.body.name,
            token: "asdasd",
            isAdmin: req.body.isAdmin
        })
        let result = await user.save()
        res.send(result)
        console.log(result)
    },
    signin: async (req: express.Request, res:express.Response)=> {
        let result = await Users.find()
        res.send(result)
        console.log(result) 
    }
}

export { auth }