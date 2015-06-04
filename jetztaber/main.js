/**
 * Created by ktran on 21.05.2015.
 */


queue()
    .defer(d3.csv, 'reisezeiten.csv', convertNumbers)
    .defer(d3.csv, 'haltestellen.csv', convertNumbers)
    .await(appStart);

function convertNumbers(row) {
    for (var key in row) {
        if (row[key] && row[key].match(/^-?[0-9\.]+$/)) {
            row[key] = +row[key];
        }

    }
    return row;
}


function appStart(err, reisezeiten, haltestellen) {

    // Klick auf Adresse1
    d3.select('#submit').on('click', function () {
        var search = d3.select('#search').property('value');
        d3.json('https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=' + search + '&type=locations', function (err, searchResults) {
            var gemeinde = addresse1(searchResults, reisezeiten);
            var hs = haltestelle(searchResults, haltestellen, '#messageHaltestelle');
            radarUpdate(gemeinde, hs, 'adresse');
        });
    });


    // Klick auf Referenz
    d3.select('#submitReferenz').on('click', function () {
        var search = d3.select('#searchReferenz').property('value');
        d3.json('https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=' + search + '&type=locations', function (err, searchResults) {
            var gemeinde = referenzAdresse(searchResults, reisezeiten);
            var hs = haltestelle(searchResults, haltestellen, '#messageHaltestelleReferenz');
            radarUpdate(gemeinde, hs, 'referenz');
        });
    });

}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


function distance(a, b) {
    return Math.sqrt(Math.pow(b.attrs.x - a.attrs.x, 2) + Math.pow(b.attrs.y - a.attrs.y, 2));
}