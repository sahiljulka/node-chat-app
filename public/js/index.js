var socket=io();

socket.on('connect',function(){
	console.log("Connected to server");
})

socket.on('disconnect',function(){
	console.log("disconnect from server");
})


socket.on('newUser',function(message){
	let msgItem=$('<li></li>');
	msgItem.text(`${message.from}:${message.text}`);
	$('#messages').append(msgItem);
})

/*socket.emit('createMessage',{
	"from":"sahil julka",
	"text":"hi" 
},function(value){
	console.log("got it",value);
})*/

socket.on('newMessage',function(message){
	console.log("New Message");
	let msgItem=$('<li></li>');
	msgItem.text(`${message.from}:${message.text}`);
	$('#messages').append(msgItem);
})

$('#chatForm').on('submit',function(e){
	e.preventDefault();
	var msg=$('[name=message]').val();
	socket.emit('createMessage',{
		"from":"user",
		"text":msg 
	},function(value){
		console.log("got it",value);
	})
})