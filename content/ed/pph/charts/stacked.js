function drawStackedChart(selectedPowers, activity, controlList, cycle) {

    var series = [];
    var colors = [];

    if (activity === "Preparation, Fortification & Expansion") {
        series.push({name: "Preparation", data: controlList["prepList"]}, {name: "Fortification", data: controlList["fortList"]}, {name: "Expansion", data: controlList["expList"]});
        colors.push("#9ACD32", "#D2B48C", "#87CEEB");
    }
    else if (activity === "Undermining & Opposition") {
        series.push({name: "Undermining", data: controlList["undList"]}, {name: "Opposition", data: controlList["opList"]});
        colors.push("#FFA500", "#FF6347");
    }
    else if (activity === "Preparation & Fortification") {
        series.push({name: "Preparation", data: controlList["prepList"]}, {name: "Fortification", data: controlList["fortList"]});
        colors.push("#9ACD32", "#D2B48C");
    }

    $(function () {
        $('#container').highcharts({
            chart: {
                type: 'column',
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
                min: 0,
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
                column: {
                    stacking: 'normal',
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