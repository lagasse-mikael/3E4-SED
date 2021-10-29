import express from 'express';
import HttpError from 'http-errors';
import exploRepo from '../repositories/explorations.repository.js';

const router = express.Router();

class ExplorationsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    async getAll(req, res, next) {
        try {
            const explorations = await exploRepo.retrieveAll()
            res.status(200).json(explorations);
        } catch (err) {
            return next(err)
        }
    }

    async getOne(req, res, next) {
        const retrieveOptions = { }
        const transformOptions = { embed: { } }

        if (req.query.embed && req.query.embed == 'planet') {
            retrieveOptions.planet = true
            transformOptions.embed.planet = true
        }

        try {
            const idExploration = req.params.explorationId
            let exploration = await exploRepo.retrieveByID(idExploration, retrieveOptions)

            if (!exploration) { return next(HttpError.NotFound()) }

            exploration = exploration.toObject({ getters: false, virtuals: false })

            exploration = exploRepo.transform(exploration,transformOptions)

            res.status(200).json(exploration);
        } catch (err) {
            return next(err)
        }
    }

}

new ExplorationsRoutes();

export default router;