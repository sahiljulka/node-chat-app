const {generateMessage,generateLocationMessage}=require('../utils/message');

module.exports=(function(){
	function init(socket,io){
		socket.on('createMessage',(message,callBack)=>{
			console.log(message);
			io.emit('newMessage',generateMessage(message.from,message.text));
			callBack('This Is From Server');
		})

		socket.on('createLocationMessage',(message,callBack)=>{
			io.emit('newLocationMessage',generateLocationMessage(message.long,message.lat));
		})

	}
	return {init};
})();