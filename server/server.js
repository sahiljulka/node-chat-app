const express=require('express');
const socketIO=require('socket.io');

const path=require('path');
const http=require('http');

const userJoin=require('./routes/user');
const messageChat=require('./routes/message')
const pathHtml=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
const {generateMessage}=require('./utils/message.js');	

console.log(pathHtml);
var app=express();
var server=http.createServer(app);

var io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("user connected");

	socket.on('disconnect',()=>{
		console.log("disconnect user")
	})


	userJoin.init(socket);
	messageChat.init(socket,io);
	
	socket.on('newMessage',(message)=>{
		message.createdAt=new Date().getTime();

	})
});


app.use(express.static(pathHtml));


server.listen(port,()=>{
	console.log("Listening to Port 3000");
})


