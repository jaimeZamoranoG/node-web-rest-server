import http from 'http';
import fs from 'fs'

const server = http.createServer((req,res)=>{

    console.log(req.url);
    if(req.url==='/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(htmlFile);
    } else {
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.end();
    }
    
    

});

server.listen(3000,()=>{
    console.log("Server Running in port 3000")
});