import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetesRoutes {
    constructor() {
        router.get('/', this.getAll); // => Il va savoir comment passer les parametres.
        router.get('/:idPlanet', this.getPlanet)
        router.post('/',this.post)
        router.delete('/:idPlanet',this.delete)
        router.patch('/:idPlanet',this.patch)
        router.put('/:idPlanet',this.put)
    }

    post(req, res, next)
    {
        const newPlanet = req.body;

        // console.log(PLANETS.find(p => p.id == newPlanet.id))

        if(PLANETS.find(p => p.id == newPlanet.id) == undefined)
        {
            console.log(`La planete ${newPlanet.name} a ete ajouter!`)
            PLANETS.push(newPlanet)
            res.status(HttpStatus.CREATED).json(newPlanet)
        }
        else
            return next(HttpError.Conflict("Cette planete existe deja!"))
    }

    delete(req, res, next)
    {
        const planeteToDelete = PLANETS.findIndex(p => p.id == req.params.idPlanet)

        if(planeteToDelete != -1)
        {
            console.log(`La planete ${PLANETS[planeteToDelete].name} a ete supprimer!`)
            PLANETS.splice(planeteToDelete , 1)
            res.status(HttpStatus.NO_CONTENT).end()
        }
        else
            return next(HttpError.NotFound("Cette planete n'existe pas!"))
    }

    patch(req, res, next)
    {
        return next(HttpError.NotImplemented())
    }

    put(req, res, next)
    {
        return next(HttpError.MethodNotAllowed())
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