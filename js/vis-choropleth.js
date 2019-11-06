//responsive layout from https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
var svg = d3.select("#choro")
.classed("svg-container", true) 
.append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 400 400")
.classed("svg-content-responsive", true);

var path = d3.geoPath();
var projection = d3.geoMercator()
.scale(250)
.center([0,0])
.translate([150,200]);



var data = d3.map();


updateChoropleth()

d3.select("#stats").on("change", function() { 
    updateChoropleth()
});

function updateChoropleth() {


    var selector = d3.select("#stats").property("value");
    //console.log(selector);
    d3.queue()
        .defer(d3.json, "data/world.geojson")
        .defer(d3.csv, "data/global-malaria-2015.csv",function(d) { data.set(d.Code, +d[selector]); })
        .await(ready);

    function ready(error, topo, malaria) {

        var Tooltip = d3.select("#choro")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border-radius", "5px")
        .style("padding", "5px")

        let mouseOver = function(d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", .05)
            d3.select(this)
                .transition()
                .duration(200)
                .style("opacity", 1)
            console.log(d)

            if(selector=="At_high_risk"){
                var tip = d.properties.name + "<br>" + d.data + "% Population At High Risk";
            } else if(selector=="At_risk"){
                var tip = d.properties.name + "<br>" + d.data + "% Population At Risk";
            } else if(selector=="Malaria_cases"){
                var tip = d.properties.name + "<br>Diagnosed Malaria Population: " + d.data;
            } else {
                var tip = d.properties.name + "<br>Suspected Malaria Population: " + d.data;
            }

            Tooltip
                .style("opacity", 1)
                .html(tip)

                .style("left", (d3.mouse(this)[0]*2) + "px")
                .style("top", (d3.mouse(this)[1]*2) + "px");

            var t = label+gradients+
                "<br><b>Country:</b> "+d.properties.name
            +"<br><b>Country ID:</b> "+d.id
            +"<br><b>"+text+"</b>"+d.data;
            document.getElementById("tooltip").innerHTML = t;
        }

        let mouseLeave = function(d) {
            d3.selectAll(".Country")
                .transition()
                .duration(200)
                .style("opacity", 1)
            d3.select(this)
                .transition()
                .duration(200)

            Tooltip
                .style("opacity", 0)
                .style("left", "-300px");

            var t = label+gradients+" "
            document.getElementById("tooltip").innerHTML = t;
        }


        if(selector=="At_high_risk"||selector=="At_risk"){
            var fill = d3.scaleThreshold()
            .domain([10,20,30,40,50,60,70,80,90])
            .range(d3.schemeReds[9]);
            var text = "Data (by Population Percentage): " 
            var label = "0%"+grid2+"50%"+grid2+"100%<br>";
            var  t = label+gradients;
            document.getElementById("tooltip").innerHTML = t;
        }else{
            var fill = d3.scaleThreshold()
            .domain([10, 100, 1000, 10000, 1000000, 10000000])
            .range(d3.schemeReds[7]);
            var text = "Data (by Population Count): "
            var label = "0"+grid+"1000"+grid+"10000000+<br>";
            var  t = label+gradients;
            document.getElementById("tooltip").innerHTML = t;
        }

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            .attr("d", d3.geoPath().projection(projection))
            .attr("fill", function (d) {
            d.data = data.get(d.id) || 0;
            return fill(d.data);
        })
            .style("stroke", "transparent")
            .attr("class", function(d){ return "Country" } )
            .style("opacity", 1)
            .on("mouseover", mouseOver )
            .on("mouseleave", mouseLeave )


    }


    var gradients = "<svg height='50' width='200'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' style='stop-color:#FEE5D9;stop-opacity:1' /><stop offset='30%' style='stop-color:#ff1100;stop-opacity:1' /><stop offset='70%' style='stop-color:#8a0000;stop-opacity:1' /><stop offset='100%' style='stop-color:#690000;stop-opacity:1' /></linearGradient></defs><rect x='3' y='0' width='200'height='15' fill='url(#grad)' /></svg>"
    var grid2 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    var grid = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

}