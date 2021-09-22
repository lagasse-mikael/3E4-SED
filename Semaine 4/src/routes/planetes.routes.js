import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';
import planetRepository from '../repositories/planet.repository.js';

const router = express.Router();

class PlanetesRoutes {
    constructor() {
        router.get('/', this.getAll);
        router.get('/:idPlanet', this.getPlanet);
        router.get('/:explorer', this.getAll);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.delete);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }

    async post(req, res, next) {
        const newPlanet = req.body;

        try {
            let planetCree = await planetRepository.create(newPlanet)
            
            let transformOptions = {}
            if (req.query.unit) {
                transformOptions.unit = req.query.unit
                planetCree = planetCree.toObject({ getters: false, virtuals: false })
                planetCree = planetRepository.transform(planetCree, transformOptions)
            }
            res.status(HttpStatus.CREATED).json(planetCree)
        }
        catch (err){
            return next(err)
        }
    }

    delete(req, res, next) {
        const planeteToDelete = PLANETS.findIndex(p => p.id == req.params.idPlanet)

        if (planeteToDelete != -1) {
            console.log(`La planete ${PLANETS[planeteToDelete].name} a ete supprimer!`)
            PLANETS.splice(planeteToDelete, 1)
            res.status(HttpStatus.NO_CONTENT).end()
        }
        else
            return next(HttpError.NotFound("Cette planete n'existe pas!"))
    }

    patch(req, res, next) {
        return next(HttpError.NotImplemented())
    }

    put(req, res, next) {
        return next(HttpError.MethodNotAllowed())
    }

    async getAll(request, reponse, next) {

        try {
            let jsonRecu = await planetRepository.retrieveAll(request.query.explorer)

            let transformOptions = { }
            // Ajouter la verification a savoir si l'unit est legit.
            if (request.query.unit) {
                transformOptions.unit = request.query.unit
                jsonRecu = jsonRecu.map(p => {
                    p = p.toObject({ getters: false, virtuals: true })
                    p = planetRepository.transform(p, transformOptions)
                    return p
                })
            }

            reponse.status(HttpStatus.OK).json(jsonRecu)
        }

        catch (err) {
            return next(err);
        }
    }

    async getPlanet(request, reponse, next) {
        try {
            let planetChoisie = await planetRepository.retrieveByID(request.params.idPlanet)

            let transformOptions = { }
            if (planetChoisie) {
                if (request.query.unit) {
                    transformOptions.unit = request.query.unit
                    planetChoisie = planetChoisie.toObject({ getters: false, virtuals: false })
                    planetChoisie = planetRepository.transform(planetChoisie, transformOptions)
                }
                reponse.status(HttpStatus.OK).json(planetChoisie);
            }
            else
                return next(HttpError.NotFound(`La planete ${request.params.idPlanet} n'est pas existante!`));
        }
        catch (err) {
            return next(err);
        }
    }
}


new PlanetesRoutes();
export default router;