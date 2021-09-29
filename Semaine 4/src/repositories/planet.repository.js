import dayjs from "dayjs";
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

    delete(idPlanet)
    {
        return Planet.findByIdAndDelete(idPlanet)
    }

    update(idPlanet,planetModifs)
    {
        return Planet.findByIdAndUpdate(idPlanet,planetModifs,{new:true})
    }


    transform(planet, transformOptions) {
        switch(transformOptions.unit)
        {
            case'c':
                planet.temperature += KELVIN
                planet.temperature = parseFloat(planet.temperature).toFixed(2)
        }

        planet.discoveryDate = dayjs(planet.discoveredDate).format('YYY-MM-DD')

        planet.lightSpeed = 
            `${planet.position.x.ToString(16)}@${planet.position.y.ToString(16)}#${planet.position.z.ToString(16)}`

        delete planet.__v
        return planet
    }

}

export default new PlanetRepository();