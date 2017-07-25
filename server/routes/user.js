const {generateMessage}=require('../utils/message');

module.exports=(function(){
	function init(socket){
		socket.broadcast.emit('newUser',generateMessage('Admin','New User Joined'))
		socket.emit('newUser',generateMessage('Admin','Welcome to Chat App'))
	}
	return {init};
})();