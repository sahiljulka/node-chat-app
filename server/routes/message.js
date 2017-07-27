const {generateMessage,generateLocationMessage}=require('../utils/message');
const {isValid}=require('../utils/validation.js');

module.exports=(function(){
	function init(socket,io,users){
		socket.on('createMessage',(message,callBack)=>{
			if(isValid(message.text)){
				let user=users.getUser(socket.id);
				io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
			}
		})

		socket.on('createLocationMessage',(message,callBack)=>{
			let str=`${message.long},${message.lat}`;
			if(isValid(str)){
				let user=users.getUser(socket.id);
				io.to(user.room).emit('newLocationMessage',generateMessage(user.name,str));
			}
			callBack();
		})

	}
	return {init};
})();