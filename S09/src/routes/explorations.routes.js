import express from 'express';
import paginate from 'express-paginate'
import HttpError from 'http-errors';
import exploRepo from '../repositories/explorations.repository.js';

const router = express.Router();

class ExplorationsRoutes {

    constructor() {
        router.get('/', paginate.middleware(20, 50), this.getAll);
        router.get('/:explorationId', this.getOne);
    }

    async getAll(req, res, next) {

        let transformOptions = { }
        const retrieveOptions = {
            skip: req.skip,
            limit: req.query.limit,
            page: req.query.page
        }

        try {
            let [explorations, documentsCount] = await exploRepo.retrieveAll(retrieveOptions)

            explorations = explorations.map(explo => {

                explo = explo.toObject({ getters: false, setters: false })
                explo = exploRepo.transform(explo, transformOptions)
                return explo
            })

            const pageCount = Math.ceil(documentsCount / retrieveOptions.limit)
            const hasNextPage = paginate.hasNextPages(req)(pageCount)
            const pageArray = paginate.getArrayPages(req)(3,pageCount,req.query.page)

            console.log(pageArray);

            const reponse = {
                _metadata: {
                    hasNextPage: hasNextPage,
                    page: retrieveOptions.page == 0 ? 1 : retrieveOptions.page,
                    skip: retrieveOptions.skip,
                    limit: retrieveOptions.limit,
                    totalPages: pageCount,
                    totalDocumentsCount: documentsCount
                },
                _links:{
                    firstPage:`/explorations?page=0&limit=${req.query.limit}`,
                    beforePage:pageArray[0].url,
                    thisPage:pageArray[1].url,
                    nextPage:pageArray[2].url,
                    lastPage:`/explorations?page=${pageCount}&limit=${req.query.limit}`
                },
                data: explorations
            }

            if(req.query.page == 1){
                delete reponse._links.beforePage
                reponse._links.thisPage = pageArray[0].url
                reponse._links.nextPage = pageArray[1].url
            }

            if(!hasNextPage){
                delete reponse._links.nextPage
                reponse._links.beforePage = pageArray[1].url
                reponse._links.thisPage = pageArray[2].url
            }

            res.status(200).json(reponse);
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

            exploration = exploRepo.transform(exploration, transformOptions)

            res.status(200).json(exploration);
        } catch (err) {
            return next(err)
        }
    }

}

new ExplorationsRoutes();

export default router;