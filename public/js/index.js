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
		$('[name=message]').val("");
		console.log("got it",value);
	})
})

$('#location').on('click',function(){
	$('#location').attr('disabled', 'disabled');
	$('#location').html("...");
	if (!navigator.geolocation){
    		alert("Geolocation is not supported by your browser");
    	return;
  	}
		let geo=navigator.geolocation;console.log(geo);
		geo.getCurrentPosition(function(position) {
  		sendLocation(position.coords.latitude, position.coords.longitude);
	},function(){
		$('#location').prop('disabled', false);
		$('#location').html(`<i class="fa fa-map-marker" aria-hidden="true"></i>`);
		alert("unable to fetch location")
	});

	function sendLocation(a,b){
		socket.emit('createLocationMessage',{
		"long":a,
		"lat":b 
		},function(){
			$('#location').html(`<i class="fa fa-map-marker" aria-hidden="true"></i>`);
			$('#location').removeAttr('disabled');
			console.log("got it");
		})
	}
})

socket.on('newLocationMessage',function(message){
	console.log("New Message");
	let msgItem=$('<li></li>');
	msgItem.text(`${message.from}:${message.text}`);
	$('#messages').append(msgItem);
})