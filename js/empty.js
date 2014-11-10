var chart = '';
var chartID = '';
//For the bubble timeline chart
d3.chart('StandardBar', {
    initialize: function (params) {
        chart = this; //not totally necessary, but I like make a variable that contains "this".
		
		// Parameters
		// - Don't forget to add an option for when the user does not enter the parameter
		// - You can have the user pass in an object... but this can lead to complexity w/ error checking
        if (params.width != undefined)
            this.w = params.width;
        else
            this.w = 250; // sets default values for variables
		

        // Instance Variables        
        this.xScale = //???;

        var dataBase = this.base.append('g').classed('all-points', true); // create an element to house all points
		
		// This is where you write all of the functions that apply data minupulation (binding, entering, exiting, etc)
        this.layer('all-points', dataBase, {
			
            // This function will be called when you bind data to your chart
			dataBind: function (data) {
                // You may want to do a bit of data analysis (e.g. Do I need the max/min numbers? If I do, what do I do with them?
				
	
                this.selectAll(chart.parentID + ' .all-points>.point').remove(); // remove all points so we can start fresh with a new set of data
                return this.selectAll('.all-points').data(data); // begin the binding processes
            },
			
            // This function is called every time a new peice of data is added to our data object.
			// Some things you may want to think about: 
			// 		- adding DOM elements
			//		- What properties do we want to set for each element? (hint: size, location, color, ...
			//		- Insertion transitions (How do we make it look like the bar grew from nothing to it's size?)
			// 		- If we have some kind of legend, do we need to add anything to that?
            insert: function () {
				
				// Use the pointElements variable as a pointer to all of new svg elements that you are inserting
				// Hint: you can use the special keyword 'this'. It will be equal to the return value of your dataBind function above.
				// If you didn't change that return section, then this will be equal to "chart.selectAll('.all-points').data(data);"
                var pointElements = ""; 
				
                return pointElements;
            },

            // setup an enter event for the data as it comes in:
            events: {
                'enter': function () {
                    // position newly entering elements
                    return this.transition()
                        .duration(575)
                        .attr('width', function (d, i) {
                            return chart.getWidth(d, i);
                        });
                },
                'exit': function () {
                    return this.remove();
                }
            }
        });
    },
    width: function (newWidth) { // width getter-setter 
        if (arguments.length === 0) {
            return this.w;
        }
        this.w = newWidth;
        chart.w = newWidth;
        //$(this.parentID).attr('width', this.w + 'px');
        this.updateScales();
        this.updateThePoints();
        return this;
    },
    height: function (newHeight) { // height getter-setter
        if (arguments.length === 0) {
            return this.h;
        }
        this.h = newHeight;
        this.updateScales();
        this.updateThePoints();
        //$(this.parentID).attr('height', this.h);
        return this;
    },
    updateScales: function () { // resets the scales used for drawing the points
      this.xScale = d3.scale.linear().domain([0, Math.max(this.maxNum, this.suggestedMax)]).range([0, this.w - this.margin['left'] - this.margin['right']]);
      chart.xScale = d3.scale.linear().domain([0, Math.max(this.maxNum, this.suggestedMax)]).range([0, this.w - this.margin['left'] - this.margin['right']]);
    },
    updateThePoints: function () {
        d3.selectAll('#' + this.id + " .all-points rect").transition()
            .duration(175)
            .attr('width', function(d,i) {
            	return chart.getWidth(d,i); 
        		});
    },
    updateAll: function () {
        this.updateScales();
        this.updateThePoints();
    },
    getOpacity: function (d, i) {
      return 1;
    },
    getColor: function (d, i) {
						 if(d.name == "No Risk") {
								return 'url(#pattern1)'; 
       }
      return chart.colors[i];
    },
    getWidth: function (d, i) {
        return this.xScale(d.number);
    }
});