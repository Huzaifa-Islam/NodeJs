const fs = require('fs');

const requestHandler = (req,res) =>{
    console.log(req.headers,req.method, req.headers);
    //process.exit(); //it will close the process/sever once the event is triggered and processed completely but generally we dont want to close the server bcz if we did then we will not be able to reach the webpage as server is not available
    const url = req.url;
    const method = req.method;
     
    
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Msg </title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="enteredName"><button type="submit">Send</button></form></body>')
        res.write('</html>')  
        return res.end(); // return so that it do not execute below lines as after res.end no more lines should get executed
    }
    if(url==='/message' && method ==='POST'){
        //fs.writeFileSync('message.txt','DUMMY');
        //lets read the text user is entering   
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
            console.log("Body is "+body)
        });
         
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log("Final body when converted to String "+ parsedBody);
            message = parsedBody.split("=")[1];
            //fs.writeFileSync('message.txt', message); // it blocks other executions so we will use it writeFile
            fs.writeFile('message.txt',message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            })
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page </title></head>')
    res.write('<body><hi1>Hello From my Node.js server </h2></body>')
    res.write('</html>')
    res.end(); // this code --> NodeJs will send back the response to client
    
}

//module.exports = requestHandler

// module.exports = {
//     handler : requestHandler,
//     someText : 'some hard coded text'
// }

exports.handler = requestHandler
//exports.someText = 'some hard coded text'
 