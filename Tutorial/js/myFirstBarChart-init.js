
// Example Rectangle.
// If you're stuck with the reusable chart, try editing this so that it works with data (and multiple bars)

var rectSVG = d3.select('#rectangle-target').append('svg').attr('width', 150).attr('height', 100).style('background-color', '#dcebe9');

var xscale = d3.scale.linear().domain([0, 50]).range([0, 150]);

var rect = rectSVG.append('g').append('rect')
	.attr('x', 0)
	.attr('y', 25)
	.attr('height', 50)
	.attr('width', function() {
	return 0;})
	.attr('fill', '#e89795');

rect.transition().duration(1000).attr('width', function() {
	return xscale(30);})


// END of example rectangle

var myData = {
    "dinner": [
		{
			"name" : "Turkey Breast",
			"number" : 54
		},
		{
			"name" : "Cranberry Sauce",
			"number" : 86
		},
		{
			"name" : "Sweet Potato Casserole",
			"number" : 236
		}
	],
    "dessert": [
		{
			"name" : "Pumpkin Pie",
			"number" : 323
		},
		{
			"name" : "Pecan Pie",
			"number" : 117
		},
		{
			"name" : "Apple Pie",
			"number" : 67
		}
	]
};


var height = 200;
var width = 425;
var margin = {
    'top': 10,
    'right': 10,
    'left': 10,
    'bottom': 20
};

//// Suggested code for initializing your chart. Feel free to tweak the parameters to your liking.
//var myFirstBarChart = d3.select("#myFirstBarChart-container").append("svg").attr('class', 'bar-chart')
//  .chart("CustomBarChart", {
//	parentID : "#myFirstBarChart-container",
//    id: "myFirstBarChart",
//    width: width,
//    height: height,
//    colors: ["#e89795", "#9b9b9b", "#d8d8d8", "#f5f5f5"],
//    rowSpacing: 3,
//	suggestedMax: 400,
//    margin: {
//      'top': 0,
//      'right': 10,
//      'left': 10,
//      'bottom': 30
//    }
//  });
//myFirstBarChart.draw(myData['dinner']);