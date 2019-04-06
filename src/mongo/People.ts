import * as mongoose from 'mongoose'

interface IPeoples extends mongoose.Document {
    isStudent: Boolean,
    name: String,
    department: Number,
    admissionYear: Number,
    content: Object,
    history: [{
        writer: String,
        date: Date,
        index: String,
        token: String
    }]
}

const PeopleSchema = new mongoose.Schema({
    isStudent: {type: Boolean, default: true}, // 학생, 선생 분류
    name: {type: String, default: true, unique: true},
    department: Number, // 학과
    admissionYear: Number, // 학번
    content: Object,
    history: [{
        writer: String, // 편집자
        date: Date, // 날짜
        index: String, // 편집 내용 한 줄 정리
        token: String // 편집 전 토큰
    }]
})

export const Peoples = mongoose.model<IPeoples>("students", PeopleSchema)