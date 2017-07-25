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
	socket.on('disconnect',()=>{
		console.log("disconnect user")
	})
});


app.use(express.static(pathHtml));


mainRoute.init(app);

server.listen(port,()=>{
	console.log("Listening to Port 3000");
})


