import Exploration from '../models/exploration.model.js';
import repoPlanet from '../repositories/planet.repository.js'

class ExplorationsRepository {

    retrieveByID(id, retrieveOptions) {
        const retrieveQuery = Exploration.findById(id)

        if (retrieveOptions.planet) {
            retrieveQuery.populate('planet')
        }

        return retrieveQuery
    }

    retrieveAll(retrieveOptions = { }) {
        const reponseAll = Exploration.find().skip(retrieveOptions.skip).limit(retrieveOptions.limit)
        const estimatedCountQuery = Exploration.estimatedDocumentCount()

        return Promise.all([reponseAll,estimatedCountQuery])
    }

    transform(exploration, transformOptions) {
        if (transformOptions.embed && transformOptions.embed.planet) {
            exploration.planet = repoPlanet.transform(exploration.planet, transformOptions)
        } else {
            exploration.planet = {
                href: `/planets/${exploration.planet}`
            }
        }

        exploration.href = `/explorations/${exploration._id}`
        delete exploration._id


        return exploration
    }
}

export default new ExplorationsRepository();