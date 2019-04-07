import * as mongoose from 'mongoose'

interface IHistory extends mongoose.Document {
    content: Object,
    writer: String,
    token: String,
    date: Date
}

const HistorySchema = new mongoose.Schema ({
    content: Object,
    writer: String,
    token: String,
    date: Date
})

export const Historys = mongoose.model<IHistory>("historys", HistorySchema)