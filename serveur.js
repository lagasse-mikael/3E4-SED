const http = require('http');

const server = http.createServer((request,reponse) => 
{
    reponse.statusCode = 200;
    reponse.setHeader('Content-Type', 'text/plain');
    reponse.end("Bonjour mon premier serveur!");
    //console.log(request)

});

server.listen(1337,'127.0.0.1',() => 
{
    console.log("Serveur est en fonction!")
});