var socket=io();

socket.on('connect',function(){
	console.log("Connected to server");
/*	socket.emit('createEmail',{
		"from":"sahiljulka44@gmail.com",
		"body":"standupComedy",
		"subject":"imp" 
	});
*/
/*	socket.emit('newMessage',{
		"from":"sahiljulka",
		"body":"hello from client"
	});*/
})

socket.on('disconnect',function(){
	console.log("disconnect from server");
})

/*socket.on('newEmail',function(email){
	console.log("New Email");
	console.log(email); 
})
*/

socket.on('chatMessage',function(message){
	console.log("New Message");
	console.log(message);
})
