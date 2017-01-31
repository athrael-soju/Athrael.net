function drawPieChart(selectedPowers, activity, activityList, cycle) {

    var data = [];
    var colors = [];

    $.each(activityList, function (index, value) {
        //  If power selected to be displayed.
        if (jQuery.inArray(index, selectedPowers) !== -1)
        {
            colors.push(powerColorMap[index]);
            data.push([index, value]);
        }
    });

    $('#container').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        colors: colors,
        title: {
            text: 'Cycle ' + cycle + ": " + activity
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
                type: 'pie',
                name: 'Systems',
                data: data
            }]
    });
}