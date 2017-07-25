const express=require('express');
const path=require('path');
const mainRoute=require('./routes/mainRoute');
const pathHtml=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

console.log(pathHtml);
var app=express();
app.use(express.static(pathHtml));


mainRoute.init(app);

app.listen(port,()=>{
	console.log("Listening to Port 3000");
})


