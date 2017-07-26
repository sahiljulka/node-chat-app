const moment=require('moment');

	var generateMessage=(from,text)=>{
	return{
		"from":from,
		"text":text,
		"createdAt":moment().format('hh:mm a')
	}
}

var generateLocationMessage=(long,lat)=>{
	return{
		"long":from,
		"lat":text,
		"createdAt":moment().format('hh:mm a')
	}
}


module.exports={generateMessage,generateLocationMessage}