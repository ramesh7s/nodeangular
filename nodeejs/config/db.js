 var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'192.168.1.203',
   user:'root',
   password:'pass123$',
   database:'book'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection; 