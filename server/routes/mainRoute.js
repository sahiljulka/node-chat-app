module.exports=(function(){

	var getHtml=(req,res)=>{
		res.render('index.html');
	}

	var init=(appConfig)=>{
		appConfig.get('/',getHtml);
	}

	return{
		init
	} 
})();