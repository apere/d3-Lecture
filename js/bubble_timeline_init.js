var chart = {};

var gradient = false;
var hidden = 0;
var low = .2;
var medium = .5;
var high = .8;
var solid = 1;

var color_r = 212;
var color_g = 65;
var color_b = 52;

function setOpacity(data) {
    th = $(this);
    risk = th.attr('data-risk');
    opacity = 1;
    if (risk == undefined || risk == '-' || risk == '')
        opacity = hidden;
    else if (risk == 0)
        opacity = solid;
    else if (risk > 0 && risk <= 3)
        opacity = low;
    else if (risk > 3 && risk <= 7)
        opacity = medium;
    else if (risk > 7)
        opacity = high;
    return "rgba(" + color_r + ', ' + color_g + ', ' + color_b + ', ' + opacity + ')';
}

function setColor(data) {
    th = $(this);
    risk = th.attr('data-risk');

    if (risk > 3)
        return '#f4f4f4';
    else
        return '#333333';
}

function setOpacityGradient(data) {
    th = $(this);
    risk = th.attr('data-risk');
    opacity = 1;
    if (risk == undefined || risk == '-' || risk == '')
        opacity = hidden;
    else if (risk == 0)
        opacity = solid;
    else {
        opacity = risk / 10;
    }
    return "rgba(" + color_r + ', ' + color_g + ', ' + color_b + ', ' + opacity + ')';
}


function toggleOpacityStyle() {
    if (gradient)
        $('td.risk div').css('background-color', setOpacityGradient);
    else
        $('td.risk div').css('background-color', setOpacity);

    gradient = !gradient;
    if (!gradient)
        return "gradient";
    else
        return "steps";
}

