const SERVER_URL = "https://api.andromia.science/planets"

$(document).ready(() => {

    getPlanets();

})

async function getPlanets() {
    try {
        const reponse = await axios.get(SERVER_URL)

        if (reponse.status == 200) {
            const nosPlanets = reponse.data;

            nosPlanets.forEach(planet => {
                $('#planets').append(displayPlanet(planet))
            })
        }
        else {
            console.log(reponse.status + ' Erreur!')
        }
    }
    catch (err) {
        console.log(err)
    }
}

function displayPlanet(planet)
{
    let planetFormatHTML = `<div class="card col-2 mx-2 my-2">`
    
    planetFormatHTML += `<img class="card-img-top" src="${planet.icon}">`
    planetFormatHTML += `<h5 class="card-title">${planet.name}</h5>`

    planetFormatHTML += `</div>`;
    return planetFormatHTML
}