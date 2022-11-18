import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    message : String,
    name:String,
    timeStamp : String,
    receiver : Boolean

})
const Message = mongoose.model('Message',messageSchema)


export default Message;