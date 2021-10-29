import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {

    retrieveByID(id, retrieveOptions) {
        const retrieveQuery = Exploration.findById(id)

        if (retrieveOptions.planet) {
            retrieveQuery.populate('planet')
        }

        return retrieveQuery
    }

    retrieveAll() {
        return Exploration.find()
    }

    transform(exploration, transformOptions) {

        if (transformOptions.embed && transformOptions.embed.planet) {

        } else {
            exploration.planet = {
                href: `${process.env.URL}/planets/${exploration.planet}`
            }
        }
        
        exploration.href = `${process.env.URL}/explorations/${exploration._id}`
        delete exploration._id


        return exploration
    }
}

export default new ExplorationsRepository();