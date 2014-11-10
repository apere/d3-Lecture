//For the bubble timeline chart
d3.chart('Timeline', {
	initialize: function (params) {
		var theChart = this;
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
		if (params.startDate != undefined)
			this.startDate = new Date(params.startDate);
		else
			this.startDate = new Date(Date.now() - 31557600000); // defaults to one year before today's date
		if (params.endDate != undefined)
			this.endDate = new Date(params.endDate);
		else
			this.endDate = new Date(Date.now()); // defaults to today's date
		this.pointSize = {};
		if (params.pointSize != undefined) {
			if (params.pointSize.zero != undefined)
				this.pointSize.zero = params.pointSize.zero;
			else
				this.pointSize.zero = 5;
			if (params.pointSize.min != undefined)
				this.pointSize.min = params.pointSize.min;
			else
				this.pointSize.min = 10;
			if (params.pointSize.max != undefined && params.pointSize.max < (this.h - this.margin.top - this.margin.bottom))
				this.pointSize.max = params.pointSize.max;
			else
				this.pointSize.max = this.h - this.margin.top - this.margin.bottom;
		} else {
			this.pointSize.zero = 5; // currently arbitrary numbers *** make this smarter???
			this.pointSize.min = 10;
			this.pointSize.max = 20;
		}
		if (params.state != undefined) {
			this.state = params.state.toLowerCase();
		} else {
			params.state = "security";
		}
		this.categoryCount = {};
		this.categoryData = [];
		if (params.categories != undefined) {
			for (var i = 0; i < params.categories.length; i++) {
				this.categoryCount[params.categories[i]] = 0;
			}
		}
		if (params.tooltipFunction != undefined)
			this.tooltipFunction = params.tooltipFunction;
		else {
			this.tooltipFunction = new function (d, i) {
				var m = moment(new Date(d.date));
				return "<div class = 'category'><span class = 'label'>Category:</span> " + d.category + "</div><div class = 'date'><span class = 'label'>Date:</span> " + m.format('DD.MMM.YYYY') + "</div><div class = 'importance'><span class = 'label'>Importance:</span> " + d.importance + "</div><div class = 'size'><span class = 'label'>Radius:</span> " + chart.getRadius(d, i).toFixed(2) + "</div>";
			}
		}

		this.pointSizeScale = d3.scale.linear() // sets the size of points w/ value from 1-10
		.domain([1, Math.sqrt(8)])
			.range([this.pointSize.min, this.pointSize.max]);

		this.xScale = d3.time.scale().domain([new Date(this.startDate), new Date(this.endDate)]).range([this.margin['left'], this.w - this.margin['right']]);

		this.parentID = '#' + $(this.base[0]).parent().prop('id');

		$(this.base[0]).attr('height', this.h + 'px');
		$(this.base[0]).attr('width', this.w + 'px');
		$(this.parentID).css('width', this.w + 'px');
		$(this.base[0]).on("mouseleave", function () {
			d3.selectAll('.current-category').classed('current-category', false);
			return tooltip.style("visibility", "hidden");
		})
			.on("mousemove", function (event) {
				return tooltip.style("top", (event.pageY + 10) + "px").style("left", (event.pageX + 10) + "px");
			});

		var tooltip = d3.select('body').append('div')
			.classed('tooltip-block popover fade right in', 'true')
			.style('position', 'absolute')
			.style('z-index', '1000')
			.style('visibility', 'hidden')
			.style('display', 'block')
			.text('a simple tooltip');

		tooltip.on("mousemove", function (event) {
			return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
		});


		var dataBase = this.base.append('g')
			.classed('all-points', true);

		var axes = this.base.append('g')
			.classed('time-axes', true);

		axes.append('line').classed('left-axe', true)
			.attr('x1', this.getXCoordinate({
				date: this.startDate
			}, 1))
			.attr('x2', this.getXCoordinate({
				date: this.startDate
			}, 1))
			.attr('y1', this.margin.top)
			.attr('y2', this.h - this.margin.bottom)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');

		axes.append('line').classed('right-axe', true)
			.attr('x1', this.getXCoordinate({
				date: this.endDate
			}, 1))
			.attr('x2', this.getXCoordinate({
				date: this.endDate
			}, 1))
			.attr('y1', this.margin.top)
			.attr('y2', this.h - this.margin.bottom)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');

		axes.append('line').classed('middle-line-axe', true)
			.attr('x1', this.getXCoordinate({
				date: this.startDate
			}, 1))
			.attr('x2', this.getXCoordinate({
				date: this.endDate
			}, 1))
			.attr('y1', (this.h - this.margin.top) / 2)
			.attr('y2', (this.h - this.margin.top) / 2)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');


		axes.append('text').classed('left-axe', true)
			.attr('x', this.getXCoordinate({
				date: theChart.startDate
			}, 1))
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'left')
			.text(function (d, i) {
				momentDate = moment(theChart.startDate);
				return momentDate.format('MMM YYYY');
			});

		axes.append('text').classed('right-axe', true)
			.attr('x', this.getXCoordinate({
				date: theChart.endDate
			}, 1))
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'end')
			.text(function (d, i) {
				momentDate = moment(theChart.endDate);
				if (momentDate.isSame(moment(), 'day'))
					return 'Today';
				return momentDate.format('MMM YYYY');
			});

		axes.append('text').classed('middle-axe', true)
			.attr('x', function (d, i) {
				return theChart.w / 2;
			})
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(theChart.xScale.invert(theChart.w / 2));
				return momentDate.format('MMM YYYY');
			});

		axes.append('line').classed('middle-axe-line', true)
			.attr('x1', function (d, i) {
				return theChart.w / 2;
			})
			.attr('x2', function (d, i) {
				return theChart.w / 2;
			})
			.attr('y1', ((this.h - this.margin.top) / 2) + 10)
			.attr('y2', ((this.h - this.margin.top) / 2) - 10)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');

		axes.append('text').classed('middle-left-axe', true)
			.attr('x', function (d, i) {
				return theChart.w / 4;
			})
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(theChart.xScale.invert(theChart.w / 4));
				return momentDate.format('MMM YYYY');
			});

		axes.append('line').classed('middle-left-axe-line', true)
			.attr('x1', function (d, i) {
				return theChart.w / 4;
			})
			.attr('x2', function (d, i) {
				return theChart.w / 4;
			})
			.attr('y1', ((this.h - this.margin.top) / 2) + 10)
			.attr('y2', ((this.h - this.margin.top) / 2) - 10)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');

		axes.append('text').classed('middle-right-axe', true)
			.attr('x', function (d, i) {
				return theChart.w / 4 * 3;
			})
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(theChart.xScale.invert(theChart.w / 4 * 3));
				return momentDate.format('MMM YYYY');
			});

		axes.append('line').classed('middle-right-axe-line', true)
			.attr('x1', function (d, i) {
				return theChart.w / 4 * 3;
			})
			.attr('x2', function (d, i) {
				return theChart.w / 4 * 3;
			})
			.attr('y1', ((this.h - this.margin.top) / 2) + 10)
			.attr('y2', ((this.h - this.margin.top) / 2) - 10)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');


		this.legend = d3.select(this.parentID).append('ul')
			.attr('class', 'legend')
			.style('width', this.w + 'px');


		this.layer('all-points', dataBase, { // things to do on initial data binding
			dataBind: function (data) {
				var chart = this.chart();

				chart.updateScales();

				data.sort(function (a, b) {
					if (a.importance == 0)
						return 100;
					else if (a.importance > b.importance)
						return -1;
					else if (a.importance <= b.importance)
						return 1;
				});
				this.selectAll('.all-points>.point').remove();

				return this.selectAll('all-points').data(data); // return a data bound selection for the passed in data.
			},
			// setup the elements that were just created
			insert: function () {
				var chart = this.chart();
				var pointElements = this.append('circle')
					.attr('data-date', function (d, i) {
						return d.date;
					})
					.attr('data-category', function (d, i) {
						return d.category;
					})
					.attr('class', function (d) {
						return 'point category-' + d.category.toLowerCase().replace(/\s/g, '-');
					}) // update to give a category
					.attr('cx', function (d, i) {
						return 0;
					}) // initial values, updated on enter event
					.attr('cy', function (d, i) {
						return chart.getYCoordinate(d, i);
					})
					.attr('r', function (d, i) {
						return chart.pointSize.max;
					})
					.each(function (d, i) {
						if (chart.categoryCount[d.category] === undefined) {
							chart.categoryCount[d.category] = 1;
						} else {
							chart.categoryCount[d.category] = chart.categoryCount[d.category] + 1;
						}
					})
					.on("click", function (d, i) { // custom event with name 'chartElementClicked' thrown on the chart object
						$(chart).trigger('chartElementClicked', [{
							"importance": d.importance,
							"date": new Date(d.date),
							"category": d.category,
							"point-size": chart.getRadius(d, i)
						}]);
					})
					.on("mousemove", function () {
              var coordinates = [0,0];
              coordinates = d3.mouse(this);
						return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
					})
					.on("mouseover", function (d, i) {
						tooltip.style("visibility", "visible");
						tooltip.html(chart.tooltipFunction(d, i));
						d3.select(this).classed('current-active-point', true);
						//d3.selectAll('.category-' + d.category.toLowerCase().replace(/\s/g,'-')).classed('current-category', true);
					})
					.on('mouseleave', function (d, i) {
						//d3.selectAll('.current-category').classed('current-category', false);
						d3.select(this).classed('current-active-point', false);
					});

				chart.updateLegend();
				return pointElements;
			},

			// setup an enter event for the data as it comes in:
			events: {
				'enter': function () {
					var chart = this.chart();
					// position newly entering elements
					return this.transition()
						.duration(575)
						.attr('cx', function (d, i) {
							return chart.getXCoordinate(d, i);
						})
						.attr('cy', function (d, i) {
							return chart.getYCoordinate(d, i);
						})
						.attr('r', function (d, i) {
							return chart.getRadius(d, i);
						})
						.attr('fill-opacity', function (d, i) {
							return chart.getOpacity(d, i);
						});
				},
				'exit': function () {
					var chart = this.chart();
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
		this.updateScales();
		$(this.base[0]).attr('width', this.w);
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
		$(this.base[0]).attr('height', this.h);
		return this;
	},
	updateScales: function () { // resets the scales used for drawing the points
		this.xScale = d3.time.scale().domain([new Date(this.startDate), new Date(this.endDate)]).range([this.margin['left'], this.w - this.margin['right']]);
	},
	updateThePoints: function () { // Redraws all of the points // redo all the point's basic info and add transition duration
		this.layer('all-points').selectAll('.point')
			.transition()
			.duration(500)
			.attr('cx', function (d, i) {
				return chart.getXCoordinate(d, i);
			})
			.attr('cy', function (d, i) {
				return chart.getYCoordinate(d, i);
			})
			.attr('r', function (d, i) {
				return chart.getRadius(d, i);
			})
			.attr('fill-opacity', function (d, i) {
				return chart.getOpacity(d, i);
			});

		d3.selectAll('text.left-axe')
			.text(function (d, i) {
				console.log(chart.startDate);
				momentDate = moment(chart.startDate);
				return momentDate.format('MMM YYYY');
			});

		d3.selectAll('line.right-axe')
			.attr('x1', this.getXCoordinate({
				date: this.endDate
			}, 1))
			.attr('x2', this.getXCoordinate({
				date: this.endDate
			}, 1))
			.attr('y1', this.margin.top)
			.attr('y2', this.h - this.margin.bottom)
			.attr('stroke-width', .1)
			.attr('stroke', 'black');

		d3.selectAll('line.middle-line-axe')
			.attr('x1', this.getXCoordinate({
				date: this.startDate
			}, 1))
			.attr('x2', this.getXCoordinate({
				date: this.endDate
			}, 1));

		d3.selectAll('text.right-axe')
			.attr('x', this.getXCoordinate({
				date: chart.endDate
			}, 1))
			.attr('y', this.h - (chart.margin.bottom / 2))
			.text(function (d, i) {
				momentDate = moment(chart.endDate);
				if (momentDate.isSame(moment(), 'day'))
					return 'Today';
				return momentDate.format('MMM YYYY');
			});

		d3.selectAll('text.middle-axe')
			.attr('x', function (d, i) {
				return chart.w / 2;
			})
			.attr('y', this.h - (chart.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(chart.xScale.invert(chart.w / 2));
				return momentDate.format('MMM YYYY');
			});

		d3.selectAll('text.middle-left-axe')
			.attr('x', function (d, i) {
				return chart.w / 4;
			})
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(chart.xScale.invert(chart.w / 4));
				return momentDate.format('MMM YYYY');
			});

		d3.selectAll('text.middle-right-axe')
			.attr('x', function (d, i) {
				return chart.w / 4 * 3;
			})
			.attr('y', this.h - (this.margin.bottom / 2))
			.attr('text-anchor', 'middle')
			.text(function (d, i) {
				momentDate = moment(chart.xScale.invert(chart.w / 4 * 3));
				return momentDate.format('MMM YYYY');
			});

		d3.selectAll('line.middle-right-axe-line')
			.attr('x1', function (d, i) {
				return chart.w / 4 * 3;
			})
			.attr('x2', function (d, i) {
				return chart.w / 4 * 3;
			});

		d3.selectAll('line.middle-left-axe-line')
			.attr('x1', function (d, i) {
				return chart.w / 4;
			})
			.attr('x2', function (d, i) {
				return chart.w / 4;
			});

		d3.selectAll('line.middle-axe-line')
			.attr('x1', function (d, i) {
				return chart.w / 2;
			})
			.attr('x2', function (d, i) {
				return chart.w / 2;
			});
	},
	updateAll: function () {
		this.updateScales();
		this.updateThePoints();
		this.updateLegend();
	},
	updateLegend: function () {
		this.categoryData = [];
		for (key in this.categoryCount) {
			this.categoryData.push({
				"name": key,
				"total": this.categoryCount[key]
			});
		}
		var legendElements = this.legend.selectAll('li')
			.data(this.categoryData)
			.enter()
			.append('li')
			.attr('data-category', function (d, i) {
				return d.name;
			})
			.attr('class', function (d) {
				return 'legend-item category-' + d.name.toLowerCase().replace(/\s/g, '-');
			})
			.on("mouseover", function (d, i) {
				d3.selectAll('.category-' + d.name.toLowerCase().replace(/\s/g, '-')).classed('current-category', true);
			})
			.on('mouseleave', function (d, i) {
				d3.selectAll('.current-category').classed('current-category', false);
			});

		legendElements.append('div').style('display', 'inline-block').style('width', '18px').style('height', '14px').style('margin-right', '5px').style('margin-left', this.margin.left + 'px').append('span').attr('class', 'legend-count').html(function (d, i) {
			return d.total;
		});

		legendElements.append('span').text(function (d, i) {
			return d.name;
		});


	},
	getRadius: function (d, i) {
		if (d.importance == 0)
			return this.pointSize.zero;
		else
			return this.pointSizeScale(Math.sqrt(d.importance));
	},
	getXCoordinate: function (d, i) { // returns the x-coordinate for a point
		if (d.date == "" || d.date == undefined)
			return "-150px";
		else
			return this.xScale(new Date(d.date)) + 'px';
	},
	getYCoordinate: function (d, i) { // returns the y-coordinate for a point 
		center = this.h - this.margin.top - this.margin.bottom;
		center = center / 2 + this.margin.top;
		return center + 'px';
	},
	getOpacity: function (d, i) {
		if (d[this.state] === undefined || d[this.state] == '' || d[this.state] == '-' || isNaN(d[this.state]))
			return .1;
		else
			return (parseFloat(d[this.state]) / 10);
	},
	changeStartDate: function (newStart) {
		this.startDate = new Date(newStart);
		if (this.startDate - this.endDate == 0) {
			this.startDate -= 1000 * 60 * 60 * 24 * 3;
			this.startDate = new Date(this.startDate);
		}
		this.updateAll();
	},
	changeEndDate: function (newEnd) {
		this.endDate = new Date(newEnd);
		if (this.startDate - this.endDate == 0)
			this.endDate += 1000 * 60 * 60 * 24 * 3;
		this.updateAll();
	},
	changeState: function (newState) {
		this.state = newState.toLowerCase();
		this.updateAll();
		console.log(this.state);
	}
});