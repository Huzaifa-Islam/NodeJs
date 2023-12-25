//Root File of a project
//create a server via nodejs
 
//core module --> http (Launch a server, send requests) , https (Launch a SSL server) , fs, path, os

const http = require('http');

// function rqListener(req,res){
// }
// http.createServer(rqListener);

// http.createServer(function(req,res){
  
// });

// http.createServer((req,res)=>{
//     console.log(req)
// }) // this code if u try to run it will not log anything in the console bcz createServer function will return some server address so that we have to store in some variable

const routes = require('./routes'); 

const server = http.createServer(routes.handler);

server.listen(3000);