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
	e.preventDefault();debugger;
	var msg=$('[name=message]').val();
	socket.emit('createMessage',{
		"from":"user",
		"text":msg 
	},function(value){
		console.log("got it",value);
	})
})

$('#location').on('click',function(){

	if (!navigator.geolocation){
    		alert("Geolocation is not supported by your browser");
    	return;
  	}
	let geo=navigator.geolocation;console.log(geo);
	geo.getCurrentPosition(function(position) {
  		sendLocation(position.coords.latitude, position.coords.longitude);
	},function(){
		alert("unable to fetch location")
	},{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});

	function sendLocation(a,b){
		socket.emit('createLocationMessage',{
		"long":a,
		"lat":b 
		},function(value){
			console.log("got it",value);
		})
	}
})

socket.on('newLocationMessage',function(message){
	console.log("New Message");
	let msgItem=$('<li></li>');
	msgItem.text(`${message.long}:${message.lat}`);
	$('#messages').append(msgItem);
})