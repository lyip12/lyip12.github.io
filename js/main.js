//https://jqueryui.com/slider/#range
$( function() {
    $( "#slider-range" ).slider({
        range: true,
        min: 1930,
        max: 2010,
        values: [ 1930, 2010 ],
        slide: function( event, ui ) {
            $( "#range" ).val( ui.values[0] + " - " + ui.values[1] );
            start = ui.values[0];
            end = ui.values[1];
            loadData(start, end);
        }
    });
    $( "#range" ).val($( "#slider-range" ).slider( "values", 0 ) +
                      " - " + $( "#slider-range" ).slider( "values", 1 ) );
} );


var margin = {top: 40, right: 40, bottom: 60, left: 50};

var width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Date parser
var formatDate = d3.timeFormat("%Y"),
    parseDate = d3.timeParse("%Y");

var sort = 0;

// Scales
var x = d3.scaleTime()
.range([width, 0]);

var y = d3.scaleLinear()
.range([height, 0]);

var xAxis = d3.axisBottom()
.scale(x);

var yAxis = d3.axisLeft()
.scale(y);

var xAxisGroup = svg.append("g")
.attr("class", "x-axis axis");

var yAxisGroup = svg.append("g")
.attr("class", "y-axis axis");



// Initialize data
loadData();

// FIFA world cup
// var data;
Object.defineProperty(window, 'data', {
    // data getter
    get: function() { return _data; },
    // data setter
    set: function(value) {
        _data = value;
        // update the visualization each time the data property is set by using the equal sign (e.g. data = [])
        updateVisualization()
    }
});

d3.select("#ranking").on("change", function() { 
    updateVisualization() 
});


// Load CSV file
function loadData(s,e) {
    d3.csv("data/fifa-world-cup.csv", function(error, csv) {
        if(s==undefined){
            s = 1930;
        }
        if(e == undefined){
            e = 2010;
        }
        csv.forEach(function(d){
            // Convert string to 'date object'
            d.YEAR = parseDate(d.YEAR);

            // Convert numeric values to 'numbers'
            d.TEAMS = +d.TEAMS;
            d.MATCHES = +d.MATCHES;
            d.GOALS = +d.GOALS;
            d.AVERAGE_GOALS = +d.AVERAGE_GOALS;
            d.AVERAGE_ATTENDANCE = +d.AVERAGE_ATTENDANCE;
        });


        var csv2;
        //console.log(s);
        csv2 = csv.filter(function(d) { return (formatDate(d.YEAR) >= s && formatDate(d.YEAR) <= e); })
        //console.log(csv2)
        // Store csv data in global variable
        data = csv2;


        //console.log(start);

        // Draw the visualization for the first time
        updateVisualization();
    });
}

// Render visualization
function updateVisualization() {

    var selector = d3.select("#ranking").property("value");

    data.sort(function(a, b) {
        return b[data.YEAR] - a[data.YEAR];
    });

    x.domain(d3.extent(data, function(d) { return d.YEAR; }));
    y.domain([0, d3.max(data, function(d) { return d[selector]; })]);


    var path = svg.selectAll(".path")
    .remove()
    .exit()
    .data(data)

    path.enter()
        .append("path")
        .datum(data)

        .attr("fill", "none")
        .attr("stroke", "#9BD4FF")
        .attr("stroke-width", 0.5)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
              .x(function(d) { return x(d.YEAR) })

              .y(function(d) { return y(d[selector]) })
             )

        .attr("class", "path")
    //    var circles = svg.selectAll(".circles")
    //    .remove()
    //    .exit()
    //    .data(data)

    var Tooltip = d3.select("#chart-area")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "5px")
    .style("padding", "5px")


    var mouseover = function(d) {
        Tooltip
            .style("opacity", 1)
            .html(d.EDITION + "<br>" + d[selector] + " " + selector)
            .style("left", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1]+50) + "px");
    }

    var mouseleave = function(d) {
        Tooltip
            .style("opacity", 0)
            .style("left", "-300px");
    }

    var dot = svg.selectAll('circle')
    .attr("class", "circle")
    .remove()
    .exit()
    .data(data)

    dot.enter()
        .append("circle")
        .data(data)
        .attr("cx", function(d) { return x(+d.YEAR) })
        .attr("cy", function(d) { return y(d[selector])})
        .attr("r", 7)
        .style("fill", "#539BD6")
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
        .on("click", function(d) {
        showEdition(d);
    })

    //.attr("width", x.bandwidth())

    console.log(data);
    // ---- DRAW AXIS	----
    xAxisGroup = svg.select(".x-axis")
        .attr("transform", "translate(0," + height + ")")
        .transition()
        .duration(1000)
        .call(xAxis);

    yAxisGroup = svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis);

    svg.append("rect")
        .attr("class", "back")
        .attr("x", -10)
        .attr("y", -40)
        .attr("width", 200)
        .attr("height", 25)

    //console.log(selector);

    svg.append("text")
        .attr("class", "axis-title")
        .transition()
        .duration(1000)
        .attr("x", 0)
        .attr("y", -20)
        .text(selector);

}


//// Show details for a specific FIFA World Cup
function showEdition(d){
    var data = d.EDITION + "<br>" +
        "Winner: " + d.WINNER + "<br>" +
        "Number of Matches: " + d.MATCHES + " by " + d.TEAMS + " teams<br>" +
        "Winner Goals: " + d.GOALS + "<br>" +
        "Average Goals: " + d.AVERAGE_GOALS + "<br>" +
        "Average Attendance: " + d.AVERAGE_ATTENDANCE + " people";

    document.getElementById("table").innerHTML = data;
}
