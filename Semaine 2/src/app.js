import express from 'express';

const app = express();
const OK = 200;

// lol.
app.get('/premiere', (request,reponse) => {
    reponse.status(OK);
    reponse.set('Content-Type', 'text/plain')
    reponse.send(`Bonjour mon deuxieme serveur\nVous utilisez presentement`)
    console.log(request)
})

app.get('/math/somme', (request,reponse) =>
{
    const a = request.query.a != undefined ? parseInt(request.query.a,10) : 0;
    const b = request.query.b != undefined ? parseInt(request.query.b,10) : 0;
    let somme = a + b;

    reponse.status(OK);
    reponse.set('Content-Type', 'text/html')
    reponse.send(`<div style="background-color:${somme > 50 ? (somme > 75 ? "red" : "yellow") : "green"};font-size:800px;text-align:center;">${somme.toString()}</div>`)
})

export default app