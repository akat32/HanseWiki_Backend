import { Request, Response, NextFunction } from "express";
import { Historys } from '../mongo/History'

const history = {
    findHistory: async (req:Request, res:Response) => {
        let result = await Historys.findOne({token : req.body.token})
        if(!result) return res.status(404).json({message : "Histroy Not found!"})
        else return res.status(200).json({history : result})
    },
    all: async (req:Request, res:Response) => {
        let result = await Historys.find()
        res.send(result)
    }
}

export { history }