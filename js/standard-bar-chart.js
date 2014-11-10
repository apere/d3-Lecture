var chart = '';
var chartID = '';
//For the bubble timeline chart
d3.chart('StandardBar', {
    initialize: function (params) {
        chart = this;
        if (params.width != undefined)
            this.w = params.width;
        else
            this.w = 250; // sets default values for variables
        if (params.height != undefined)
            this.h = params.height;
        else
            this.h = 250;
        if (params.margin != undefined)
            this.margin = params.margin;
        else
            this.margin = {
                'top': 10,
                'right': 10,
                'left': 10,
                'bottom': 20
            };
        if (params.id != undefined)
            this.id = params.id;
        else
            this.id = 'barChart-' + parseInt(Math.random() * 10000);
        if (params.colors != undefined)
            this.colors = params.colors;
        else
            this.colors = ['#000000'];
        if (params.numCategories != undefined)
            this.numCategories = params.numCategories;
        else
            this.numCategories = 4;
        if (params.categorySwap != undefined)
            this.categorySwap = params.categorySwap;
        else
            this.categorySwap = {};
        if (params.altColor != undefined)
            this.altColor = params.altColor;
        else
          this.altColor = {};
        if(params.rowSpacing != undefined) {
          this.rowSpacing = params.rowSpacing; 
        }
        else {
          this.rowSpacing = 0; 
        }
        if(params.extraSpacing != undefined) {
          this.extraSpacing = params.extraSpacing; 
        }
        else {
          this.extraSpacing = 0; 
        }
        if(params.suggestedMax != undefined) {
          this.suggestedMax = params.suggestedMax;
        }
        else
          this.suggestedMax = 0;
        if(params.parentID != undefined) {
			this.parentID = params.parentID;	
		}
		else {
			this.parentID = '#' + $(this.base[0]).parent().prop('id');
		}

        this.minNum = 100000000;
        this.maxNum = -10000000;
        
        chartID = this.id;
        
        this.xScale = d3.scale.linear().domain([0, Math.max(this.maxNum, this.suggestedMax)]).range([0, this.w - this.margin['left'] - this.margin['right']]);
		
        
      
        this.legendTable = d3.select(this.parentID + ' .chart-legend').append('table').style('width', '100%').append('tbody');

        var dataBase = this.base.append('g')
            .classed('all-points', true);
								
						var pattern = this.base.append('defs')
									.append('pattern')
									.attr({
														id: 'pattern1',
														patternUnits: 'userSpaceOnUse',
														x: 0,
														y: 0, 
														width: 10,
														height:10,
														patternTransform: "rotate(30)"
												});
							var patternG = pattern.append('g')
							patternG.append('rect').attr({x: "0", width: "5", height: "10", y: "0", fill: "#f0f0f0"});
							patternG.append('rect').attr({x: "5", width: "5", height: "10", y: "0", fill: "#f4f4f4"});
							//patternG.append('path').attr({d: 'M10,0 l-10,10'});

        this.layer('all-points', dataBase, { // things to do on initial data binding
            dataBind: function (data) {
                for (var i in data) {
											if (data[i]['number'] > chart.maxNum)
													chart.maxNum = data[i]['number'];
											if (data[i]['number'] < chart.minNum)
													chart.minNum = data[i]['number'];
										
                }
                chart.updateScales();
                this.selectAll(chart.parentID + ' .all-points>.point').remove();

                chart.legendTR = chart.legendTable.selectAll('tr').data(data).enter().append('tr').style('height', function (d, i) {
                    return ((chart.h - chart.margin.top - chart.margin.bottom) / chart.numCategories - 2) + chart.rowSpacing + 1 + 'px';
                });

                return this.selectAll('.all-points').data(data); // return a data bound selection for the passed in data.
            },
            // setup the elements that were just created
            insert: function () {
                chart.legendTR.append('td')
                    .attr('class', 'legend-label')
                    .attr('data-category', function (d, i) {
                        return d.name
                    })
                    .text(function (d, i) {
												if (chart.categorySwap[d.name] != undefined)
                            return chart.categorySwap[d.name];
                        else {
													if (d.name == "OK")
														return "OK";
													return d.name;
												}
                           

                    }).style('padding', '0px').on("click", function (d, i) { // custom event with name 'chartElementClicked' thrown on the chart object
                        $(this).toggleClass('click-activated');
                        $(chart).trigger('chartElementClicked', [{
                            "riskLevel": d.name,
                            "riskLevelAlias": chart.categorySwap[d.name],
                            "componentCount": d.number,
                            "chartID": chart.id,
                            "barColor": chart.getColor(d, i),
                            "barOpacity": chart.getOpacity(d, i),
                            "isActive": $(this).hasClass('click-activated')
                        }]);
                    });

                chart.legendTR.append('td')
                    .attr('class', 'legend-count')
                    .attr('data-category', function (d, i) {
                        return d.name
                    })
                    .text(function (d, i) {
                        return d.number;
                    }).style('text-align', 'right').style('padding', '0px');


                var pointElements = this.append('rect')
                    .attr('data-category', function (d, i) {
                        return d.name
                    })
                    .attr('x', chart.margin.left)
                    .attr('y', function (d, i) {
                        if(d.name == "No Risk")
                          return chart.margin.top/2 + (i * chart.extraSpacing) + (i * (chart.h - chart.margin.top - chart.margin.bottom) / chart.numCategories);
                        return chart.margin.top/2 + (i * chart.rowSpacing) + (i * (chart.h - chart.margin.top - chart.margin.bottom) / chart.numCategories);
                    })
                    .attr('width', 0)
                    .attr('height', (chart.h - chart.margin.top - chart.margin.bottom) / chart.numCategories).attr('fill-opacity', chart.getOpacity)
                    .attr('stroke', function() {
                        return '#9b9b9b'; // note to self, make this a parameter
                    })
                    .attr('stroke-width', function(d,i) {
//                      if(d.name == "No Risk") {
//                        return 1; 
//                      }
                      return 0;
                    })
                    .attr('fill', chart.getColor)
                    .on("click", function (d, i) { // custom event with name 'chartElementClicked' thrown on the chart object
                        $('#' + chart.id + ' td.legend-label[data-category = "' + d.name + '"]').toggleClass('click-activated');
                        $(chart).trigger('chartElementClicked', [{
                            "riskLevel": d.name,
                            "riskLevelAlias": chart.categorySwap[d.name],
                            "componentCount": d.number,
                            "chartID": chart.id,
                            "barColor": chart.getColor(d, i),
                            "barOpacity": chart.getOpacity(d, i),
                            "isActive": $('#' + chart.id + ' td.legend-label[data-category = ' + d.name + ']').hasClass('click-activated')
                        }]);
                    });
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