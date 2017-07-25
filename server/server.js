const express=require('express');
const socketIO=require('socket.io');

const path=require('path');
const http=require('http');

const mainRoute=require('./routes/mainRoute');
const pathHtml=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

console.log(pathHtml);
var app=express();
var server=http.createServer(app);

var io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("user connected");

/*	socket.emit("newEmail",{
		"from":"sahiljulka44@gmail.com",
		"body":"standupComedy",
		"subject":"imp"
	});
*/

	/*socket.emit("chatMessage",{
		"from":"sahiljulka",
		"text":"hello from server"
	});*/

	socket.on('disconnect',()=>{
		console.log("disconnect user")
	})
/*
	socket.on('createEmail',(email)=>{
		console.log(JSON.stringify(email,undefined,2));
	})
*/
	socket.on('newMessage',(message)=>{
		message.createdAt=new Date();
		socket.emit("chatMessage",message);
		//console.log(JSON.stringify(message,undefined,2));
	})

});


app.use(express.static(pathHtml));


mainRoute.init(app);

server.listen(port,()=>{
	console.log("Listening to Port 3000");
})


