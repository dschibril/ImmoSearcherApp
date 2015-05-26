//Lizenz CC-BY-SA

var publicTransportList = [];


function haltestelle(searchResults, reisezeiten, container) {
    var firstResult = searchResults.results[0];

    reisezeiten = reisezeiten.map(function (d) {
        return {
            Name: d.Name,
            Verkehrsmittel: d.Verkehrsmittel,
            attrs: {
                x: d['X-Koord.']*1000,
                y: d['Y-Koord.']*1000
            }
        }
    });

    var nearestHaltestelle = reisezeiten.reduce(function (nearestHaltestelle, haltestelle) {
        if (haltestelle.attrs.y && haltestelle.attrs.x) {
            haltestelle.distance = distance(firstResult, haltestelle);
            if (haltestelle.distance < nearestHaltestelle.distance) {
                return haltestelle;
            } else {
                return nearestHaltestelle;
            }
        } else {
            return nearestHaltestelle;
        }
    }, {distance: 10000});

    console.log(nearestHaltestelle);

    d3.select(container).text('Nächste ÖV-Haltestelle: ' + nearestHaltestelle.Name + ' (Distanz zur Eingabe: ' + ( nearestHaltestelle.distance / 1000 ).toFixed(3) + ' km )');

    return nearestHaltestelle;

}
