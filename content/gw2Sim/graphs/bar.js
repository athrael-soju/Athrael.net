function drawBarGraph(graphData, message) {
    $('#container').highcharts({
        chart: {
            type: 'column',
            renderTo: 'histogram', defaultSeriesType: 'bar',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: message,
            style: {"color": "#E0E0E0"}
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            title: {
                text: 'Run #',
                style: {"color": "#E0E0E0"}
            }            
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Precursors Generated',
                style: {"color": "#E0E0E0"}
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Run: {point.x}, Precursors: {point.y}'
        },
        legend: {
            enabled: false
        },
        series: [{
                name: 'Run Result:',
                data:
                        graphData
                ,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#E0E0E0',
                    align: 'right',
                    y: 10, // 10 pixels down from the top 
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
    });
}
;
