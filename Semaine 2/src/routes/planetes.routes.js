import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetesRoutes {
    constructor() {
        router.get('/planets', this.getAll); // => Il va savoir comment passer les parametres.
        router.get('/planets/:idPlanet', this.getPlanet)
    }

    getAll(request, reponse, next) {
        reponse.status(200).json(PLANETS)
    }

    getPlanet(request, reponse, next) {
        let planetChoisie = PLANETS.filter(p => p.id == request.params.idPlanet)[0];
        
        if(planetChoisie)
            reponse.status(HttpStatus.OK).json(planetChoisie);
        else
            return next(HttpError.NotFound(`La planete ${request.params.idPlanet} n'est pas existante!`));
    }
}


new PlanetesRoutes();
export default router;