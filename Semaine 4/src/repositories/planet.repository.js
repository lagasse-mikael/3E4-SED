import Planet from "../models/planet.model.js";

const KELVIN = -273.15

class PlanetRepository {
    retrieveByID(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retrieveAll(name = "") {
        return name == "" ? Planet.find() : Planet.find({ 'discoveredBy': name }).exec();
    }

    create(planet)
    {
        return Planet.create(planet)
    }

    transform(planet, transformOptions) {
        switch(transformOptions.unit)
        {
            case'c':
                planet.temperature += KELVIN
                planet.temperature = parseFloat(planet.temperature).toFixed(2)
        }

        delete planet.__v
        return planet
    }

}

export default new PlanetRepository();