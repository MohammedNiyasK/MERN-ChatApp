import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Message from './db.messages.js'
import Pusher from 'pusher';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1508434",
    key: "f7634c0281cd14c6590a",
    secret: "fb85bdfcefd33eec3be9",
    cluster: "ap2",
    useTLS: true
  });

  const db = mongoose.connection
  db.once('open', () =>{
    console.log('db connected')

    const msgCollection = db.collection('messages')
    const changeStream =msgCollection.watch()
    changeStream.on('change', (change) =>{
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger(
              "messages",
              'inserted', 
              {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp : messageDetails.timeStamp,
                receiver:messageDetails.receiver
              }
            ); 
          }
          else{
            console.log('error triggered in pusher')
          }
  })
});

app.use(express.json());

app.use(cors())

mongoose.connect(process.env.CONNECTIONSTRING);

app.get("/", (req, res) => res.status(200).send("Hello world"));

app.get('/api/v1/messages/sync' ,async (req,res) =>{
    
    try {
          const message = await  Message.find()
           res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error)
    }

})

app.post('/api/v1/messages/new' ,async (req,res) =>{
    const dbMessage = req.body
    try {
          const message = await  Message.create(dbMessage)
           res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error)
    }

})





app.listen(port,() => console.log(`listening on localhost ${port}`))
