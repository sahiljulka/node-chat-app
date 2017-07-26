var generateMessage=(from,text)=>{
	return{
		"from":from,
		"text":text,
		"createdAt":new Date().getTime()
	}
}

var generateLocationMessage=(long,lat)=>{
	return{
		"long":from,
		"lat":text,
		"createdAt":new Date().getTime()
	}
}


module.exports={generateMessage,generateLocationMessage}