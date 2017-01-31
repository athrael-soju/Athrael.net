function drawEnchantChart(runType, enchantRange, blackStonesUsed, costPerEnchant, container) {
    $(function () {
        $(container).highcharts({
            chart: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            colors: ["#D2B48C", "#FFF"],
            title: {
                text: runType + ' Run Enchant Chart'
            },
            xAxis: {
                categories: enchantRange
            },
            yAxis: {
                title: {
                    text: 'Black Stones/Cost in Million Silver',
                    style: {
                        color: 'black'
                    }
                }
            },
            tooltip: {
                headerFormat: 'Enchant #: <b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>'
            },
            series: [{
                    type: 'column',
                    name: 'Black Stones Used',
                    data: blackStonesUsed
                },
                {
                    type: 'spline',
                    name: 'Enchant Cost',
                    data: costPerEnchant,
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'

                    }
                }]
        });
    });

    setInterval(function () {
        $(container).highcharts().reflow();
    }, 10);
}
