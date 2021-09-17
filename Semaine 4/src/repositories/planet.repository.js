import Planet from "../models/planet.model.js";

class PlanetRepository {
    retrieveByID(idPlanet) {
        return Planet.findById(idPlanet);
    }
    
    retrieveAll(name = "") {
        return name == "" ? Planet.find() : Planet.find({ 'discoveredBy': name }).exec();
    }

}

export default new PlanetRepository();