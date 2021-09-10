import express from 'express';
import HttpErrors from 'http-errors';
import httpStatus from 'http-status';

import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.get('/:symbol', this.getOne);
        router.post('/', this.post);
        router.delete('/:symbol', this.delete);
    }

    getAll(req, res, next) {
        res.status(httpStatus.OK).json(ELEMENTS)
    }

    getOne(req, res, next) {
        const elementChoisie = ELEMENTS.find(element => element.symbol == req.params.symbol)

        if (elementChoisie) {
            console.log("L'element a ete trouver!")
            res.status(httpStatus.FOUND).json(elementChoisie)
        }
        else
            return next(HttpErrors.NotFound(`L'element '${req.params.symbol}' n'est pas existant!`))

    }

    post(req, res, next) {
        const verifElementAjouter = ELEMENTS.find(element => element.symbol == req.body.symbol)

        if(verifElementAjouter == undefined)
        {
            console.log("On pourra l'ajouter!")
            ELEMENTS.push(req.body)
            res.status(httpStatus.CREATED).json(req.body)
        }
        else
            return next(HttpErrors.Conflict("L'element existe deja"))
    }

    delete(req, res, next) {
        const verifElementDeleteIndex = ELEMENTS.indexOf(req.params.symbol)

        res.status(httpStatus.OK).tex(verifElementDeleteIndex)
    }
}

new ElementsRoutes();
export default router;