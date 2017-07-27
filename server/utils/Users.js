class Users{
	constructor(){
		this.users=[];
	}
	addUser(id,name,room){
		var user={id,name,room}
		this.users.push(user)
		return user;
	}
	removeUser(id){
		var retUser=this.getUser(id);
		this.users=this.users.filter((user)=>user.id!=id);
		return retUser;
	}
	getUser(id){
		return this.users.filter((user)=>user.id==id)[0];
	}
	getUserList(room){
		var retUsers=this.users.filter((user)=>user.room===room);
		var retNames=retUsers.map((user)=>user.name);
		return retNames;
	}
}

module.exports={Users};
