import * as mongoose from "mongoose";
import { Users} from './User'

const uri: string = "mongodb://127.0.0.1:27017/hanseWikiDB";

let db = mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

export { Users }