$(window).load(function () {
    var data = [
        {
            "date": "",
            "name": "v2.3.0",
            "category": "Planning",
            "security": "",
            "operational": null,
            "importance": 0
  },
        {
            "date": "",
            "name": "v2.2.0",
            "category": "Planning",
            "security": "",
            "operational": null,
            "importance": 0
  },
        {
            "date": "",
            "name": "v2.1.0",
            "category": "Development",
            "security": "",
            "operational": null,
            "importance": 0
  },
        {
            "date": "",
            "name": "v2.0.2",
            "category": "Development",
            "security": "",
            "operational": null,
            "importance": 0
  },
        {
            "date": "11.Aug.2014 ",
            "name": "v2.0.1",
            "category": "Released",
            "security": 2.1,
            "operational": 3.1,
            "importance": 0
  },
        {
            "date": "1.Jul.2014",
            "name": "v2.0.0",
            "category": "Deprecated",
            "security": 2.1,
            "operational": 4.2,
            "importance": 3
  },
        {
            "date": "20.Jun.2014",
            "name": "v2.0.0-beta1",
            "category": "Deprecated",
            "security": 2.1,
            "operational": 4.5,
            "importance": 0
  },
        {
            "date": "18.Jun.2014",
            "name": "v2.0.0-beta0",
            "category": "Deprecated",
            "security": 2.1,
            "operational": 4.5,
            "importance": 0
  },
        {
            "date": "12.Jun.2014",
            "name": "v1.6.4",
            "category": "Released",
            "security": 2.3,
            "operational": 2.2,
            "importance": 0
  },
        {
            "date": "19.May.2014",
            "name": "v1.6.3",
            "category": "Deprecated",
            "security": 2.3,
            "operational": 5.6,
            "importance": 2
  },
        {
            "date": "6.Mar.2014",
            "name": "v1.6.2",
            "category": "Deprecated",
            "security": 2.3,
            "operational": 5.8,
            "importance": 5
  },
        {
            "date": "25.Feb.2014",
            "name": "v1.6.2-beta0",
            "category": "Deprecated",
            "security": 2.3,
            "operational": 5.6,
            "importance": 1
  },
        {
            "date": "22.Jan.2014",
            "name": "v1.6.1",
            "category": "Deprecated",
            "security": 2.3,
            "operational": 5.8,
            "importance": 3
  },
        {
            "date": "2.Jan.2014",
            "name": "v1.6.0",
            "category": "Deprecated",
            "security": 8.3,
            "operational": 6.4,
            "importance": 0
  },
        {
            "date": "20.Dec.2013",
            "name": "v1.6.0-beta0",
            "category": "Deprecated",
            "security": 8.3,
            "operational": 6.7,
            "importance": 0
  },
        {
            "date": "19.Dec.2013",
            "name": "v1.6.0-beta",
            "category": "Deprecated",
            "security": 8.3,
            "operational": 6.7,
            "importance": 0
  },
        {
            "date": "11.Dec.2013",
            "name": "v1.5.2",
            "category": "Released",
            "security": 8.4,
            "operational": 5,
            "importance": 0
  },
        {
            "date": "3.Dec.2013",
            "name": "v1.5.1",
            "category": "Deprecated",
            "security": 8.4,
            "operational": 4.2,
            "importance": 0
  },
        {
            "date": "21.Nov.2013",
            "name": "v1.5.0",
            "category": "Deprecated",
            "security": 8.4,
            "operational": 4.2,
            "importance": 0
  },
        {
            "date": "12.Nov.2013",
            "name": "v1.4.2",
            "category": "Released",
            "security": 8.5,
            "operational": 3.5,
            "importance": 1
  },
        {
            "date": "11.Nov.2013",
            "name": "v1.4.1",
            "category": "Deprecated",
            "security": 8.5,
            "operational": 3.5,
            "importance": 8
  },
        {
            "date": "23.Oct.2013",
            "name": "v1.4.0",
            "category": "Deprecated",
            "security": 8.5,
            "operational": 6.1,
            "importance": 0
  },
        {
            "date": "16.Jul.2013",
            "name": "v1.3.1",
            "category": "Released",
            "security": 6.3,
            "operational": 5.1,
            "importance": 0
  },
        {
            "date": "15.Jul.2013",
            "name": "v1.3.0",
            "category": "Deprecated",
            "security": 6.3,
            "operational": 5.4,
            "importance": 0
  },
        {
            "date": "28.Jun.2013",
            "name": "v1.2.0",
            "category": "Deprecated",
            "security": 6.3,
            "operational": 5.2,
            "importance": 0
  },
        {
            "date": "27.Jun.2013",
            "name": "v1.1.0",
            "category": "Deprecated",
            "security": 6.3,
            "operational": 5.4,
            "importance": 0
  },
        {
            "date": "14.Jun.2013",
            "name": "v1.0.4",
            "category": "Deprecated",
            "security": 6.2,
            "operational": 5,
            "importance": 4
  },
        {
            "date": "17.May.2013",
            "name": "v1.0.3",
            "category": "Deprecated",
            "security": 6.2,
            "operational": 6.1,
            "importance": 1
  },
        {
            "date": "25.Apr.2013",
            "name": "v1.0.2",
            "category": "Deprecated",
            "security": 6.1,
            "operational": 6.2,
            "importance": 6
  },
        {
            "date": "24.Apr.2013",
            "name": "v1.0.1",
            "category": "Deprecated",
            "security": 6.5,
            "operational": 6.2,
            "importance": 0
  },
        {
            "date": "23.Apr.2013",
            "name": "v1.0.0",
            "category": "Deprecated",
            "security": 6.4,
            "operational": 6.2,
            "importance": 0
  },
        {
            "date": "22.Feb.2013",
            "name": "v0.6.8-dev",
            "category": "Deprecated",
            "security": 1.2,
            "operational": 7.1,
            "importance": 0
  },
        {
            "date": "11.Dec.2012",
            "name": "v0.6.7",
            "category": "Deprecated",
            "security": 1.4,
            "operational": 7.5,
            "importance": 0
  },
        {
            "date": "20.Nov.2012",
            "name": "v0.6.7-dev",
            "category": "Deprecated",
            "security": 1.4,
            "operational": 7.5,
            "importance": 0
  },
        {
            "date": "29.Aug.2012",
            "name": "v0.6.5",
            "category": "Deprecated",
            "security": 1.5,
            "operational": 7.5,
            "importance": 0
  },
        {
            "date": "29.Aug.2012",
            "name": "v0.6.5-dev",
            "category": "Deprecated",
            "security": 1.6,
            "operational": 7.8,
            "importance": 0
  },
        {
            "date": "21.Aug.2012",
            "name": "v0.6.3",
            "category": "Deprecated",
            "security": 1.5,
            "operational": 7.5,
            "importance": 0
  },
        {
            "date": "21.Aug.2012",
            "name": "v0.6.4",
            "category": "Deprecated",
            "security": 1.5,
            "operational": 7.5,
            "importance": 0
  },
        {
            "date": "24.Jul.2012",
            "name": "v0.6.0",
            "category": "Deprecated",
            "security": 1.3,
            "operational": 8,
            "importance": 0
  },
        {
            "date": "23.Jul.2012",
            "name": "v0.6.0-dev",
            "category": "Deprecated",
            "security": 1.3,
            "operational": 8.3,
            "importance": 0
  },
        {
            "date": "16.Jul.2012",
            "name": "v0.5.5",
            "category": "Deprecated",
            "security": 1.4,
            "operational": 8.2,
            "importance": 1
  },
        {
            "date": "16.Jul.2012",
            "name": "v0.5.4",
            "category": "Deprecated",
            "security": 1.2,
            "operational": 8.1,
            "importance": 0
  },
        {
            "date": "13.Jul.2012",
            "name": "v0.5.3",
            "category": "Deprecated",
            "security": 1.5,
            "operational": 8.3,
            "importance": 0
  },
        {
            "date": "13.Jul.2012",
            "name": "v0.5.2",
            "category": "Deprecated",
            "security": 1.3,
            "operational": 8.5,
            "importance": 0
  },
        {
            "date": "13.Jul.2012",
            "name": "v0.5.1",
            "category": "Deprecated",
            "security": 1.4,
            "operational": 8.5,
            "importance": 0
  },
        {
            "date": "13.Jul.2012",
            "name": "v0.5.0",
            "category": "Deprecated",
            "security": 1.2,
            "operational": 8.5,
            "importance": 0
  },
        {
            "date": "12.Jul.2012",
            "name": "v0.3.0",
            "category": "Deprecated",
            "security": "-",
            "operational": 8.5,
            "importance": 1
  },
        {
            "date": "9.Jul.2012",
            "name": "v0.1.0",
            "category": "Deprecated",
            "security": "-",
            "operational": 9,
            "importance": 0
  }
];

    var width = $('.bubble-container').width();
	console.log(width);

    chart = d3.select("#bubble-chart-container")
        .append("svg")
        .chart("Timeline", {
            width: width,
            height: 70,
            startDate: new Date("1.July.2012"),
            endDate: new Date("31.August.2014"),
            state: "security",
            pointSize: {
                "zero": 5,
                "min": 8,
                "max": 20
            },
            categories: ["Planning", "Development", "Released", "Deprecated", "Archived"],
            margin: {
                'top': 10,
                'right': 2,
                'left': 2,
                'bottom': 20
            },
            tooltipFunction: function (d, i) {
                var m = moment(d.date);
                return "<h3 class = 'popover-title'><span class = 'tooltip-name'>" + d.name + "</span> - <span class = 'tooltip-category'>" + d.category + "</span></h3><div class = 'popover-content'>Used " + d.importance + " times internally.<br>Security Risk: " + d.security + "/10<br>Operational Risk: " + d.operational + "/10<div class = 'tooltip-date'>Released Date: " + m.format('DD.MMM.YYYY') + "</div></div>";
            }
        });
    chart.draw(data);

    $(chart).on('chartElementClicked', function (e, eventData) {
        console.log(eventData);
    });

    $(window).resize(function () {
        width = $('.bubble-container').width();
		console.log(width);
        chart.width(width);
    });


    $('#six-months').on('click', function (event) {
        var end = chart.endDate;
        var newStart = new Date(end.getTime());
        newStart.setMonth(newStart.getMonth() - 6);
        chart.changeStartDate(newStart);

    });

    $('#one-year').on('click', function (event) {
        var end = chart.endDate;
        var newStart = new Date(end.getTime());
        newStart.setMonth(newStart.getMonth() - 12);
        chart.changeStartDate(newStart);
    });

    $('#two-years').on('click', function (event) {
        var end = chart.endDate;
        var newStart = new Date(end.getTime());
        newStart.setMonth(newStart.getMonth() - 24);
        chart.changeStartDate(newStart);
    });

    $('#reset-years').on('click', function (event) {
        chart.changeStartDate(new Date("1.July.2012"));
    });

    $('#security-butt').on('click', function (event) {
        chart.changeState("security");
    });

    $('#operational-butt').on('click', function (event) {
        chart.changeState("operational");
    });


    $('.btn-group button').click(function () {
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
    });
});