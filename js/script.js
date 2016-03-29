
var dataURLs = ["data/chartdata.json","data/mapdata.json"];
$.each(dataURLs,function(index){
    $.ajax({
      type: "GET",
      url: dataURLs[index],
      dataType: "json",
      success: function(data) {
        if(index == 0){
          parseChartData(data);
        }
        else {
          parseMapData(data);
        }
      }
    });

});

function parseChartData(data){
  var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "marginRight": 40,
    "marginLeft": 40,
    "autoMarginOffset": 20,
    "dataDateFormat": "YYYY",
    "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth":true
    }],
    "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
    },
    "graphs": [{
        "id": "g1",
        "balloon":{
          "drop":true,
          "adjustBorderColor":false,
          "color":"#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
    }],
    "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis":false,
        "offset":30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount":true,
        "color":"#AAAAAA"
    },
    "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2
    },
    "valueScrollbar":{
      "oppositeAxis":false,
      "offset":50,
      "scrollbarHeight":10
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
    },
    "export": {
        "enabled": true
    },
    "dataProvider": data

});

chart.addListener("rendered", zoomChart);

zoomChart();

function zoomChart() {
    chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
}
}

function parseMapData(data){
   // Initiate the chart
   $('#mapdiv').highcharts('Map', {
       title : {
           text : 'Tornadoes in North Carolina by County'
       },

       subtitle : {
           text : '1950-2014'
       },

       mapNavigation: {
           enabled: true,
           buttonOptions: {
               verticalAlign: 'bottom'
           }
       },

       colorAxis: {
           min: 0
       },

       series : [{
           data : data,
           mapData: Highcharts.maps['countries/us/us-nc-all'],
           joinBy: 'hc-key',
           name: 'Number',
           states: {
               hover: {
                   color: '#BADA55'
               }
           },
           dataLabels: {
               enabled: true,
               format: '{point.name}'
           }
       }]
   });
}
