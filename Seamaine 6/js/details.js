const urlParams = { };
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();


$(document).ready(() => {
    getPlanet(urlParams.href);

    $('#btnAddPortal').click(() => {
        addPortal();
    })

    $('#btnExtraction').click(() => {
        extractionPlanet();
    })

})

async function extractionPlanet() {
    const MINING_URL = `${urlParams.href}/actions?type=mine`
    const reponse = await axios.get(MINING_URL);

    console.log(reponse.data);

    if (reponse.status == 200) {
        displayElements(reponse.data)
    } else {
        console.log(reponse)
    }
}

async function addPortal() {

    const position = $('#txtPosition').val().toUpperCase()
    const affinity = $('#cboAffinity').val()

    const isPositionValid = document.getElementById("txtPosition").checkValidity();

    if (isPositionValid) {
        const ADD_PORTAL_URL = `${urlParams.href}/portals`
        const body = {
            position: position,
            affinity: affinity
        }

        const reponse = await axios.post(ADD_PORTAL_URL, body)
        if (reponse.status == 201) {
            displayPortals([reponse.data])
        } else {
            console.log(reponse)
        }
    }
}

async function getPlanet(href) {
    const reponse = await axios.get(href)
    if (reponse.status == 200) {
        const planet = reponse.data
        console.log(planet);

        document.title = `Details d'un chien ${planet.name}`

        $('#imgIcon').attr('src', `photos_de_chien/img${Math.floor(Math.random() * 13) + 1}.jpeg`)
        $('#lblName').append(planet.name)

        $('#lblDiscoveredBy').append(planet.discoveredBy)
        $('#lblDiscoveryDate').append(planet.discoveryDate)
        $('#lblTemperature').append(planet.temperature)
        $('#lblPosition').append(`(${planet.position.x.toFixed(3)}; ${planet.position.y.toFixed(3)}; ${planet.position.z.toFixed(3)})`)

        if (planet.satellites.length > 0) {
            planet.satellites.forEach(sat => {
                $('#satellites').append(`<li>${sat}</li>`)
            });
        }
        else {
            $('#satellites').append("<em>Aucun satellite</em>")
        }

        displayPortals(planet.portals)
    }
}

function displayPortals(portals) {
    portals.forEach(p => {
        $('#tab').append(`<tr><td>${p.position}</td><td><img src="img/${p.affinity}.png" title="${p.affinity}"></td></tr>`)
    })
}

function displayElements(elements) {
    const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements'
    $('#resExt').empty();
    
    elements.forEach(e => {
        $('#resExt').append(`<tr><td><img src="${ELEMENT_IMG_URL}/${e.element}.png" width="75px">${e.element}</td><td>${e.quantity}</td></tr>`)
    })
}