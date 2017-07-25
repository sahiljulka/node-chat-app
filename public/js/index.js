var socket=io();

socket.on('connect',function(){
	console.log("Connected to server");
})

socket.on('disconnect',function(){
	console.log("disconnect from server");
})


socket.on('newUser',function(newObj){
	console.log(newObj);
})

socket.emit('createMessage',{
	"from":"sahil julka",
	"text":"hi" 
},function(value){
	console.log("got it",value);
})

socket.on('newMessage',function(message){
	console.log("New Message");
	console.log(message);
})
