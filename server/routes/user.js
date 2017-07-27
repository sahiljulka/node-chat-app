const {generateMessage}=require('../utils/message');

module.exports=(function(){
	function init(socket,params){
		socket.broadcast.to(params.room).emit('newUser',generateMessage('Admin',`${params.name} Joined`))
		socket.emit('newUser',generateMessage('Admin','Welcome to Chat App'))
	}
	return {init};
})();