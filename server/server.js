const express=require('express');
const socketIO=require('socket.io');

const path=require('path');
const http=require('http');

const userJoin=require('./routes/user');
const messageChat=require('./routes/message')
const pathHtml=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
const {generateMessage}=require('./utils/message.js');	
const {isValid}=require('./utils/validation.js');
const {Users}=require('./utils/Users.js');


var users=new Users();

console.log(pathHtml);
var app=express();
var server=http.createServer(app);

var io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("user connected");

	socket.on('join',(params,callBack)=>{
		let a=isValid(params.name);
		let b=isValid(params.room);
		console.log(a+" "+b);
		if(!((isValid(params.name))&&(isValid(params.room)))){
			return callBack('Name and Room is required');
		}
		socket.join(params.room);
		userJoin.init(socket,params);
		users.removeUser(socket.id);
		users.addUser(socket.id,params.name,params.room);
		io.to(params.room).emit('updateUserList',users.getUserList(params.room));
		callBack();
	})
	socket.on('disconnect',()=>{
		let user=users.removeUser(socket.id);
		io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
	})
	messageChat.init(socket,io,users);
});
app.use(express.static(pathHtml));
server.listen(port,()=>{
	console.log("Listening to Port 3000");
})