//Lizenz CC-BY-SA

var d = [
    /*[
        {axis: "Auto: Gemeinde zu Agglom. Zentrum (100% = 20min)", value: 0.05},//aus output2.csv -> kalaggmiv
        {axis: "ÖV: Haus zu Haltestelle (100% = 1km)", value: 0.48},
        {axis: "ÖV: Gmeinde zu Kernstadt (100% = 40min)", value: 0.11},//aus output2.csv -> kalkernoev
        {axis: "ÖV: Gemeinde zu Agglom. Zentrum (100% = 30min)", value: 0.14},//aus output2.csv -> kalaggoev
        {axis: "Auto: Gemeinde zu Kernstadt (100% = 30min)", value: 0.07} // aus output2.csv -> kalkernmiv
    ], [
        {axis: "Auto: Gemeinde zu Agglom. Zentrum (100% = 20min)", value: 0.14},//aus output2.csv -> kalaggmiv
        {axis: "Distanz zu ÖV Haltestelle", value: 0.46},
        {axis: "ÖV: Gmeinde zu Kernstadt (100% = 40min)", value: 0.11}, //aus output2.csv -> kalkernoev
        {axis: "ÖV: Gemeinde zu Agglom. Zentrum (100% = 30min)", value: 0.29},//aus output2.csv -> kalaggoev
        {axis: "Auto: Gemeinde zu Kernstadt (100% = 30min)", value: 0.05} // aus output2.csv -> kalkernmiv
    ]*/
];


function radarUpdate(gemeinde, hstelle, type) {

    console.log(gemeinde, hstelle);
    var values = [
        {axis: "ÖV: Gmeinde zu Kernstadt (100% = 40min)", value: gemeinde.kalkernoev},//aus output2.csv -> kalkernoev 
         {axis: "ÖV: Haus zu Haltestelle (100% = 1km)", value: (hstelle.distance / 1000 )},
        {axis: "ÖV: Gemeinde zu Agglom. Zentrum (100% = 30min)", value: gemeinde.kalaggoev},
        
       
       
         {axis: "Auto: Gemeinde zu Agglom. Zentrum (100% = 20min)", value: gemeinde.kalaggmiv},//aus output2.csv -> kalaggmiv
        {axis: "Auto: Gemeinde zu Kernstadt (100% = 30min)", value: gemeinde.kalkernmiv},
       //aus output2.csv -> kalaggoev
         // aus output2.csv -> kalkernmiv
    ];

    if ( type == 'referenz' ) {
        d[1] = values;
    } else {
        d[0] = values;
    }

    var w = 500,
        h = 500;


    var colorscale = d3.scale.category10();

//Legend titles
    var LegendOptions = ['Adresse 1', 'Referenzadresse'];

//Data

//Options for the Radar chart, other than default
    var mycfg = {
        w: w,
        h: h,
        maxValue: 0.6,
        levels: 6,
        ExtraWidthX: 500
    };

//Call function to draw the Radar chart
//Will expect that data is in %'s
    RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w + 300)
        .attr("height", h)

//Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(90,0)')
        .attr("x", w - 70)
        .attr("y", 10)
        .attr("font-size", "12px")
        .attr("fill", "#404040")
        .text("Legende:");

//Initiate Legend	
    var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 200)
            .attr('transform', 'translate(90,20)')
        ;
    //Create colour squares
    legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function (d, i) {
            return i * 20;
        })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
            return colorscale(i);
        })
    ;
    //Create text next to squares
    legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) {
            return i * 20 + 9;
        })
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(function (d) {
            return d;
        })
    ;

}