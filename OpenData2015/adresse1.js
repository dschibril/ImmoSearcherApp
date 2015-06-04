//Lizenz CC-BY-SA
var gemeindeList = [];
function addresse1(searchResults, reisezeiten) {
    var firstResult = searchResults.results[0];

    var nearestGemeinde = reisezeiten.reduce(function (nearestGemeinde, gemeinde) {
        if (gemeinde.lat && gemeinde.lon) {
            gemeinde.distance = getDistanceFromLatLonInKm(firstResult.attrs.lat, firstResult.attrs.lon, gemeinde.lat, gemeinde.lon);
            if (gemeinde.distance < nearestGemeinde.distance) {
                return gemeinde;
            } else {
                return nearestGemeinde;
            }
        } else {
            return nearestGemeinde;
        }
    }, {distance: 10000});

    console.log(nearestGemeinde);

    d3.select('#message').text('Nächste Gemeinde: ' + nearestGemeinde.name + ' (Distanz zur Eingabe: ' + (nearestGemeinde.distance).toFixed(3) + ' km )')
        .style('float', 'left')
        .style('clear', 'both')
        .style('background-color', '#1f77b4')
        .style('margin', '5px')
        .style('padding', '5px')
        .style('border', '2px #eee');

    gemeindeList.push(nearestGemeinde);
    redrawAddresse1();

    return nearestGemeinde;

}

function redrawAddresse1() {
    var divs = d3.select('#results')
        .selectAll('div')
        .data(gemeindeList);

    var divEnter = divs.enter()
        .append('div')
        .style('float', 'left')
        .style('background-color', '#1f77b4')
        .style('margin', '5px')
        .style('padding', '5px')
        .style('border', '2px #eee')
        .style('fill', 'white');

    var svgEnter = divEnter
        .append('svg')
        .style({
            width: 320 + 'px',
            height: 240 + 'px'
        });

    var scale = d3.scale.linear()
        .domain([0, 30])
        .range([2, 240]);

    svgEnter.append('rect').datum(function (d) {
        return d.aggmiv;
    }).append("title")
        .text(function (d) {
            return "Agglomerationszentrum (mit Auto) " + d + " min";
        });

    svgEnter.append('rect').datum(function (d) {
        return d.aggoev;
    }).append("title")
        .text(function (d) {
            return "Agglomerationszentrum (mit ÖV) " + d + " min";
        });

    svgEnter.append('rect').datum(function (d) {
        return d.kernmiv;
    }).append("title")
        .text(function (d) {
            return "Kernstadt (mit Auto) " + d + " min";
        });

    svgEnter.append('rect').datum(function (d) {
        return d.kernoev;
    }).append("title")
        .text(function (d) {
            return "Kernstadt (mit ÖV) " + d + " min";
        });

    divEnter.append('h3').text(function (d) {
        return 'Reiseminuten von ' + d.name + ' zu';
    });

    divEnter.append('p').text(function (d) {
        return '(1) Agglomerationszentrum (mit Auto): ' + d.aggmiv + 'min';
    });

    divEnter.append('p').text(function (d) {
        return '(2) Agglomerationszentrum (mit \u00d6V): ' + d.aggoev + 'min';
    });

    divEnter.append('p').text(function (d) {
        return '(3) Kernstadt (mit Auto): ' + d.kernmiv + 'min';
    });
    divEnter.append('p').text(function (d) {
        return '(4) Kernstadt (mit \u00d6V): ' + d.kernoev + 'min';
    });

    svgEnter.append("text")
        .text(function (d, i) {
            return "(1)";
        })
    ;

    svgEnter.append("text")
        .text(function (d) {
            return "(2)";
        })
    ;

    svgEnter.append("text")
        .text(function (d) {
            return "(3)";
        })
    ;

    svgEnter.append("text")
        .text(function (d) {
            return "(4)";
        })
    ;

    divs.selectAll('text').attr({
        x: function (d, i) {
            return i * 60 + 20;
        },
        fill: "black",
        y: function (d) {
            return scale.range()[1];

        }
    });

    divs.selectAll('rect').attr({
        x: function (d, i) {
            return i * 60
        },
        width: 55,
        y: function (d) {
            return scale.range()[1] - scale(d);
        },
        height: function (d) {
            return scale(d);
        }
    });


}
