/** Global variables for both charts */
var margin = { top: 20, right: 20, bottom: 30, left: 30 },
    outerWidth = 690,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;
var x = d3.scale.linear().range([0, width]).nice();
var y = d3.scale.linear().range([height, 0]).nice();


/**
 * 
 * Draw main Clusters plot function
 * 
 */
function drawClusters(){

  let cluster_id = "cluster_id",
      vx = "x",
      vy = "y",
      count = "count",
      words = "words";

  /** read data from csv file -- with cluster cetroids */
  d3.csv("static/data/2d/centroids_2d.csv", function(data) {
    
    /** type casting Number types */
    data.forEach(function(d) {
      d[cluster_id] = +d[cluster_id];
      d[vx] = +d[vx];
      d[vy] = +d[vy];
      d[count] = +d[count];
    });

    let xMax = d3.max(data, function(d) { return d[vx]; }) * 1.05,
        xMin = d3.min(data, function(d) { return d[vx]; }),
        yMax = d3.max(data, function(d) { return d[vy]; }) * 1.05,
        yMin = d3.min(data, function(d) { return d[vy]; });

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

    let color = d3.scale.category10();

    let tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return d[words];
        });

    let zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    /** @type {svg} main svg object */
    let svg = d3.select("#scatter")
      .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);

    svg.call(tip);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        .text(vx);

    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(vy);


    let objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);

    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");

    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);

    objects.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) { return 6 * Math.sqrt(d[count]/100 / Math.PI); })
        .attr("transform", transform)
        .style("fill", function(d) { return color(d[count]); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on('click', click);


    /** Click on cluster event handler */
    function click(d){
      $('#scatter .dot').removeClass('active');
      $(this).addClass('active');

      // console.log(d['cluster_id']);

      /** Redraw detail scatter plot with clustei id */
      drawDetail(d['cluster_id']);

      /** Show cluster info table */
      clickedClusterShow(d);
    } 

    function zoom() {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);

      svg.selectAll(".dot").attr("transform", transform);
    }

    function transform(d) {
      return "translate(" + x(d[vx]) + "," + y(d[vy]) + ")";
    }
  });
}


/**
 * 
 * Draw selected cluster detail points in right plot
 * @param  {Number} cluster_id selected cluster
 * 
 */
function drawDetail(cluster){
  console.clear();

  /** clear prev data */
  $('#scatter2').html("");

  let cluster_id = "cluster_id",
    item_id = "item_id",
    vx = "x",
    vy = "y",
    item_name = "item_name";

  /** read selected cluster data from csv */
  d3.csv("static/data/2d/details/"+cluster+".csv", function(data) {

    console.log(cluster);
    console.log(data);

    data.forEach(function(d) {
      d[cluster_id] = +d[cluster_id];
      d[item_id] = +d[item_id];
      d[vx] = +d[vx];
      d[vy] = +d[vy];
      d[item_name] = d[item_name];
    });

    // console.log(data);

    let xMax = d3.max(data, function(d) { return d[vx]; }) * 1.05,
        xMin = d3.min(data, function(d) { return d[vx]; }),
        yMax = d3.max(data, function(d) { return d[vy]; }) * 1.05,
        yMin = d3.min(data, function(d) { return d[vy]; });

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    let yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

    let color = d3.scale.category10();

    let tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return "Company: " + d[item_name];
        });

    let zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    let svg = d3.select("#scatter2")
      .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);

    svg.call(tip);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        .text(vx);

    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(vy);

    let objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);

    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");

    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);

    objects.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("transform", transform)
        .style("fill", function(d,i){ return color(i); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on('click', click);

        /** Deteil point click event handler  */
        function click(d){
          $('#scatter2 .dot').removeClass('active');
          $(this).addClass('active');

          /** Show Detail info table */
          clickedClusterDetail(d);
        }


    function zoom() {
      svg.select(".x.axis").call(xAxis);
      svg.select(".y.axis").call(yAxis);

      svg.selectAll(".dot").attr("transform", transform);
    }

    function transform(d) {
      return "translate(" + x(d[vx]) + "," + y(d[vy]) + ")";
    }
  });
}


/** Cluster info table  */
function clickedClusterShow(d){
  replaceClass($('.cluster-info'), 'display-none', 'display-block');
  replaceClass($('.cluster-detail-title'), 'display-none', 'display-block');
  replaceClass($('.cluster-detail'), 'display-block', 'display-none');

  $('.cluster_id').html(d['cluster_id']);
  $('.cluster-table > tbody:last-child').html(
        '<tr>\
          <td>'+d['cluster_id']+'</td>\
          <td>'+d['count']+'</td>\
          <td>'+d['words']+'</td>\
        </tr>'
  );
}

/** Cluster Detail dot info table */
function clickedClusterDetail(d){
  replaceClass($('.cluster-detail'), 'display-none', 'display-block');

  $('.cluster-detail-table > tbody:last-child').html(
        '<tr>\
          <td>'+d['cluster_id']+'</td>\
          <td>'+d['item_id']+'</td>\
          <td>'+d['item_name']+'</td>\
        </tr>'
  );
}

/** replace two classes of element */
function replaceClass(el, klass1, klass2){
  $(el).removeClass(klass1);
  $(el).addClass(klass2);
}


/** Class firt time to show Clusters */
drawClusters();




