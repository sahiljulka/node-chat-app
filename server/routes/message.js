const {generateMessage}=require('../utils/message');

module.exports=(function(){
	function init(socket,io){
		socket.on('createMessage',(message,callBack)=>{
			console.log(message);
			io.emit('newMessage',generateMessage(message.from,message.text));
			callBack('This Is From Server');
		})
	}
	return {init};
})();