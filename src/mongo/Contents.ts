import * as mongoose from 'mongoose'

interface IContents extends mongoose.document {
    content: Object,
    categoty: Number,
    history: [{
        writer: String,
        token: String,
        date: Date,
        index: String
    }]
}

const ContentSchema = new mongoose.Schema ({
    content: Object,
    categoty: Number,
    history: [{
        writer: String,
        token: String,
        date: Date,
        index: String
    }]
})

export const Contents = mongoose.model<IContents>("contents", ContentSchema)