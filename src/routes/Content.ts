import { Request, Response, NextFunction } from "express";
import randomString from 'randomstring'
import { Contents } from '../mongo/Contents'
import { Historys } from '../mongo/History'

const content = {
    addContent: async (req:Request, res:Response, next:NextFunction)=> {
        let history = {
            writer: req.user.name,
            token: randomString.generate(25),
            date: Date.now(),
            index: req.body.index
        }
        let result = await Contents.update({category: req.body.category},
            {$set: {content: req.body.contetn}},
            {$push: {history: history}}
        )
        if(!result.ok) return res.status(500).json({message : "failed update content"})
        let newhistory = new Historys(history);
        try { let uphistory = await newhistory.save() }
        catch (e) { return res.status(500).json({message : "failed save History"}) }
        return res.status(200).json({message : "success update!"})
    },
    contentHistory: async (req: Request,res: Response,next: NextFunction)=>{
        let content = await Contents.findOne({category: req.body.category})
        return res.status(200).json({history: content.history})
    },
    loadContent: async (req: Request, res:Response, next: NextFunction)=>{
        let content = await Contents.findOne({category: req.body.category})
        return res.status(200).json({obj: content.content})
    }
}