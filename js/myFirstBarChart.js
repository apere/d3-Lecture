/* 
Author: Adam Pere
Date: Tuesday, November 11th 2014

This file is an empty skeleton for a reusable Bar Graph.

The bar graph should allow the user to bind data in the form:
	myData = [
			{
				"name"  : "Turkey Leg",
				"value" : "152"
			},
			{
				"name"  : "Pumkin Pie",
				"value" : "232"
			},
			{
				"name"  : "Apple Pie",
				"value" : "30"
			},
			...
	];
	
The resulting bar graph should be contained in an svg element & be formatted simillarly to:

-------------------------
Turkey Leg # *******
Pumkin Pie # ************
 Apple Pie # ***
-------------------------

Each bar should be proportionally scaled to the containing element. 


When initializing the bar chart, the user should be able to specify:
- The width
- The height
- The ID of the DOM element that the chart will live inside of
- The colors to be used (It's up to you if you want them to pass in an array of colors OR a single color (and differentiate bars by opacity) OR use classnames to let them change color with css)
- Spacing between bars
- A suggested maximum (Helpful when you want to create muliple charts with the same scale for comparison)

Optional Parameters
- The chart's margins. I like to let them pass in a JSON object with all the margins (e.g. {'top' : 10, 'right' : 20, ...})




More Fun
- It's up to you if the bars are ordered by value (You can use d3's sort function to sort the data).
- The legend is optional. I suggest trying to make the bars and adding the legend in afterwards if you have more time. In cases like this, I will usually use straight up html/css for the legends instead of writing the text to svg. I do this because I don't feel like having to calculate the length/word wrapping for extra long labels in js. It's much easier being able to throw the categories into a table (or other html element) using js and then styling it with css.





From here on out, I use the word point to refer to a bar. I did so to remind you that this same skeleton (+/- a bit of tweaking) can be used for different kinds of charts. It doesn't have to be a bar chart.
	
*/

var chart = '';
var chartID = '';
d3.chart('CustomBarChart', {
    initialize: function (params) {
        chart = this; //not totally necessary, but I like make a variable that contains "this".
		
		// *** Parameters ***
		
		// - Don't forget to add an option for when the user does not enter the parameter
		// - You can have the user pass in an object... but this can lead to complexity w/ error checking
        if (params.width != undefined)
            this.w = params.width;
        else
            this.w = 250; // sets default values for variables
		
		// *** END of Parameters ***

		
		
        // *** Instance Variables ***
		
		// Use the xScale function to proportionally scale the length of each point
		// Do not set this equal to a string.
        this.xScale = "";
			
		// *** END of Instance Variables ***
			
			
		
		// create an element to house all points
        var dataBase = this.base.append('g').classed('all-points', true); 
		
		// This is where you write all of the functions that apply data minupulation (binding, entering, exiting, etc)
        this.layer('all-points', dataBase, {
			
            // This function will be called when you bind data to your chart
			// You may want to do a bit of data analysis (e.g. Do I need the max/min numbers? If I do, what do I do with them?
			dataBind: function (data) {
			
				
				// *** Keep these two lines last ***
				// remove all points so we can start fresh with a new set of data
                this.selectAll(chart.parentID + ' .all-points>.point').remove(); 
				
				// begin the binding processes
                return this.selectAll('.all-points').data(data); 
				// ******
            },
			
            // This function is called every time a new peice of data is added to our data object.
			// Some things you may want to think about: 
			// 		- adding DOM elements
			//		- What properties do we want to set for each element? (hint: size, location, color, ...
			// 		- If we have some kind of legend, do we need to add anything to that?
            insert: function () {
				
				// Use the pointElements variable as a pointer to all of new svg elements that you are inserting
				// Hint: you can use the special keyword 'this'. It will be equal to the return value of your dataBind function above.
				// If you didn't change that return section, then this will be equal to "chart.selectAll('.all-points').data(data);"
                var pointElements = ""; 
				
                return pointElements;
            },

            // These are events that happen on every element that is bound to data.
			// In all of these functions, you can use the special keyword 'this' to 
			// retrieve the selection of relevant elements.
            events: {
				
				// This function is called when data is added to our data object.
				// Note: this is similar to the insert function but different. This function is called
				// when a datum is appended to our data object. This function is called after the insert function.
				// I usually put transitions to the final value after the initial load here.
                'enter': function () {
					
					//Return the output of your transitions/property setting here... not a string
                    return ""; 
                },
				
				// This function is called when data is changed. This is where you would put the code that changes
				// the elements bound to the recently updated data.
				// What kind of transitions do we want here?
				'update' : function() {
					
					// Return the output of your transitions/property setting here... not a string
					return "" ; 
				},
				
				// This function is called when some data is removed. This is where you would put the code
				// that handles the removal of elements associated with that data.
				// What kind of transitions do we want here?
                'exit': function () {
					
					// I like to return the elements that are being removed
					// You never know if the user can use 'em.
                    return this.remove();
                }
            }
        });
    },
	
	// From here on, everything is a function that either we (inside of the chart) or the user can use.
	// That includes getters & setters, functions to update data, etc.
	
	// I'll fill out the first one for you:
	// This is the width function. The user can call this with a line similar to 'myChart.width();' or 'myChart.width(100);'
	// If the user leaves the parentheses empty, this function works as a getter that returns the chart's width.
	// If the user puts a number in the parentheses, this function works as a setter, setting the width & updating the appropriate things.
    width: function (newWidth) { 
		
		// checking to see if we are getting or setting
        if (arguments.length === 0) {
            return this.w;
        }
		
		// Error checking ... since the user can theoretically pass anything in, 
		// we want to make sure we are only working with a number that is greater than 0.
		if(!isNaN(newWidth) && newWidth > 0) { 
			this.w = newWidth;
			chart.w = newWidth;
		}
		else {
			console.log("You tried to set the width to an invalid number. Please use an integer greater than 0");	
		}
		
		// Since the scales that determeine the length of points are dependent on the width of the chart, we should update them. 
        this.updateScales(); 
		
		// Since the width of the points is deteremined by the scale, we should also update them.
		this.updateThePoints();	
		
		// When the function works as both a setter & getter, I like to always return something. This it is.
        return this; 
    },
	
	// Height getter-setter
    height: function (newHeight) { 

    },
	
	// This function updates the scales that are used to determine the lengthof points & possible other things. 
	// This should not have any parameters because this is simply recalculating the scales based on any other changes we may have made.
    updateScales: function () { 
      
    },
	
	// This function should recalculate any property of every point that needs to be updated when the data hasn't been changed. 
	// (e.g. I made the width of my chart larger. Because I now have more room on my chart, I can make the points longer. 
	// To do so, I updated my x-scale. Simply updating the x-scale won't automagically update the length of the points on screen, 
	// so I have to recalculate their widths. This function would handle that width recalculation.)
    updateThePoints: function () { 

    },
	
	// This is an example of a setter that is really only used internally & to help modularize my code. 
	// Instead of writing the multiple lines it takes to update a point's width, I can simply call this function. 
	// This function should only return the new width and not actually set it.
    getPointWidth: function (d, i) { 

    }
	
	// Do we need anymore functions? Feel free to add more!
});