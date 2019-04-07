import * as mongoose from 'mongoose'

interface IBoards extends mongoose.Document {
    title: String, // 제목
    content: Object, // 내용
    history: [{ // 역사 ( 편집 기록 )
        writer: String, // 편집자
        token: String, // 콘텐츠 토큰
        date: Date, //날짜
        index: String // 편집 한 줄 소개
    }]
}

const BoardSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    content: Object,
    history: [{
        writer: String,
        token: String,
        date: Date,
        index: String
    }]
})

export const Boards = mongoose.model<IBoards>("boards", BoardSchema)