
$( document ).ready(function() {
    getURL();
	//***Adding Elements & Chaining
//	d3.select("body").append("p").text("New paragraph!");
	
	$('.nav li').on('click', function() {
		var current = $(this).attr('data-hash');
		console.log(current);
		window.location.href = 'http://adampere.com/d3/blank.html' + current;
		getURL();
	});
	
});

function getURL() {
	var url = document.URL;
	var i = url.lastIndexOf('#');
	try {
		url = url.substring(i);
	}
	catch(err) {}
	console.log(url);
	
	if(url.indexOf('#chaining') >= 0) {
		chainAdd();	
	}
	else if(url.indexOf('#svg-only') >= 0) {
		addSVG();	
	}
	else if(url.indexOf('#circle-only') >= 0) {
		addCircle();	
	}
	else if(url.indexOf('#circle-transition') >= 0) {
		transCircle();	
	}
	else if(url.indexOf('#data-set') >= 0) {
		bindData();	
	}
	else if(url.indexOf('#data-initial') >= 0) {
		bindDataAddCirc();	
	}
	else if(url.indexOf('#data-function') >= 0) {
		bindDataTrans();	
	}
	else if(url.indexOf('#data-remove') >= 0) {
		bindDataRemove();	
	}
}

function chainAdd() {
	d3.select('.code').html('').html('d3.select("body")<br> .append("p")<br> .text("New paragraph!");');
	d3.select(".target").html('').append("p").text("New paragraph!");
}

function addSVG() {
	d3.select('.code').html('').html("s =<br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br> .style('background-color', '#dcebe9');");
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
}

function addCircle() {
	d3.select('.code').html('').html("s =<br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br> .style('background-color', '#dcebe9');<br><br>c = <br>s.append('circle')<br> .attr('cx', 50)<br> .attr('cy', 200)<br> .attr('r', 50)<br>.attr('fill', 'black')");
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
	c = s.append('circle').attr('cx', 50).attr('cy', 200).attr('r', 50).attr('fill', 'black')
}

function transCircle() {
	d3.select('.code').html('').html("s =<br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br> .style('background-color', '#dcebe9');<br><br>c = <br>s.append('circle')<br> .attr('cx', 50)<br> .attr('cy', 200)<br> .attr('r', 50)<br>.attr('fill', 'black');<br><br>c.transition()<br> .duration(1000)<br> .attr('cx', 500)");
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
	c = s.append('circle').attr('cx', 50).attr('cy', 200).attr('r', 50).attr('fill', 'black');
	c.transition().duration(1000).attr('cx', 500)
}

function bindData() {
	d3.select('.code').html('').html("var dataset = <br> [ 45, 80, 95, 135, 200, 250, 360 ];<br><br>s = <br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br>.style('background-color', '#dcebe9');<br><br> elem = s.selectAll('circle')<br> .data(dataset);");
	dataset = [ 45, 80, 95, 135, 200, 250, 360 ];
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
}

function bindDataAddCirc() {
	d3.select('.code').html('').html("var dataset = <br> [ 45, 80, 95, 135, 200, 250, 360 ];<br><br>s = <br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br>.style('background-color', '#dcebe9'); <br><br> elem = s.selectAll('circle')<br> .data(dataset); \<br><br>elem.enter().append('circle')<br> .attr('cx', 0)<br> .attr('cy', 200)<br> .attr('r', 10)<br> .attr('fill', 'black');");
	dataset = [ 45, 80, 95, 135, 200, 250, 360 ];
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
	elem = s.selectAll('circle').data(dataset);
	elem.enter().append('circle').attr('cx', 0).attr('cy', 200).attr('r', 10).attr('fill', 'black');
}

function bindDataTrans() {
	d3.select('.code').html('').html("var dataset = <br> [ 45, 80, 95, 135, 200, 250, 360 ];<br><br>s = <br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br>.style('background-color', '#dcebe9'); <br><br> elem = s.selectAll('circle')<br> .data(dataset); \<br><br>elem.enter().append('circle')<br> .attr('cx', 0)<br> .attr('cy', 200)<br> .attr('r', 10)<br> .attr('fill', 'black');<br><br>elem.transition()<br> .duration(1000)<br> .attr('cx', function(d,i){<br>return d;<br>});");
	dataset = [ 45, 80, 95, 135, 200, 250, 360 ];
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
	elem = s.selectAll('circle').data(dataset);
	elem.enter().append('circle').attr('cx', 0).attr('cy', 200).attr('r', 10).attr('fill', 'black');
	elem.transition().duration(1000).attr('cx', function(d,i){return d;});
}

function bindDataRemove() {
	d3.select('.code').html('').html("var dataset = <br> [ 45, 80, 95, 135, 200, 250, 360 ];<br><br>s = <br> d3.select('body').append('svg')<br> .attr('width', 600)<br> .attr('height', 500)<br>.style('background-color', '#dcebe9'); <br><br> elem = s.selectAll('circle')<br> .data(dataset); \<br><br>elem.enter().append('circle')<br> .attr('cx', 0)<br> .attr('cy', 200)<br> .attr('r', 10)<br> .attr('fill', 'black');<br><br>elem.transition()<br> .duration(1000)<br> .attr('cx', function(d,i){<br>return d;<br>});<br><br>dataset.pop();<br><br>elem = s.selectAll('circle')<br> .data(dataset);<br><br>elem.exit().transition()<br> .duration(1000)<br> .attr('cy', -100)<br> .remove();");
	dataset = [ 45, 80, 95, 135, 200, 250, 360 ];
	s =  d3.select('.target').html('').append('svg').attr('width', 600).attr('height', 500).style('background-color', '#dcebe9');
	elem = s.selectAll('circle').data(dataset);
	elem.enter().append('circle').attr('cx', 0).attr('cy', 200).attr('r', 10).attr('fill', 'black');
	elem.transition().duration(1000).attr('cx', function(d,i){return d;});
	setTimeout(function(){
		dataset.pop();
		elem = s.selectAll('circle').data(dataset);
		elem.exit().transition().duration(1000).attr('cy', -100).remove();
	}, 1500);
}