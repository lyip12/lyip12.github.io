updatemap();

d3.select("#category").on("change", function () {
    updatemap()
});
d3.select("#type").on("change", function () {
    updatemap()
});
d3.select("#status").on("change", function () {
    updatemap()
});


function updatemap(){

    d3.selectAll("path").remove();

    var selectcategory = d3.select("#category").property("value");
    var selecttype = d3.select("#type").property("value");
    var selectstatus = d3.select("#status").property("value");

    console.log(raw_json.features);


    var categoryfilter = raw_json.features.filter(function(d) { 
        if(selectcategory !== "all"){
            return d.Category == selectcategory; 
        } else {
            return raw_json.features
        }
    })

    var typefilter = categoryfilter.filter(function(d) { 
        if(selecttype !== "all"){
            return d.Type == selecttype; 
        } else {
            return categoryfilter;
        }
    })
    
    

    var statusfilter = typefilter.filter(function(d) { 
        if(selectstatus !== "all"){
            return d.Status == selectstatus; 
        } else {
            return typefilter;
        }
    })

    console.log(statusfilter);
    //            
    //    var filtereddata = raw_json.features.filter(function(d) { 
    //        return d.features.Ownership == "unknown"; 
    //    });

    var toggle;
    //Tooltip
    var Tooltip = d3.select("#map")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border-radius", "3px")
    .style("color", "#ff8003")
    .style("font-size", "14px")
    .style("padding", "3px")

    let mouseOver = function(d) {
        d3.select(this)
            .transition()
            .duration(200)
            .style("fill", "#ff8003")
            .style("stroke", "#ff8003")
            .style("opacity", 1)
        console.log(d)
        
        if((d.Gender) !== ""){ var gender = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>gender</button>"} else { var gender = ""};
        if((d.Ethnicity) !== ""){ var ethnicity = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>ethnicity</button>"} else { var ethnicity = ""};
        if((d.Controversy) !== ""){ var contro = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>controversy</button>"} else { var contro = ""};
        if((d.Vandalized) !== ""){ var van = "<br><button type='button' class='btn-secondary btn-sm' style='font-size: 10px; background-color: #8b9487 !important;border: none !important; height: 25px;'>vandalized</button>"} else { var van = ""};
        
        tip = d.Name + gender + ethnicity + contro + van;

        Tooltip
            .html(tip)
            .style("left", (d3.mouse(this)[0]*0.98-150) + "px")
            .style("top", (d3.mouse(this)[1])*0.85-80 + "px")
            .transition()
            .duration(300)
            .style("opacity", 1);
    }

    let mouseLeave = function(d) {
        d3.select(this)
            .transition()
            .duration(300)
            .style("fill", "#ffffff")  

        Tooltip
            .style("opacity", 1)
            .transition()
            .duration(300)
            .style("opacity", 0)
    }

    let mouseClick = function (d) {
        d3.select(this)
            .transition()
            .duration(800)
            .style("fill", "#ffc48a")
            .attr("stroke", "#ffffff")
            .style("opacity", 1)

        tip = "this is the tooltip after mouseclick";

        Tooltip
            .html(tip)
            .style("left", (d3.mouse(this)[0]*2) + "px")
            .style("top", (d3.mouse(this)[1]*2.5) + "px")
            .transition()
            .duration(300)
            .style("opacity", 1);

        
        if((d.Gender) !== ""){ var g = "Gender: "+d.Gender+"<br>"} else { var g = ""};
        if((d.Ethnicity) !== ""){ var e = "Ethnicity: " + d.Ethnicity} else { var e = ""};
        if((d.Controversy) !== ""){ var c = "Controversy: " + d.Controversy} else { var c = ""};
        if((d.Vandalized) !== ""){ var v = "Vandalized: " + d.Vandalized} else { var v = ""};
        var special = g+e+c+v;
        var sr = "";
        
        if(special !==""){
            var sr = "<b style='color: red !important;'>Special Record:<br>" + special + "</b><br><br>";
        } else {
            var sr = "Special Record: none <br><br>";
        }
        
        var t = "<h5>" + d.Name + "</h5>"
        + "<p>built in " + d.YearBuilt + "<br><br>" 
        + "<b>Address:</b><br>"
        + d.AddressNum + " " + d.Street + "<br>"
        + "Boston, " + d.State + "<br>"
        + d.Zipcode + "<br><br>"
        + "<b>Record Category: </b>" + d.Category+"<br>"
        + "<b>Establishment Type: </b>" + d.Type+"<br>"
        + "<b>Current Status: </b>" + d.Status+"<br><br>"
        + sr
        + d.Comments + "</p>"
        + "<img src='assets/dataimg/"+d.ID+"_01.jpg' class='responsive-image'>"
        + "<p>Entry ID: "+d.ID+" - <a href="+d.Source+">Source of Data Entry</a></p>";
        
        document.getElementById("maptext").innerHTML = t;
    }


    var svg = d3.select("#map")
    .classed("svg-container", true) 
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 1100")
    .classed("svg-content-responsive", true);

    var path = d3.geoPath();


    var albersProjection = d3.geoAlbers()
    .scale(700000)
    .rotate( [71.057,0] )
    .center( [0, 42.4] )
    .translate([680,-100]);

    var geoPath = d3.geoPath()
    .projection( albersProjection );

    var g = svg.selectAll("path")
    .remove()
    .exit()
    .data(neighborhoods_json.features)

    g.enter()
        .append("path")
        .data(neighborhoods_json.features )
        .attr( "fill", "#736a60" )
        .attr("opacity", 0.2)
        .attr("stroke-width", 1)
        .attr( "stroke", "#CFC3B8")
        .attr( "d", geoPath );

    var raw = svg.append("g");

    console.log(geoPath);

    raw.selectAll("path")
        .data(statusfilter)
        .enter()
        .append( "path" )
        .attr( "fill", "white" )
        .attr("stroke-width", 1)
        .attr( "stroke", "white" )
        .attr( "d", geoPath)
        .on("click", mouseClick)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)

};
