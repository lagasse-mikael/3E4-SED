import expressValidator from 'express-validator'
const {body} = expressValidator

class PlanetValidator{

    partial(){
        return [
            body('discoveryDate').optional()
                .isISO8601().withMessage('Mauvais format de date!').bail()
                .isBefore(new Date().toISOString()).withMessage('Cette date est trop recente!'),
            body('temperature').optional()
                .isNumeric().withMessage("La temperature doit etre numerique!").bail(),
            body('satellites').optional()
                .isArray().withMessage('Les satellites doivent etre une collection!'),
            body('position.x').optional()
                .isFloat({min : -1000,max : 1000}).withMessage("Doit etre numerique et contenu entre -1000 et 1000!").bail(),
            body('position.y').optional()
                .isFloat({min : -1000,max : 1000}).withMessage("Doit etre numerique et contenu entre -1000 et 1000!").bail(),
            body('position.z').optional()
                .isFloat({min : -1000,max : 1000}).withMessage("Doit etre numerique et contenu entre -1000 et 1000!").bail()
        ]
    }

    complete(){
        return [
            body('name').exists().withMessage(`Le nom de la planete est requis`),
            body('discoveredBy').exists().withMessage(`Le nom de la personne qui a decouvert la planete est requis`),
            body('discoveryDate').exists().withMessage("La date est requis!"),
            body('temperature').exists().withMessage("La temperature est requis!"),
            body('position.x').exists().withMessage("La position X est requis!"),
            body('position.y').exists().withMessage("La position Y est requis!"),
            body('position.z').exists().withMessage("La position Z est requis!"),
            ... this.partial()
        ]
    }
}

export default new PlanetValidator()