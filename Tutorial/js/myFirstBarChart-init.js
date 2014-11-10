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

// Suggested code for initializing your chart. Feel free to tweak the parameters to your liking.
var myFirstBarChart = d3.select("#myFirstBarChart-container").append("svg").attr('class', 'bar-chart')
  .chart("CustomBarChart", {
	parentID : "#myFirstBarChart-container",
    id: "myFirstBarChart",
    width: width,
    height: height,
    colors: ["#e89795", "#9b9b9b", "#d8d8d8", "#f5f5f5"],
    rowSpacing: 3,
	suggestedMax: 400,
    margin: {
      'top': 0,
      'right': 10,
      'left': 10,
      'bottom': 30
    }
  });
myFirstBarChart.draw(myData['dinner']);