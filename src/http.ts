import "reflect-metadata";
import  express  from "express";
import mongoose from 'mongoose'
import {createServer} from 'http';
import path from 'path';
import {Server} from 'socket.io'

const app = express();

const server = createServer(app);

mongoose.connect('mongodb://localhost/rocketsocket', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, '..', 'public'))); 

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Socket", socket.id)
})

export {server, io};