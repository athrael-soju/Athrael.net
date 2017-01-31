function drawBarChart(selectedPowers, activity, econList, cycle) {

    var series = [];
    var colors = [];

    if (activity === "Exploited & Controlled") {
        series.push({name: "Exploited Systems", data: econList["exploitedList"]}, {name: "Controlled Systems", data: econList["controlledList"]});
        colors.push("#FF9933", "#CC3300");
    }
    else if (activity === "Income, Upkeep & Overhead") {
        series.push({name: "Income", data: econList["incomeList"]}, {name: "Upkeep", data: econList["upkeepList"]}, {name: "Overhead", data: econList["overheadList"]});
        colors.push("#9ACD32", "#D2B48C", "#87CEEB");
    }
    else if (activity === "Available CC") {
        series.push({name: "Available CC", data: econList["availableList"]});
        colors.push("#0099FF");
    }

    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'bar',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },
            colors: colors,
            title: {
                text: "Cycle" + cycle + ": " + activity
            },
            xAxis: {
                categories: selectedPowers
            },
            yAxis: {
                min: -1, 
                title: {
                    text: 'Activity'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                },
                column: {
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: series
        });
    });
}