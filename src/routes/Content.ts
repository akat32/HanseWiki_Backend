import { Request, Response, NextFunction } from "express";
import * as randomString from 'randomstring'
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
        if(content === null) return res.status(404).json({message : "Content is null"})       
        return res.status(200).json({history: content.history})
    },
    loadContent: async (req: Request, res:Response, next: NextFunction)=>{
        let content = await Contents.findOne({category: req.body.category})
        if(content === null) return res.status(404).json({message : "Content is null"})
        return res.status(200).json({obj: content.content})
    },
    newContent: async (req: Request, res:Response) =>{
        let nullChk = await Contents.findOne({category: req.body.category})
        if(nullChk) return res.status(500).json({message : "already exist"})
        let obj = '<p>내용을 채워주세요</p>'
        let newContent = new Contents({
            content: obj,
            category: req.body.category,
            history: []
        })
        let addhistory = {
            writer: req.user.name,
            token: randomString.generate(25),
            date: Date.now(),
            index: "신규 카테고리 생성"
        }
        newContent.history.push(addhistory)
        try { let result = newContent.save()}
        catch (e) { return res.status(500).json({message : "save ERR!"})}
        return res.status(200).json({message : "save success!"})
    }
}
export { content }