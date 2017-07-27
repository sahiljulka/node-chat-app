var socket=io();

socket.on('connect',function(){
	let params=$.deparam(window.location.search);
	socket.emit('join',params,function(err){
		if(err){
			alert(err);
			window.location.href='/';
		}
		else
			console.log("Connected to server");
	});
})

socket.on('disconnect',function(){
	console.log("disconnect from server");
})


socket.on('newUser',function(message){
	var temp=$('#messageTemp').html();
	var html=Mustache.render(temp,{
		from:message.from,
		createdAt:message.createdAt,
		text:message.text
	});
	$('#messages').append(html);
})

function scrollToBottom(){
	var $messages=$('#messagesBox');
	var $newMsg=$('#messages').children('li:last-child');

	var clientHeight=$messages.prop('clientHeight');
	var scrollTop=$messages.prop('scrollTop');
	var scrollHeight=$messages.prop('scrollHeight');
	var newMsgHeight=$newMsg.innerHeight();
	var lastMsgHeight=$newMsg.prev().innerHeight();
	console.log(clientHeight+" "+scrollTop+ " "+scrollHeight+" "+newMsgHeight+" "+lastMsgHeight)
	if(scrollTop+clientHeight+newMsgHeight+lastMsgHeight>=scrollHeight){
		$messages.scrollTop(scrollHeight);
	}

}

socket.on('newMessage',function(message){console.log(message.text)
	var temp=$('#messageTemp').html();
	var html=Mustache.render(temp,{
		from:message.from,
		createdAt:message.createdAt,
		text:message.text
	});
	$('#messages').append(html);
	scrollToBottom();
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
	var temp=$('#messageTemp').html();
	var html=Mustache.render(temp,{
		from:message.from,
		createdAt:message.createdAt,
		text:message.text
	});
	$('#messages').append(html);
	scrollToBottom();
})

socket.on('updateUserList',function(users){console.log(users);
	let $users=$('#users');
	$users.html('');
	var text=$('userTemp').html();
	users.forEach(function(user){

		$users.append($('<li></li>').text(user));
	})
});