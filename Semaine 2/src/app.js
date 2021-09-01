import express from 'express';
import dayjs from 'dayjs';

const app = express();
const OK = 200;

app.get('/premiere', (request, reponse) => {
    reponse.status(OK);
    reponse.set('Content-Type', 'text/plain')
    reponse.send(`Bonjour mon deuxieme serveur\nVous utilisez presentement`)
    console.log(request)
})

app.get('/math/somme', (request, reponse) => {

    const a = request.query.a != undefined ? parseInt(request.query.a, 10) : 0;
    const b = request.query.b != undefined ? parseInt(request.query.b, 10) : 0;
    let total = 0;

    const c = request.query.c;


    switch (c) {
        case "somme":
            total = a + b;
            break;
        case "difference":
            total = a - b;
            break;
        case "produit":
            total = a * b;
            break;
        case "quotient":
            total = a / b;
            break;
        case "reste":
            total = a % b;
            break;
        default:
            console.log("Operation non definie!")
            return reponse.status(400).end();
            break;
    }
    
    reponse.status(OK);
    reponse.set('Content-Type', 'text/html')
    reponse.send(`<div style="background-color:${total > 50 ? (total > 75 ? "red" : "yellow") : "green"};font-size:800px;text-align:center;">${total.toString()}</div>`)
    
})

app.get('/date', (request, reponse) => {
    reponse.status(OK);
    reponse.set('Content-Type', 'text/html')
    reponse.send(`<div style="font-size:250px;text-align:center;padding-top:150px;">${dayjs().format('YYYY-MM-DD HH:mm:ss')}</div>`)
})

export default app