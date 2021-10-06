const urlParams = {};
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
})

async function getPlanet(href) {
    const reponse = await axios.get(href)
    if(reponse.status == 200){
        const planet = reponse.data
        console.log(planet);

        document.title = `Details de la planete ${planet.name}`

        $('#imgIcon').attr('src',planet.icon)
        $('#lblName').append(planet.name)

        $('#lblDiscoveredBy').append(planet.discoveredBy)
        $('#lblDiscoveryDate').append(planet.discoveryDate)
        $('#lblTemperature').append(planet.temperature)
        $('#lblPosition').append(`(${planet.position.x.toFixed(3)}; ${planet.position.y.toFixed(3)}; ${planet.position.z.toFixed(3)})`)
    }
}