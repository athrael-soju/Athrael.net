function drawStatsChart(bsStatsList, costStatsList) {
    $(function () {
        $('#container3').highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            colors: ["#D2B48C", "#9ba892"],
            title: {
                text: 'Multiple Run Statistics Chart'
            },
            xAxis: {
                categories: [
                    'Run Average',
                    'St. Deviation',
                    'Luckiest Run',
                    'Unluckiest Run'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Black Stones/Cost of Enchant',
                    style: {
                        color: 'black',
                    }
                }

            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                    name: 'Black Stones',
                    data: bsStatsList

                }, {
                    name: 'Enchant Cost',
                    data: costStatsList
                }, ]
        });
    });
    setInterval(function () {
        $("#container3").highcharts().reflow();
    }, 10);
}

