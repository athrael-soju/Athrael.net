function drawScatterGraph(graphData, message) {
    $('#container').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        title: {
            text: message,
            style: {"color": "#E0E0E0"}
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Run #',
                style: {"color": "#E0E0E0"}
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: '# of Precursors',
                style: {"color": "#E0E0E0"}
            }
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'Run: {point.x}, Precursors: {point.y}'
                }
            }
        },
        series: [{
                showInLegend: false,  
                name: 'Run Result:',
                data: graphData}]
    });
}
;


