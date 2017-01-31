function drawLineGraph(graphData, message) {
    $('#container').highcharts({
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: message,
            style: {"color": "#E0E0E0"}
        }, xAxis: {
            title: {
                enabled: true,
                style: {"color": "#E0E0E0"},
                text: 'Run #'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Precursors Generated ',
                style: {"color": "#E0E0E0"}
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
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
                data: graphData
            }]
    });
}
;