
$( document ).ready(function() {
   
	//***Adding Elements & Chaining
//	d3.select("body").append("p").text("New paragraph!");
	
	
	//***Transition * SVG
//	s =  d3.select('body').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
//	c = s.append('circle').attr('cx', 50).attr('cy', 200).attr('r', 50).attr('fill', 'black')
//	c.transition().duration(1000).attr('cx', 500)
	
	//***Data Binding
//	var dataset = [ 45, 80, 95, 135, 200, 250, 360 ];
//	s =  d3.select('body').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
//	elem = s.selectAll('circle').data(dataset);
//	elem.enter().append('circle').attr('cx', 0).attr('cy', 200).attr('r', 10).attr('fill', 'black');
//	elem.transition().duration(1000).attr('cx', function(d,i){return d;})
	
	
	//***Data events
//	setTimeout(function(){
//		dataset.pop()
//		elem = s.selectAll('circle').data(dataset);
//		elem.exit().transition().duration(1000).attr('cy', -100).remove();
//	}, 1500);

	
});
