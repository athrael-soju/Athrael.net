function drawPieGraph(graphData, message) {
    $('#container').highcharts({
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: message,
            style: {"color": "#E0E0E0"}
        },
        tooltip: {
            pointFormat: 'Generated: {point.y}'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white'
                    }
                }
            }
        },
        series: [{
                type: 'pie',
                name: 'Run Result',
                data: graphData
            }]
    });
}
;
