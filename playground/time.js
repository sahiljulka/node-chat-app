var date=new Date();

var y=date.getFullYear();
var m=date.getMonth();
var d=date.getDate();
var day=date.getDay();

const moment=require('moment');
var m=moment();
console.log(m.format('hh:mm a'));

var s=moment().valueOf();
console.log(s);