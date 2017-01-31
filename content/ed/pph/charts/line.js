function drawLineChart(graphDataList, activity, selectedPowers) {

    var series = [];
    var colors = [];
    var categories = [];


    $.each(graphDataList, function (index, value) {
        //  If power selected to be displayed.
        if (jQuery.inArray(value[0], selectedPowers) !== -1)
        {
            colors.push(powerColorMap[value[0]]);
            series.push({
                name: graphDataList[index][0],
                data: graphDataList[index][1]
            });
        }
    });

    for (i = 0; i < graphDataList[1][1].length; i++)
        categories.push(i + 1);

    $('#container').highcharts({
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        colors: colors,
        legend: {
            enabled: true
        },
        title: {
            text: "All Cycles: " + activity,
            //style: {"color": "#E0E0E0"}
        }, xAxis: {
            categories: categories,
            title: {
                enabled: true,
                style: {"color": "#E0E0E0"},
                text: 'Cycle #'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: activity + 'Score',
                style: {"color": "#E0E0E0"}
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            headerFormat: 'Power: <b>{series.name}</b><br>',
            pointFormat: 'Score: <b>{point.y}</b>'
        },
        series: series
    });
}
;