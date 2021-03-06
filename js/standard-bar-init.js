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

//Drawing my Dinner Bar Chart
var chart1 = d3.select("#bar-container-1")
  .append("svg").attr('class', 'bar-chart').attr('display', 'inline-block')
  .chart("StandardBar", {
	parentID : "#bar-container-1",
    id: "bar-chart-1",
    width: width,
    height: height,
    colors: ["#e89795", "#9b9b9b", "#d8d8d8", "#f5f5f5"],
    rowSpacing: 3,
    extraSpacing: 6,
	suggestedMax: 300,
    margin: {
      'top': 0,
      'right': 10,
      'left': 10,
      'bottom': 30
    }
  });
chart1.draw(myData['dinner']);


var chart3 = d3.select("#bar-container-3")
  .append("svg").attr('class', 'bar-chart').attr('display', 'inline-block')
  .chart("StandardBar", {
	parentID : "#bar-container-3",
    id: "bar-chart-3",
    width: width,
    height: height,
    colors: ["#e89795", "#9b9b9b", "#d8d8d8", "#f5f5f5"],
    rowSpacing: 3,
    extraSpacing: 6,
	suggestedMax: 350,
    margin: {
      'top': 0,
      'right': 10,
      'left': 10,
      'bottom': 30
    }
  });
chart3.draw(myData['dessert']);

var barClicked = function(e, eventData) {
    console.log(eventData);
};


// Example showing that I can create my own event & bind a function to it.
$(chart1).on('chartElementClicked', function(e, eventData) {console.log("chart Clicked")});
$(chart3).on('chartElementClicked', function(e, eventData) {console.log("chart Clicked")});


// Updating the width of my charts to the new width of its container
$(window).resize(function () {
	width = $('.bar-wrapper').width();
	chart1.width(width);
	chart3.width(width);
});
